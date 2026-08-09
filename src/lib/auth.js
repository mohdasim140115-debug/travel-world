import { createHmac, timingSafeEqual } from "node:crypto";

const SECRET = process.env.ADMIN_SESSION_SECRET || "travel-world-admin-secret-change-me";
const SESSION_COOKIE = "tw_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sign(value) {
  return createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createSessionToken() {
  const payload = `admin.${Date.now()}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function isValidSessionToken(token) {
  if (!token) return false;
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;

  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const expected = sign(payload);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export const ADMIN_SESSION_COOKIE = SESSION_COOKIE;
export const ADMIN_SESSION_MAX_AGE = SESSION_MAX_AGE;

// Re-checked inside every admin server action, not just in proxy.js —
// Server Functions can be invoked directly via POST, bypassing proxy matchers.
export async function requireAdminSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!isValidSessionToken(token)) {
    throw new Error("Not authenticated");
  }
}
