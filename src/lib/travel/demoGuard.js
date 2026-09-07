/* =========================================================
   DEMO DATA GUARD
   src/data/flightRoutes.js generates deterministic sample
   flights for the marketing pages. They must never be
   bookable.

   Two safeguards:

   1. Every generated flight carries `isDemo: true`, and every
      live offer carries `isLive: true`. The booking flow only
      accepts an offer with a supplier `fareKey`, which demo
      data has no way to produce — so a demo flight cannot be
      paid for even if it reaches the modal.

   2. `assertNotDemo()` is called on anything entering a
      booking path, and throws if the demo marker is present.
========================================================= */

import { TravelError, TravelErrorCode } from "./errors.js";

export const DEMO_MARKER = "isDemo";

/** True when live search is wired up; the marketing pages fall back to demo data. */
export const liveSearchEnabled = () => Boolean((process.env.TRAVEL_PROVIDER || "").trim());

export function assertNotDemo(offer, what = "this offer") {
  if (offer?.[DEMO_MARKER]) {
    throw new TravelError(
      TravelErrorCode.PROVIDER_NOT_CONFIGURED,
      `${what} is sample data and cannot be booked. Live booking is not connected yet.`,
      { expose: true }
    );
  }
  return offer;
}
