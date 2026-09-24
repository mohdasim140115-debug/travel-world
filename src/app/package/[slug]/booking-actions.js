"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { notifyPackageBooking } from "@/lib/bookingEmails";

export async function createBooking(prevState, formData) {
  const packageSlug = formData.get("packageSlug");
  const packageTitle = formData.get("packageTitle");
  const departureCity = formData.get("departureCity");
  const departureDate = formData.get("departureDate");
  const guests = Number(formData.get("guests"));
  const totalPrice = Number(formData.get("totalPrice"));
  const customerName = formData.get("customerName")?.trim();
  const customerPhone = formData.get("customerPhone")?.trim();
  const customerEmail = formData.get("customerEmail")?.trim();

  if (!customerName || !customerPhone) {
    return { error: "Please enter your name and phone number." };
  }
  if (!/^[6-9]\d{9}$/.test(customerPhone)) {
    return { error: "Please enter a valid 10-digit Indian mobile number." };
  }

  // This form emails the address the visitor types, so it runs through the
  // same guard as the enquiry form; a bot gets the ordinary success reply.
  const startedAt = Number(formData.get("startedAt"));
  const spam = enquirySpamReason({
    name: customerName,
    phone: customerPhone,
    email: customerEmail || "",
    honeypot: formData.get("company")?.toString() ?? "",
    elapsedMs: Number.isFinite(startedAt) && startedAt > 0 ? Date.now() - startedAt : null,
  });
  if (spam) return { success: true };

  const headerList = await headers();
  if (rateLimited(clientIp(headerList))) return { success: true };

  const booking = await db.booking.create({
    data: {
      packageSlug,
      packageTitle,
      departureCity,
      departureDate,
      guests,
      totalPrice,
      customerName,
      customerPhone,
      customerEmail: customerEmail || null,
    },
  });

  await notifyPackageBooking(booking);

  revalidatePath("/admin/bookings");

  return { success: true };
}
