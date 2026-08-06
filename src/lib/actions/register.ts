"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { generatePin, sendVerificationEmail } from "@/lib/verification";

export type RegisterState = {
  error?: string;
};

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const tab = formData.get("tab") as string; // "customer" | "business"
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with that email already exists." };
  }

  let businessName: string | undefined;
  let businessDescription: string | null = null;
  let categoryId: string | undefined;

  if (tab === "business") {
    businessName = (formData.get("businessName") as string)?.trim();
    businessDescription = (formData.get("businessDescription") as string)?.trim() || null;
    categoryId = (formData.get("categoryId") as string) || undefined;

    if (!businessName) {
      return { error: "Business name is required." };
    }
    if (!categoryId) {
      return { error: "Please select a category for your business." };
    }
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: tab === "business" ? "OWNER" : "CUSTOMER",
      },
    });

    if (tab === "business" && businessName) {
      await tx.business.create({
        data: {
          name: businessName,
          description: businessDescription,
          categoryId,
          ownerId: user.id,
        },
      });
    }
  });

  const pin = generatePin();
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: pin,
      expires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  try {
    await sendVerificationEmail(email, pin);
  } catch {
    redirect(`/verify?email=${encodeURIComponent(email)}&emailFailed=1`);
  }

  redirect(`/verify?email=${encodeURIComponent(email)}`);
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
//   if (existing) {
//     return { error: "An account with that email already exists." };
//   }

//   let businessName: string | undefined;
//   let businessDescription: string | null = null;

//   if (tab === "business") {
//     businessName = (formData.get("businessName") as string)?.trim();
//     businessDescription = (formData.get("businessDescription") as string)?.trim() || null;

//     if (!businessName) {
//       return { error: "Business name is required." };
//     }
//   }

//   const hashed = await bcrypt.hash(password, 10);

//   await prisma.$transaction(async (tx) => {
//     const user = await tx.user.create({
//       data: {
//         name,
//         email,
//         password: hashed,
//         role: tab === "business" ? "OWNER" : "CUSTOMER",
//       },
//     });

//     if (tab === "business" && businessName) {
//       await tx.business.create({
//         data: {
//           name: businessName,
//           description: businessDescription,
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
//       expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
//     },
//   });

//   try {
//     await sendVerificationEmail(email, pin);
//   } catch {
//     // The account and PIN both exist at this point — don't strand the user
//     // on a dead end. Let them into /verify anyway; the Resend button there
//     // calls resendCode, which is a second chance to actually deliver it.
//     redirect(
//       `/verify?email=${encodeURIComponent(email)}&emailFailed=1`
//     );
//   }

//   redirect(`/verify?email=${encodeURIComponent(email)}`);
// }