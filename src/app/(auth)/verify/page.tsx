import { redirect } from "next/navigation";
import { AuthHeader } from "@/components/homepage/AuthHeader";
import { VerifyForm } from "@/components/auth/VerifyForm";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { email?: string; emailFailed?: string; resent?: string };
}) {
  const { email, emailFailed, resent } = await searchParams;
  if (!email) redirect("/register");

  return (
    <>
      <AuthHeader mode="register" />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="mb-1.5 font-heading text-2xl font-semibold text-foreground">
            Check your email
          </h1>
          <p className="mb-4 text-sm text-muted-foreground">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-foreground">{email}</span>.
          </p>

          {emailFailed && (
            <p className="mb-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              We couldn&rsquo;t send that email just now &mdash; hit resend to try again.
            </p>
          )}
          {resent && !emailFailed && (
            <p className="mb-4 rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground">
              A new code is on its way.
            </p>
          )}

          <VerifyForm email={email} />
        </div>
      </main>
    </>
  );
}