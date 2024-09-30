import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the YouTube Task document
export interface ITaskType extends Document {
  taskTitle: string;
  folder: string;
  createdAt: Date;
}

// Define the YouTube Task schema
const taskTypeSchema = new Schema<ITaskType>({ 
  taskTitle: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  folder: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-sets the created date
  },
});

// Create and export the YouTube Task model
const TaskType = mongoose.model<ITaskType>(
  "TaskType",
  taskTypeSchema
);

export default TaskType;
