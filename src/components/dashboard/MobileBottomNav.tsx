"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import { ProfileMenu } from "@/components/dashboard/ProfileMenu";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function MobileBottomNav({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-border bg-card md:hidden">
      {DASHBOARD_NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-1 flex-col items-center gap-1 py-2 transition-colors"
          >
            <item.icon
              size={19}
              className={active ? "text-primary" : "text-muted-foreground"}
            />
            <span
              className={`text-[11px] font-medium ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}

      <ProfileMenu name={name} email={email} side="top" align="end">
        <button type="button" className="flex flex-1 flex-col items-center gap-1 py-2">
          <Avatar className="h-6 w-6 bg-foreground">
            <AvatarFallback className="bg-foreground text-[9px] font-medium text-background">
              {initials(name)}
            </AvatarFallback>
          </Avatar>
          <span className="text-[11px] font-medium text-muted-foreground">Profile</span>
        </button>
      </ProfileMenu>
    </nav>
  );
}