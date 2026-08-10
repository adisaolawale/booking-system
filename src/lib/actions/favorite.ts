"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function toggleFavorite(businessId: string, slug: string) {
  const session = await auth();
  // FavoriteButton never calls this while logged out — it renders a plain
  // link to /login instead — but guard here too since server actions are
  // reachable directly, not just through the component that calls them.
  if (!session) return;

  const existing = await prisma.favorite.findUnique({
    where: { userId_businessId: { userId: session.user.id, businessId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
  } else {
    await prisma.favorite.create({
      data: { userId: session.user.id, businessId },
    });
  }

  revalidatePath(`/b/${slug}`);
  revalidatePath("/dashboard/favorites");
}