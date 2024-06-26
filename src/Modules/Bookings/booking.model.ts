import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
    totalCost: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Booking = model<TBooking>("Booking", bookingSchema);
export default Booking;

// export const BookingACar = model<TACarBooking>(
//   "BookingACar",
//   bookingACarSchema
// );
