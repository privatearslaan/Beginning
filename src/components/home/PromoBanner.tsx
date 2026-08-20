import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { RevealBlock, RevealHeading } from "@/components/ui/RevealHeading";

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-brand via-[#ff6c0c] to-orange-dark p-[1px] shadow-2xl shadow-orange-brand/25">
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-gradient-to-br from-[#ff6c0c] to-orange-dark">
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime-brand/25 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between sm:px-10">
            <div className="flex items-center gap-5 text-white">
              <div className="text-center">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-orange-100">
                  Flat
                </span>
                <strong className="text-6xl font-black leading-none">
                  {SITE.promoDiscount}
                  <small className="text-3xl">%</small>
                </strong>
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-orange-100">
                  Off
                </span>
              </div>
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-bold text-lime-brand">
                  <Sparkles className="h-4 w-4" />
                  First order offer
                </p>
                <RevealHeading delay={100} className="text-2xl font-black sm:text-4xl">
                  On Your First Order
                </RevealHeading>
                <p className="mt-2 text-orange-50">
                  Use Code: <b className="rounded-lg bg-white/15 px-2 py-1">{SITE.promoCode}</b>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white/25 shadow-xl sm:h-36 sm:w-36">
                <Image
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80"
                  alt="Happy dog"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-white text-orange-brand hover:bg-orange-50"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
