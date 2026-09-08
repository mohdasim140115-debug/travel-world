"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { notifyEnquiry } from "@/lib/bookingEmails";

/* =========================================================
   ENQUIRY FORM
   Every "Enquire Now" / "Quick Enquiry" button on the site
   posts here. The row is saved first and the email is sent
   after, so a mail failure never loses the lead.
========================================================= */

const text = (formData, field) => formData.get(field)?.toString().trim() ?? "";

export async function createEnquiry(prevState, formData) {
  const name = text(formData, "name");
  const phone = text(formData, "phone");
  const email = text(formData, "email");
  const message = text(formData, "message");

  if (!name || !phone) {
    return { error: "Please enter your name and phone number." };
  }
  if (!/^\d{10}$/.test(phone.replace(/[\s-]/g, ""))) {
    return { error: "Please enter a valid 10-digit phone number." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { error: "Please enter a valid email address, or leave it blank." };
  }

  const enquiry = await db.enquiry.create({
    data: {
      name: name.slice(0, 80),
      phone: phone.replace(/[\s-]/g, ""),
      email: email ? email.toLowerCase().slice(0, 120) : null,
      subject: text(formData, "subject").slice(0, 160) || "General enquiry",
      message: message.slice(0, 1000) || null,
      source: text(formData, "source").slice(0, 200) || null,
    },
  });

  await notifyEnquiry(enquiry);

  revalidatePath("/admin/enquiries");
  return { success: true };
}
