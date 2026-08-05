import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MobileBottomNav } from "@/components/dashboard/MobileBottomNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const name = session.user.name ?? "Account";
  const email = session.user.email ?? "";

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar name={name} email={email} />
      <MobileBottomNav name={name} email={email} />

      {/* Offset for the fixed sidebar (md: 72px rail, lg: 240px full) and
          the fixed mobile bottom bar (64px). */}
      <main className="pb-20 md:pb-6 md:pl-[72px] lg:pl-60">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}


// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();

//   if (!session) {
//     redirect("/login");
//   }

//   return <>{children}</>;
// }