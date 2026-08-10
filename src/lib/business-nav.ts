import { LayoutDashboard, CalendarCheck, Scissors, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const BUSINESS_NAV: NavItem[] = [
  { label: "Home", href: "/business", icon: LayoutDashboard },
  { label: "Bookings", href: "/business/bookings", icon: CalendarCheck },
  { label: "Services", href: "/business/services", icon: Scissors },
  { label: "Availability", href: "/business/availability", icon: Clock },
];