import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/homepage/SiteHeader";
import { Footer } from "@/components/homepage/Footer";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="bg-background min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}