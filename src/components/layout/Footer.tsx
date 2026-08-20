import Link from "next/link";
import {
  FOOTER_COMPANY_LINKS,
  FOOTER_SHOP_LINKS,
  SITE,
  whatsappUrl,
} from "@/lib/site";
import { STORE_PHONE, STORE_PHONE_TEL } from "@/lib/india";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-ink text-white">
      <div className="absolute inset-0 mesh-bg-dark opacity-50" />
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-orange-brand/15 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-lime-brand/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="mb-2 text-xl font-black">{SITE.name}</p>
          <p className="text-sm text-white/70">{SITE.tagline}</p>
          <a
            href={whatsappUrl()}
            className="mt-5 inline-block rounded-xl bg-gradient-to-r from-orange-brand to-orange-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-brand/25 transition hover:scale-[1.02]"
          >
            WhatsApp Us
          </a>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-lime-brand">
            Shop
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            {FOOTER_SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-lime-brand">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            {FOOTER_COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-lime-brand">
            Visit Us
          </h3>
          <p className="text-sm text-white/70">{SITE.address.line}</p>
          <p className="mt-2 text-sm text-white/70">
            <a href={`tel:${STORE_PHONE_TEL}`} className="hover:text-white">
              {STORE_PHONE}
            </a>
            <br />
            <a
              href={`mailto:${SITE.emails.primary}`}
              className="hover:text-white"
            >
              {SITE.emails.primary}
            </a>
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white"
            >
              Instagram
            </a>
            <a
              href={whatsappUrl(SITE.whatsappProducts)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-4 py-5 text-center text-sm text-white/50">
        Designed and developed by{" "}
        <a
          href={SITE.developer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-white/80 hover:text-lime-brand"
        >
          {SITE.developer.name}
        </a>
      </div>
    </footer>
  );
}
