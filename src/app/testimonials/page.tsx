import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/homepage/SiteHeader";
import { Footer } from "@/components/homepage/Footer";
import { TestimonialCard } from "@/components/homepage/TestimonialCard";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <SiteHeader />
      <main className="bg-background px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Loved by 200+ businesses
              </span>
            </div>
            <h1 className="mb-3 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              What our users and businesses are saying
            </h1>
            <p className="text-base text-muted-foreground">
              Every story, from the customers and business owners who use BookEase every day.
            </p>
          </div>

          {testimonials.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No testimonials yet.
            </p>
          ) : (
            <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}