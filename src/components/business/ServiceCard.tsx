import Link from "next/link";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/generated/prisma";

export function ServiceCard({ service, slug }: { service: Service; slug: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Scissors size={15} className="text-primary" />
        </div>
        <div>
          <h3 className="mb-1 font-heading text-base font-semibold text-card-foreground">
            {service.title}
          </h3>
          {service.description && (
            <p className="mb-2 text-sm text-muted-foreground">{service.description}</p>
          )}
          <span className="font-mono text-xs text-muted-foreground">
            ${(service.price / 100).toFixed(2)} &middot; {service.duration} min
          </span>
        </div>
      </div>

      <Button
        asChild
        variant="outline"
        className="shrink-0 rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <Link href={`/b/${slug}/book?service=${service.id}`}>Select</Link>
      </Button>
    </div>
  );
}


// import Link from "next/link";
// import { Scissors } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Service } from "@/generated/prisma";

// export function ServiceCard({ service, slug }: { service: Service; slug: string }) {
//   return (
//     <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E7E4DD] bg-white p-5">
//       <div className="flex items-start gap-3">
//         <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
//           <Scissors size={15} className="text-[#0F6E63]" />
//         </div>
//         <div>
//           <h3 className="mb-1 font-space text-base font-semibold text-[#14171F]">
//             {service.title}
//           </h3>
//           {service.description && (
//             <p className="mb-2 text-sm text-[#6B7280]">{service.description}</p>
//           )}
//           <span className="font-mono text-xs text-[#6B7280]">
//             ${(service.price / 100).toFixed(2)} &middot; {service.duration} min
//           </span>
//         </div>
//       </div>

//       <Button
//         asChild
//         variant="outline"
//         className="shrink-0 rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground font-space font-semibold text-sm"
//       >
//         <Link href={`/b/${slug}/book?service=${service.id}`}>Select</Link>
//       </Button>
//     </div>
//   );
// }