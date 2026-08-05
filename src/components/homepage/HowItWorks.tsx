"use client";

import { useEffect, useRef, useState } from "react";
import { Search, UserCheck, CalendarCheck, Building2, Settings2, CalendarPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Audience = "customers" | "business";

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const STEPS: Record<Audience, Step[]> = {
  customers: [
    {
      icon: Search,
      title: "Search for a service",
      description: "Find studios and providers near you in seconds.",
    },
    {
      icon: UserCheck,
      title: "Choose a provider",
      description: "Compare availability, pricing, and services at a glance.",
    },
    {
      icon: CalendarCheck,
      title: "Book instantly",
      description: "Confirm your spot with real-time availability \u2014 no back and forth.",
    },
  ],
  business: [
    {
      icon: Building2,
      title: "Register your business",
      description: "Create your free profile and get your own booking link.",
    },
    {
      icon: Settings2,
      title: "Set services & availability",
      description: "Add what you offer and when you\u2019re open for business.",
    },
    {
      icon: CalendarPlus,
      title: "Get bookings",
      description: "Clients book themselves in \u2014 you just show up.",
    },
  ],
};

const CYCLE_MS = 20000;

export function HowItWorks() {
  const [active, setActive] = useState<Audience>("customers");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Only auto-cycle while the section is actually on screen.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Resets on every change of `active` (auto or manual click), so a manual
  // click always buys a fresh 5s dwell instead of flipping back immediately.
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActive((a) => (a === "customers" ? "business" : "customers"));
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [inView, active]);

  const steps = STEPS[active];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="border-t border-border bg-background px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="mb-3 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            How BookEase works
          </h2>
          <p className="text-base text-muted-foreground">
            Whether you&rsquo;re booking or being booked, it only takes three steps.
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="relative inline-flex rounded-full border border-border bg-muted p-1">
            {/* The sliding thumb — same width as each button, so translating
                it by exactly one button-width lands it perfectly on the
                other option. This is the only thing that moves; the buttons
                themselves never change background, only their text color. */}
            <span
              aria-hidden
              className={`absolute inset-y-1 left-1 w-32 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                active === "business" ? "translate-x-32" : "translate-x-0"
              }`}
            />
            <button
              type="button"
              onClick={() => setActive("customers")}
              className={`relative z-10 w-32 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                active === "customers"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Customers
            </button>
            <button
              type="button"
              onClick={() => setActive("business")}
              className={`relative z-10 w-32 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                active === "business"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Businesses
            </button>
          </div>
        </div>

        {/* key={active} forces a remount on switch so the entrance
            animation replays each time the audience changes. */}
        <div
          key={active}
          className="grid gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 sm:grid-cols-3"
        >
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                  <step.icon size={20} className="text-primary" />
                </div>
                <span className="font-heading text-2xl font-semibold text-muted-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-1.5 font-heading text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Search, UserCheck, CalendarCheck, Building2, Settings2, CalendarPlus } from "lucide-react";
// import type { LucideIcon } from "lucide-react";

// type Audience = "customers" | "business";

// type Step = {
//   icon: LucideIcon;
//   title: string;
//   description: string;
// };

// const STEPS: Record<Audience, Step[]> = {
//   customers: [
//     {
//       icon: Search,
//       title: "Search for a service",
//       description: "Find studios and providers near you in seconds.",
//     },
//     {
//       icon: UserCheck,
//       title: "Choose a provider",
//       description: "Compare availability, pricing, and services at a glance.",
//     },
//     {
//       icon: CalendarCheck,
//       title: "Book instantly",
//       description: "Confirm your spot with real-time availability \u2014 no back and forth.",
//     },
//   ],
//   business: [
//     {
//       icon: Building2,
//       title: "Register your business",
//       description: "Create your free profile and get your own booking link.",
//     },
//     {
//       icon: Settings2,
//       title: "Set services & availability",
//       description: "Add what you offer and when you\u2019re open for business.",
//     },
//     {
//       icon: CalendarPlus,
//       title: "Get bookings",
//       description: "Clients book themselves in \u2014 you just show up.",
//     },
//   ],
// };

// const CYCLE_MS = 20000;

// export function HowItWorks() {
//   const [active, setActive] = useState<Audience>("customers");
//   const [inView, setInView] = useState(false);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   // Only auto-cycle while the section is actually on screen.
//   useEffect(() => {
//     const node = sectionRef.current;
//     if (!node) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       { threshold: 0.4 }
//     );
//     observer.observe(node);
//     return () => observer.disconnect();
//   }, []);

//   // Resets on every change of `active` (auto or manual click), so a manual
//   // click always buys a fresh 5s dwell instead of flipping back immediately.
//   useEffect(() => {
//     if (!inView) return;
//     const id = setInterval(() => {
//       setActive((a) => (a === "customers" ? "business" : "customers"));
//     }, CYCLE_MS);
//     return () => clearInterval(id);
//   }, [inView, active]);

//   const steps = STEPS[active];

//   return (
//     <section
//       id="how-it-works"
//       ref={sectionRef}
//       className="border-t border-border bg-background px-4 py-10 sm:py-28"
//     >
//       <div className="mx-auto max-w-6xl">
//         <div className="mx-auto mb-10 max-w-xl text-center">
//           <h2 className="mb-3 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
//             How BookEase works
//           </h2>
//           <p className="text-base text-muted-foreground">
//             Whether you&rsquo;re booking or being booked, it only takes three steps.
//           </p>
//         </div>

//         <div className="mb-12 flex justify-center">
//           <div className="inline-flex rounded-full border border-border bg-muted p-1">
//             <button
//               type="button"
//               onClick={() => setActive("customers")}
//               className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
//                 active === "customers"
//                   ? "bg-primary text-primary-foreground"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               Customers
//             </button>
//             <button
//               type="button"
//               onClick={() => setActive("business")}
//               className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
//                 active === "business"
//                   ? "bg-primary text-primary-foreground"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               Businesses
//             </button>
//           </div>
//         </div>

//         {/* key={active} forces a remount on switch so the entrance
//             animation replays each time the audience changes. */}
//         <div
//           key={active}
//           className="grid gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 sm:grid-cols-3"
//         >
//           {steps.map((step, index) => (
//             <div
//               key={step.title}
//               className="relative rounded-2xl border border-border bg-card p-6"
//             >
//               <div className="mb-5 flex items-center justify-between">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
//                   <step.icon size={20} className="text-primary" />
//                 </div>
//                 <span className="font-heading text-2xl font-semibold text-muted-foreground/40">
//                   {String(index + 1).padStart(2, "0")}
//                 </span>
//               </div>
//               <h3 className="mb-1.5 font-heading text-lg font-semibold text-foreground">
//                 {step.title}
//               </h3>
//               <p className="text-sm text-muted-foreground">{step.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }