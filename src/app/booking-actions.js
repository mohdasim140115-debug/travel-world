"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {
  notifyFlightBooking,
  notifyHotelBooking,
  notifyTransportBooking,
} from "@/lib/bookingEmails";

/* =========================================================
   BOOKING REQUESTS — hotels, flights and transport
   Package bookings have their own action next to that page.
   Each type gets its own collection so the admin panel can
   list them separately with the fields that matter to it.
========================================================= */

function text(formData, field) {
  return formData.get(field)?.toString().trim() ?? "";
}

function checkContact(name, phone) {
  if (!name || !phone) return "Please enter your name and phone number.";
  if (!/^[6-9]d{9}$/.test(phone)) return "Please enter a valid 10-digit Indian mobile number.";
  return null;
}

/**
 * True when the submission should be dropped without a word — same reasoning
 * as the enquiry form: a bot must not learn which rule stopped it. These
 * forms also email whatever address the visitor types.
 */
async function shouldDrop(formData, { name, phone, email }) {
  const startedAt = Number(text(formData, "startedAt"));

  const reason = enquirySpamReason({
    name,
    phone,
    email,
    message: text(formData, "message"),
    honeypot: text(formData, "company"),
    elapsedMs: Number.isFinite(startedAt) && startedAt > 0 ? Date.now() - startedAt : null,
  });
  if (reason) return true;

  const headerList = await headers();
  return rateLimited(clientIp(headerList));
}

export async function createHotelBooking(prevState, formData) {
  const customerName = text(formData, "customerName");
  const customerPhone = text(formData, "customerPhone");

  const error = checkContact(customerName, customerPhone);
  if (error) return { error };

  const customerEmail = text(formData, "customerEmail");
  if (await shouldDrop(formData, { name: customerName, phone: customerPhone, email: customerEmail })) {
    return { success: true };
  }

  const booking = await db.hotelBooking.create({
    data: {
      hotelName: text(formData, "hotelName"),
      roomType: text(formData, "roomType"),
      pricePerNight: Number(formData.get("pricePerNight")) || 0,
      checkIn: text(formData, "checkIn"),
      checkOut: text(formData, "checkOut"),
      guests: Number(formData.get("guests")) || 1,
      customerName,
      customerPhone,
      customerEmail: customerEmail || null,
    },
  });

  await notifyHotelBooking(booking);

  revalidatePath("/admin/hotel-bookings");
  return { success: true };
}

export async function createFlightBooking(prevState, formData) {
  const customerName = text(formData, "customerName");
  const customerPhone = text(formData, "customerPhone");

  const error = checkContact(customerName, customerPhone);
  if (error) return { error };

  const customerEmail = text(formData, "customerEmail");
  if (await shouldDrop(formData, { name: customerName, phone: customerPhone, email: customerEmail })) {
    return { success: true };
  }

  const booking = await db.flightBooking.create({
    data: {
      airline: text(formData, "airline"),
      flightNumber: text(formData, "flightNumber"),
      from: text(formData, "from"),
      to: text(formData, "to"),
      departureTime: text(formData, "departureTime"),
      arrivalTime: text(formData, "arrivalTime"),
      price: Number(formData.get("price")) || 0,
      customerName,
      customerPhone,
      customerEmail: customerEmail || null,
    },
  });

  await notifyFlightBooking(booking);

  revalidatePath("/admin/flight-bookings");
  return { success: true };
}

export async function createTransportBooking(prevState, formData) {
  const customerName = text(formData, "customerName");
  const customerPhone = text(formData, "customerPhone");

  const error = checkContact(customerName, customerPhone);
  if (error) return { error };

  const customerEmail = text(formData, "customerEmail");
  if (await shouldDrop(formData, { name: customerName, phone: customerPhone, email: customerEmail })) {
    return { success: true };
  }

  const booking = await db.transportBooking.create({
    data: {
      vehicleName: text(formData, "vehicleName"),
      vehicleType: text(formData, "vehicleType"),
      pickupCity: text(formData, "pickupCity"),
      dropCity: text(formData, "dropCity"),
      days: Number(formData.get("days")) || 1,
      totalPrice: Number(formData.get("totalPrice")) || 0,
      customerName,
      customerPhone,
      customerEmail: customerEmail || null,
    },
  });

  await notifyTransportBooking(booking);

  revalidatePath("/admin/transport-bookings");
  return { success: true };
}
