"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProfileMenu } from "@/components/account/ProfileMenu";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import { BUSINESS_NAV } from "@/lib/business-nav";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

// Icon components can't cross the server -> client boundary as props (they're
// functions, not plain data) — so instead of accepting a navItems array from
// a Server Component, this takes a plain string and resolves the actual
// array (icons included) entirely on the client side, where that's safe.
const NAV_MAP = {
  customer: DASHBOARD_NAV,
  business: BUSINESS_NAV,
};

export function DashboardSidebar({
  name,
  email,
  role,
  nav,
  homeHref,
  settingsHref,
}: {
  name: string;
  email: string;
  role?: string;
  nav: "customer" | "business";
  homeHref: string;
  settingsHref: string;
}) {
  const pathname = usePathname();
  const navItems = NAV_MAP[nav];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[72px] flex-col border-r border-border bg-card py-6 md:flex md:px-3 lg:w-60 lg:px-4">
      <Link href={homeHref} className="mb-6 flex items-center justify-center lg:justify-start">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-heading text-sm font-semibold text-primary-foreground lg:hidden">
          B
        </span>
        <span className="hidden font-heading text-lg font-semibold text-foreground lg:block">
          BookEase
        </span>
      </Link>

      <div className="mb-6">
        <button
          type="button"
          aria-label="Search"
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <Search size={15} />
        </button>

        <div className="relative hidden lg:block">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl transition-colors lg:mx-0 lg:h-auto lg:w-full lg:justify-start lg:gap-3 lg:px-3 lg:py-2.5 ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              <span className="hidden text-sm font-medium lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <ProfileMenu
        name={name}
        email={email}
        role={role}
        settingsHref={settingsHref}
        side="right"
        align="end"
      >
        <button
          type="button"
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted lg:mx-0 lg:h-auto lg:w-full lg:justify-start lg:gap-2.5 lg:px-3 lg:py-2"
        >
          <Avatar className="h-8 w-8 shrink-0 bg-foreground">
            <AvatarFallback className="bg-foreground text-xs font-medium text-background">
              {initials(name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden min-w-0 flex-1 text-left lg:block">
            <span className="block truncate text-sm font-medium text-foreground">{name}</span>
          </span>
        </button>
      </ProfileMenu>
    </aside>
  );
}


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Search } from "lucide-react";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
// import { ProfileMenu } from "@/components/account/ProfileMenu";

// function initials(name: string) {
//   return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
// }

// export function DashboardSidebar({
//   name,
//   email,
//   role,
// }: {
//   name: string;
//   email: string;
//   role?: string;
// }) {
//   const pathname = usePathname();

//   return (
//     <aside className="fixed inset-y-0 left-0 z-40 hidden w-[72px] flex-col border-r border-border bg-card py-6 md:flex md:px-3 lg:w-60 lg:px-4">
//       <Link href="/dashboard" className="mb-6 flex items-center justify-center lg:justify-start">
//         <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-heading text-sm font-semibold text-primary-foreground lg:hidden">
//           B
//         </span>
//         <span className="hidden font-heading text-lg font-semibold text-foreground lg:block">
//           BookEase
//         </span>
//       </Link>

//       <div className="mb-6">
//         <button
//           type="button"
//           aria-label="Search"
//           className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground lg:hidden"
//         >
//           <Search size={15} />
//         </button>

//         <div className="relative hidden lg:block">
//           <Search
//             size={14}
//             className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//           />
//           <input
//             type="search"
//             placeholder="Search bookings..."
//             className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
//           />
//         </div>
//       </div>

//       <nav className="flex flex-1 flex-col gap-1">
//         {DASHBOARD_NAV.map((item) => {
//           const active = pathname === item.href;
//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl transition-colors lg:mx-0 lg:h-auto lg:w-full lg:justify-start lg:gap-3 lg:px-3 lg:py-2.5 ${
//                 active
//                   ? "bg-primary text-primary-foreground"
//                   : "text-muted-foreground hover:bg-muted hover:text-foreground"
//               }`}
//             >
//               <item.icon size={18} className="shrink-0" />
//               <span className="hidden text-sm font-medium lg:inline">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       <ProfileMenu name={name} email={email} role={role} side="right" align="end">
//         <button
//           type="button"
//           className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-muted lg:mx-0 lg:h-auto lg:w-full lg:justify-start lg:gap-2.5 lg:px-3 lg:py-2"
//         >
//           <Avatar className="h-8 w-8 shrink-0 bg-foreground">
//             <AvatarFallback className="bg-foreground text-xs font-medium text-background">
//               {initials(name)}
//             </AvatarFallback>
//           </Avatar>
//           <span className="hidden min-w-0 flex-1 text-left lg:block">
//             <span className="block truncate text-sm font-medium text-foreground">{name}</span>
//           </span>
//         </button>
//       </ProfileMenu>
//     </aside>
//   );
// }
