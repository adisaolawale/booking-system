"use server";

import { AuthError, CredentialsSignin } from "next-auth";
import { signIn } from "@/lib/auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      // Unnest error.cause.err if Auth.js wraps the error object
      const cause = error.cause as { err?: Error & { code?: string } } | undefined;

      if (
        error instanceof CredentialsSignin ||
        cause?.err?.code === "EMAIL_NOT_VERIFIED" ||
        cause?.err?.message === "EMAIL_NOT_VERIFIED"
      ) {
        return { error: "Please verify your email before logging in." };
      }

      return { error: "Invalid email or password." };
    }
    throw error;
  }

  return {};
}



// "use server";

// import { AuthError, CredentialsSignin } from "next-auth"; // 1. Import CredentialsSignin
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
//       // 2. Narrow the type or check if error is CredentialsSignin
//       if (error instanceof CredentialsSignin && error.code === "EMAIL_NOT_VERIFIED") {
//         return { error: "Please verify your email before logging in." };
//       }
//       return { error: "Invalid email or password." };
//     }
//     throw error;
//   }

//   return {};
// }



// "use server";

// import { AuthError } from "next-auth";
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
//     // signIn() throws a special redirect signal on *success* — that is not
//     // an AuthError and must be re-thrown so Next.js still navigates.
//     // Only an actual AuthError means the login itself failed.
//     if (error instanceof AuthError) {
//       if (error.cause?.err?.message === "EMAIL_NOT_VERIFIED") {
//         return { error: "Please verify your email before logging in." };
//       }
//       return { error: "Invalid email or password." };
//     }
//     throw error;
//   }

//   return {};
// }