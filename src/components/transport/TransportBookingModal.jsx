"use client";

import { useActionState } from "react";
import { X } from "lucide-react";
import { createTransportBooking } from "@/app/booking-actions";

export default function TransportBookingModal({ option, onClose }) {
  const [state, formAction, isPending] = useActionState(createTransportBooking, null);

  if (!option) return null;

  const submitted = state?.success;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[440px] rounded-[20px] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-[#0F172A]">
            {submitted ? "Booking Request Received" : `Book ${option.name}`}
          </h3>
          <button type="button" onClick={onClose} aria-label="Close" className="text-[#6B7280]">
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="mt-4">
            <p className="text-[13px] leading-[1.6] text-[#4B5563]">
              Thank you! This is a demo booking flow — no payment has been processed. Our team will
              reach out shortly to confirm your {option.name} booking.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 h-[44px] w-full rounded-[10px] bg-[#0B3B63] text-[13px] font-bold text-white transition hover:bg-[#0F4C81]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mt-4 space-y-2 rounded-[14px] border border-[#E5E7EB] bg-[#F7FAFC] p-4 text-[12px] text-[#374151]">
              {option.route && (
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Route</span>
                  <strong>
                    {option.route.from} → {option.route.to} ({option.route.distanceKm} km)
                  </strong>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Vehicle</span>
                <strong>{option.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Capacity</span>
                <strong>{option.capacity} Seater · {option.acType}</strong>
              </div>
              {option.days && (
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">Duration</span>
                  <strong>
                    {option.days} Day{option.days > 1 ? "s" : ""} (₹{option.perDay.toLocaleString("en-IN")}/day)
                  </strong>
                </div>
              )}
              <div className="flex justify-between border-t border-[#E5E7EB] pt-2">
                <span className="text-[#6B7280]">{option.totalPrice ? "Total price" : "Starting price"}</span>
                <strong className="text-[14px]">
                  ₹{(option.totalPrice || option.basePrice).toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            <form action={formAction} className="mt-4 space-y-2.5">
              <input type="hidden" name="vehicleName" value={option.name} />
              <input type="hidden" name="vehicleType" value={option.type} />
              <input type="hidden" name="days" value={option.days ?? 1} />
              <input type="hidden" name="totalPrice" value={option.totalPrice ?? option.basePrice ?? 0} />
              <input
                type="text"
                name="customerName"
                required
                placeholder="Full Name"
                className="h-[44px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[13px] outline-none transition-colors focus:border-[#17BEBB]"
              />
              <input
                type="tel"
                name="customerPhone"
                required
                placeholder="Mobile Number"
                className="h-[44px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[13px] outline-none transition-colors focus:border-[#17BEBB]"
              />
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  name="pickupCity"
                  required
                  placeholder="Pickup City"
                  defaultValue={option.route?.from ?? ""}
                  className="h-[44px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[13px] outline-none transition-colors focus:border-[#17BEBB]"
                />
                <input
                  type="text"
                  name="dropCity"
                  required
                  placeholder="Drop City"
                  defaultValue={option.route?.to ?? ""}
                  className="h-[44px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[13px] outline-none transition-colors focus:border-[#17BEBB]"
                />
              </div>

              {state?.error && (
                <p className="rounded-[8px] bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="mt-2 h-[44px] w-full rounded-[10px] bg-[#FF7A1A] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:-translate-y-0.5 hover:bg-[#E56A0F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? "Sending…" : "Continue Booking"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
