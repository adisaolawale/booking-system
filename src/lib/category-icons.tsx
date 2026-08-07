import {
  Scissors,
  Sparkles,
  Flower2,
  PersonStanding,
  Dumbbell,
  GraduationCap,
  Briefcase,
  Camera,
  PawPrint,
  Wrench,
  HeartPulse,
  PartyPopper,
  Tag,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Scissors,
  Sparkles,
  Flower2,
  PersonStanding,
  Dumbbell,
  GraduationCap,
  Briefcase,
  Camera,
  PawPrint,
  Wrench,
  HeartPulse,
  PartyPopper,
};

export function CategoryIcon({
  name,
  ...props
}: { name: string | null } & LucideProps) {
  const Icon = (name && CATEGORY_ICONS[name]) || Tag;
  return <Icon {...props} />;
}