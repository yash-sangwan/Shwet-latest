import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

// Define the interface for the YouTube Task document
export interface IGroup extends Document {
  taskerId: mongoose.Types.ObjectId | IUser;
  groupTitle: string;
  createdAt: Date;
  taskType: string;
  folder: string;
  icon: string;
}

// Define the YouTube Task schema
const groupSchema = new Schema<IGroup>({
  taskerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  groupTitle: {
    type: String,
    required: true,
    trim: true,
  },
  taskType: {
    type: String,
    required:true,
  },
  folder: {
    type: String
  },
  icon: {
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-sets the created date
  },
});

// Create and export the YouTube Task model
const Group = mongoose.model<IGroup>(
  "Group",
  groupSchema
);

export default Group;
