import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BusinessHeaderCompact } from "@/components/business/BusinessHeader";
import { DetailsForm } from "@/components/booking/DetailsForm";
import { to12h } from "@/lib/slots";

export default async function DetailsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { service?: string; date?: string; time?: string };
}) {
  const { slug } = await params;
  const { service: serviceId, date, time } = await searchParams;

  if (!serviceId || !date || !time) redirect(`/b/${slug}/services`);

  const business = await prisma.business.findUnique({
    where: { slug },
    include: { services: true },
  });

  if (!business) notFound();

  const service = business.services.find((s) => s.id === serviceId);
  if (!service) redirect(`/b/${slug}/services`);

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen w-full justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border p-6">
          <BusinessHeaderCompact slug={business.slug!} name={business.name} />
        </div>

        <div className="p-6 sm:p-8">
          <h1 className="mb-1 font-heading text-2xl font-semibold text-foreground">
            Your details
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            One last step before we confirm your appointment.
          </p>

          <div className="mb-6 rounded-xl bg-muted p-4">
            <p className="font-heading text-base font-semibold text-foreground">
              {service.title}
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              {formattedDate} &middot; {to12h(time)} &middot; ${(service.price / 100).toFixed(2)}
            </p>
          </div>

          <DetailsForm
            slug={business.slug!}
            businessId={business.id}
            serviceId={service.id}
            date={date}
            time={time}
          />
        </div>
      </div>
    </div>
  );
}