import mongoose, { Schema, Document, mongo } from "mongoose";
import { IUser } from "./User";

export interface IPaidOutHistory extends Document {
  userId: Schema.Types.ObjectId | IUser;
  tokens: number;
  paidOutOn: Date;
}

const paidOutHistorySchema = new Schema<IPaidOutHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tokens: {
    type: Number,
  },
  paidOutOn: {
    type: Date,
    default: Date.now,
  },
});

const PaidOutHistory = mongoose.model<IPaidOutHistory>(
  "PaidOutHistory",
  paidOutHistorySchema
);

export default PaidOutHistory;
