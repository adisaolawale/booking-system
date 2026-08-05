import { resend } from "@/lib/resend";
import { VerificationEmail } from "@/emails/VerificationEmail";

export function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendVerificationEmail(email: string, pin: string) {
  const { error } = await resend.emails.send({
    // resend.dev works immediately with no setup — swap this for an address
    // on your own verified domain (e.g. verify@yourdomain.com) once you've
    // added and verified it in the Resend dashboard.
    from: "BookEase <onboarding@resend.dev>",
    to: email,
    subject: `${pin} is your BookEase verification code`,
    react: VerificationEmail({ pin }),
  });

  if (error) {
    // Don't let a send failure silently pretend the code went out —
    // surface it so the register/resend action can show a real error
    // instead of the user waiting on an email that never arrives.
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}