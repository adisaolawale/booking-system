import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BusinessBookingsList } from "@/components/business/BusinessBookingsList";

export default async function BusinessBookingsPage() {
  const session = await auth();

  const business = await prisma.business.findFirst({
    where: { ownerId: session!.user.id },
  });

  if (!business) redirect("/dashboard");

  const bookings = await prisma.booking.findMany({
    where: { businessId: business.id },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    include: { service: true, business: true, user: true },
  });

  return (
    <div>
      <h1 className="mb-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
        Bookings
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Confirm, decline, or manage bookings for {business.name}.
      </p>

      <BusinessBookingsList bookings={bookings} />
    </div>
  );
}