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
    <footer className="mt-auto border-t border-orange-100 bg-stone-900 text-stone-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="mb-2 text-lg font-bold text-white">{SITE.name}</p>
          <p className="text-sm text-stone-300">{SITE.tagline}</p>
          <a
            href={whatsappUrl()}
            className="mt-4 inline-block rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
          >
            WhatsApp Us
          </a>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Shop</h3>
          <ul className="space-y-2 text-sm text-stone-300">
            {FOOTER_SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-orange-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">Company</h3>
          <ul className="space-y-2 text-sm text-stone-300">
            {FOOTER_COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-orange-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="mb-3 font-semibold text-white">Visit Us</h3>
          <p className="text-sm text-stone-300">{SITE.address.line}</p>
          <p className="mt-2 text-sm text-stone-300">
            <a href={`tel:${STORE_PHONE_TEL}`} className="hover:text-orange-300">
              {STORE_PHONE}
            </a>
            <br />
            <a
              href={`mailto:${SITE.emails.primary}`}
              className="hover:text-orange-300"
            >
              {SITE.emails.primary}
            </a>
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-300"
            >
              Instagram
            </a>
            <a
              href={whatsappUrl(SITE.whatsappProducts)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-800 px-4 py-4 text-center text-sm text-stone-400">
        Designed and developed by{" "}
        <a
          href={SITE.developer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-300"
        >
          {SITE.developer.name}
        </a>
      </div>
    </footer>
  );
}
