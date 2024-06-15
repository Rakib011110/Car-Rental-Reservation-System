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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = exports.returnCarInDB = exports.getUserBookingsFromDB = exports.getAllBookingsFromDB = exports.createBookingInDB = void 0;
const car_model_1 = __importDefault(require("../Car/car.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const createBookingInDB = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const newBooking = new booking_model_1.default(bookingData);
    yield (yield (yield newBooking.save()).populate("user")).populate("car");
    return newBooking;
});
exports.createBookingInDB = createBookingInDB;
// export const createBookingInDB = async (bookingData: TBooking) => {
//   const newBooking = new Booking(bookingData);
//   await newBooking.save();
//   return newBooking;
// };
const getAllBookingsFromDB = (carId, date) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.default.find({ car: carId, date })
        .populate("user")
        .populate("car");
    return bookings;
});
exports.getAllBookingsFromDB = getAllBookingsFromDB;
const getUserBookingsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_model_1.default.find({ user: userId }).populate("car");
    return bookings;
});
exports.getUserBookingsFromDB = getUserBookingsFromDB;
const returnCarInDB = (bookingId, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.default.findById(bookingId).populate("car");
    if (booking) {
        booking.endTime = endTime;
        const startTime = new Date(`1970-01-01T${booking.startTime}:00Z`);
        const endTimeDate = new Date(`1970-01-01T${endTime}:00Z`);
        const durationHours = (endTimeDate.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        booking.totalCost = durationHours * booking.car.pricePerHour;
        yield booking.save();
        yield car_model_1.default.updateOne({ _id: booking.car }, { status: "available" });
        return booking;
    }
    return null;
});
exports.returnCarInDB = returnCarInDB;
exports.BookingServices = {
    createBookingInDB: exports.createBookingInDB,
    getAllBookingsFromDB: exports.getAllBookingsFromDB,
    getUserBookingsFromDB: exports.getUserBookingsFromDB,
    returnCarInDB: exports.returnCarInDB,
};
