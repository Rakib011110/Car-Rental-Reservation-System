"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: mongoose_1.Schema.Types.ObjectId, ref: "Car", required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
    totalCost: { type: Number, default: 0 },
}, { timestamps: true });
const Booking = (0, mongoose_1.model)("Booking", bookingSchema);
exports.default = Booking;
// export const BookingACar = model<TACarBooking>(
//   "BookingACar",
//   bookingACarSchema
// );
