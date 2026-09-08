"use client";

import { ENQUIRY_EVENT } from "./EnquiryModal";

/* Opens the shared enquiry modal. Wraps any button or link, so a server
   component can trigger the modal without becoming a client component. */

export function openEnquiry(subject) {
  window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT, { detail: { subject } }));
}

export default function EnquiryTrigger({ subject, className, children, stopPropagation = false }) {
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
        openEnquiry(subject);
      }}
    >
      {children}
    </button>
  );
}
