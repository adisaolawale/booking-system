import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BusinessHeaderCompact } from "@/components/business/BusinessHeader";
import { AddToCalendarButton } from "@/components/booking/AddToCalendarButton";
import { to12h } from "@/lib/slots";

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { booking?: string };
}) {
  const { slug } = await params;
  const { booking: bookingId } = await searchParams;

  const business = await prisma.business.findUnique({ where: { slug } });
  if (!business) notFound();

  if (!bookingId) redirect(`/b/${slug}`);

  // Scoped to this business too, not just the id — a booking id alone
  // shouldn't be enough to pull up a confirmation on someone else's page.
  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, businessId: business.id },
    include: { service: true, user: true },
  });

  if (!booking) notFound();

  const formattedDate = booking.date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isoDate = booking.date.toISOString().slice(0, 10);

  return (
    <div className="flex min-h-screen w-full justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border p-6">
          <BusinessHeaderCompact slug={business.slug!} name={business.name} />
        </div>

        <div className="flex flex-col items-center p-8 text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
            <CheckCircle2 size={28} className="text-primary" />
          </div>

          <h1 className="mb-1.5 font-heading text-2xl font-semibold text-foreground">
            You&rsquo;re booked!
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            A confirmation was sent to {booking.user.email}.
          </p>

          <div className="mb-6 w-full rounded-xl bg-muted p-5 text-left">
            <p className="mb-1 font-heading text-base font-semibold text-foreground">
              {booking.service.title}
            </p>
            <p className="mb-3 font-mono text-sm text-muted-foreground">
              {formattedDate} &middot; {to12h(booking.startTime)}&ndash;{to12h(booking.endTime)}
            </p>

            <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">Price</span>
              <span className="font-mono text-foreground">
                ${(booking.service.price / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-xs capitalize text-accent-foreground">
                {booking.status.toLowerCase()}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <AddToCalendarButton
              title={`${booking.service.title} at ${business.name}`}
              date={isoDate}
              startTime={booking.startTime}
              endTime={booking.endTime}
            />

            <Link
              href={`/b/${business.slug}`}
              className="text-center text-sm text-muted-foreground hover:text-foreground"
            >
              Back to {business.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}