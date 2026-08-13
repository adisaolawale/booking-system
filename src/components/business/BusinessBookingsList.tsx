"use client";

import { useMemo, useState } from "react";
import type { Booking, Service, Business, User } from "@/generated/prisma";
import { BusinessBookingCard } from "@/components/business/BusinessBookingCard";

type BookingWithRelations = Booking & { service: Service; business: Business; user: User };
type Tab = "upcoming" | "past";

export function BusinessBookingsList({ bookings }: { bookings: BookingWithRelations[] }) {
  const [tab, setTab] = useState<Tab>("upcoming");

  const { upcoming, past } = useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const upcoming: BookingWithRelations[] = [];
    const past: BookingWithRelations[] = [];

    for (const b of bookings) {
      if (new Date(b.date) >= startOfToday) upcoming.push(b);
      else past.push(b);
    }

    return { upcoming, past: past.slice().reverse() };
  }, [bookings]);

  const pendingCount = upcoming.filter((b) => b.status === "PENDING").length;
  const list = tab === "upcoming" ? upcoming : past;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
        <div className="relative inline-flex rounded-full border border-border bg-muted p-1">
          <span
            aria-hidden
            className={`absolute inset-y-1 left-1 w-28 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              tab === "past" ? "translate-x-28" : "translate-x-0"
            }`}
          />
          <button
            type="button"
            onClick={() => setTab("upcoming")}
            className={`relative z-10 w-28 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              tab === "upcoming"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setTab("past")}
            className={`relative z-10 w-28 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              tab === "past"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Past
          </button>
        </div>

        {pendingCount > 0 && (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {pendingCount} pending
          </span>
        )}
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            {tab === "upcoming" ? "No upcoming bookings." : "No past bookings yet."}
          </p>
        </div>
      ) : (
        <div
          key={tab}
          className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          {list.map((booking) => (
            <BusinessBookingCard key={booking.id} booking={booking} isPast={tab === "past"} />
          ))}
        </div>
      )}
    </div>
  );
}