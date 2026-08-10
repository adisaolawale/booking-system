"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking, type DetailsFormState } from "@/lib/actions/booking";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-primary py-6 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
    >
      {pending ? "Confirming\u2026" : "Confirm booking"}
    </Button>
  );
}

export function DetailsForm({
  slug,
  businessId,
  serviceId,
  date,
  time,
  user,
}: {
  slug: string;
  businessId: string;
  serviceId: string;
  date: string;
  time: string;
  user: { name: string | null; email: string } | null;
}) {
  const initialState: DetailsFormState = {};
  const [state, formAction] = useActionState(createBooking, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="businessId" value={businessId} />
      <input type="hidden" name="serviceId" value={serviceId} />
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="time" value={time} />

      {user ? (
        <div className="rounded-lg bg-muted px-3 py-2.5 text-sm text-foreground">
          Booking as <span className="font-medium">{user.name}</span>{" "}
          <span className="text-muted-foreground">({user.email})</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" placeholder="Jane Doe" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
          </div>
        </>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Anything the business should know?"
          rows={3}
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}




// "use client";

// import { useActionState } from "react";
// import { useFormStatus } from "react-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { createBooking, type DetailsFormState } from "@/lib/actions/booking";

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button
//       type="submit"
//       disabled={pending}
//       className="w-full rounded-xl bg-primary py-6 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
//     >
//       {pending ? "Confirming\u2026" : "Confirm booking"}
//     </Button>
//   );
// }

// export function DetailsForm({
//   slug,
//   businessId,
//   serviceId,
//   date,
//   time,
// }: {
//   slug: string;
//   businessId: string;
//   serviceId: string;
//   date: string;
//   time: string;
// }) {
//   const initialState: DetailsFormState = {};
//   const [state, formAction] = useActionState(createBooking, initialState);

//   return (
//     <form action={formAction} className="flex flex-col gap-4">
//       <input type="hidden" name="slug" value={slug} />
//       <input type="hidden" name="businessId" value={businessId} />
//       <input type="hidden" name="serviceId" value={serviceId} />
//       <input type="hidden" name="date" value={date} />
//       <input type="hidden" name="time" value={time} />

//       <div className="flex flex-col gap-1.5">
//         <Label htmlFor="name">Full name</Label>
//         <Input id="name" name="name" placeholder="Jane Doe" required />
//       </div>

//       <div className="flex flex-col gap-1.5">
//         <Label htmlFor="email">Email</Label>
//         <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
//       </div>

//       <div className="flex flex-col gap-1.5">
//         <Label htmlFor="notes">Notes (optional)</Label>
//         <Textarea
//           id="notes"
//           name="notes"
//           placeholder="Anything the business should know?"
//           rows={3}
//         />
//       </div>

//       {state.error && (
//         <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
//           {state.error}
//         </p>
//       )}

//       <SubmitButton />
//     </form>
//   );
// }