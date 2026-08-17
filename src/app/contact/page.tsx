"use client";

import { useState, useTransition } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Contact Us</h1>
        <p className="mt-2 text-stone-600">
          Have a question? We would love to hear from you.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {[
            { icon: MapPin, label: "Address", value: "123 Pet Lane, Austin, TX 78701" },
            { icon: Phone, label: "Phone", value: "(512) 555-PETS" },
            { icon: Mail, label: "Email", value: "hello@pawfectpets.com" },
            { icon: Clock, label: "Hours", value: "Mon–Fri 9am–7pm, Sat 9am–6pm, Sun 10am–4pm" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4">
              <Icon className="h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-medium text-stone-900">{label}</p>
                <p className="text-stone-600">{value}</p>
              </div>
            </div>
          ))}

          <div className="overflow-hidden rounded-xl border border-emerald-100">
            <iframe
              title="Store location"
              src="https://maps.google.com/maps?q=Austin+TX&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
          {submitted ? (
            <div className="py-8 text-center">
              <h2 className="mb-2 text-xl font-semibold text-emerald-700">
                Message sent!
              </h2>
              <p className="text-stone-600">
                We will get back to you within 1–2 business days.
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
  );
}
