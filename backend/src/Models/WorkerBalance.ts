import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

// Define the interface for the User document
export interface IWorkerBalance extends Document {
  worketId: Schema.Types.ObjectId | IUser;
  balance: number;
  lockedBalance: number;
}

// Define the user schema
const workerBalanceSchema = new Schema<IWorkerBalance>({
  worketId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balance: {
    type: Number,
    default: 0,
  },
  lockedBalance: {
    type: Number,
    default: 0,
  }
});

// Create and export the User model
const WorkerBalance = mongoose.model<IWorkerBalance>("User", workerBalanceSchema);

export default WorkerBalance;
