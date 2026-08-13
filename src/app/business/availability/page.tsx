import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { WeeklyHoursForm } from "@/components/business/WeeklyHoursForm";
import { TimeOffSection } from "@/components/business/TimeOffSection";

export default async function BusinessAvailabilityPage() {
  const session = await auth();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const business = await prisma.business.findFirst({
    where: { ownerId: session!.user.id },
    include: {
      availability: true,
      timeOff: {
        where: { date: { gte: startOfToday } },
        orderBy: { date: "asc" },
      },
    },
  });

  if (!business) redirect("/dashboard");

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="mb-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          Availability
        </h1>
        <p className="text-sm text-muted-foreground">
          Set your weekly hours, and block off specific times you&rsquo;re not free.
        </p>
      </div>

      <div>
        <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
          Weekly hours
        </h2>
        <WeeklyHoursForm availability={business.availability} />
      </div>

      <div>
        <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
          Time off
        </h2>
        <TimeOffSection timeOff={business.timeOff} />
      </div>
    </div>
  );
}