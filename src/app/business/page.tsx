import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CalendarClock,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { to12h } from "@/lib/slots";
import { STATUS_STYLES } from "@/lib/booking-status";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default async function BusinessHomePage() {
  const session = await auth();

  const business = await prisma.business.findFirst({
    where: { ownerId: session!.user.id },
    include: { services: true, availability: true },
  });

  // Shouldn't happen — registerUser always creates a Business for OWNER
  // signups — but a business owner with no business is a state this page
  // genuinely can't render anything meaningful for.
  if (!business) redirect("/dashboard");

  const now = new Date();
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);
  const endOfWeek = new Date(startOfToday);
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [todaysBookings, weekCount, monthBookings] = await Promise.all([
    prisma.booking.findMany({
      where: { businessId: business.id, date: { gte: startOfToday, lt: endOfToday } },
      orderBy: { startTime: "asc" },
      include: { service: true, user: true },
    }),
    prisma.booking.count({
      where: { businessId: business.id, date: { gte: startOfToday, lt: endOfWeek } },
    }),
    prisma.booking.findMany({
      where: {
        businessId: business.id,
        date: { gte: startOfMonth, lt: startOfNextMonth },
        status: { not: "CANCELLED" },
      },
      include: { service: { select: { price: true } } },
    }),
  ]);

  const monthRevenue = monthBookings.reduce((sum, b) => sum + b.service.price, 0);
  const hasServices = business.services.length > 0;
  const hasAvailability = business.availability.length > 0;
  const setupIncomplete = !hasServices || !hasAvailability;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="mb-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          {business.name}
        </h1>
        <p className="text-sm text-muted-foreground">Here&rsquo;s how things are looking.</p>
      </div>

      {setupIncomplete && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-2xl border border-primary/30 bg-accent/40 p-5">
          <h2 className="mb-3 font-heading text-sm font-semibold text-foreground">
            Finish setting up your business
          </h2>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/business/services"
              className="flex items-center gap-2.5 text-sm text-foreground transition-opacity hover:opacity-80"
            >
              {hasServices ? (
                <CheckCircle2 size={16} className="text-primary" />
              ) : (
                <Circle size={16} className="text-muted-foreground" />
              )}
              Add at least one service
            </Link>
            <Link
              href="/business/availability"
              className="flex items-center gap-2.5 text-sm text-foreground transition-opacity hover:opacity-80"
            >
              {hasAvailability ? (
                <CheckCircle2 size={16} className="text-primary" />
              ) : (
                <Circle size={16} className="text-muted-foreground" />
              )}
              Set your weekly availability
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-1 text-xs text-muted-foreground">Today</p>
          <p className="font-heading text-2xl font-semibold text-foreground">
            {todaysBookings.length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-1 text-xs text-muted-foreground">This week</p>
          <p className="font-heading text-2xl font-semibold text-foreground">{weekCount}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-1 text-xs text-muted-foreground">Services</p>
          <p className="font-heading text-2xl font-semibold text-foreground">
            {business.services.length}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-1 text-xs text-muted-foreground">Revenue (month)</p>
          <p className="font-heading text-2xl font-semibold text-foreground">
            ${(monthRevenue / 100).toFixed(0)}
          </p>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Today&rsquo;s schedule
          </h2>
          <Link
            href="/business/bookings"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>

        {todaysBookings.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-10 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <CalendarClock size={20} className="text-primary" />
            </div>
            <h3 className="mb-1 font-heading text-base font-semibold text-foreground">
              Nothing booked today
            </h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              New bookings will show up here as they come in.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {todaysBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xs font-semibold text-background">
                    {initials(booking.user.name ?? "Guest")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {booking.user.name ?? "Guest"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {booking.service.title}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="font-mono text-xs text-muted-foreground">
                    {to12h(booking.startTime)}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                      STATUS_STYLES[booking.status] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {booking.status.toLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}