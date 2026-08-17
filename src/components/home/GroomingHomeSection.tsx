import Link from "next/link";
import Image from "next/image";
import { GROOMING_HOME } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function GroomingHomeSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm lg:grid lg:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-[240px] lg:min-h-full">
          <Image
            src={GROOMING_HOME.image}
            alt="Professional pet grooming"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            {GROOMING_HOME.title}
          </h2>
          <p className="mt-3 text-stone-600">{GROOMING_HOME.text}</p>
          <Link href="/services" className="mt-6 inline-block">
            <Button>{GROOMING_HOME.cta}</Button>
          </Link>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {GROOMING_HOME.steps.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-orange-100 bg-orange-50 p-4 text-center"
              >
                <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  {item.step}
                </span>
                <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                <p className="mt-1 text-xs text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
