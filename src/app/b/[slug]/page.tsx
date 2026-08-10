import { notFound } from "next/navigation";
import { BusinessIdentity } from "@/components/business/BusinessIdentity";
import { ServicesList } from "@/components/business/ServicesList";
import { getNextAvailableLabel } from "@/lib/next-available";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function formatHours(availability: { dayOfWeek: number; startTime: string; endTime: string }[]) {
  if (availability.length === 0) return "Hours not set";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const sorted = [...availability].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  return `${days[first.dayOfWeek]}\u2013${days[last.dayOfWeek]} \u00b7 ${first.startTime}\u2013${first.endTime}`;
}

export default async function BusinessPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const [business, session] = await Promise.all([
    prisma.business.findUnique({
      where: { slug },
      include: {
        availability: true,
        services: true,
        bookings: { where: { date: { gte: new Date() } } },
      },
    }),
    auth(),
  ]);

  if (!business) notFound();

  let isFavorited = false;
  if (session) {
    const favorite = await prisma.favorite.findUnique({
      where: { userId_businessId: { userId: session.user.id, businessId: business.id } },
    });
    isFavorited = !!favorite;
  }

  const nextAvailable = getNextAvailableLabel(business.availability, business.bookings);
  const hours = formatHours(business.availability);

  return (
    <div className="flex min-h-screen w-full justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card lg:max-w-4xl">
        <div className="lg:grid lg:grid-cols-[360px_1fr] lg:divide-x lg:divide-border lg:items-stretch">
          <div className="p-8">
            <BusinessIdentity
              businessId={business.id}
              slug={business.slug!}
              name={business.name}
              description={business.description}
              hours={hours}
              nextAvailable={nextAvailable}
              isFavorited={isFavorited}
              isLoggedIn={!!session}
            />
          </div>

          <div className="border-t border-border p-8 lg:border-t-0">
            <ServicesList services={business.services} slug={business.slug!} limit={3} />
          </div>
        </div>
      </div>
    </div>
  );
}


// import { notFound } from "next/navigation";
// import { BusinessIdentity } from "@/components/business/BusinessIdentity";
// import { ServicesList } from "@/components/business/ServicesList";
// import { getNextAvailableLabel } from "@/lib/next-available";
// import { prisma } from "@/lib/prisma";

// function formatHours(availability: { dayOfWeek: number; startTime: string; endTime: string }[]) {
//   if (availability.length === 0) return "Hours not set";
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const sorted = [...availability].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
//   const first = sorted[0];
//   const last = sorted[sorted.length - 1];
//   return `${days[first.dayOfWeek]}\u2013${days[last.dayOfWeek]} \u00b7 ${first.startTime}\u2013${first.endTime}`;
// }

// export default async function BusinessPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = await params;

//   const business = await prisma.business.findUnique({
//     where: { slug },
//     include: {
//       availability: true,
//       services: true,
//       bookings: { where: { date: { gte: new Date() } } },
//     },
//   });

//   if (!business) notFound();

//   const nextAvailable = getNextAvailableLabel(business.availability, business.bookings);
//   const hours = formatHours(business.availability);

//   return (
//     <div className="flex min-h-screen w-full justify-center bg-background px-4 py-12">
//       {/*
//         lg and up: identity and services sit side by side in one grid row —
//         divide-x draws the divider on the shared column edge so it always
//         spans the full row height, regardless of which side is taller.
//         Below lg: no grid, so the two blocks just stack in normal flow —
//         identity on top, services underneath, separated by a top border.
//         Both sides show at most 3 services; ServicesList adds a "View all
//         services" link to /b/[slug]/services whenever there are more.
//       */}
//       <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card lg:max-w-4xl">
//         <div className="lg:grid lg:grid-cols-[360px_1fr]">
//           <div className="p-8 lg:border-r lg:border-border">
//             <BusinessIdentity
//               name={business.name}
//               description={business.description}
//               hours={hours}
//               nextAvailable={nextAvailable}
//             />
//           </div>

//           <div className="border-t border-border p-8 lg:border-t-0">
//             <ServicesList
//               services={business.services}
//               slug={business.slug!}
//               limit={3}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { notFound } from "next/navigation";
// import { BusinessIdentity } from "@/components/business/BusinessIdentity";
// import { ServicesList } from "@/components/business/ServicesList";
// import { getNextAvailableLabel } from "@/lib/next-available";
// import { prisma } from "@/lib/prisma";

// function formatHours(availability: { dayOfWeek: number; startTime: string; endTime: string }[]) {
//   if (availability.length === 0) return "Hours not set";
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const sorted = [...availability].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
//   const first = sorted[0];
//   const last = sorted[sorted.length - 1];
//   return `${days[first.dayOfWeek]}\u2013${days[last.dayOfWeek]} \u00b7 ${first.startTime}\u2013${first.endTime}`;
// }

// export default async function BusinessPage({
//   params,
// }: {
//   params: { slug: string };
// }) {

//   const { slug } = await params;
//   const business = await prisma.business.findUnique({
//     where: { slug },
//     include: {
//       availability: true,
//       services: true,
//       bookings: { where: { date: { gte: new Date() } } },
//     },
//   });

//   if (!business) notFound();

//   const nextAvailable = getNextAvailableLabel(business.availability, business.bookings);
//   const hours = formatHours(business.availability);

//   return (
//     <div className="flex min-h-screen w-full justify-center bg-background px-4 py-12">
//       {/*
//         lg and up: one merged card, split into a details panel and a services
//         panel side by side — no navigation needed.
//         Below lg (tablet + phone): only the details panel renders as a
//         standalone card; "View services" (inside BusinessIdentity) links out
//         to /b/[slug]/services instead.
//       */}
//       <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card lg:max-w-4xl">
//         <div className="lg:grid lg:grid-cols-[360px_1fr] lg:divide-x lg:divide-border lg:items-stretch">
//           <div className="p-8">
//             <BusinessIdentity
//               slug={business.slug!}
//               name={business.name}
//               description={business.description}
//               hours={hours}
//               nextAvailable={nextAvailable}
//             />
//           </div>

//           <div className="hidden lg:block lg:p-8">
//             <ServicesList services={business.services} slug={business.slug!} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }