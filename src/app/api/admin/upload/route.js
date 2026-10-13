import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/auth";
import { storeImage } from "@/lib/media";

/* =========================================================
   ADMIN IMAGE UPLOAD
   Takes the file the admin picked and returns the URL to put
   in the record. Admin-only: an open upload endpoint is an
   open door for anyone who finds it.
========================================================= */

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await requireAdminSession();
  } catch {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const stored = await storeImage(form.get("file"));
    return NextResponse.json(stored);
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Upload failed." }, { status: 400 });
  }
}
