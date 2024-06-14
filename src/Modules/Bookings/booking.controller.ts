import { Request, Response } from "express";
import { BookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;
    const newBooking = await BookingServices.createBookingInDB(bookingData);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Car booked successfully",
      data: newBooking,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { carId, date } = req.query;

    if (!carId || !date) {
      return res
        .status(400)
        .json({ message: "carId and date are required query parameters" });
    }

    const bookings = await BookingServices.getAllBookingsFromDB(
      carId as string,
      date as string
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const bookings = await BookingServices.getUserBookingsFromDB(userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "My Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const returnCar = async (req: Request, res: Response) => {
  try {
    const { bookingId, endTime } = req.body;
    const updatedBooking = await BookingServices.returnCarInDB(
      bookingId,
      endTime
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Car returned successfully",
      data: updatedBooking,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const BookingController = {
  createBooking,
  getAllBookings,
  getUserBookings,
  returnCar,
};
