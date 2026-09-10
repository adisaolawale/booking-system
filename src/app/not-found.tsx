import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Home, HelpCircle, Compass } from "lucide-react";
import { SiteHeader } from "@/components/homepage/SiteHeader";
import { Footer } from "@/components/homepage/Footer";

export const metadata: Metadata = {
  title: "Page Not Found | BookEase",
  description: "The page you are looking for could not be found. Return to BookEase or get help.",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 py-12 sm:py-20">
        <div className="mx-auto w-full max-w-2xl text-center">
          
          {/* Card Container matching existing BookEase card tokens */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-12 shadow-sm">
            
            {/* Ambient Design Glows matching existing homepage hero/legal pages */}
            <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-secondary/40 blur-3xl" />

            <div className="relative z-10 space-y-6">
              
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3.5 py-1.5">
                <Compass size={14} className="text-primary animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">
                  Error 404
                </span>
              </div>

              {/* Large Typography-Based 404 Visual */}
              <div>
                <h1 className="font-heading text-7xl font-bold tracking-tight text-foreground sm:text-8xl md:text-9xl">
                  4<span className="text-primary">0</span>4
                </h1>
                <h2 className="mt-2 font-heading text-xl font-semibold text-foreground sm:text-2xl lg:text-3xl">
                  Oops! This page isn&apos;t available.
                </h2>
              </div>

              {/* Description */}
              <p className="mx-auto max-w-md text-sm text-muted-foreground sm:text-base leading-relaxed">
                The page you&apos;re looking for may have been moved, deleted, or the URL might be incorrect.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
                >
                  <Home size={16} />
                  <span>Back to home</span>
                </Link>

                <Link
                  href="/support"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all"
                >
                  <HelpCircle size={16} className="text-muted-foreground" />
                  <span>Get help</span>
                </Link>
              </div>

            </div>
          </div>

          {/* Quick Helpful Navigation Below Card */}
          <p className="mt-8 text-xs text-muted-foreground">
            Looking for something specific? You can explore our{" "}
            <Link href="/terms" className="text-primary hover:underline font-medium">
              Terms
            </Link>
            ,{" "}
            <Link href="/privacy" className="text-primary hover:underline font-medium">
              Privacy Policy
            </Link>
            , or{" "}
            <Link href="/cookies" className="text-primary hover:underline font-medium">
              Cookie Policy
            </Link>
            .
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}