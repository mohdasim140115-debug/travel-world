import { isBlank, packageDefaults } from "./packageDefaults.js";

/* =========================================================
   ADMIN FORM DEFAULTS
   A few modules let the public page fall back to standard
   content when a field is empty. The edit form used to show
   an empty box for that content, so the admin could not tell
   what the page was serving — let alone change it.

   Here a module says where its fallbacks come from, and the
   edit page fills the blanks before rendering. The admin then
   edits real text; saving stores it, so what is on screen and
   what is in the database finally agree.
========================================================= */

const MODULE_DEFAULTS = {
  packages: packageDefaults,
};

export function recordWithDefaults(moduleSlug, record) {
  const build = MODULE_DEFAULTS[moduleSlug];
  if (!build || !record) return record;

  const filled = { ...record };
  for (const [key, value] of Object.entries(build(record))) {
    if (isBlank(filled[key])) filled[key] = value;
  }
  return filled;
}
