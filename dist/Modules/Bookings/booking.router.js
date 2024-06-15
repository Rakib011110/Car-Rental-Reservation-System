"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const auth_1 = require("../../app/auth/auth");
const booking_controller_1 = require("./booking.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/", auth_1.isAuthenticated, booking_controller_1.BookingController.createBooking);
router.get("/", booking_controller_1.BookingController.getAllBookings);
router.get("/my-bookings", auth_1.isAuthenticated, booking_controller_1.BookingController.getUserBookings);
router.put("/cars/return", 
//   isAuthenticated,
//   isAdmin,
booking_controller_1.BookingController.returnCar);
exports.BookingRoute = router;
