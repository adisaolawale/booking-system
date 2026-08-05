import { prisma } from "@/lib/prisma";

export async function createService(data: {
  name: string;
  price: number;
  duration: number;
  businessId: string;
}) {
  return prisma.service.create({
    data,
  });
}

export async function getServices(businessId: string) {
  return prisma.service.findMany({
    where: { businessId },
  });
}