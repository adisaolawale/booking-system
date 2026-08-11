import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ServiceFormDialog } from "@/components/business/ServiceFormDialog";
import { ManagedServiceCard } from "@/components/business/ManagedServiceCard";

export default async function BusinessServicesPage() {
  const session = await auth();

  const business = await prisma.business.findFirst({
    where: { ownerId: session!.user.id },
    include: { services: { orderBy: { createdAt: "asc" } } },
  });

  if (!business) redirect("/dashboard");

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Services
          </h1>
          <p className="text-sm text-muted-foreground">
            What customers see and book on your page.
          </p>
        </div>
        <ServiceFormDialog />
      </div>

      {business.services.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-10 text-center">
          <h3 className="mb-1 font-heading text-base font-semibold text-foreground">
            No services yet
          </h3>
          <p className="mb-5 max-w-xs text-sm text-muted-foreground">
            Add your first service so customers can start booking you.
          </p>
          <ServiceFormDialog />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {business.services.map((service) => (
            <ManagedServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}