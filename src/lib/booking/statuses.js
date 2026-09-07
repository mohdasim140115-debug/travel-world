/* =========================================================
   STATUS VOCABULARY
   Booking state and payment state are tracked separately: a
   paid booking the supplier has not confirmed is a real and
   important state, and collapsing the two would hide it.
========================================================= */

export const ProductType = {
  FLIGHT: "flight",
  HOTEL: "hotel",
  BUS: "bus",
  PACKAGE: "package",
};

export const BookingStatus = {
  DRAFT: "draft",
  PAYMENT_PENDING: "payment_pending",
  SUPPLIER_PENDING: "supplier_pending",
  CONFIRMED: "confirmed",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
};

export const PaymentStatus = {
  CREATED: "created",
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUND_PENDING: "refund_pending",
  REFUNDED: "refunded",
};

export const SupplierOrderStatus = {
  REQUESTED: "requested",
  CONFIRMED: "confirmed",
  PENDING: "pending",
  FAILED: "failed",
  CANCELLED: "cancelled",
};

/** A booking may only be shown as confirmed when the supplier said so. */
export const isConfirmed = (booking) => booking?.status === BookingStatus.CONFIRMED;

export const isPayable = (booking) =>
  [BookingStatus.DRAFT, BookingStatus.PAYMENT_PENDING].includes(booking?.status);
