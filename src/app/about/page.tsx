import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Mail, Phone, Scissors, Shield, Store } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { ABOUT_PAGE, SITE, whatsappUrl } from "@/lib/site";
import { STORE_PHONE, STORE_PHONE_TEL } from "@/lib/india";

export const metadata: Metadata = {
  title: "About Us",
  description: SITE.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={ABOUT_PAGE.hero.eyebrow}
        title={ABOUT_PAGE.hero.title}
        description={ABOUT_PAGE.hero.description}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">
              {ABOUT_PAGE.story.title}
            </h2>
            {ABOUT_PAGE.story.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-stone-600">
                {paragraph}
              </p>
            ))}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {SITE.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-center"
                >
                  <strong className="text-2xl text-orange-700">{stat.value}</strong>
                  <span className="mt-1 block text-sm text-stone-600">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm">
            <Store className="mx-auto mb-4 h-10 w-10 text-orange-600" />
            <h3 className="text-xl font-bold text-stone-900">{ABOUT_PAGE.team.title}</h3>
            <p className="mt-3 text-sm text-stone-600">{ABOUT_PAGE.team.text}</p>
            <a href={whatsappUrl(SITE.whatsappServices)} className="mt-6 inline-block">
              <Button>{ABOUT_PAGE.team.cta}</Button>
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ABOUT_PAGE.values.map((value, index) => {
            const Icon = [Shield, Scissors, MapPin][index] ?? Shield;
            return (
              <article
                key={value.title}
                className="rounded-2xl border border-orange-100 bg-white p-6"
              >
                <Icon className="mb-3 h-8 w-8 text-orange-600" />
                <h3 className="font-semibold text-stone-900">{value.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{value.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ABOUT_PAGE.services.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-orange-100 bg-orange-50 p-6"
            >
              <h2 className="text-lg font-bold text-stone-900">{item.title}</h2>
              <p className="mt-2 text-sm text-stone-600">{item.text}</p>
              <Link
                href={item.href}
                className="mt-4 inline-block text-sm font-medium text-orange-700 hover:underline"
              >
                {item.linkLabel}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-stone-900">Visit the shop</h2>
            <p className="mt-4 flex items-start gap-2 text-stone-600">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
              {SITE.address.line}
            </p>
            <p className="mt-3 flex items-center gap-2 text-stone-600">
              <Phone className="h-4 w-4 shrink-0 text-orange-600" />
              <a href={`tel:${STORE_PHONE_TEL}`}>{STORE_PHONE}</a>
            </p>
            <p className="mt-3 flex items-center gap-2 text-stone-600">
              <Mail className="h-4 w-4 shrink-0 text-orange-600" />
              <a href={`mailto:${SITE.emails.primary}`}>{SITE.emails.primary}</a>
            </p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-stone-900">
              {ABOUT_PAGE.social.title}
            </h2>
            <p className="mt-2 text-sm text-stone-600">{ABOUT_PAGE.social.text}</p>
            <div className="mt-4 flex gap-4">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-orange-700 hover:underline"
              >
                Instagram
              </a>
              <a
                href={whatsappUrl(SITE.whatsappProducts)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-orange-700 hover:underline"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
