"use server";

import { prisma } from "@/lib/prisma";

export type SearchBusinessResult = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type SearchServiceResult = {
  id: string;
  title: string;
  price: number;
  duration: number;
  businessName: string;
  businessSlug: string;
};

export type SearchResults = {
  businesses: SearchBusinessResult[];
  services: SearchServiceResult[];
};

export async function searchAll(query: string): Promise<SearchResults> {
  const q = query.trim();
  if (!q) return { businesses: [], services: [] };

  const [businesses, services] = await Promise.all([
    prisma.business.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      select: { id: true, name: true, slug: true, description: true },
      take: 6,
    }),
    prisma.service.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        price: true,
        duration: true,
        business: { select: { name: true, slug: true } },
      },
      take: 6,
    }),
  ]);

  return {
    businesses: businesses.map((b) => ({
      id: b.id,
      name: b.name,
      slug: b.slug!,
      description: b.description,
    })),
    services: services.map((s) => ({
      id: s.id,
      title: s.title,
      price: s.price,
      duration: s.duration,
      businessName: s.business.name,
      businessSlug: s.business.slug!,
    })),
  };
}