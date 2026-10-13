"use client";

import { ENQUIRY_EVENT } from "./EnquiryModal";

/* Opens the shared enquiry modal. Wraps any button or link, so a server
   component can trigger the modal without becoming a client component. */

export function openEnquiry(subject, quote) {
  window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT, { detail: { subject, quote } }));
}

/* quote is { price, nights } for a tour: it turns on the nights and guests
   steppers in the modal and the running total under them. Buttons that are not
   about one tour simply leave it out. */
export default function EnquiryTrigger({ subject, quote, className, children, stopPropagation = false }) {
  return (
    <button
      type="button"
      className={className}
      onClick={(event) => {
        // inside a card that is itself a link, do not follow the link
        if (stopPropagation) {
          event.preventDefault();
          event.stopPropagation();
        }
        openEnquiry(subject, quote);
      }}
    >
      {children}
    </button>
  );
}
