import type { Metadata } from "next";
import { Heart, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Pawfect Pets and our mission.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold text-stone-900">About Us</h1>
        <p className="mb-8 text-lg text-stone-600">
          Pawfect Pets has been serving the Austin community since 2010. We are
          passionate about helping pet parents find the best products and
          services for their furry, feathered, and finned friends.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Pet-First",
              text: "Every product and service is chosen with your pet's wellbeing in mind.",
            },
            {
              icon: Users,
              title: "Community",
              text: "We are your neighbors — local, friendly, and always here to help.",
            },
            {
              icon: Shield,
              title: "Quality",
              text: "We stock trusted brands and employ certified groomers and caregivers.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-emerald-100 bg-white p-6 text-center"
            >
              <Icon className="mx-auto mb-3 h-8 w-8 text-emerald-600" />
              <h3 className="mb-2 font-semibold text-stone-900">{title}</h3>
              <p className="text-sm text-stone-600">{text}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-2xl font-bold text-stone-900">Our Story</h2>
        <p className="mb-4 text-stone-600">
          Founded by lifelong animal lovers, Pawfect Pets started as a small
          neighborhood store and has grown into a full-service pet destination.
          From premium nutrition to professional grooming, we offer everything
          under one roof.
        </p>
        <p className="text-stone-600">
          Visit us at 123 Pet Lane in Austin, or browse our online shop and
          book services from the comfort of your home.
        </p>
      </div>
    </div>
  );
}
