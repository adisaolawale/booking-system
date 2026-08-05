import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const bookings = [
  { name: "Ava Martinez", service: "Deep Tissue Massage", time: "10:00 AM", status: "confirmed" as const },
  { name: "Liam Chen", service: "Vinyasa Flow", time: "11:30 AM", status: "confirmed" as const },
  { name: "Sofia Rossi", service: "1:1 Pilates", time: "1:00 PM", status: "pending" as const },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-15 sm:py-10">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Copy side — animates in once on load, nothing looping here */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              Booking software for services
            </span>
          </div>

          <h1 className="mb-6 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Book Services. <span className="text-primary">Anywhere</span>{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Anytime.</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-secondary/70" />
            </span>
          </h1>

          <p className="mb-8 max-w-md text-base text-muted-foreground sm:text-lg">
            Give clients a beautiful way to book you in seconds, and give
            yourself hours back every week. Real-time availability, instant
            confirmations, and zero double-bookings &mdash; all from one link.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="rounded-full bg-primary px-6 py-6 text-sm text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/register">
                Start for Free
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-border px-6 py-6 text-sm">
              <Link href="/book-a-service">Book a Service</Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            No credit card required &middot; Set up in minutes
          </p>
        </div>

        {/* Visual side */}
        <div className="relative animate-in fade-in slide-in-from-bottom-6 delay-150 duration-700">
          {/* Ambient glow using both brand colors — static, purely decorative */}
          <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-10 -right-6 h-56 w-56 rounded-full bg-secondary/60 blur-3xl" />

          <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-heading text-base font-semibold text-foreground">
                Today&rsquo;s Bookings
              </h3>
              <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                <CalendarCheck size={13} />
                Thu, Jul 31
              </span>
            </div>

            <div className="flex flex-col divide-y divide-border">
              {bookings.map((b) => (
                <div
                  key={b.name}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-xs font-semibold text-foreground">
                      {b.name.split(" ").map((w) => w[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{b.name}</p>
                      <p className="text-xs text-muted-foreground">{b.service}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-mono text-xs text-muted-foreground">{b.time}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        b.status === "confirmed"
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {b.status === "confirmed" ? "Confirmed" : "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The one continuous animation on this page — a gentle float,
              nothing else on the page loops or auto-plays. */}
          <div className="absolute -bottom-6 -left-6 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-lg animate-[float_6s_ease-in-out_infinite]">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15">
              <CheckCircle2 size={15} className="text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Booking confirmed</p>
              <p className="text-[11px] text-muted-foreground">Sofia just booked Pilates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




// import Link from "next/link";
// import { ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const bookings = [
//   { name: "Ava Martinez", service: "Deep Tissue Massage", time: "10:00 AM", status: "confirmed" as const },
//   { name: "Liam Chen", service: "Vinyasa Flow", time: "11:30 AM", status: "confirmed" as const },
//   { name: "Sofia Rossi", service: "1:1 Pilates", time: "1:00 PM", status: "pending" as const },
// ];

// export function Hero() {
//   return (
//     <section className="relative overflow-hidden bg-background px-4 py-20 sm:py-28">
//       <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
//         {/* Copy side — animates in once on load, nothing looping here */}
//         <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
//           <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5">
//             <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//             <span className="text-xs font-medium text-muted-foreground">
//               Booking software for services
//             </span>
//           </div>

//           <h1 className="mb-6 font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
//             Book Services. <span className="text-primary">Anywhere</span>{" "}
//             <span className="relative inline-block">
//               <span className="relative z-10">Anytime.</span>
//               <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-secondary/70" />
//             </span>
//           </h1>

//           <p className="mb-8 max-w-md text-base text-muted-foreground sm:text-lg">
//             Give clients a beautiful way to book you in seconds, and give
//             yourself hours back every week. Real-time availability, instant
//             confirmations, and zero double-bookings &mdash; all from one link.
//           </p>

//           <div className="flex flex-wrap items-center gap-3">
//             <Button
//               asChild
//               className="rounded-full bg-primary px-6 py-6 text-sm text-primary-foreground hover:bg-primary/90"
//             >
//               <Link href="/register">
//                 Start for Free
//                 <ArrowRight size={16} />
//               </Link>
//             </Button>
//             <Button asChild variant="outline" className="rounded-full border-border px-6 py-6 text-sm">
//               <Link href="/book-a-service">Book a Service</Link>
//             </Button>
//           </div>

//           <p className="mt-4 text-xs text-muted-foreground">
//             No credit card required &middot; Set up in minutes
//           </p>
//         </div>

//         {/* Visual side */}
//         <div className="relative animate-in fade-in slide-in-from-bottom-6 delay-150 duration-700">
//           {/* Ambient glow using both brand colors — static, purely decorative */}
//           <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
//           <div className="absolute -bottom-10 -right-6 h-56 w-56 rounded-full bg-secondary/60 blur-3xl" />

//           <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl">
//             <div className="mb-5 flex items-center justify-between">
//               <h3 className="font-heading text-base font-semibold text-foreground">
//                 Today&rsquo;s Bookings
//               </h3>
//               <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
//                 <CalendarCheck size={13} />
//                 Thu, Jul 31
//               </span>
//             </div>

//             <div className="flex flex-col divide-y divide-border">
//               {bookings.map((b) => (
//                 <div
//                   key={b.name}
//                   className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-heading text-xs font-semibold text-foreground">
//                       {b.name.split(" ").map((w) => w[0]).join("")}
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-foreground">{b.name}</p>
//                       <p className="text-xs text-muted-foreground">{b.service}</p>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end gap-1">
//                     <span className="font-mono text-xs text-muted-foreground">{b.time}</span>
//                     <span
//                       className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
//                         b.status === "confirmed"
//                           ? "bg-accent text-accent-foreground"
//                           : "bg-secondary text-secondary-foreground"
//                       }`}
//                     >
//                       {b.status === "confirmed" ? "Confirmed" : "Pending"}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* The one continuous animation on this page — a gentle float,
//               nothing else on the page loops or auto-plays. */}
//           <div className="absolute -bottom-6 -left-6 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-lg animate-[float_6s_ease-in-out_infinite]">
//             <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15">
//               <CheckCircle2 size={15} className="text-primary" />
//             </div>
//             <div>
//               <p className="text-xs font-medium text-foreground">Booking confirmed</p>
//               <p className="text-[11px] text-muted-foreground">Sofia just booked Pilates</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }