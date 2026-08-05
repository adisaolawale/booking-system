import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BusinessHeaderCompact } from "@/components/business/BusinessHeader";
import { ServicesList } from "@/components/business/ServicesList";
import { prisma } from "@/lib/prisma";

export default async function ServicesPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const business = await prisma.business.findUnique({
    where: { slug },
    include: { services: true },
  });

  if (!business) notFound();

  return (
    <div className="flex min-h-screen w-full justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg">
        <Link
          href={`/b/${business.slug}`}
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <div className="mb-6">
          <BusinessHeaderCompact slug={business.slug!} name={business.name} />
        </div>

        <ServicesList services={business.services} slug={business.slug!} />
      </div>
    </div>
  );
}


// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import { BusinessHeaderCompact } from "@/components/business/BusinessHeader";
// import { ServicesList } from "@/components/business/ServicesList";
// import { prisma } from "@/lib/prisma";

// // This route is only reached on tablet and phone widths — on lg+ screens
// // the services list already renders alongside the details on /b/[slug].
// export default async function ServicesPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = await params;
//   const business = await prisma.business.findUnique({
//     where: { slug },
//     include: { services: true },
//   });

//   if (!business) notFound();

//   return (
//     <div className="flex min-h-screen w-full justify-center bg-background px-4 py-12">
//       <div className="w-full max-w-lg">
//         <Link
//           href={`/b/${business.slug}`}
//           className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
//         >
//           <ArrowLeft size={14} />
//           Back
//         </Link>

//         <div className="mb-6">
//           <BusinessHeaderCompact slug={business.slug!} name={business.name} />
//         </div>

//         <ServicesList services={business.services} slug={business.slug!} />
//       </div>
//     </div>
//   );
// }
