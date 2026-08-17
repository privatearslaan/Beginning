import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="flex flex-col items-center gap-6 px-6 py-8 sm:flex-row sm:justify-between sm:px-10">
          <div className="flex items-center gap-4 text-white">
            <div className="text-center">
              <span className="block text-sm uppercase tracking-wide">Flat</span>
              <strong className="text-5xl font-bold leading-none">
                {SITE.promoDiscount}
                <small className="text-2xl">%</small>
              </strong>
              <span className="block text-sm uppercase tracking-wide">Off</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">On Your First Order</h2>
              <p className="mt-1 text-orange-50">
                Use Code: <b>{SITE.promoCode}</b>
              </p>
            </div>
          </div>
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white/30 sm:h-40 sm:w-40">
            <Image
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80"
              alt="Happy dog"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
