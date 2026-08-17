import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { HELP_PAGE, SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help & Support",
  description: SITE.description,
};

export default function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow={HELP_PAGE.hero.eyebrow}
        title={HELP_PAGE.hero.title}
        description={HELP_PAGE.hero.description}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HELP_PAGE.topics.map((topic) => (
            <article
              key={topic.title}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-stone-900">{topic.title}</h2>
              <p className="mt-3 text-sm text-stone-600">{topic.text}</p>
            </article>
          ))}
        </div>
        <a href={whatsappUrl(SITE.whatsappSupport)} className="mt-8 inline-block">
          <Button>Chat on WhatsApp</Button>
        </a>
      </div>
    </>
  );
}
