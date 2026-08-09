"use client";

import { useActionState, useEffect } from "react";
import { CalendarDays, CheckCircle2, MapPin, Users, X } from "lucide-react";
import { createBooking } from "@/app/package/[slug]/booking-actions";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN").format(price);
}

export default function BookingModal({ open, onClose, summary }) {
  const [state, formAction, isPending] = useActionState(createBooking, null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="flex max-h-[92vh] w-full max-w-[440px] flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:rounded-[20px]">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3 border-b border-[#EEF1F5] bg-[#0B3B63] px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#A9D8F0]">
              {state?.success ? "Booking confirmed" : "Confirm your booking"}
            </p>
            <h3 className="mt-1 text-[18px] font-bold leading-tight text-white">{summary.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          {state?.success ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F7F0]">
                <CheckCircle2 className="h-7 w-7 text-[#17BEBB]" />
              </div>
              <h4 className="mt-4 text-[17px] font-bold text-[#0F172A]">Booking request received!</h4>
              <p className="mt-1.5 text-[13px] text-[#64748B]">
                Our travel expert will call you shortly to confirm your {summary.title} tour.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 flex h-[44px] w-full items-center justify-center rounded-[10px] bg-[#FF7A1A] text-[14px] font-bold text-white hover:bg-[#E56A0F]"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* TRIP SUMMARY */}
              <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F7FAFC] p-4">
                <div className="flex items-center gap-2 text-[13px] text-[#334155]">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0F4C81]" />
                  {summary.departureCity} • {summary.days} Days / {summary.nights} Nights
                </div>
                <div className="mt-2 flex items-center gap-2 text-[13px] text-[#334155]">
                  <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#0F4C81]" />
                  {summary.departureDate}
                </div>
                <div className="mt-2 flex items-center gap-2 text-[13px] text-[#334155]">
                  <Users className="h-3.5 w-3.5 shrink-0 text-[#0F4C81]" />
                  {summary.guests} {summary.guests === 1 ? "Guest" : "Guests"}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-[#E5E7EB] pt-3">
                  <span className="text-[12px] font-semibold text-[#64748B]">Total price</span>
                  <strong className="text-[20px] text-[#0F172A]">₹{formatPrice(summary.totalPrice)}</strong>
                </div>
              </div>

              {/* FORM */}
              <form action={formAction} className="mt-5 flex flex-col gap-3">
                <input type="hidden" name="packageSlug" value={summary.slug} />
                <input type="hidden" name="packageTitle" value={summary.title} />
                <input type="hidden" name="departureCity" value={summary.departureCity} />
                <input type="hidden" name="departureDate" value={summary.departureDate} />
                <input type="hidden" name="guests" value={summary.guests} />
                <input type="hidden" name="totalPrice" value={summary.totalPrice} />

                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-[#475569]">Full name</label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    placeholder="Enter your full name"
                    className="h-[44px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] outline-none focus:border-[#17BEBB]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-[#475569]">Mobile number</label>
                  <div className="flex h-[44px] items-center rounded-[10px] border border-[#D1D5DB] focus-within:border-[#17BEBB]">
                    <span className="flex h-full items-center border-r border-[#D1D5DB] px-3 text-[13px] text-[#475569]">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      name="customerPhone"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      className="h-full min-w-0 flex-1 px-3 text-[14px] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[12px] font-semibold text-[#475569]">Email (optional)</label>
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="you@example.com"
                    className="h-[44px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[14px] outline-none focus:border-[#17BEBB]"
                  />
                </div>

                {state?.error && (
                  <p className="rounded-[8px] bg-red-50 px-3 py-2 text-[12px] font-medium text-red-600">
                    {state.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-2 flex h-[46px] w-full items-center justify-center rounded-[10px] bg-[#FF7A1A] text-[14px] font-bold text-white transition-colors hover:bg-[#E56A0F] disabled:opacity-60"
                >
                  {isPending ? "Booking..." : `Confirm Booking — ₹${formatPrice(summary.totalPrice)}`}
                </button>
                <p className="text-center text-[11px] text-[#94A3B8]">
                  No payment now. Our team will call to confirm details.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
