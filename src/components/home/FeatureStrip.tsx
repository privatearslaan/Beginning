import {
  Lock,
  RotateCcw,
  Scissors,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { FEATURE_STRIP } from "@/lib/site";

const icons = [Truck, ShieldCheck, RotateCcw, Lock, Scissors];

export function FeatureStrip() {
  return (
    <section className="relative border-y border-line/70 bg-white/80">
      <div className="absolute inset-x-0 top-0 h-px shimmer-line opacity-70" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
        {FEATURE_STRIP.map((item, index) => {
          const Icon = icons[index] ?? ShieldCheck;
          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-line/60 bg-cream/50 p-4 text-center transition hover:border-orange-brand/30 hover:bg-white hover:shadow-lg hover:shadow-orange-brand/10"
            >
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-brand to-orange-dark text-white shadow-md shadow-orange-brand/25 transition group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-black text-ink">{item.title}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
