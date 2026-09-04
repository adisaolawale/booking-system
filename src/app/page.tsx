import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/homepage/SiteHeader";
import { Hero } from "@/components/homepage/Hero";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { BusinessCTA } from "@/components/homepage/BusinessCTA";
import { PopularServicesCategories } from "@/components/homepage/PopularServicesCategories";
import { Testimonials } from "@/components/homepage/Testimonials";
import { Footer } from "@/components/homepage/Footer";

export default async function HomePage() {
  const [categories, testimonials] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, icon: true },
    }),
    prisma.testimonial.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      take: 8,
    }),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <BusinessCTA />
        <PopularServicesCategories categories={categories} />
        <Testimonials testimonials={testimonials} />
      </main>
      <Footer />
    </>
  );
}



