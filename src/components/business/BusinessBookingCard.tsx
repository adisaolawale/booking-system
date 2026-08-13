"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Loader2, Mail } from "lucide-react";
import type { Booking, Service, Business, User } from "@/generated/prisma";
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
import { to12h } from "@/lib/slots";
import { STATUS_STYLES } from "@/lib/booking-status";
import { updateBookingStatus } from "@/lib/actions/business-bookings";

type BookingWithRelations = Booking & { service: Service; business: Business; user: User };

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

export function BusinessBookingCard({
  booking,
  isPast,
}: {
  booking: BookingWithRelations;
  isPast: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function updateStatus(status: "CONFIRMED" | "CANCELLED" | "PENDING") {
    startTransition(async () => {
      await updateBookingStatus(booking.id, status);
      router.refresh();
    });
  }

  const showConfirmDecline = booking.status === "PENDING" && !isPast;
  const showCancel = booking.status === "CONFIRMED" && !isPast;
  const showComplete = booking.status === "CONFIRMED" && isPast;
  const hasActions = showConfirmDecline || showCancel || showComplete;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xs font-semibold text-background">
            {initials(booking.user.name ?? "Guest")}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {booking.user.name ?? "Guest"}
            </p>
            <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
              <Mail size={11} />
              {booking.user.email}
            </p>
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

      <div className="mt-3 border-t border-border pt-3">
        <p className="text-sm text-foreground">{booking.service.title}</p>
        {booking.notes && (
          <p className="mt-1 text-xs text-muted-foreground">&ldquo;{booking.notes}&rdquo;</p>
        )}
      </div>

      {hasActions && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          {showConfirmDecline && (
            <>
              <button
                type="button"
                onClick={() => updateStatus("CONFIRMED")}
                disabled={isPending}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {isPending ? <Loader2 size={14} className="animate-spin" /> : "Confirm"}
              </button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    Decline
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Decline this booking?</AlertDialogTitle>
                    <AlertDialogDescription>
                      {booking.service.title} for {booking.user.name ?? "this customer"} on{" "}
                      {formatDate(booking.date)}. This can&rsquo;t be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep pending</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => updateStatus("CANCELLED")}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Decline booking
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}

          {showCancel && (
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
                    {booking.service.title} for {booking.user.name ?? "this customer"} on{" "}
                    {formatDate(booking.date)}. This can&rsquo;t be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep booking</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => updateStatus("CANCELLED")}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Cancel booking
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {showComplete && (
            <button
              type="button"
              onClick={() => updateStatus("CONFIRMED")}
              disabled={isPending}
              className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : "Mark as confirmed"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}