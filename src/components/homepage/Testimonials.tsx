"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

const PAGE_SIZE = 3;
const HOMEPAGE_COUNT = 8; // + 1 CTA slot = 9 total (3 pages of 3)
const CYCLE_MS = 10000;

type Slot = Testimonial | "cta";

function buildPages(): Slot[][] {
  const shown = TESTIMONIALS.slice(0, HOMEPAGE_COUNT);
  const pages: Slot[][] = [];
  for (let i = 0; i < shown.length; i += PAGE_SIZE) {
    pages.push(shown.slice(i, i + PAGE_SIZE));
  }
  const lastIndex = pages.length - 1;
  pages[lastIndex] = [...pages[lastIndex], "cta"];
  return pages;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
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

function CTACard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-primary p-6 text-primary-foreground">
      <div>
        <h3 className="mb-2 font-heading text-lg font-semibold">
          Loved by 200+ businesses
        </h3>
        <p className="mb-6 text-sm text-primary-foreground/80">
          See what more of our customers and business partners have to say.
        </p>
      </div>
      <Link
        href="/testimonials"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-foreground px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/90"
      >
        See all testimonials
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export function Testimonials() {
  const pages = useMemo(buildPages, []);
  const lastPage = pages.length - 1;

  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Forward-only: schedules the *next* page after 10s, but only while
  // there's a next page to go to. Once `active` reaches the last page (the
  // one with the CTA card) this stops scheduling entirely — it does not
  // loop back to the start on its own. It only starts again if the person
  // manually navigates back to an earlier page, since that changes `active`
  // and re-runs this effect with room to advance again.
  useEffect(() => {
    if (!inView) return;
    if (active >= lastPage) return;

    const id = setTimeout(() => {
      setActive((p) => Math.min(p + 1, lastPage));
    }, CYCLE_MS);

    return () => clearTimeout(id);
  }, [inView, active, lastPage]);

  const goPrev = () => setActive((p) => Math.max(p - 1, 0));
  const goNext = () => setActive((p) => Math.min(p + 1, lastPage));

  return (
    <section
      ref={sectionRef}
      className="border-t border-border bg-background px-4 py-10 sm:py-15"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              Loved by 200+ businesses
            </span>
          </div>
          <h2 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            What our users and businesses are saying
          </h2>
        </div>

        {/* key={active} replays a quick fade/rise on every page change,
            same language as the How It Works swap — nothing loops here. */}
        <div
          key={active}
          className="grid items-start gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pages[active].map((slot, i) =>
            slot === "cta" ? (
              <CTACard key="cta" />
            ) : (
              <TestimonialCard key={slot.name} testimonial={slot} />
            )
          )}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={active === 0}
            aria-label="Previous testimonials"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={active === lastPage}
            aria-label="Next testimonials"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}