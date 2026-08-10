import Link from "next/link";
import { CalendarClock, ArrowRight, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { to12h } from "@/lib/slots";
import { STATUS_STYLES } from "@/lib/booking-status";

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default async function DashboardHomePage() {
  const session = await auth();
  const userId = session!.user.id;
  const name = session!.user.name ?? "there";

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [upcomingBookings, upcomingCount, totalCount] = await Promise.all([
    prisma.booking.findMany({
      where: { userId, date: { gte: startOfToday } },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      take: 5,
      include: { service: true, business: true },
    }),
    prisma.booking.count({ where: { userId, date: { gte: startOfToday } } }),
    prisma.booking.count({ where: { userId } }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="mb-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          Welcome back, {name.split(" ")[0]}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&rsquo;s what&rsquo;s coming up.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-1 text-xs text-muted-foreground">Upcoming</p>
          <p className="font-heading text-2xl font-semibold text-foreground">
            {upcomingCount}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-1 text-xs text-muted-foreground">Total bookings</p>
          <p className="font-heading text-2xl font-semibold text-foreground">
            {totalCount}
          </p>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Upcoming bookings
          </h2>
          {upcomingBookings.length > 0 && (
            <Link
              href="/dashboard/bookings"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {upcomingBookings.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-10 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <Sparkles size={20} className="text-primary" />
            </div>
            <h3 className="mb-1 font-heading text-base font-semibold text-foreground">
              No upcoming bookings yet
            </h3>
            <p className="mb-5 max-w-xs text-sm text-muted-foreground">
              When you book a service, it&rsquo;ll show up here.
            </p>
            <Link
              href="/"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Browse services
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {upcomingBookings.map((booking) => (
              <Link
                key={booking.id}
                href={`/b/${booking.business.slug}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted sm:p-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xs font-semibold text-background">
                    {initials(booking.business.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {booking.service.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {booking.business.name}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <CalendarClock size={12} />
                    {formatDate(booking.date)} &middot; {to12h(booking.startTime)}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                      STATUS_STYLES[booking.status] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {booking.status.toLowerCase()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


// import Link from "next/link";
// import { CalendarClock, ArrowRight, Sparkles } from "lucide-react";
// import { auth } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import { to12h } from "@/lib/slots";

// function initials(name: string) {
//   return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
// }

// function formatDate(date: Date) {
//   return date.toLocaleDateString(undefined, {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//   });
// }

// const STATUS_STYLES: Record<string, string> = {
//   CONFIRMED: "bg-accent text-accent-foreground",
//   PENDING: "bg-secondary text-secondary-foreground",
//   CANCELLED: "bg-destructive/10 text-destructive",
//   COMPLETED: "bg-muted text-muted-foreground",
// };

// export default async function DashboardHomePage() {
//   const session = await auth();
//   const userId = session!.user.id;
//   const name = session!.user.name ?? "there";

//   const startOfToday = new Date();
//   startOfToday.setHours(0, 0, 0, 0);

//   const [upcomingBookings, upcomingCount, totalCount] = await Promise.all([
//     prisma.booking.findMany({
//       where: { userId, date: { gte: startOfToday } },
//       orderBy: [{ date: "asc" }, { startTime: "asc" }],
//       take: 5,
//       include: { service: true, business: true },
//     }),
//     prisma.booking.count({ where: { userId, date: { gte: startOfToday } } }),
//     prisma.booking.count({ where: { userId } }),
//   ]);

//   return (
//     <div className="flex flex-col gap-8">
//       <div>
//         <h1 className="mb-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
//           Welcome back, {name.split(" ")[0]}
//         </h1>
//         <p className="text-sm text-muted-foreground">
//           Here&rsquo;s what&rsquo;s coming up.
//         </p>
//       </div>

//       <div className="grid grid-cols-2 gap-4 sm:max-w-sm">
//         <div className="rounded-2xl border border-border bg-card p-5">
//           <p className="mb-1 text-xs text-muted-foreground">Upcoming</p>
//           <p className="font-heading text-2xl font-semibold text-foreground">
//             {upcomingCount}
//           </p>
//         </div>
//         <div className="rounded-2xl border border-border bg-card p-5">
//           <p className="mb-1 text-xs text-muted-foreground">Total bookings</p>
//           <p className="font-heading text-2xl font-semibold text-foreground">
//             {totalCount}
//           </p>
//         </div>
//       </div>

//       <div>
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="font-heading text-lg font-semibold text-foreground">
//             Upcoming bookings
//           </h2>
//           {upcomingBookings.length > 0 && (
//             <Link
//               href="/dashboard/bookings"
//               className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
//             >
//               View all
//               <ArrowRight size={14} />
//             </Link>
//           )}
//         </div>

//         {upcomingBookings.length === 0 ? (
//           <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-10 text-center">
//             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
//               <Sparkles size={20} className="text-primary" />
//             </div>
//             <h3 className="mb-1 font-heading text-base font-semibold text-foreground">
//               No upcoming bookings yet
//             </h3>
//             <p className="mb-5 max-w-xs text-sm text-muted-foreground">
//               When you book a service, it&rsquo;ll show up here.
//             </p>
//             <Link
//               href="/"
//               className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
//             >
//               Browse services
//             </Link>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3">
//             {upcomingBookings.map((booking) => (
//               <Link
//                 key={booking.id}
//                 href={`/b/${booking.business.slug}`}
//                 className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted sm:p-5"
//               >
//                 <div className="flex min-w-0 items-center gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xs font-semibold text-background">
//                     {initials(booking.business.name)}
//                   </div>
//                   <div className="min-w-0">
//                     <p className="truncate text-sm font-medium text-foreground">
//                       {booking.service.title}
//                     </p>
//                     <p className="truncate text-xs text-muted-foreground">
//                       {booking.business.name}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex shrink-0 flex-col items-end gap-1.5">
//                   <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
//                     <CalendarClock size={12} />
//                     {formatDate(booking.date)} &middot; {to12h(booking.startTime)}
//                   </span>
//                   <span
//                     className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
//                       STATUS_STYLES[booking.status] ?? "bg-muted text-muted-foreground"
//                     }`}
//                   >
//                     {booking.status.toLowerCase()}
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }