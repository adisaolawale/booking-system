"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type NextStatus = "CONFIRMED" | "CANCELLED" | "PENDING";

export async function updateBookingStatus(bookingId: string, status: NextStatus) {
  const session = await auth();
  if (!session || session.user.role !== "OWNER") {
    throw new Error("Not authorized");
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { business: true },
  });

  // Ownership check — confirms this booking belongs to a business this
  // user actually owns, not just that they're some business owner.
  if (!booking || booking.business.ownerId !== session.user.id) {
    throw new Error("Booking not found");
  }

  await prisma.booking.update({ where: { id: bookingId }, data: { status } });

  revalidatePath("/business/bookings");
  revalidatePath("/business");
}