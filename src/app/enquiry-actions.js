"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { notifyEnquiry } from "@/lib/bookingEmails";
import { clientIp, enquirySpamReason, rateLimited } from "@/lib/spamGuard";

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
  const startedAt = Number(text(formData, "startedAt"));
  const reason = enquirySpamReason({
    name,
    phone,
    email,
    message,
    honeypot: text(formData, "company"),
    elapsedMs: Number.isFinite(startedAt) && startedAt > 0 ? Date.now() - startedAt : null,
  });

  if (reason) return { success: true };

  const headerList = await headers();
  if (rateLimited(clientIp(headerList))) return { success: true };

  const enquiry = await db.enquiry.create({
    data: {
      name: name.slice(0, 60),
      phone,
      email: email ? email.slice(0, 120) : null,
      subject: text(formData, "subject").slice(0, 160) || "General enquiry",
      message: message.slice(0, 1000) || null,
      source: text(formData, "source").slice(0, 200) || null,
    },
  });

  await notifyEnquiry(enquiry);

  revalidatePath("/admin/enquiries");
  return { success: true };
}
