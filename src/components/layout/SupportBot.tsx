"use client";

import { useState } from "react";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { SUPPORT_BOT_ANSWERS, whatsappUrl, SITE } from "@/lib/site";

export function SupportBot() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="fixed bottom-20 right-5 z-40 lg:bottom-5">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-line/70 glass-panel p-4 shadow-2xl shadow-orange-brand/15">
          <div className="mb-3 flex items-center justify-between">
            <strong className="flex items-center gap-2 font-black text-ink">
              <Sparkles className="h-4 w-4 text-orange-brand" />
              Happy Tails Help
            </strong>
            <button
              type="button"
              aria-label="Close help"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 hover:bg-orange-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mb-3 text-sm text-muted">Choose a quick question.</p>
          <div className="space-y-2">
            {SUPPORT_BOT_ANSWERS.map((item) => (
              <button
                key={item.label}
                type="button"
                className="w-full rounded-xl border border-line/70 px-3 py-2 text-left text-sm transition hover:border-orange-brand/30 hover:bg-orange-50"
                onClick={() => setAnswer(item.answer)}
              >
                {item.label}
              </button>
            ))}
            <a
              href={whatsappUrl(SITE.whatsappLiveAgent)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-[#25D366] px-3 py-2 text-center text-sm font-bold text-white hover:opacity-90"
            >
              Live agent on WhatsApp
            </a>
          </div>
          {answer && (
            <p className="mt-3 rounded-xl bg-cream p-3 text-sm text-ink">
              {answer}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        aria-label="Open help bot"
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-brand to-orange-dark text-white shadow-xl shadow-orange-brand/30 transition hover:scale-105"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
}
