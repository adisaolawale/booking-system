import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/homepage/SiteHeader";
import { Footer } from "@/components/homepage/Footer";
import { CategoryIcon } from "@/lib/category-icons";
import { ServiceCard } from "@/components/business/ServiceCard";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const { category: categorySlug } = await searchParams;

  // No category selected yet — show the category grid.
  if (!categorySlug) {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, icon: true },
    });

    return (
      <>
        <SiteHeader />
        <main className="bg-background px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <h1 className="mb-3 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
                Browse Services
              </h1>
              <p className="text-base text-muted-foreground">
                Pick a category to see what businesses on BookEase offer.
              </p>
            </div>

            {categories.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">No categories yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/services?category=${c.slug}`}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary">
                      <CategoryIcon
                        name={c.icon!}
                        size={20}
                        className="text-primary transition-colors group-hover:text-primary-foreground"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // A category is selected — show every service, from every business,
  // that belongs to it.
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) notFound();

  const services = await prisma.service.findMany({
    where: { business: { categoryId: category.id } },
    include: { business: { select: { name: true, slug: true } } },
    orderBy: { title: "asc" },
    take: 50,
  });

  return (
    <>
      <SiteHeader />
      <main className="bg-background px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/services"
            className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={14} />
            All categories
          </Link>

          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
              <CategoryIcon name={category.icon!} size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-semibold text-foreground">
                {category.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {services.length} {services.length === 1 ? "service" : "services"} available
              </p>
            </div>
          </div>

          {services.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-sm text-muted-foreground">
                No services in this category yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  slug={service.business.slug!}
                  businessName={service.business.name}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}