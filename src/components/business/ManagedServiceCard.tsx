"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { Service } from "@/generated/prisma";
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
import { ServiceFormDialog } from "@/components/business/ServiceFormDialog";
import { deleteService, reactivateService } from "@/lib/actions/services";

export function ManagedServiceCard({ service }: { service: Service }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await deleteService(service.id);
      router.refresh();
    });
  }

  function handleReactivate() {
    startTransition(async () => {
      await reactivateService(service.id);
      router.refresh();
    });
  }

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border p-5 ${
        service.isActive ? "border-border bg-card" : "border-dashed border-border bg-muted/40"
      }`}
    >
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <h3 className="truncate font-heading text-base font-semibold text-foreground">
            {service.title}
          </h3>
          {!service.isActive && (
            <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Archived
            </span>
          )}
        </div>
        {service.description && (
          <p className="mb-1 truncate text-sm text-muted-foreground">{service.description}</p>
        )}
        <span className="font-mono text-xs text-muted-foreground">
          ${(service.price / 100).toFixed(2)} &middot; {service.duration} min
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {service.isActive ? (
          <>
            <ServiceFormDialog service={service} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  Remove
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove &ldquo;{service.title}&rdquo;?</AlertDialogTitle>
                  <AlertDialogDescription>
                    If this service has no bookings, it&rsquo;s deleted permanently. If it
                    does, it&rsquo;s archived instead &mdash; hidden from your booking page but
                    kept so past bookings still make sense.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep it</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isPending}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isPending ? <Loader2 size={14} className="animate-spin" /> : "Remove"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <button
            type="button"
            onClick={handleReactivate}
            disabled={isPending}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
          >
            {isPending ? <Loader2 size={14} className="animate-spin" /> : "Reactivate"}
          </button>
        )}
      </div>
    </div>
  );
}