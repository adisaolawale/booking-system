import { prisma } from "@/lib/prisma"


export async function createBooking(data: any) {
  return prisma.booking.create({
    data,
  });
}