import { FEATURE_STRIP } from "@/lib/site";

export function FeatureStrip() {
  return (
    <section className="border-y border-orange-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {FEATURE_STRIP.map((item) => (
          <div key={item.title} className="text-center">
            <p className="text-sm font-semibold text-stone-900">{item.title}</p>
            <p className="mt-1 text-xs text-stone-500 sm:text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
