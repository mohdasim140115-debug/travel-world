import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { verifyMail } from "@/lib/mailer";

/* =========================================================
   ADMIN-ONLY MAIL DIAGNOSTICS
   Tries to log in to the SMTP server and reports what went
   wrong, so a failing booking alert can be diagnosed from the
   deployed site instead of guessing at the host's logs.

   Never returns the password — only its length, which is
   enough to tell "not set" from "set but wrong".
========================================================= */

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json(await verifyMail());
}
