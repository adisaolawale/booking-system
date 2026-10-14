// src/server/services/slug.ts
import type { Prisma } from "@/generated/prisma/client";
const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40) || "business";

export async function uniqueSlug(tx: Prisma.TransactionClient, name: string) {
  const base = slugify(name);
  for (let n = 0; n < 20; n++) {
    const slug = n === 0 ? base : `${base}-${n + 1}`;
    if (!(await tx.business.findUnique({ where: { slug } }))) return slug;
  }
  return `${base}-${Date.now().toString(36)}`;
}