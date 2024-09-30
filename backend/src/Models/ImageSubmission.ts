import mongoose, { Document, Schema } from "mongoose";
import { IImageTask } from "./ImageTask";
import { IUser } from "./User";

// Define the interface for the YouTube Task document
interface IImageTaskSubmission extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  taskId: mongoose.Types.ObjectId | IImageTask;
  points: number;
  label: Record<number, string>;
  submittedOn: Date;
}

// Define the YouTube Task schema
const imageTaskSubmissionSchema = new Schema<IImageTaskSubmission>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: Schema.Types.ObjectId, ref: "ImageTask", required: true },
  points: { type: Number, required: true, default: 5 },
  label:  { type: Map, of: String, required: true },
  submittedOn: {
    type: Date,
    default: Date.now, // Auto-sets the created date
  },
});

// Create and export the YouTube Task model
const ImageTaskSubmission = mongoose.model<IImageTaskSubmission>(
  "ImageTaskSubmission",
  imageTaskSubmissionSchema
);

export default ImageTaskSubmission;
