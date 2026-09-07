import { NextResponse } from "next/server";

import { TravelError, TravelErrorCode } from "./errors.js";

/* =========================================================
   API RESPONSE HELPERS
   One shape for every travel route:
     success -> { ok: true, ...data }
     failure -> { ok: false, code, message }

   Unknown errors are logged server-side and answered with a
   generic 500 — supplier internals and stack traces never
   reach the browser.
========================================================= */

export const ok = (data, init) => NextResponse.json({ ok: true, ...data }, init);

export function fail(error, label = "travel") {
  if (error instanceof TravelError) {
    if (error.status >= 500) console.error(`[${label}] ${error.code}: ${error.message}`);
    return NextResponse.json(error.toResponse(), { status: error.status });
  }

  console.error(`[${label}] unhandled`, error);
  return NextResponse.json(
    { ok: false, code: TravelErrorCode.BOOKING_FAILED, message: "Something went wrong. Please try again." },
    { status: 500 }
  );
}

/** Parses a JSON body, refusing anything that is not an object. */
export async function readJson(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not an object");
    return body;
  } catch {
    throw new TravelError(TravelErrorCode.INVALID_INPUT, "Send a JSON object body.", { expose: true });
  }
}

/** Idempotency key from the header or body — required by every booking write. */
export function idempotencyKey(request, body) {
  const key = request.headers.get("idempotency-key") || body?.idempotencyKey;
  if (typeof key !== "string" || key.length < 8 || key.length > 100) {
    throw new TravelError(
      TravelErrorCode.INVALID_INPUT,
      "An Idempotency-Key header (8-100 chars) is required for booking requests.",
      { expose: true }
    );
  }
  return key;
}
