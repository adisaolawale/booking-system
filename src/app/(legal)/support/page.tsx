"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Calendar,
  User,
  CreditCard,
  Building2,
  Wrench,
  ChevronDown,
  Mail,
  Send,
  HelpCircle,
  FileText,
  Shield,
  Cookie,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// --- FAQ DATA ---
const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "What is BookEase?",
    answer:
      "BookEase is an all-in-one booking and scheduling software-as-a-service (SaaS) platform designed to simplify appointment management for service providers and make booking effortless for clients.",
  },
  {
    id: "faq-2",
    question: "How do I create an account?",
    answer:
      "Click the 'Get Started' or 'Sign Up' button in the top header. You can register using your email address as either a Customer looking to schedule services or a Business owner setting up a booking portal.",
  },
  {
    id: "faq-3",
    question: "How do I make a booking?",
    answer:
      "Browse or search for your desired service provider, select an available date and time slot from their interactive calendar, fill in your contact details, and confirm the reservation.",
  },
  {
    id: "faq-4",
    question: "Can I cancel or change a booking?",
    answer:
      "Yes. You can manage, reschedule, or cancel your upcoming appointments directly from your account dashboard under 'My Bookings'. Please note that individual cancellation policies are set by each service provider.",
  },
  {
    id: "faq-5",
    question: "Where can I view my existing bookings?",
    answer:
      "Log into your account and navigate to the 'My Bookings' section. Here you will find real-time status updates for upcoming, past, and pending appointments.",
  },
  {
    id: "faq-6",
    question: "What happens if I have a problem with a booking?",
    answer:
      "If you experience issues with an appointment or service, we recommend messaging the service provider directly through your booking details page. You can also reach out to BookEase support using the contact form below.",
  },
  {
    id: "faq-7",
    question: "How do I reset my password?",
    answer:
      "On the login page, click the 'Forgot password?' link. Enter your registered email address, and we will send you a secure link to reset your account password.",
  },
  {
    id: "faq-8",
    question: "How do businesses manage their bookings?",
    answer:
      "Business accounts have access to a dedicated dashboard where team members can set availability hours, define custom service menus, track incoming appointments, and manage client calendars.",
  },
  {
    id: "faq-9",
    question: "How do I contact BookEase support?",
    answer:
      "You can submit an inquiry through the 'Still need help?' contact form on this page or send an email directly to our support team at support@bookease.com [Placeholder].",
  },
];

// --- HELP CATEGORIES DATA ---
const HELP_CATEGORIES = [
  {
    title: "Getting Started",
    description: "Learn the basics, set up your profile, and start scheduling.",
    icon: BookOpen,
  },
  {
    title: "Bookings",
    description: "How to schedule, reschedule, manage, and cancel appointments.",
    icon: Calendar,
  },
  {
    title: "Account",
    description: "Manage credentials, notification preferences, and profile details.",
    icon: User,
  },
  {
    title: "Payments",
    description: "Understand fees, receipts, invoices, and billing options.",
    icon: CreditCard,
  },
  {
    title: "Businesses",
    description: "Configuration guides for service providers and calendar management.",
    icon: Building2,
  },
  {
    title: "Troubleshooting",
    description: "Quick fixes for common technical issues, login, or error messages.",
    icon: Wrench,
  },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "Account",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleFaqToggle = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formError) setFormError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate UI processing for backend integration readiness
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "Account",
        message: "",
      });
    }, 800);
  };

  const filteredFaqs = FAQ_ITEMS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-16 sm:space-y-20">
        
        {/* 1. Header / Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-12 shadow-sm text-center">
          {/* Ambient Design Glows */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-secondary/40 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5">
              <HelpCircle size={14} className="text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Support Center
              </span>
            </div>

            <h1 className="mb-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
              Help &amp; Support
            </h1>

            <p className="text-base text-muted-foreground sm:text-lg mb-8">
              Find answers, learn how BookEase works, or get help from our support team.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full rounded-2xl border border-border bg-background pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* 2. Popular Help Topics */}
        <section>
          <div className="mb-8 text-center sm:text-left">
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              Browse Help Topics
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a category to quickly find relevant guides and solutions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HELP_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon size={20} />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-xs font-medium text-primary">
                    <span>Explore articles</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Frequently Asked Questions (Accordion) */}
        <section>
          <div className="mb-8 text-center sm:text-left">
            <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Quick responses to common inquiries about using BookEase.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-xl border border-border/60 bg-background/50 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => handleFaqToggle(faq.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-foreground font-medium hover:text-primary transition-colors focus:outline-none"
                    >
                      <span className="text-base sm:text-lg">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-muted-foreground transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 pt-0 sm:px-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                <p>No help topics or questions matched your search query.</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs font-medium text-primary hover:underline"
                >
                  Clear search query
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 4. Contact Support Section */}
        <section id="contact-support" className="scroll-mt-24">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Form Info Side */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <Mail size={12} className="text-primary" />
                <span>Get in Touch</span>
              </div>
              <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                Still need help?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Send us a message and our support team will get back to you shortly.
              </p>

              {/* 5. Alternative Contact Method */}
              <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Email us directly</h3>
                    <p className="text-xs text-muted-foreground">Prefer standard email correspondence?</p>
                  </div>
                </div>
                <a
                  href="mailto:support@bookease.com"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline pt-1 break-all"
                >
                  <span>support@bookease.com</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Support Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm relative">
                {formSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      Message Received
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Thank you for reaching out! A member of the BookEase team will review your inquiry and respond via email.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 rounded-xl bg-muted px-4 py-2 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formError && (
                      <div className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
                        <AlertCircle size={16} />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-medium text-foreground">
                          Your Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="e.g. Jane Doe"
                          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-medium text-foreground">
                          Email Address <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleFormChange}
                          placeholder="e.g. jane@example.com"
                          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label htmlFor="category" className="text-xs font-medium text-foreground">
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        >
                          <option value="Account">Account</option>
                          <option value="Booking">Booking</option>
                          <option value="Payment">Payment</option>
                          <option value="Business">Business</option>
                          <option value="Technical issue">Technical issue</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="subject" className="text-xs font-medium text-foreground">
                          Subject <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleFormChange}
                          placeholder="Summary of issue"
                          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-medium text-foreground">
                        Message <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Please describe how we can assist you..."
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-y min-h-[100px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Send message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Helpful Links */}
        <section className="border-t border-border pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Related Legal &amp; System Resources
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-foreground transition-colors flex items-center gap-1">
                <FileText size={12} />
                <span>Terms &amp; Conditions</span>
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Shield size={12} />
                <span>Privacy Policy</span>
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Cookie size={12} />
                <span>Cookie Policy</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}