import { prisma } from "@/lib/prisma";

export async function getAvailability(businessId: string) {
  return prisma.availability.findMany({
    where: { businessId },
  });
}