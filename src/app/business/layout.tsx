import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MobileBottomNav } from "@/components/dashboard/MobileBottomNav";

export default async function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  if (session.user.role !== "OWNER") {
    redirect("/dashboard");
  }

  const name = session.user.name ?? "Account";
  const email = session.user.email ?? "";
  const role = session.user.role;

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        name={name}
        email={email}
        role={role}
        nav="business"
        homeHref="/business"
        settingsHref="/business/settings"
      />
      <MobileBottomNav
        name={name}
        email={email}
        role={role}
        nav="business"
        settingsHref="/business/settings"
      />

      <main className="pb-20 md:pb-6 md:pl-[72px] lg:pl-60">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}