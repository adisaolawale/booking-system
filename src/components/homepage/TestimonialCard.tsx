import type { Testimonial } from "@/lib/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
        &ldquo;{testimonial.quoteTitle}&rdquo;
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        {testimonial.quoteBody}
      </p>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role} &middot; {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}