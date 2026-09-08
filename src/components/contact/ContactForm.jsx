"use client";

import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";

import { createEnquiry } from "@/app/enquiry-actions";

const subjects = [
  "Tour package enquiry",
  "Hotel booking",
  "Flight booking",
  "Transport / cab booking",
  "Gift card",
  "Something else",
];

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(createEnquiry, null);

  if (state?.success) {
    return (
      <div className="rounded-[16px] border border-[#BBF7D0] bg-[#F0FDF4] p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#16A34A]" />
        <h3 className="mt-3 text-[17px] font-bold text-[#0F172A]">Message sent</h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#475569]">
          Thank you — our team has your details and will call you back shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-[16px] border border-[#E2E8F0] bg-white p-5 sm:p-6">
      <input type="hidden" name="source" value="/contact" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[12.5px] font-semibold text-[#0F172A]">Your name *</span>
          <input
            name="name"
            required
            maxLength={80}
            placeholder="Full name"
            className="mt-1.5 h-[44px] w-full rounded-[10px] border border-[#CBD5E1] px-3 text-[14px] text-[#0F172A] outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/15"
          />
        </label>

        <label className="block">
          <span className="text-[12.5px] font-semibold text-[#0F172A]">Phone number *</span>
          <input
            name="phone"
            required
            inputMode="numeric"
            maxLength={14}
            placeholder="10-digit mobile number"
            className="mt-1.5 h-[44px] w-full rounded-[10px] border border-[#CBD5E1] px-3 text-[14px] text-[#0F172A] outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/15"
          />
        </label>

        <label className="block">
          <span className="text-[12.5px] font-semibold text-[#0F172A]">Email</span>
          <input
            name="email"
            type="email"
            maxLength={120}
            placeholder="you@example.com"
            className="mt-1.5 h-[44px] w-full rounded-[10px] border border-[#CBD5E1] px-3 text-[14px] text-[#0F172A] outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/15"
          />
        </label>

        <label className="block">
          <span className="text-[12.5px] font-semibold text-[#0F172A]">I am writing about</span>
          <select
            name="subject"
            defaultValue={subjects[0]}
            className="mt-1.5 h-[44px] w-full rounded-[10px] border border-[#CBD5E1] bg-white px-3 text-[14px] text-[#0F172A] outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/15"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-[12.5px] font-semibold text-[#0F172A]">Message</span>
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          placeholder="Travel dates, number of travellers, destination — anything that helps us plan."
          className="mt-1.5 w-full rounded-[10px] border border-[#CBD5E1] p-3 text-[14px] text-[#0F172A] outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/15"
        />
      </label>

      {state?.error ? (
        <p className="mt-3 rounded-[10px] bg-[#FEF2F2] px-3 py-2 text-[13px] font-medium text-[#B91C1C]">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 flex h-[46px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#FF7A1A] text-[14px] font-bold text-white shadow-[0_4px_12px_rgba(255,122,26,0.3)] transition hover:bg-[#E56A0F] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {isPending ? "Sending…" : "Send Message"}
      </button>

      <p className="mt-2.5 text-center text-[11.5px] text-[#64748B]">
        We reply within one working day. Your details are never shared with anyone else.
      </p>
    </form>
  );
}
