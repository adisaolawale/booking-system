import { prisma } from "@/lib/prisma";

export async function createService(data: any) {
  return prisma.service.create({
    data,
  });
}

export async function getServices(businessId: string) {
  return prisma.service.findMany({
    where: { businessId },
  });
}