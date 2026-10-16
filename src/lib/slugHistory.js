import { db } from "./db.js";
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

/**
 * The slug a retired one now points at, or null.
 *
 * Reads the whole (tiny) redirect list for the model rather than querying by
 * slug: it goes through the db facade, whose build-time cache then answers
 * every page from one round trip. Querying per slug meant 230 separate
 * lookups during a build, and each one timed the page out on a slow link.
 */
export async function resolveSlug(model, slug) {
  if (!model || !slug) return null;

  const redirects = await db.slugRedirect.findMany({ where: { model } });
  const hit = redirects.find((row) => row.from === slug);

  return hit?.to && hit.to !== slug ? hit.to : null;
}
