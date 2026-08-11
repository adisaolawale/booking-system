"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createService, updateService, type ServiceFormState } from "@/lib/actions/services";
import type { Service } from "@/src/generated/prisma";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
    >
      {pending ? "Saving\u2026" : label}
    </Button>
  );
}

export function ServiceFormDialog({ service }: { service?: Service }) {
  const [open, setOpen] = useState(false);
  const isEdit = !!service;
  const initialState: ServiceFormState = {};

  const action = isEdit ? updateService.bind(null, service!.id) : createService;
  const [state, formAction] = useActionState(action, initialState);

  // Auto-close on a successful save, but not on initial mount — this
  // effect fires once when the component first renders too, before any
  // submission has happened.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!state.error) setOpen(false);
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <button
            type="button"
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            Edit
          </button>
        ) : (
          <Button className="gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus size={15} />
            Add service
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit service" : "Add a service"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details customers see when booking."
              : "This will appear on your public booking page right away."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Service name</Label>
            <Input
              id="title"
              name="title"
              defaultValue={service?.title}
              placeholder="e.g. Signature Haircut"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                defaultValue={service ? (service.price / 100).toFixed(2) : undefined}
                placeholder="45.00"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="duration">Duration (min)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                defaultValue={service?.duration}
                placeholder="45"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={service?.description ?? ""}
              placeholder="What's included, and who it's for?"
              rows={3}
            />
          </div>

          {state.error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}

          <DialogFooter>
            <SubmitButton label={isEdit ? "Save changes" : "Add service"} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}