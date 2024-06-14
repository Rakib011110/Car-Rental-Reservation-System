import { isAdmin, isAuthenticated } from "../../app/auth/auth";
import { BookingController } from "./booking.controller";
import express from "express";

const router = express.Router();
router.post("/", BookingController.createBooking);
router.get("/", BookingController.getAllBookings);
router.get("/my-bookings", BookingController.getUserBookings);
router.put(
  "/cars/return",
  //   isAuthenticated,
  //   isAdmin,
  BookingController.returnCar
);

export const BookingRoute = router;
