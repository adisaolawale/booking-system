"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { generatePin, sendVerificationEmail } from "@/lib/verification";

export type VerifyState = {
  error?: string;
};

export async function verifyEmail(
  _prevState: VerifyState,
  formData: FormData
): Promise<VerifyState> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const code = (formData.get("code") as string)?.trim();

  if (!email || code.length !== 6) {
    return { error: "Enter the 6-digit code sent to your email." };
  }

  const record = await prisma.verificationToken.findUnique({
    where: { identifier_token: { identifier: email, token: code } },
  });

  if (!record || record.expires < new Date()) {
    return { error: "That code is invalid or has expired." };
  }

  await prisma.$transaction(
    [
      prisma.user.update({ where: { email }, data: { emailVerified: new Date() } }),
      prisma.verificationToken.delete({
        where: { identifier_token: { identifier: email, token: code } },
      }),
    ],
    {
      // Default is 5000ms — too tight if the DB connection has to wake up
      // from an idle/suspended state (common on serverless Postgres like
      // Neon's free tier). This masks that latency; it doesn't fix it.
      timeout: 20000,
      maxWait: 10000,
    }
  );

  redirect(`/login?verified=1`);
}

// Bound to a specific email from the "Resend" button — see VerifyForm.
export async function resendCode(email: string) {
  "use server";

  const pin = generatePin();
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: pin,
      expires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  try {
    await sendVerificationEmail(email, pin);
    redirect(`/verify?email=${encodeURIComponent(email)}&resent=1`);
  } catch {
    redirect(`/verify?email=${encodeURIComponent(email)}&emailFailed=1`);
  }
}