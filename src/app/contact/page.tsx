"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { STORE_PHONE, STORE_PHONE_TEL } from "@/lib/india";
import { SITE, whatsappUrl } from "@/lib/site";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/actions/admin";
import { toast } from "sonner";

export default function ContactPage() {
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="We are here to help"
        title="Contact Us"
        description="Questions about products, grooming, delivery areas, or your order? Reach out and we will respond quickly."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                label: "Address",
                value: SITE.address.line,
              },
              {
                icon: Phone,
                label: "Phone",
                value: STORE_PHONE,
                href: `tel:${STORE_PHONE_TEL}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: SITE.emails.primary,
                href: `mailto:${SITE.emails.primary}`,
              },
              {
                icon: Mail,
                label: "Support",
                value: SITE.emails.support,
                href: `mailto:${SITE.emails.support}`,
              },
              {
                icon: Clock,
                label: "Service areas",
                value: SITE.serviceAreas.join(", "),
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <Icon className="h-5 w-5 shrink-0 text-orange-600" />
                <div>
                  <p className="font-medium text-stone-900">{label}</p>
                  {href ? (
                    <a href={href} className="text-stone-600 hover:text-orange-700">
                      {value}
                    </a>
                  ) : (
                    <p className="text-stone-600">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">WhatsApp Us</Button>
              </a>
              <Link href="/help">
                <Button variant="outline">Help & Support</Button>
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-orange-100">
              <iframe
                title="The Happy Tails location"
                src="https://maps.google.com/maps?q=Anantnag+Jammu+and+Kashmir&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            {submitted ? (
              <div className="py-8 text-center">
                <h2 className="mb-2 text-xl font-semibold text-orange-700">
                  Message sent!
                </h2>
                <p className="text-stone-600">
                  We will get back to you as soon as possible. For urgent help,
                  message us on WhatsApp.
                </p>
              </div>
            ) : (
              <form
                action={(formData) => {
                  startTransition(async () => {
                    const result = await submitContactForm(formData);
                    if (result.error) {
                      toast.error(result.error);
                    } else {
                      setSubmitted(true);
                      toast.success("Message sent!");
                    }
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required rows={5} />
                </div>
                <Button type="submit" disabled={pending} className="w-full">
                  {pending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
