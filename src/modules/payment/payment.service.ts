import { prisma } from "../../lib/prisma";

import { stripe } from "../../lib/stripe";

// Create Payment
const createPaymentSessionIntoDB = async (
  bookingId: string,
  customerId: string,
) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
    include: { service: true, customer: true },
  });

  // Only customer self booking
  if (booking.customerId !== customerId) {
    throw new Error("Forbidden! This is not your booking.");
  }

  // Booking is not ACCEPTED don't payment
  if (booking.status !== "ACCEPTED") {
    throw new Error("You can only pay for an ACCEPTED booking.");
  }
  // Double Pament CHeck
  const existingPayment = await prisma.payment.findUnique({
    where: { bookingId },
  });
  if (existingPayment) {
    throw new Error(
      "Payment session is already created or completed for this booking.",
    );
  }

  // Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: booking.customer.email,
    client_reference_id: bookingId,
    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: booking.service.name,
            description: `Payment for booking ID: ${booking.id}`,
          },
          unit_amount: Math.round(booking.service.price * 100),
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/payment-success",
    cancel_url: "http://localhost:3000/payment-cancel",
  });

  // Database payment save with PENDING Stauts
  const payment = await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amount: booking.service.price,
      transactionId: session.id,
      status: "PENDING",
    },
  });
  return {
    paymentUrl: session.url,
    payment,
  };
};

// Confirm Payment
const confirmPaymentIntoDB = async (transactionId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionId },
  });

  if (!payment) {
    throw new Error("Payment info not found");
  }

  if (payment.status === "COMPLETED") {
    throw new Error("Payment is already verified and completed");
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedPayment = await tx.payment.update({
      where: { transactionId },
      data: { status: "COMPLETED" },
    });

    await tx.booking.update({
      where: { id: payment.bookingId },
      data: { status: "PAID" },
    });
    return updatedPayment;
  });
  return result;
};

export const paymentService = {
  createPaymentSessionIntoDB,
  confirmPaymentIntoDB,
};
