"use client";

import Link from "next/link";
import { Settings, LifeBuoy, LogOut, ShieldCheck, Crown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/lib/actions/oauth";

export function ProfileMenu({
  name,
  email,
  role,
  settingsHref = "/dashboard/settings",
  side = "top",
  align = "start",
  children,
}: {
  name: string;
  email: string;
  role?: string;
  settingsHref?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  children: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align} className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs font-normal text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <User size={15} />
            Client Dashboard
          </Link>
        </DropdownMenuItem>

        {role === "ADMIN" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center gap-2">
                <ShieldCheck size={15} />
                View Admin Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {role === "OWNER" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/business" className="flex items-center gap-2">
                <Crown size={15} />
                View Owner Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <Link href={settingsHref} className="flex items-center gap-2">
            <Settings size={15} />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/support" className="flex items-center gap-2">
            <LifeBuoy size={15} />
            Help & Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant="destructive">
          <form action={signOutAction} className="w-full">
            <button type="submit" className="flex w-full items-center gap-2">
              <LogOut size={15} />
              Log out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}