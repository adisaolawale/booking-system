"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Shield, Cookie, ArrowUpRight, ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  currentPath: string;
  toc: TocItem[];
  children: React.ReactNode;
}

const LEGAL_PAGES = [
  { name: "Terms & Conditions", href: "/terms", icon: FileText },
  { name: "Privacy Policy", href: "/privacy", icon: Shield },
  { name: "Cookie Policy", href: "/cookies", icon: Cookie },
];

export function LegalPageLayout({
  title,
  description,
  lastUpdated,
  currentPath,
  toc,
  children,
}: LegalPageLayoutProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  return (
    <div className="px-4 py-10 sm:py-16">
      {/* Page Header */}
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-foreground font-medium">Legal</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm">
          {/* Ambient Glows from existing design system */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-6 h-48 w-48 rounded-full bg-secondary/40 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Legal & Governance
              </span>
            </div>
            <h1 className="mb-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        {/* Content & Sidebar Grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h2 className="mb-3 font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    On this page
                  </h2>
                  <nav className="flex flex-col space-y-1">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`text-sm py-1.5 px-3 rounded-lg transition-colors ${
                          activeId === item.id
                            ? "bg-muted font-medium text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Related Policies Navigation */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h2 className="mb-3 font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Related Documents
                </h2>
                <div className="flex flex-col gap-2">
                  {LEGAL_PAGES.map((page) => {
                    const Icon = page.icon;
                    const isActive = currentPath === page.href;
                    return (
                      <Link
                        key={page.href}
                        href={page.href}
                        className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={16} />
                          <span>{page.name}</span>
                        </div>
                        <ArrowUpRight size={14} className="opacity-70" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Legal Content Area */}
          <article className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
              <div className="prose prose-slate max-w-none text-foreground space-y-8 text-sm sm:text-base leading-relaxed">
                {children}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}