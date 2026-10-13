import { readImage } from "@/lib/media";

/* =========================================================
   UPLOADED IMAGE
   Serves a picture stored by the admin upload. The id is the
   hash of the bytes, so the same URL can never point at
   different content and the response is safe to cache for
   good.
========================================================= */

export async function GET(_request, { params }) {
  const { id } = await params;
  const image = await readImage(id);

  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(image.data, {
    headers: {
      "Content-Type": image.contentType,
      "Content-Length": String(image.data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
