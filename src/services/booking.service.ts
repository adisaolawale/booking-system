import { prisma } from "@/lib/prisma"


export async function createBooking(data) {
  return prisma.booking.create({
    data,
  });
}