import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/homepage/Reveal";

const features = ["Add your services", "Set availability", "Get paid"];

export function BusinessCTA() {
  return (
    <section className="bg-background px-4 py-10 sm:py-15">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center sm:px-14 sm:py-16">
          {/* Ambient glow — same dual-color treatment as the hero, just
              inverted since the banner itself is now the solid teal. */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="text-xs font-medium text-primary-foreground">
                For business owners
              </span>
            </div>

            <h2 className="mb-6 font-heading text-3xl font-semibold text-primary-foreground sm:text-4xl">
              Own a business? Start getting bookings today.
            </h2>

            <div className="mb-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-secondary" />
                  <span className="text-sm font-medium text-primary-foreground/90">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="rounded-full bg-primary-foreground px-7 py-6 text-sm font-semibold text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/register?as=business">
                Register your business
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}



// import Link from "next/link";
// import { CheckCircle2, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Reveal } from "@/components/marketing/Reveal";

// const features = ["Add your services", "Set availability", "Get paid"];

// export function BusinessCTA() {
//   return (
//     <section className="bg-background px-4 py-20 sm:py-28">
//       <Reveal className="mx-auto max-w-6xl">
//         <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center sm:px-14 sm:py-16">
//           {/* Ambient glow — same dual-color treatment as the hero, just
//               inverted since the banner itself is now the solid teal. */}
//           <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
//           <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />

//           <div className="relative mx-auto max-w-2xl">
//             <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5">
//               <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
//               <span className="text-xs font-medium text-primary-foreground">
//                 For business owners
//               </span>
//             </div>

//             <h2 className="mb-6 font-heading text-3xl font-semibold text-primary-foreground sm:text-4xl">
//               Own a business? Start getting bookings today.
//             </h2>

//             <div className="mb-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
//               {features.map((feature) => (
//                 <div key={feature} className="flex items-center gap-2">
//                   <CheckCircle2 size={17} className="text-secondary" />
//                   <span className="text-sm font-medium text-primary-foreground/90">
//                     {feature}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <Button
//               asChild
//               className="rounded-full bg-primary-foreground px-7 py-6 text-sm font-semibold text-primary hover:bg-primary-foreground/90"
//             >
//               <Link href="/register?as=business">
//                 Register your business
//                 <ArrowRight size={16} />
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </Reveal>
//     </section>
//   );
// }