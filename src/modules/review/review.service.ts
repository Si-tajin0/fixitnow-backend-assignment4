import { prisma } from "../../lib/prisma";

const createReviewIntoDB = async (customerId: string, payload: any) => {
  const { bookingId, rating, comment } = payload;

  // Booking Check
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not Found!");
  }

  // Security Check
  if (booking.customerId !== customerId) {
    throw new Error("Forbidden! You can only review your own booking");
  }

  // Job not COMPLETED not review write
  if (booking.status === "COMPLETED") {
    throw new Error("You can only leave a review after the job is COMPLETED");
  }

  // Double  Review Check
  const existingReview = await prisma.review.findUnique({
    where: { bookingId },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this booking");
  }

  // Review save and rating update
  const result = await prisma.$transaction(async (tx) => {
    // Review Created
    const newReview = await tx.review.create({
      data: {
        bookingId,
        customerId,
        rating,
        comment,
      },
    });

    // Find the all review for do the Average
    const allReviewOfTechnician = await tx.review.findMany({
      where: {
        booking: { technicianId: booking.technicianId },
      },
    });

    // new average rating
    const totalRating = allReviewOfTechnician.reduce(
      (sum, rev) => sum + rev.rating,
      0,
    );
    const averageRating = totalRating / allReviewOfTechnician.length;

    // Technician profile rating Update
    await tx.user.update({
      where: { id: booking.technicianId },
      data: { rating: averageRating },
    });
    return newReview;
  });
  return result;
};

export const reviewService = {
  createReviewIntoDB,
};
