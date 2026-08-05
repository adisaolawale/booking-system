import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BusinessHeaderCompact } from "@/components/business/BusinessHeader";
import { BookingFlow } from "@/components/booking/BookingFlow";

export default async function BookPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { service?: string };
}) {
  const { slug } = await params;
  const { service: serviceId } = await searchParams;

  const business = await prisma.business.findUnique({
    where: { slug },
    include: {
      availability: true,
      services: true,
      bookings: { include: { service: true } },
    },
  });

  if (!business) notFound();

  const service = business.services.find((s) => s.id === serviceId);
  if (!service) redirect(`/b/${slug}/services`);

  const availability = business.availability.map((a) => ({
    dayOfWeek: a.dayOfWeek,
    startTime: a.startTime,
    endTime: a.endTime,
  }));

  const bookings = business.bookings.map((b) => ({
    date: b.date.toISOString(),
    startTime: b.startTime,
    duration: b.service.duration,
  }));

  return (
    <div className="flex min-h-screen w-full justify-center bg-background px-4 py-12">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-6">
          <BusinessHeaderCompact slug={business.slug!} name={business.name} />
          <span className="font-mono text-xs text-muted-foreground">
            {service.title} &middot; ${(service.price / 100).toFixed(2)} &middot; {service.duration} min
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <h1 className="mb-6 font-heading text-2xl font-semibold text-foreground">
            Book Appointment
          </h1>

          <BookingFlow
            slug={business.slug!}
            serviceId={service.id}
            durationMinutes={service.duration}
            availability={availability}
            bookings={bookings}
          />
        </div>
      </div>
    </div>
  );
}