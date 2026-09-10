import React from "react";
import Link from "next/link";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

const TOC = [
  { id: "what-are-cookies", title: "1. What Are Cookies" },
  { id: "how-we-use-cookies", title: "2. How BookEase Uses Cookies" },
  { id: "cookie-types", title: "3. Types of Cookies We Set" },
  { id: "controlling-cookies", title: "4. Managing Cookie Preferences" },
  { id: "contact", title: "5. Contact & Updates" },
];

export default function CookiePage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="Understand how BookEase uses cookies and local storage to keep you signed in and maintain UI preferences."
      lastUpdated="September 1, 2026"
      currentPath="/cookies"
      toc={TOC}
    >
      <section id="what-are-cookies" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          1. What Are Cookies
        </h2>
        <p className="text-muted-foreground">
          Cookies are small text files placed on your device by websites that you visit. They are widely used to make websites work properly, provide a smoother user experience, and remember user settings across page loads.
        </p>
      </section>

      <section id="how-we-use-cookies" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          2. How BookEase Uses Cookies
        </h2>
        <p className="text-muted-foreground">
          BookEase keeps tracking technologies minimal. We utilize essential session tokens and local application state variables strictly necessary to authenticating your identity, preventing CSRF security vulnerabilities, and remembering interface states (such as active themes or active search filters).
        </p>
      </section>

      <section id="cookie-types" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          3. Types of Cookies We Set
        </h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-border p-4 bg-muted/40">
            <h3 className="font-heading text-base font-semibold text-foreground mb-1">
              Essential &amp; Authentication Cookies (Strictly Necessary)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              These cookies are essential for you to navigate the application and access secure features like account dashboards and booking forms. They cannot be disabled without breaking basic site functionality.
            </p>
          </div>

          <div className="rounded-xl border border-border p-4 bg-muted/40">
            <h3 className="font-heading text-base font-semibold text-foreground mb-1">
              Preference &amp; Functionality Cookies
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              These store state details such as light/dark theme preference or toggle selections across sessions to prevent having to reset them on re-entry.
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-border p-4 bg-background">
            <h3 className="font-heading text-base font-semibold text-foreground mb-1">
              Analytics &amp; Marketing Cookies [Optional Placeholder]
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              BookEase currently avoids aggressive ad-tracking or third-party marketing cookies. If performance analytics are integrated in the future, explicit consent toggles will be provided here.
            </p>
          </div>
        </div>
      </section>

      <section id="controlling-cookies" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          4. Managing Cookie Preferences
        </h2>
        <p className="text-muted-foreground">
          You can clear or block cookies at any time using your browser settings. Please note that blocking essential session cookies may prevent you from logging in or placing bookings through BookEase.
        </p>
      </section>

      <section id="contact" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          5. Contact & Updates
        </h2>
        <p className="text-muted-foreground">
          We may update this Cookie Policy to reflect technical modifications. If you have questions about our cookie usage, contact us at{" "}
          <a href="mailto:support@bookease.com" className="text-primary font-medium hover:underline">
            support@bookease.com
          </a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}