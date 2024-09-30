import mongoose, { Schema, Document, mongo } from "mongoose";
import { IUser } from "./User";

export interface IPaidInHistory extends Document {
  userId: Schema.Types.ObjectId | IUser;
  amount: number;
  recievedOn: Date;
}

const paidInHistorySchema = new Schema<IPaidInHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
  },
  recievedOn: {
    type: Date,
    default: Date.now,
  },
});

const PaidInHistory = mongoose.model<IPaidInHistory>(
  "PaidInHistory",
  paidInHistorySchema
);

export default PaidInHistory;
