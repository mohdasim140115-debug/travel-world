"use client";

import { useActionState } from "react";
import { X } from "lucide-react";
import { createFlightBooking } from "@/app/booking-actions";

export default function FlightBookingModal({ flight, from, to, onClose }) {
  const [state, formAction, isPending] = useActionState(createFlightBooking, null);

  if (!flight) return null;

  const submitted = state?.success;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[440px] rounded-[20px] bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-[#0F172A]">
            {submitted ? "Booking Request Received" : "Confirm Your Flight"}
          </h3>
          <button type="button" onClick={onClose} aria-label="Close" className="text-[#6B7280]">
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div className="mt-4">
            <p className="text-[12px] leading-[1.6] text-[#4B5563]">
              Thank you! This is a demo booking flow — no payment has been processed. Our team will
              reach out shortly with your {from} to {to} flight details.
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
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Route</span>
                <strong>
                  {from} ({flight.fromCode}) → {to} ({flight.toCode})
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Airline</span>
                <strong>
                  {flight.airline} · {flight.flightNumber}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Departure</span>
                <strong>{flight.departureTime}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Arrival</span>
                <strong>{flight.arrivalTime}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Passengers</span>
                <strong>1 Adult, Economy</strong>
              </div>
              <div className="flex justify-between border-t border-[#E5E7EB] pt-2">
                <span className="text-[#6B7280]">Fare</span>
                <strong className="text-[13px]">₹{flight.price.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            <form action={formAction} className="mt-4 space-y-2">
              <input type="hidden" name="airline" value={flight.airline} />
              <input type="hidden" name="flightNumber" value={flight.flightNumber} />
              <input type="hidden" name="from" value={from} />
              <input type="hidden" name="to" value={to} />
              <input type="hidden" name="departureTime" value={flight.departureTime} />
              <input type="hidden" name="arrivalTime" value={flight.arrivalTime} />
              <input type="hidden" name="price" value={flight.price} />
              <input
                type="text"
                name="customerName"
                required
                placeholder="Full Name"
                className="h-[38px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[13px] outline-none focus:border-[#17BEBB]"
              />
              <input
                type="email"
                name="customerEmail"
                required
                placeholder="Email"
                className="h-[38px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[13px] outline-none focus:border-[#17BEBB]"
              />
              <input
                type="tel"
                name="customerPhone"
                required
                placeholder="Mobile Number"
                className="h-[38px] w-full rounded-[10px] border border-[#D1D5DB] px-3 text-[13px] outline-none focus:border-[#17BEBB]"
              />

              {state?.error && (
                <p className="rounded-[8px] bg-red-50 px-3 py-2 text-[12px] font-medium text-red-700">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="mt-2 h-[44px] w-full rounded-[10px] bg-[#FF7A1A] text-[13px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F] disabled:cursor-not-allowed disabled:opacity-60"
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
