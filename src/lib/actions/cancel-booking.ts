"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function cancelBooking(bookingId: string) {
  const session = await auth();
  if (!session) throw new Error("Not authenticated");

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });

  // Ownership check — a booking id alone isn't enough to cancel it.
  if (!booking || booking.userId !== session.user.id) {
    throw new Error("Booking not found");
  }

//   if (booking.status === "CANCELLED" || booking.status === "COMPLETED") {
//     return; // nothing to do, already in a terminal state
//   }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/dashboard/bookings");
  revalidatePath("/dashboard");
}