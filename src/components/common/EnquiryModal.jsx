"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2, Minus, Phone, Plus, X } from "lucide-react";

import { createEnquiry } from "@/app/enquiry-actions";
import { CONTACT } from "@/lib/contact";

/* =========================================================
   ENQUIRY MODAL
   Mounted once in the root layout, so every page has it.

   Any button anywhere opens it by dispatching an event:

     window.dispatchEvent(new CustomEvent("open-enquiry", {
       detail: { subject: "Best of Kashmir" },
     }))

   That keeps the trigger buttons where they already are —
   no context provider threaded through twenty pages.

   The panel is a fixed-height column: the heading stays put
   at the top, the submit button stays put at the bottom, and
   only the fields between them scroll. On a short laptop
   screen the whole thing used to run off both edges.
========================================================= */

export const ENQUIRY_EVENT = "open-enquiry";

function Stepper({ label, value, onChange, hint }) {
  const button =
    "flex h-9 w-9 items-center justify-center rounded-full border border-[#D8DEE6] bg-white text-[#0F4C81] transition hover:border-[#0F4C81] hover:bg-[#F1F6FC] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white";

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="min-w-0">
        <span className="block text-[13.5px] font-semibold text-[#0F172A]">{label}</span>
        {hint && <span className="mt-0.5 block text-[11.5px] text-[#94A3B8]">{hint}</span>}
      </span>

      <span className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, value - 1))}
          disabled={value <= 1}
          aria-label={`Fewer ${label.toLowerCase()}`}
          className={button}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        <span className="w-8 text-center text-[15px] font-bold tabular-nums text-[#0F172A]">{value}</span>

        <button
          type="button"
          onClick={() => onChange(Math.min(30, value + 1))}
          disabled={value >= 30}
          aria-label={`More ${label.toLowerCase()}`}
          className={button}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </span>
    </div>
  );
}

export default function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("General enquiry");
  const [quote, setQuote] = useState(null);
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);
  const [source, setSource] = useState("");
  const [openedAt, setOpenedAt] = useState(0);
  const [state, formAction, isPending] = useActionState(createEnquiry, null);

  useEffect(() => {
    function onOpen(event) {
      const next = event.detail?.quote?.price ? event.detail.quote : null;
      setSubject(event.detail?.subject || "General enquiry");
      setQuote(next);
      // Opens on what the tour actually is, so the first number the visitor
      // sees is the advertised price.
      setNights(Math.max(1, Number(next?.nights) || 1));
      setGuests(1);
      setSource(typeof window === "undefined" ? "" : window.location.pathname);
      setOpenedAt(Date.now());
      setOpen(true);
    }

    window.addEventListener(ENQUIRY_EVENT, onOpen);
    return () => window.removeEventListener(ENQUIRY_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  const sent = state?.success;

  // The advertised price is one person for the tour's own number of nights, so
  // a per-person-per-night rate scales it to whatever the visitor picks.
  const baseNights = Math.max(1, Number(quote?.nights) || 1);
  const perNight = quote ? Math.round(quote.price / baseNights) : 0;
  const estimate = quote ? perNight * nights * guests : 0;
  const money = (value) => new Intl.NumberFormat("en-IN").format(value);

  const field =
    "h-[46px] w-full rounded-[10px] border border-[#D8DEE6] bg-white px-3.5 text-[14px] text-[#0F172A] outline-none transition-colors placeholder:text-[#9AA4B2] focus:border-[#17BEBB] focus:ring-2 focus:ring-[#17BEBB]/15";

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0B1220]/65 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div className="flex max-h-[92dvh] w-full max-w-[460px] flex-col overflow-hidden rounded-t-[22px] bg-white shadow-[0_24px_70px_rgba(8,18,38,0.35)] sm:max-h-[88dvh] sm:rounded-[22px]">

        {/* HEADER — stays put */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#EEF1F5] px-5 pb-3.5 pt-4 sm:px-6 sm:pt-5">
          <div className="min-w-0">
            <h3 className="text-[17px] font-bold leading-tight text-[#0F172A]">
              {sent ? "Thanks, we have your details" : "Send us an enquiry"}
            </h3>
            {!sent && (
              <p className="mt-1 truncate text-[12.5px] text-[#6B7280]">{subject}</p>
            )}
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:bg-[#F7FAFC] hover:text-[#0F172A]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {sent ? (
          <div className="overflow-y-auto px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3 rounded-[12px] bg-[#E6F7F5] p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F9C99]" />
              <p className="text-[13px] leading-relaxed text-[#0F172A]">
                Our team will call you shortly. For anything urgent you can reach us on{" "}
                <a href={CONTACT.phoneHref} className="font-bold text-[#0F4C81] underline">
                  {CONTACT.phone}
                </a>
                .
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 h-[46px] w-full rounded-[10px] bg-[#0B3B63] text-[14px] font-bold text-white transition hover:bg-[#0F4C81]"
            >
              Close
            </button>
          </div>
        ) : (
          <form action={formAction} className="flex min-h-0 flex-1 flex-col">

            {/* FIELDS — the only part that scrolls */}
            <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-5 py-4 sm:px-6">
              <input type="hidden" name="subject" value={subject} />
              <input type="hidden" name="source" value={source} />
              {/* Anti-spam: hidden from people, irresistible to bots. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <input type="hidden" name="startedAt" value={openedAt} />

              <input type="text" name="name" required placeholder="Full Name" className={field} />
              <input type="tel" name="phone" required placeholder="Mobile Number" className={field} />
              <input type="email" name="email" placeholder="Email (optional)" className={field} />

              <textarea
                name="message"
                rows={3}
                placeholder="Tell us what you are planning (optional)"
                className="w-full resize-none rounded-[10px] border border-[#D8DEE6] bg-white p-3.5 text-[14px] text-[#0F172A] outline-none transition-colors placeholder:text-[#9AA4B2] focus:border-[#17BEBB] focus:ring-2 focus:ring-[#17BEBB]/15"
              />

              {quote && (
                <div className="overflow-hidden rounded-[14px] border border-[#E2E8F0]">
                  <div className="space-y-3 bg-[#F8FAFC] px-3.5 py-3">
                    <Stepper
                      label="Nights"
                      value={nights}
                      onChange={setNights}
                      hint={`${nights + 1} days / ${nights} nights`}
                    />
                    <div className="border-t border-[#E6EBF1] pt-3">
                      <Stepper label="Guests" value={guests} onChange={setGuests} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[#E2E8F0] bg-white px-3.5 py-3">
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-semibold text-[#475569]">Estimated total</p>
                      <p className="mt-0.5 text-[11.5px] text-[#94A3B8]">
                        ₹{money(perNight)} per person / night
                      </p>
                    </div>
                    <p className="shrink-0 text-[22px] font-extrabold leading-none tracking-tight text-[#0F172A]">
                      ₹{money(estimate)}
                    </p>
                  </div>

                  <p className="border-t border-[#EEF1F5] bg-[#FFF8F1] px-3.5 py-2 text-[10.5px] leading-snug text-[#9A6A33]">
                    Indicative only — we confirm the final price on call, based on your dates,
                    hotels and group size.
                  </p>
                </div>
              )}

              {state?.error && (
                <p className="rounded-[8px] bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">
                  {state.error}
                </p>
              )}
            </div>

            {/* ACTIONS — stay put */}
            <div className="shrink-0 border-t border-[#EEF1F5] bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 sm:px-6">
              <button
                type="submit"
                disabled={isPending}
                className="h-[48px] w-full rounded-[10px] bg-[#FF7A1A] text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Sending…" : "Send enquiry"}
              </button>

              <a
                href={CONTACT.phoneHref}
                className="mt-2 flex items-center justify-center gap-2 text-[13px] font-semibold text-[#0F4C81] no-underline"
              >
                <Phone className="h-4 w-4" />
                Or call {CONTACT.phone}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
