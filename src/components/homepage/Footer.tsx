import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/homepage/Reveal";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/icons/SocialIcons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Book a Service", href: "/book-a-service" },
];

const businessLinks = [
  { label: "Register your Business", href: "/register?as=business" },
  { label: "Business Dashboard", href: "/dashboard" },
  { label: "Pricing", href: "/pricing" },
  { label: "Features", href: "/#how-it-works" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socials = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: XIcon, href: "#", label: "X" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-primary/5 px-4 py-20">
      <Reveal className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div>
              <div className="mb-4 font-heading text-lg font-semibold text-foreground">
                BookEase
              </div>
              <p className="mb-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                The simplest way for service businesses to manage bookings
                &mdash; and for customers to book them.
              </p>
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                  >
                    <Icon size={15} />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h3>
              <ul className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">For Businesses</h3>
              <ul className="flex flex-col gap-3">
                {businessLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Contact Us</h3>
              <ul className="flex flex-col gap-3.5">
                <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                  <span>123 Market Street, Suite 400, San Francisco, CA 94103</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Mail size={15} className="shrink-0 text-primary" />
                  <a href="mailto:adisaolawale10@gmail.com" className="hover:text-foreground">
                    adisaolawale10@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Phone size={15} className="shrink-0 text-primary" />
                  <a href="tel:+7047254301" className="hover:text-foreground">
                    +234 (704) 725-4301
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} BookEase. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center font-heading text-4xl font-semibold text-primary/10 sm:text-6xl">
          BookEase
        </p>
      </Reveal>
    </footer>
  );
}