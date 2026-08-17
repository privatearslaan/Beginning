"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SUPPORT_BOT_ANSWERS, whatsappUrl, SITE } from "@/lib/site";

export function SupportBot() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="fixed bottom-20 right-5 z-40 lg:bottom-5">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-orange-100 bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <strong className="text-stone-900">Happy Tails Help</strong>
            <button
              type="button"
              aria-label="Close help"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 hover:bg-stone-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mb-3 text-sm text-stone-600">Choose a quick question.</p>
          <div className="space-y-2">
            {SUPPORT_BOT_ANSWERS.map((item) => (
              <button
                key={item.label}
                type="button"
                className="w-full rounded-lg border border-orange-100 px-3 py-2 text-left text-sm hover:bg-orange-50"
                onClick={() => setAnswer(item.answer)}
              >
                {item.label}
              </button>
            ))}
            <a
              href={whatsappUrl(SITE.whatsappLiveAgent)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-[#25D366] px-3 py-2 text-center text-sm font-medium text-white hover:opacity-90"
            >
              Live agent on WhatsApp
            </a>
          </div>
          {answer && (
            <p className="mt-3 rounded-lg bg-orange-50 p-3 text-sm text-stone-700">
              {answer}
            </p>
          )}
        </div>
      )}
      <button
        type="button"
        aria-label="Open help bot"
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
}
