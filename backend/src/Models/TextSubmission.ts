import mongoose, { Document, Schema } from "mongoose";
import { ITextTask } from "./TextTask";
import { IUser } from "./User";

// Define the interface for the YouTube Task document
interface ITextTaskSubmission extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  taskId: mongoose.Types.ObjectId | ITextTask;
  points: number;
  label: Record<number, string>;
  submittedOn: Date;
}

// Define the YouTube Task schema
const textTaskSubmissionSchema = new Schema<ITextTaskSubmission>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "TextTask", required: true },
  points: { type: Number, required: true, default: 5 },
  label:  { type: Map, of: String, required: true },
  submittedOn: {
    type: Date,
    default: Date.now, // Auto-sets the created date
  },
});

// Create and export the YouTube Task model
const TextTaskSubmission = mongoose.model<ITextTaskSubmission>(
  "TextTaskSubmission",
  textTaskSubmissionSchema
);

export default TextTaskSubmission;
