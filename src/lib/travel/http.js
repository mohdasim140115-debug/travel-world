import { TravelError, TravelErrorCode } from "./errors.js";

/* =========================================================
   SUPPLIER HTTP CLIENT
   Server-only. Adds a timeout, turns transport failures into
   TravelErrors, and keeps credentials out of the logs.

   Import this from adapter code only — never from a component.
========================================================= */

const DEFAULT_TIMEOUT_MS = Number(process.env.TRAVEL_API_TIMEOUT_MS) || 20000;

const SECRET_KEYS = /^(authorization|x-api-key|api-key|apikey|token|secret|password|signature)$/i;

/** Header map with every credential replaced, for logs. */
function redactHeaders(headers = {}) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, SECRET_KEYS.test(key) ? "[redacted]" : value])
  );
}

export async function supplierFetch(url, { method = "GET", headers = {}, body, timeoutMs, label = "supplier" } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs ?? DEFAULT_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: { "content-type": "application/json", ...headers },
      body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (error) {
    clearTimeout(timer);
    if (error.name === "AbortError") {
      throw new TravelError(TravelErrorCode.TIMEOUT, `${label} timed out`, { cause: error });
    }
    // Never include the URL: query strings can carry keys.
    throw new TravelError(TravelErrorCode.SUPPLIER_UNAVAILABLE, `${label} unreachable`, { cause: error });
  } finally {
    clearTimeout(timer);
  }

  const text = await response.text();
  let payload = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text;
  }

  if (!response.ok) {
    console.error(`[travel] ${label} responded ${response.status}`, {
      headers: redactHeaders(headers),
      body: typeof payload === "string" ? payload.slice(0, 400) : payload,
    });

    throw new TravelError(
      response.status >= 500 ? TravelErrorCode.SUPPLIER_UNAVAILABLE : TravelErrorCode.BOOKING_FAILED,
      `${label} returned ${response.status}`,
      { details: { status: response.status } }
    );
  }

  return payload;
}
