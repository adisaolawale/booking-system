"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarClock, Loader2 } from "lucide-react";
import type { Booking, Service, Business } from "@/generated/prisma";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddToCalendarButton } from "@/components/booking/AddToCalendarButton";
import { to12h } from "@/lib/slots";
import { STATUS_STYLES } from "@/lib/booking-status";
import { cancelBooking } from "@/lib/actions/cancel-booking";

type BookingWithRelations = Booking & { service: Service; business: Business };

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BookingCard({ booking }: { booking: BookingWithRelations }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isCancellable = booking.status !== "CANCELLED"  // && booking.status !== "COMPLETED";

  function handleCancel() {
    startTransition(async () => {
      await cancelBooking(booking.id);
      router.refresh();
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xs font-semibold text-background">
            {initials(booking.business.name)}
          </div>
          <div className="min-w-0">
            <Link
              href={`/b/${booking.business.slug}`}
              className="block truncate text-sm font-medium text-foreground hover:underline"
            >
              {booking.service.title}
            </Link>
            <p className="truncate text-xs text-muted-foreground">{booking.business.name}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <CalendarClock size={12} />
            {formatDate(booking.date)} &middot; {to12h(booking.startTime)}
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

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <AddToCalendarButton
          title={`${booking.service.title} at ${booking.business.name}`}
          date={new Date(booking.date).toISOString().slice(0, 10)}
          startTime={booking.startTime}
          endTime={booking.endTime}
        />

        {isCancellable && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                Cancel booking
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                <AlertDialogDescription>
                  {booking.service.title} at {booking.business.name} on{" "}
                  {formatDate(booking.date)} &middot; {to12h(booking.startTime)}. This can&rsquo;t
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep booking</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancel}
                  disabled={isPending}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isPending ? <Loader2 size={14} className="animate-spin" /> : "Cancel booking"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}