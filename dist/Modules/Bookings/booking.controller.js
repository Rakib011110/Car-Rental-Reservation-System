"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = exports.returnCar = exports.getUserBookings = exports.getAllBookings = exports.createBooking = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { carId, date, startTime } = req.body;
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
        // console.log(req?.user?.id);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const bookingData = {
            date,
            user: userId,
            car: carId,
            startTime,
            endTime: null,
            totalCost: 0,
        };
        const newBooking = yield booking_service_1.BookingServices.createBookingInDB(bookingData);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Car booked successfully",
            data: newBooking,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createBooking = createBooking;
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId, date } = req.query;
        if (!carId || !date) {
            return res
                .status(400)
                .json({ message: "carId and date are required query parameters" });
        }
        const bookings = yield booking_service_1.BookingServices.getAllBookingsFromDB(carId, date);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bookings retrieved successfully",
            data: bookings,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllBookings = getAllBookings;
const getUserBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id;
        console.log(req.user);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const bookings = yield booking_service_1.BookingServices.getUserBookingsFromDB(userId);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "My Bookings retrieved successfully",
            data: bookings,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserBookings = getUserBookings;
const returnCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingId, endTime } = req.body;
        const updatedBooking = yield booking_service_1.BookingServices.returnCarInDB(bookingId, endTime);
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Car returned successfully",
            data: updatedBooking,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.returnCar = returnCar;
exports.BookingController = {
    createBooking: exports.createBooking,
    getAllBookings: exports.getAllBookings,
    getUserBookings: exports.getUserBookings,
    returnCar: exports.returnCar,
};
