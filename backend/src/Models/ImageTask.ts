import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { IGroup } from "./Group"

// Define the interface for the YouTube Task document
export interface IImageTask extends Document {
  taskerId: mongoose.Types.ObjectId | IUser;
  groupId: mongoose.Types.ObjectId | IGroup;
  taskTitle: string;
  images: Record<number, string>;
  createdAt: Date;
  signature: string;
  description: string;
  workerCount: number;
  amount: mongoose.Types.Decimal128;
  currentSubmissions: number;
  active:boolean;
}

// Define the YouTube Task schema
const imageTaskSchema = new Schema<IImageTask>({
  taskerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
  signature: { type: String, required: true},
  amount: { type: Schema.Types.Decimal128, required: true },
  workerCount: {type: Number , required: true},
  currentSubmissions: {type: Number, default: 0},
  taskTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: Map,
    of: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-sets the created date
  },
  active: {
    type: Boolean,
    default: false
  }
});

// Create and export the YouTube Task model
const ImageTask = mongoose.model<IImageTask>(
  "ImageTask",
  imageTaskSchema
);

export default ImageTask;
