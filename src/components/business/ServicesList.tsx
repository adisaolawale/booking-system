import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/generated/prisma";
import { ServiceCard } from "@/components/business/ServiceCard";

export function ServicesList({
  services,
  slug,
  limit,
  heading = "Choose a service",
  subheading = "Pick what you're in for. You'll choose a time next.",
}: {
  services: Service[];
  slug: string;
  limit?: number;
  heading?: string;
  subheading?: string;
}) {
  const visible = limit ? services.slice(0, limit) : services;
  const hasMore = limit ? services.length > limit : false;

  return (
    <div>
      <h2 className="mb-1 font-heading text-2xl font-semibold text-foreground">
        {heading}
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">{subheading}</p>

      {services.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No services yet. Check back soon.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((service) => (
            <ServiceCard key={service.id} service={service} slug={slug} />
          ))}

          {hasMore && (
            <Link
              href={`/b/${slug}/services`}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              View all services
              <ArrowRight size={15} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}




// import type { Service } from "@/generated/prisma";
// import { ServiceCard } from "@/components/business/ServiceCard";

// export function ServicesList({
//   services,
//   slug,
//   heading = "Choose a service",
//   subheading = "Pick what you're in for. You'll choose a time next.",
// }: {
//   services: Service[];
//   slug: string;
//   heading?: string;
//   subheading?: string;
// }) {
//   return (
//     <div>
//       <h2 className="mb-1 font-heading text-2xl font-semibold text-foreground">
//         {heading}
//       </h2>
//       <p className="mb-6 text-sm text-muted-foreground">{subheading}</p>

//       {services.length === 0 ? (
//         <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
//           No services yet. Check back soon.
//         </div>
//       ) : (
//         <div className="flex flex-col gap-3">
//           {services.map((service) => (
//             <ServiceCard key={service.id} service={service} slug={slug} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }