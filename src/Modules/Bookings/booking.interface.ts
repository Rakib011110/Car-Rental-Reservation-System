import { Schema, model, Document } from "mongoose";

export interface TBooking extends Document {
  date: Date;
  user: Schema.Types.ObjectId;
  car: Schema.Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
}
