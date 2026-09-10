import React from "react";
import Link from "next/link";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

const TOC = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "about", title: "2. About BookEase" },
  { id: "eligibility", title: "3. Eligibility & Account Creation" },
  { id: "platform-use", title: "4. Platform Use & Services" },
  { id: "bookings-payments", title: "5. Bookings, Cancellations & Fees" },
  { id: "prohibited", title: "6. Prohibited Activities" },
  { id: "intellectual-property", title: "7. Intellectual Property" },
  { id: "disclaimers-liability", title: "8. Disclaimers & Limitation of Liability" },
  { id: "termination", title: "9. Account Suspension & Termination" },
  { id: "changes-governing", title: "10. Changes & Governing Law" },
  { id: "contact", title: "11. Contact Information" },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      description="Please read these terms carefully before using the BookEase booking platform and software services."
      lastUpdated="September 1, 2026"
      currentPath="/terms"
      toc={TOC}
    >
      <section id="acceptance" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          1. Acceptance of Terms
        </h2>
        <p className="text-muted-foreground">
          By accessing, browsing, or utilizing the BookEase website, mobile interfaces, or booking software (collectively, the &ldquo;Platform&rdquo;), you agree to be bound by these Terms &amp; Conditions. If you do not agree to all terms outlined here, you may not access or use our services.
        </p>
      </section>

      <section id="about" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          2. About BookEase
        </h2>
        <p className="text-muted-foreground">
          BookEase provides software-as-a-service (SaaS) tools designed to connect service providers (&ldquo;Businesses&rdquo;) with clients (&ldquo;Customers&rdquo;). BookEase facilitates real-time scheduling, availability management, and booking workflows. BookEase is an administrative platform provider and is not directly involved in rendering the underlying off-platform services offered by Businesses.
        </p>
      </section>

      <section id="eligibility" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          3. Eligibility & Account Creation
        </h2>
        <p className="mb-3 text-muted-foreground">
          To use certain features of the Platform, you must register for an account. You agree to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Be at least the legal age of majority in your jurisdiction.</li>
          <li>Provide accurate, current, and complete registration information.</li>
          <li>Maintain and protect the security of your account credentials.</li>
          <li>Accept responsibility for all activities that occur under your account.</li>
        </ul>
      </section>

      <section id="platform-use" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          4. Platform Use & Services
        </h2>
        <p className="text-muted-foreground">
          BookEase grants you a non-exclusive, non-transferable, revocable license to access the Platform strictly in accordance with these terms. Businesses are responsible for maintaining accurate operating hours, service listings, prices, and availability.
        </p>
      </section>

      <section id="bookings-payments" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          5. Bookings, Cancellations & Fees
        </h2>
        <p className="mb-3 text-muted-foreground">
          When a Customer books a service via BookEase, the agreement for service delivery is formed directly between the Customer and the Business.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li><strong>Cancellations & Refunds:</strong> Cancellation policies are set directly by individual Businesses. Customers should review specific Business rules prior to confirming appointments.</li>
          <li><strong>Fees:</strong> BookEase reserves the right to charge platform processing fees or subscription costs where applicable. Any applicable fees are clearly displayed prior to transaction confirmation [Placeholder for custom tier rates].</li>
        </ul>
      </section>

      <section id="prohibited" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          6. Prohibited Activities
        </h2>
        <p className="mb-3 text-muted-foreground">
          You agree not to misuse the BookEase Platform. Prohibited actions include:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Using the Platform for any illegal, unauthorized, or fraudulent purpose.</li>
          <li>Interfering with or disrupting the integrity or performance of the software.</li>
          <li>Attempting to gain unauthorized access to accounts, servers, or networks.</li>
          <li>Automating requests or scraping data without express permission.</li>
        </ul>
      </section>

      <section id="intellectual-property" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          7. Intellectual Property
        </h2>
        <p className="text-muted-foreground">
          All branding, code, interfaces, design assets, logos, and software belong exclusively to BookEase or its licensors. Users retain rights to their submitted business profile assets and content.
        </p>
      </section>

      <section id="disclaimers-liability" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          8. Disclaimers & Limitation of Liability
        </h2>
        <p className="text-muted-foreground">
          The Platform is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. BookEase disclaims all warranties, express or implied. In no event shall BookEase be liable for indirect, incidental, or consequential damages resulting from lost bookings, service interruptions, or Business performance issues.
        </p>
      </section>

      <section id="termination" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          9. Account Suspension & Termination
        </h2>
        <p className="text-muted-foreground">
          We reserve the right to suspend or terminate access to BookEase at our sole discretion, without notice, for conduct that violates these Terms or harms other users or the Platform.
        </p>
      </section>

      <section id="changes-governing" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          10. Changes & Governing Law
        </h2>
        <p className="text-muted-foreground">
          We may update these Terms periodically. Continued use of the Platform after changes constitutes acceptance of the new terms. These terms are governed by the applicable local laws governing your service agreement [Placeholder for jurisdiction].
        </p>
      </section>

      <section id="contact" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          11. Contact Information
        </h2>
        <p className="text-muted-foreground">
          If you have questions or concerns regarding these Terms, please reach out to our legal support team at{" "}
          <a href="mailto:support@bookease.com" className="text-primary font-medium hover:underline">
            support@bookease.com
          </a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}