import { getCollection } from "./mongodb.js";

/* =========================================================
   SLUG HISTORY
   Renaming a package changes its URL, and every link already
   out there — Google's index, a WhatsApp forward, a printed
   brochure — still points at the old one. Without a record of
   the rename those visitors get a 404.

   So each rename is written down, and the page that cannot
   find a slug asks here before giving up. A chain of renames
   is flattened as it is written (a -> b, then b -> c leaves
   a -> c), so a lookup is always one hop.
========================================================= */

const COLLECTION = "slugRedirect";

export async function recordSlugChange(model, oldSlug, newSlug) {
  if (!model || !oldSlug || !newSlug || oldSlug === newSlug) return;

  const redirects = await getCollection(COLLECTION);
  const now = new Date();

  // Anything that already pointed at the old slug now points at the new one.
  await redirects.updateMany({ model, to: oldSlug }, { $set: { to: newSlug, updatedAt: now } });

  await redirects.updateOne(
    { model, from: oldSlug },
    { $set: { model, from: oldSlug, to: newSlug, updatedAt: now }, $setOnInsert: { createdAt: now } },
    { upsert: true },
  );

  // The new name is live again, so it is no longer a redirect source.
  await redirects.deleteOne({ model, from: newSlug });
}

/** The slug a retired one now points at, or null. */
export async function resolveSlug(model, slug) {
  if (!model || !slug) return null;

  const redirects = await getCollection(COLLECTION);
  const hit = await redirects.findOne({ model, from: slug });

  return hit?.to && hit.to !== slug ? hit.to : null;
}
