import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BookingsList } from "@/components/dashboard/BookingsList";

export default async function BookingsPage() {
  const session = await auth();
  const userId = session!.user.id;

  const bookings = await prisma.booking.findMany({
    where: { userId },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    include: { service: true, business: true },
  });

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        My Bookings
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        View, manage, and cancel your appointments.
      </p>

      <BookingsList bookings={bookings} />
    </div>
  );
}