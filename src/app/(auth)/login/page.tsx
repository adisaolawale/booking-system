import { AuthHeader } from "@/components/homepage/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <AuthHeader mode="login" />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-16">
        <LoginForm />
      </main>
    </>
  );
}