"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { registerUser, type RegisterState } from "@/lib/actions/register";
import { signInWithGoogle } from "@/lib/actions/oauth";

type Audience = "customer" | "business";
type Category = { id: string; name: string };

export function RegisterForm({
  initialTab = "customer",
  categories,
}: {
  initialTab?: Audience;
  categories: Category[];
}) {
  const [tab, setTab] = useState<Audience>(initialTab);
  const [categoryId, setCategoryId] = useState("");
  const initialState: RegisterState = {};
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-8 flex justify-center">
        <div className="relative inline-flex rounded-full border border-border bg-muted p-1">
          <span
            aria-hidden
            className={`absolute inset-y-1 left-1 w-28 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              tab === "business" ? "translate-x-28" : "translate-x-0"
            }`}
          />
          <button
            type="button"
            onClick={() => setTab("customer")}
            className={`relative z-10 w-28 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              tab === "customer"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setTab("business")}
            className={`relative z-10 w-28 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              tab === "business"
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Business
          </button>
        </div>
      </div>

      <div className="mb-6 text-center">
        <h1 className="mb-1.5 font-heading text-2xl font-semibold text-foreground">
          {tab === "customer" ? "Create your account" : "Register your business"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {tab === "customer"
            ? "Book services in seconds, from anywhere."
            : "Set up your profile and start taking bookings today."}
        </p>
      </div>

      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="mb-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <GoogleIcon size={18} />
          Continue with Google
        </button>
      </form>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or continue with email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form
        key={tab}
        action={formAction}
        className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        <input type="hidden" name="tab" value={tab} />

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" name="name" placeholder="Jane Doe" required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
        </div>

        {tab === "business" && (
          <>
            <div className="my-1 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium text-muted-foreground">
                Business details
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="businessName">Business name</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="e.g. Lumen Yoga Studio"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Select
                name="categoryId"
                value={categoryId}
                onValueChange={setCategoryId}
                required
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="What kind of business is this?" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="businessDescription">Business description</Label>
              <Textarea
                id="businessDescription"
                name="businessDescription"
                placeholder="What do you offer, and who's it for?"
                rows={3}
              />
            </div>
          </>
        )}

        {state.error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        )}

        <Button
          type="submit"
          className="mt-2 w-full rounded-xl bg-primary py-6 text-sm text-primary-foreground hover:bg-primary/90"
        >
          {tab === "customer" ? "Create account" : "Register business"}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}


// "use client";

// import { useActionState, useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { GoogleIcon } from "@/components/icons/GoogleIcon";
// import { registerUser, type RegisterState } from "@/lib/actions/register";
// import { signInWithGoogle } from "@/lib/actions/oauth";

// type Audience = "customer" | "business";

// export function RegisterForm({ initialTab = "customer" }: { initialTab?: Audience }) {
//   const [tab, setTab] = useState<Audience>(initialTab);
//   const initialState: RegisterState = {};
//   const [state, formAction] = useActionState(registerUser, initialState);

//   return (
//     <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
//       <div className="mb-8 flex justify-center">
//         <div className="relative inline-flex rounded-full border border-border bg-muted p-1">
//           <span
//             aria-hidden
//             className={`absolute inset-y-1 left-1 w-28 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
//               tab === "business" ? "translate-x-28" : "translate-x-0"
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setTab("customer")}
//             className={`relative z-10 w-28 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
//               tab === "customer"
//                 ? "text-primary-foreground"
//                 : "text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             Customer
//           </button>
//           <button
//             type="button"
//             onClick={() => setTab("business")}
//             className={`relative z-10 w-28 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
//               tab === "business"
//                 ? "text-primary-foreground"
//                 : "text-muted-foreground hover:text-foreground"
//             }`}
//           >
//             Business
//           </button>
//         </div>
//       </div>

//       <div className="mb-6 text-center">
//         <h1 className="mb-1.5 font-heading text-2xl font-semibold text-foreground">
//           {tab === "customer" ? "Create your account" : "Register your business"}
//         </h1>
//         <p className="text-sm text-muted-foreground">
//           {tab === "customer"
//             ? "Book services in seconds, from anywhere."
//             : "Set up your profile and start taking bookings today."}
//         </p>
//       </div>

//       <form action={signInWithGoogle}>
//         <button
//           type="submit"
//           className="mb-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
//         >
//           <GoogleIcon size={18} />
//           Continue with Google
//         </button>
//       </form>

//       <div className="mb-6 flex items-center gap-3">
//         <div className="h-px flex-1 bg-border" />
//         <span className="text-xs text-muted-foreground">or continue with email</span>
//         <div className="h-px flex-1 bg-border" />
//       </div>

//       <form
//         key={tab}
//         action={formAction}
//         className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
//       >
//         <input type="hidden" name="tab" value={tab} />

//         <div className="flex flex-col gap-1.5">
//           <Label htmlFor="name">Full name</Label>
//           <Input id="name" name="name" placeholder="Jane Doe" required />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <Label htmlFor="email">Email</Label>
//           <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             name="password"
//             type="password"
//             placeholder="At least 8 characters"
//             minLength={8}
//             required
//           />
//         </div>

//         {tab === "business" && (
//           <>
//             <div className="my-1 flex items-center gap-3">
//               <div className="h-px flex-1 bg-border" />
//               <span className="text-xs font-medium text-muted-foreground">
//                 Business details
//               </span>
//               <div className="h-px flex-1 bg-border" />
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label htmlFor="businessName">Business name</Label>
//               <Input
//                 id="businessName"
//                 name="businessName"
//                 placeholder="e.g. Lumen Yoga Studio"
//                 required
//               />
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label htmlFor="businessDescription">Business description</Label>
//               <Textarea
//                 id="businessDescription"
//                 name="businessDescription"
//                 placeholder="What do you offer, and who's it for?"
//                 rows={3}
//               />
//             </div>
//           </>
//         )}

//         {state.error && (
//           <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
//             {state.error}
//           </p>
//         )}

//         <Button
//           type="submit"
//           className="mt-2 w-full rounded-xl bg-primary py-6 text-sm text-primary-foreground hover:bg-primary/90"
//         >
//           {tab === "customer" ? "Create account" : "Register business"}
//         </Button>
//       </form>

//       <p className="mt-6 text-center text-xs text-muted-foreground">
//         By continuing, you agree to our{" "}
//         <Link href="/terms" className="underline hover:text-foreground">
//           Terms of Service
//         </Link>{" "}
//         and{" "}
//         <Link href="/privacy" className="underline hover:text-foreground">
//           Privacy Policy
//         </Link>
//         .
//       </p>
//     </div>
//   );
// }