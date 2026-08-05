import { AuthHeader } from "@/components/homepage/AuthHeader";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: { as?: string };
}) {
  const { as } = await searchParams;
  const initialTab = as === "business" ? "business" : "customer";

  return (
    <>
      <AuthHeader mode="register" />
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-16">
        <RegisterForm initialTab={initialTab} />
      </main>
    </>
  );
}