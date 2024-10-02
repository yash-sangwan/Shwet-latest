import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { IGroup } from "./Group"

// Define the interface for the YouTube Task document
export interface IAudioTask extends Document {
  taskerId: mongoose.Types.ObjectId | IUser;
  groupId: mongoose.Types.ObjectId | IGroup;
  taskTitle: string;
  audios: Record<number, string>;
  createdAt: Date;
  signature: string;
  description: string;
  workerCount: number;
  amount: mongoose.Types.Decimal128;
  currentSubmissions: number;
  active:boolean;
}

// Define the YouTube Task schema
const audioTaskSchema = new Schema<IAudioTask>({
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
  audios: {
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
const AudioTask = mongoose.model<IAudioTask>(
  "AudioTask",
  audioTaskSchema
);

export default AudioTask;
