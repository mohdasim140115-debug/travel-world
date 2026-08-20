"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

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
  if (!/^\d{10}$/.test(customerPhone)) {
    return { error: "Please enter a valid 10-digit phone number." };
  }

  await db.booking.create({
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

  revalidatePath("/admin/bookings");

  return { success: true };
}
