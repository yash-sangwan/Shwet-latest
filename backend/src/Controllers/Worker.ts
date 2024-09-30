import { Request, Response } from "express";
import User from "../Models/User";
import ImageTask from "../Models/ImageTask";
import TextTask from "../Models/TextTask";
import AudioTask from "../Models/AudioTask";
import ImageTaskSubmission from "../Models/ImageSubmission";
import TextTaskSubmission from "../Models/TextSubmission";
import AudioTaskSubmission from "../Models/AudioSubmission";

interface AuthenticatedRequest extends Request {
  email?: string;
  role?: string;
}

export const fetchTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const [imageTasks, textTasks, audioTasks] = await Promise.all([
      ImageTask.find({ active: true }),
      TextTask.find({ active: true }),
      AudioTask.find({ active: true }),
    ]);
    res.status(200).json({
      status: true,
      message: "Tasks fetched.",
      imageTasks,
      textTasks,
      audioTasks,
    });
  } catch (error) {
    console.error("Error in fetchTask:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const imageTaskSubmission = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const taskDetails = {
      taskId: req.body.taskId,
      labels: req.body.labels,
    };
    const user = await User.findOne({ email: req.email });
    if (user) {
      const currentStatus = await ImageTask.findById(taskDetails.taskId);

      if (!currentStatus) {
        res
          .status(200)
          .json({ status: false, message: "Task submission failed." });
        return;
      }

      if (currentStatus.currentSubmissions < currentStatus.workerCount) {
        const update = await ImageTask.findOneAndUpdate(
          { _id: taskDetails.taskId },
          {
            $set: { currentSubmissions: currentStatus.currentSubmissions + 1 },
          },
          { new: true }
        );

        const labelMap: Record<number, string> = {};

        taskDetails.labels.forEach((url: string, index: number) => {
          labelMap[index + 1] = url; // Index starts from 1
        });

        const submission = new ImageTaskSubmission({
          userId: user._id,
          taskId: taskDetails.taskId,
          label: labelMap,
        });

        const result = await submission.save();

        res.status(200).json({ status: true, message: "Task submitted." });
      }
    } else {
      res.status(400).json({ status: false, message: "User not found." });
    }
  } catch (error) {
    console.error("Error in imageTaskSubmission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const textTaskSubmission = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const taskDetails = {
      taskId: req.body.taskId,
      labels: req.body.labels,
    };
    const user = await User.findOne({ email: req.email });
    if (user) {
      const currentStatus = await TextTask.findById(taskDetails.taskId);

      if (!currentStatus) {
        res
          .status(200)
          .json({ status: false, message: "Task submission failed." });
        return;
      }

      if (currentStatus.currentSubmissions < currentStatus.workerCount) {
        const update = await TextTask.findOneAndUpdate(
          { _id: taskDetails.taskId },
          {
            $set: { currentSubmissions: currentStatus.currentSubmissions + 1 },
          },
          { new: true }
        );

        const labelMap: Record<number, string> = {};

        taskDetails.labels.forEach((url: string, index: number) => {
          labelMap[index + 1] = url; // Index starts from 1
        });

        const submission = new TextTaskSubmission({
          userId: user._id,
          taskId: taskDetails.taskId,
          label: labelMap,
        });

        const result = await submission.save();

        res.status(200).json({ status: true, message: "Task submitted." });
      }
    } else {
      res.status(400).json({ status: false, message: "User not found." });
    }
  } catch (error) {
    console.error("Error in textTaskSubmission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const audioTaskSubmission = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const taskDetails = {
      taskId: req.body.taskId,
      labels: req.body.labels,
    };
    const user = await User.findOne({ email: req.email });
    if (user) {
      const currentStatus = await AudioTask.findById(taskDetails.taskId);

      if (!currentStatus) {
        res
          .status(200)
          .json({ status: false, message: "Task submission failed." });
        return;
      }

      if (currentStatus.currentSubmissions < currentStatus.workerCount) {
        const update = await AudioTask.findOneAndUpdate(
          { _id: taskDetails.taskId },
          {
            $set: { currentSubmissions: currentStatus.currentSubmissions + 1 },
          },
          { new: true }
        );

        const labelMap: Record<number, string> = {};

        taskDetails.labels.forEach((url: string, index: number) => {
          labelMap[index + 1] = url; // Index starts from 1
        });

        const submission = new AudioTaskSubmission({
          userId: user._id,
          taskId: taskDetails.taskId,
          label: labelMap,
        });

        const result = await submission.save();

        res.status(200).json({ status: true, message: "Task submitted." });
      }
    } else {
      res.status(400).json({ status: false, message: "User not found." });
    }
  } catch (error) {
    console.error("Error in audioTaskSubmission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

