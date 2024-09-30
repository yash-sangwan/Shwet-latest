import mongoose, { Document, Schema } from "mongoose";
import { IAudioTask } from "./AudioTask";
import { IUser } from "./User";

// Define the interface for the YouTube Task document
interface IAudioTaskSubmission extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  taskId: mongoose.Types.ObjectId | IAudioTask;
  points: number;
  label: Record<number, string>;
  submittedOn: Date;
}

// Define the YouTube Task schema
const audioTaskSubmissionSchema = new Schema<IAudioTaskSubmission>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "AudioTask", required: true },
  points: { type: Number, required: true, default: 8 },
  label:  { type: Map, of: String, required: true },
  submittedOn: {
    type: Date,
    default: Date.now, // Auto-sets the created date
  },
});

// Create and export the YouTube Task model
const AudioTaskSubmission = mongoose.model<IAudioTaskSubmission>(
  "AudioTaskSubmission",
  audioTaskSubmissionSchema
);

export default AudioTaskSubmission;
