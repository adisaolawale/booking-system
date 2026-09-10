import React from "react";
import Link from "next/link";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

const TOC = [
  { id: "info-collect", title: "1. Information We Collect" },
  { id: "how-we-use", title: "2. How Information is Used" },
  { id: "sharing-third-parties", title: "3. Information Sharing & Third Parties" },
  { id: "data-security", title: "4. Data Security & Retention" },
  { id: "your-rights", title: "5. Your Privacy Rights" },
  { id: "childrens-privacy", title: "6. Children's Privacy" },
  { id: "contact", title: "7. Privacy Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="Learn how BookEase handles, protects, and respects your personal data and account details."
      lastUpdated="September 1, 2026"
      currentPath="/privacy"
      toc={TOC}
    >
      <section id="info-collect" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          1. Information We Collect
        </h2>
        <p className="mb-3 text-muted-foreground">
          We only collect data required to operate an efficient booking service:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><strong>Account &amp; Profile Info:</strong> Name, email address, password hash, role type (Customer or Business owner), and optional avatar images.</li>
          <li><strong>Booking Data:</strong> Service selections, appointment times, booking statuses (e.g., pending, confirmed), and customer notes.</li>
          <li><strong>Payment &amp; Transaction Details:</strong> Basic transaction confirmation records [Placeholder: Payment card details are processed directly by securely integrated processors].</li>
          <li><strong>Technical &amp; Device Information:</strong> IP address, device type, browser settings, and system activity logs used for fraud prevention and performance monitoring.</li>
        </ul>
      </section>

      <section id="how-we-use" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          2. How Information is Used
        </h2>
        <p className="mb-3 text-muted-foreground">
          BookEase processes your information to deliver a smooth scheduling experience:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>To display real-time calendar availability and prevent double-bookings.</li>
          <li>To send transactional notifications (e.g., booking confirmations, schedule updates).</li>
          <li>To maintain platform security, prevent abuse, and provide customer support.</li>
          <li>To improve and optimize application performance and responsive interface layouts.</li>
        </ul>
      </section>

      <section id="sharing-third-parties" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          3. Information Sharing & Third Parties
        </h2>
        <p className="text-muted-foreground">
          We do not sell your personal information. We share relevant booking details between Customers and Businesses to enable appointment completion. Limited technical service providers (e.g., database hosts, transactional mailers) may access minimal data strictly required to deliver their services under confidentiality terms.
        </p>
      </section>

      <section id="data-security" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          4. Data Security & Retention
        </h2>
        <p className="text-muted-foreground">
          We apply modern encryption standard practices (HTTPS, secure hashed passwords, restricted database roles) to safeguard data. Information is retained as long as your account remains active or as required to meet legal compliance and accounting requirements.
        </p>
      </section>

      <section id="your-rights" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          5. Your Privacy Rights
        </h2>
        <p className="text-muted-foreground">
          Depending on your location, you hold rights regarding your personal information, including the right to access, update, export, or request deletion of your account and related booking records. You can manage primary profile settings directly inside your account area or contact privacy support.
        </p>
      </section>

      <section id="childrens-privacy" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          6. Children&rsquo;s Privacy
        </h2>
        <p className="text-muted-foreground">
          BookEase is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children.
        </p>
      </section>

      <section id="contact" className="scroll-mt-28">
        <h2 className="mb-3 font-heading text-xl font-semibold text-foreground sm:text-2xl">
          7. Privacy Contact
        </h2>
        <p className="text-muted-foreground">
          For privacy requests or inquiry regarding data practices, please reach out via{" "}
          <a href="mailto:privacy@bookease.com" className="text-primary font-medium hover:underline">
            privacy@bookease.com
          </a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}