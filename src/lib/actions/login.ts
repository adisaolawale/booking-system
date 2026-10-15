"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { limit } from "@/server/lib/rate-limit";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!(await limit("login", email))) {
    return { error: "Too many attempts. Please wait a few minutes and try again." };
  }

  try {
    await signIn("credentials", {
      email,
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if ((error as { code?: string }).code === "EMAIL_NOT_VERIFIED") {
        return { error: "Please verify your email before logging in." };
      }
      return { error: "Invalid email or password." };
    }
    throw error;
  }

  return {};
}





// "use server";

// import { AuthError, CredentialsSignin } from "next-auth";
// import { signIn } from "@/lib/auth";

// export type LoginState = {
//   error?: string;
// };

// export async function loginAction(
//   _prevState: LoginState,
//   formData: FormData
// ): Promise<LoginState> {
//   try {
//     await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirectTo: "/",
//     });
//   } catch (error) {
//     if (error instanceof AuthError) {
//       // Unnest error.cause.err if Auth.js wraps the error object
//       const cause = error.cause as { err?: Error & { code?: string } } | undefined;
//       if (error instanceof AuthError) {
//         if ((error as { code?: string }).code === "EMAIL_NOT_VERIFIED")
//           return { error: "Please verify your email before logging in." };
//         return { error: "Invalid email or password." };
//       }

//       return { error: "Invalid email or password." };
//     }
//     throw error;
//   }

//   return {};
// }
