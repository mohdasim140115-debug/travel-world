"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { notifyEnquiry } from "@/lib/bookingEmails";
import { checkVisitor, clientIp, enquirySpamReason } from "@/lib/spamGuard";

/* =========================================================
   ENQUIRY FORM
   Every "Enquire Now" / "Quick Enquiry" button on the site
   posts here. The row is saved first and the email is sent
   after, so a mail failure never loses the lead.

   Everything runs through the spam guard first — this form
   is public, and a link-spam botnet found it once already.
========================================================= */

const text = (formData, field) => formData.get(field)?.toString().trim() ?? "";

export async function createEnquiry(prevState, formData) {
  const name = text(formData, "name");
  const phone = text(formData, "phone").replace(/[\s-]/g, "");
  const email = text(formData, "email").toLowerCase();
  const message = text(formData, "message");

  if (!name || !phone) {
    return { error: "Please enter your name and phone number." };
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return { error: "Please enter a valid 10-digit Indian mobile number." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { error: "Please enter a valid email address, or leave it blank." };
  }

  // A bot is told the same thing a person is, so it cannot tune its payload
  // against our rules — but nothing is stored and no mail goes out.
  const headerList = await headers();
  const startedAt = Number(text(formData, "startedAt"));

  const reason = enquirySpamReason({
    name,
    phone,
    email,
    message,
    honeypot: text(formData, "company"),
    elapsedMs: Number.isFinite(startedAt) && startedAt > 0 ? Date.now() - startedAt : null,
    userAgent: headerList.get("user-agent"),
  });

  // Recorded either way: a repeat offender earns a block whether or not this
  // particular attempt tripped a content rule.
  const visitor = await checkVisitor(clientIp(headerList), { spam: Boolean(reason) });

  // Spam content is dropped outright. Clean content from a blocked or
  // rate-limited address is still saved — a real customer behind a shared
  // connection must never lose their enquiry — but no mail goes out for it,
  // so a flood can never reach the mailbox. It waits in the admin panel
  // under "Review" instead.
  if (reason) return { success: true };

  const enquiry = await db.enquiry.create({
    data: {
      name: name.slice(0, 60),
      phone,
      email: email ? email.slice(0, 120) : null,
      subject: text(formData, "subject").slice(0, 160) || "General enquiry",
      message: message.slice(0, 1000) || null,
      source: text(formData, "source").slice(0, 200) || null,
      status: visitor.allowed ? "New" : "Review",
    },
  });

  if (visitor.allowed) await notifyEnquiry(enquiry);

  revalidatePath("/admin/enquiries");
  return { success: true };
}
