"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { limit } from "@/server/lib/rate-limit";
import { startRegistration } from "@/server/services/registration.service";

export type RegisterState = { error?: string };

const schema = z
  .object({
    tab: z.enum(["customer", "business"]),
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().toLowerCase().email().max(254),
    password: z.string().min(8).max(72),
    businessName: z.string().trim().min(1).max(120).optional(),
    businessDescription: z.string().trim().max(1000).optional(),
    categoryId: z.string().uuid().optional(),
  })
  .refine((d) => d.tab !== "business" || (d.businessName && d.categoryId), {
    path: ["businessName"],
    message: "Business name and category are required.",
  });

export async function registerUser(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const raw = Object.fromEntries(
    [...formData.entries()].map(([k, v]) => [k, v === "" ? undefined : v])
  );
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const field = parsed.error.issues[0]?.path[0];
    if (field === "password") return { error: "Password must be 8 to 72 characters." };
    if (field === "businessName") return { error: "Business name and category are required." };
    return { error: "Please check your details and try again." };
  }

  const d = parsed.data;
  if (!(await limit("register", d.email))) {
    return { error: "Too many attempts. Please wait a few minutes." };
  }

  const result = await startRegistration(d);
  if ("error" in result) {
    return { error: "An account with that email already exists. Try signing in." };
  }

  redirect(
    `/verify?email=${encodeURIComponent(d.email)}${result.emailSent ? "" : "&emailFailed=1"}`
  );
}





// "use server";

// import bcrypt from "bcryptjs";
// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { generatePin, sendVerificationEmail } from "@/lib/verification";

// export type RegisterState = {
//   error?: string;
// };

// export async function registerUser(
//   _prevState: RegisterState,
//   formData: FormData
// ): Promise<RegisterState> {
//   const tab = formData.get("tab") as string; // "customer" | "business"
//   const name = (formData.get("name") as string)?.trim();
//   const email = (formData.get("email") as string)?.trim().toLowerCase();
//   const password = formData.get("password") as string;

//   if (!name || !email || !password) {
//     return { error: "All fields are required." };
//   }
//   if (password.length < 8) {
//     return { error: "Password must be at least 8 characters." };
//   }

//   const existing = await prisma.user.findUnique({ where: { email } });

//   // A guest-checkout row (created by booking without an account — see
//   // lib/actions/booking.ts) has no password. That's not a real account
//   // yet, so upgrade it in place rather than telling this person an
//   // account "already exists" for an email they only ever used to book
//   // something once.
//   const isGuestShell = existing && existing.password === null;

//   if (existing && !isGuestShell) {
//     return { error: "An account with that email already exists." };
//   }

//   let businessName: string | undefined;
//   let businessDescription: string | null = null;
//   let categoryId: string | undefined;

//   if (tab === "business") {
//     businessName = (formData.get("businessName") as string)?.trim();
//     businessDescription = (formData.get("businessDescription") as string)?.trim() || null;
//     categoryId = (formData.get("categoryId") as string) || undefined;

//     if (!businessName) {
//       return { error: "Business name is required." };
//     }
//     if (!categoryId) {
//       return { error: "Please select a category for your business." };
//     }
//   }

//   const hashed = await bcrypt.hash(password, 10);
//   const role = tab === "business" ? "OWNER" : "CUSTOMER";

//   await prisma.$transaction(async (tx) => {
//     const user = isGuestShell
//       ? await tx.user.update({
//           where: { id: existing!.id },
//           data: { name, password: hashed, role },
//         })
//       : await tx.user.create({
//           data: { name, email, password: hashed, role },
//         });

//     if (tab === "business" && businessName) {
//       await tx.business.create({
//         data: {
//           name: businessName,
//           description: businessDescription,
//           categoryId,
//           ownerId: user.id,
//         },
//       });
//     }
//   });

//   const pin = generatePin();
//   await prisma.verificationToken.create({
//     data: {
//       identifier: email,
//       token: pin,
//       expires: new Date(Date.now() + 10 * 60 * 1000),
//     },
//   });

//   try {
//     await sendVerificationEmail(email, pin);
//   } catch {
//     redirect(`/verify?email=${encodeURIComponent(email)}&emailFailed=1`);
//   }

//   redirect(`/verify?email=${encodeURIComponent(email)}`);
// }

