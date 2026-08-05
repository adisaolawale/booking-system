import { Home, CalendarCheck, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const DASHBOARD_NAV: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "My Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
  { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
];