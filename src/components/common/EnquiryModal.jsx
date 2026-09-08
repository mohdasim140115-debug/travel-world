"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2, Phone, X } from "lucide-react";

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
========================================================= */

export const ENQUIRY_EVENT = "open-enquiry";

export default function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("General enquiry");
  const [source, setSource] = useState("");
  const [state, formAction, isPending] = useActionState(createEnquiry, null);

  useEffect(() => {
    function onOpen(event) {
      setSubject(event.detail?.subject || "General enquiry");
      setSource(typeof window === "undefined" ? "" : window.location.pathname);
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
  const field =
    "h-[46px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] outline-none transition-colors focus:border-[#17BEBB]";

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-[460px] rounded-t-[20px] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:rounded-[20px]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[17px] font-bold text-[#0F172A]">
              {sent ? "Thanks, we have your details" : "Send us an enquiry"}
            </h3>
            {!sent && (
              <p className="mt-1 truncate text-[13px] font-light text-[#6B7280]">{subject}</p>
            )}
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:bg-[#F7FAFC]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {sent ? (
          <div className="mt-4">
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
          <form action={formAction} className="mt-4 space-y-2.5">
            <input type="hidden" name="subject" value={subject} />
            <input type="hidden" name="source" value={source} />

            <input type="text" name="name" required placeholder="Full Name" className={field} />
            <input type="tel" name="phone" required placeholder="Mobile Number" className={field} />
            <input type="email" name="email" placeholder="Email (optional)" className={field} />

            <textarea
              name="message"
              rows={3}
              placeholder="Tell us what you are planning (optional)"
              className="w-full resize-none rounded-[10px] border border-[#D1D5DB] p-3 text-[14px] outline-none transition-colors focus:border-[#17BEBB]"
            />

            {state?.error && (
              <p className="rounded-[8px] bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="h-[48px] w-full rounded-[10px] bg-[#FF7A1A] text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending…" : "Send enquiry"}
            </button>

            <a
              href={CONTACT.phoneHref}
              className="flex items-center justify-center gap-2 pt-1 text-[13px] font-semibold text-[#0F4C81] no-underline"
            >
              <Phone className="h-4 w-4" />
              Or call {CONTACT.phone}
            </a>
          </form>
        )}
      </div>
    </div>
  );
}
