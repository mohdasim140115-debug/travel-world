import { TravelError, TravelErrorCode } from "./errors.js";

/* =========================================================
   SERVER-SIDE INPUT VALIDATION
   Every API route runs its body through these before the
   provider sees it. Client-side checks are a convenience;
   these are the ones that count.
========================================================= */

const invalid = (message, code = TravelErrorCode.INVALID_INPUT) =>
  new TravelError(code, message, { expose: true });

export const isIsoDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? "");

export function requireBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw invalid("Request body must be an object.");
  }
  return body;
}

export function requireString(body, field, { max = 200, min = 1 } = {}) {
  const value = typeof body[field] === "string" ? body[field].trim() : "";
  if (value.length < min) throw invalid(`"${field}" is required.`);
  if (value.length > max) throw invalid(`"${field}" is too long.`);
  return value;
}

export function optionalString(body, field, { max = 200 } = {}) {
  const value = typeof body[field] === "string" ? body[field].trim() : "";
  if (!value) return null;
  if (value.length > max) throw invalid(`"${field}" is too long.`);
  return value;
}

export function requireInt(body, field, { min = 0, max = 99 } = {}) {
  const value = Number(body[field]);
  if (!Number.isInteger(value) || value < min || value > max) {
    throw invalid(`"${field}" must be a whole number between ${min} and ${max}.`);
  }
  return value;
}

export function requireDate(body, field, { allowPast = false } = {}) {
  const value = requireString(body, field, { max: 10 });
  if (!isIsoDate(value)) throw invalid(`"${field}" must be in YYYY-MM-DD format.`);

  if (!allowPast) {
    const today = new Date().toISOString().slice(0, 10);
    if (value < today) throw invalid(`"${field}" cannot be in the past.`);
  }
  return value;
}

export function requireEmail(body, field) {
  const value = requireString(body, field, { max: 254 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) throw invalid("Please enter a valid email address.");
  return value.toLowerCase();
}

export function requirePhone(body, field) {
  const value = requireString(body, field, { max: 20 }).replace(/[\s-]/g, "");
  if (!/^\+?\d{10,15}$/.test(value)) throw invalid("Please enter a valid phone number.");
  return value;
}

/** Passenger list shared by flights and buses. */
export function requirePassengers(body, { min = 1, max = 9 } = {}) {
  const list = Array.isArray(body.passengers) ? body.passengers : null;
  if (!list || list.length < min || list.length > max) {
    throw invalid(`Between ${min} and ${max} passengers are required.`);
  }

  return list.map((raw, index) => {
    const at = (field) => `passengers[${index}].${field}`;
    const person = raw && typeof raw === "object" ? raw : {};

    const firstName = typeof person.firstName === "string" ? person.firstName.trim() : "";
    const lastName = typeof person.lastName === "string" ? person.lastName.trim() : "";
    if (!firstName) throw invalid(`"${at("firstName")}" is required.`);
    if (!lastName) throw invalid(`"${at("lastName")}" is required.`);

    const type = ["adult", "child", "infant"].includes(person.type) ? person.type : "adult";
    if (person.dateOfBirth && !isIsoDate(person.dateOfBirth)) {
      throw invalid(`"${at("dateOfBirth")}" must be in YYYY-MM-DD format.`);
    }

    return {
      type,
      title: typeof person.title === "string" ? person.title.trim().slice(0, 10) : null,
      firstName: firstName.slice(0, 60),
      lastName: lastName.slice(0, 60),
      dateOfBirth: person.dateOfBirth ?? null,
      gender: ["male", "female", "other"].includes(person.gender) ? person.gender : null,
      // Documents are only kept when the supplier needs them for the product.
      passportNumber: typeof person.passportNumber === "string" ? person.passportNumber.trim().slice(0, 20) : null,
      passportExpiry: isIsoDate(person.passportExpiry) ? person.passportExpiry : null,
    };
  });
}

export function requireContact(body) {
  const contact = body.contact && typeof body.contact === "object" ? body.contact : {};
  return {
    name: requireString(contact, "name", { max: 80 }),
    email: requireEmail(contact, "email"),
    phone: requirePhone(contact, "phone"),
  };
}
