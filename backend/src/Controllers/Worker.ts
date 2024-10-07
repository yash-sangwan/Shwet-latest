import { Request, Response } from "express";
import User from "../Models/User";
import ImageTask from "../Models/ImageTask";
import TextTask from "../Models/TextTask";
import AudioTask from "../Models/AudioTask";
import ImageTaskSubmission from "../Models/ImageSubmission";
import TextTaskSubmission from "../Models/TextSubmission";
import AudioTaskSubmission from "../Models/AudioSubmission";
import WorkerBalance from "../Models/WorkerBalance";
import { Withdraw } from "../Private/Withdrawl"
import PaidOutHistory from "../Models/PaidOutHistory";

const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000;

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
      ImageTask.find({ active: true }).select(
        "_id taskerId taskTitle images description workerCount currentSubmissions"
      ),
      TextTask.find({ active: true }).select(
        "_id taskerId taskTitle text description workerCount currentSubmissions"
      ),
      AudioTask.find({ active: true }).select(
        "_id taskerId taskTitle audios description workerCount currentSubmissions"
      ),
    ]);

    // Combine all tasks into a single array
    const allTasks = [
      ...imageTasks.map((task) => ({
        ...task.toObject(),
        type: "image",
        task: task.images, // Preserve the original images field
      })),
      ...textTasks.map((task) => ({
        ...task.toObject(),
        type: "text",
        task: task.text, // Preserve the original text field
      })),
      ...audioTasks.map((task) => ({
        ...task.toObject(),
        type: "audio",
        task: task.audios, // Preserve the original audios field
      })),
    ];

    res.status(200).json({
      status: true,
      message: "Tasks fetched successfully.",
      tasks: allTasks,
    });
  } catch (error) {
    console.error("Error in fetchTask:", error);
    res.status(500).json({ status: false, error: "Internal server error" });
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

        const amount = 0.25 * taskDetails.labels.length;
        const submission = new ImageTaskSubmission({
          userId: user._id,
          taskId: taskDetails.taskId,
          label: labelMap,
          points: amount,
        });

        const result = await submission.save();

        const current = await WorkerBalance.findOne({ workerId: user._id });
        if (current) {
          const totalamount = current?.balance + amount;
          const updateBalance = await WorkerBalance.findOneAndUpdate(
            { workerId: user._id },
            { $set: { balance: totalamount , lockedBalance: totalamount } },
            { new: true }
          );
        }

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

        const amount = 0.25 * taskDetails.labels.length;
        const submission = new TextTaskSubmission({
          userId: user._id,
          taskId: taskDetails.taskId,
          label: labelMap,
          points: amount,
        });

        const result = await submission.save();

        const current = await WorkerBalance.findOne({ workerId: user._id });
        if (current) {
          const totalamount = current?.balance + amount;
          const updateBalance = await WorkerBalance.findOneAndUpdate(
            { workerId: user._id },
            { $set: { balance: totalamount , lockedBalance: totalamount } },
            { new: true }
          );
        }

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

        const amount = 0.25 * taskDetails.labels.length;
        const submission = new AudioTaskSubmission({
          userId: user._id,
          taskId: taskDetails.taskId,
          label: labelMap,
          points: amount,
        });

        const result = await submission.save();


        const current = await WorkerBalance.findOne({ workerId: user._id });
        if (current) {
          const totalamount = current?.balance + amount;
          const updateBalance = await WorkerBalance.findOneAndUpdate(
            { workerId: user._id },
            { $set: { balance: totalamount , lockedBalance: totalamount  } },
            { new: true }
          );
        }

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

export const hasCompleted = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.email });
    const taskId = req.body.taskId;
    const type = req.body.type;
    if (taskId && user && type) {
      const msg1 = "The task has been completed.";
      const msg2 = "You've already completed this task. Please wait for new tasks or try other ones." ;

      if (type === "image") {
        const task = await ImageTaskSubmission.findOne({
          taskId: taskId,
          userId: user._id,
        });
        const completed = await ImageTask.findById(taskId);
        if(completed?.workerCount === completed?.currentSubmissions){
          res.status(200).json({ status: true, message: msg1});
          return;
        }
        if (task) {
          res.status(200).json({ status: true, message: msg2});
          return;
        }
      } else if (type === "audio") {
        const task = await AudioTaskSubmission.findOne({
          taskId: taskId,
          userId: user._id,
        });
        const completed = await AudioTask.findById(taskId);
        if(completed?.workerCount === completed?.currentSubmissions){
          res.status(200).json({ status: true, message: msg1});
          return;
        }
        if (task) {
          res.status(200).json({ status: true, message: msg2});
          return;
        }
      } else if (type === "text") {
        const task = await TextTaskSubmission.findOne({
          taskId: taskId,
          userId: user._id,
        });
        const completed = await TextTask.findById(taskId);
        if(completed?.workerCount === completed?.currentSubmissions){
          res.status(200).json({ status: true, message: msg1});
          return;
        }
        if (task) {
          res.status(200).json({ status: true, message: msg2});
          return;
        }
      }
      res.status(200).json({ status: false, message: "New task." });
    } else {
      res.status(400).json({ status: false, message: "Error occured." });
    }
  } catch (error) {
    console.error("Error in hasCompleted:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const tokens = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findOne({email: req.email});
    const balanceAcc = await WorkerBalance.findOne({workerId : user?._id})
    if(balanceAcc){
      res.status(200).json({status:true , message: "Balance fetched." , balance : balanceAcc.balance});
      
    }else{
      res.status(200).json({status:false , message: "Failed to fetch balance." });
    }
  } catch (error) {
    console.error("Error in tokens:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const processWithdraw = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { Address, Tokens } = req.body;

    // Check if the user exists
    const user = await User.findOne({email:req.email});

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const currentAccStatus = await WorkerBalance.findOne({workerId: user._id});

    // Check if the user has sufficient balance
    if (currentAccStatus){
      if(currentAccStatus.balance < Tokens) {
        res.status(400).json({ error: 'Insufficient balance' });
        return;
      }
    }else{
      res.status(400).json({ error: 'Balance account not found.' });
      return;
    }

    // Check if the user has made a withdrawal in the last 24 hours
    const lastWithdrawal = await PaidOutHistory.findOne({ userId : user._id }).sort({ paidOutOn: -1 });

    if (lastWithdrawal) {
      const timeSinceLastWithdrawal = Date.now() - lastWithdrawal.paidOutOn.getTime();
      if (timeSinceLastWithdrawal < COOLDOWN_PERIOD) {
        const remainingTime = Math.ceil((COOLDOWN_PERIOD - timeSinceLastWithdrawal) / (60 * 60 * 1000));
        res.status(400).json({ message: `You can only withdraw once every 24 hours. Please try again in ${remainingTime} hours.` });
        return;
      }
    }

    // Perform the withdrawal
    const result = await Withdraw(Address, Tokens);
      
    if (result?.status) {
      // Update user's token balance
      
      const remainingBalance = currentAccStatus.balance - Tokens;
      const updatedBalance = await WorkerBalance.findOneAndUpdate({workerId : user._id } , {$set : {balance : remainingBalance}} , {new: true});

      // Record the withdrawal in PaidOutHistory
      const paidOutHistory = new PaidOutHistory({
        userId: user._id,
        tokens: Tokens,
        paidOutOn: new Date()
      });
      await paidOutHistory.save();

      res.status(200).json({ status:true ,  message: 'Withdrawal successful' , txid:result.txid });
      return;
    }
    else {
      res.status(400).json({ status: result.status, message: 'Withdrawal failed.' });
    }
  } catch (error) {
    console.error('Error in withdraw:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTotalBalance = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({email : req.email});
    if(user){
      const currentAccStatus = await WorkerBalance.findOne({workerId : user._id});

      const task1 = await ImageTaskSubmission.countDocuments({userId : user._id});
      const task2 = await AudioTaskSubmission.countDocuments({userId : user._id});
      const task3 = await TextTaskSubmission.countDocuments({userId : user._id});

      const totalContrib = task1 + task2 + task3;

      res.status(200).json({status:true, message: 'Balance fetched.' , balance: currentAccStatus?.lockedBalance , totalContrib});
    }else{
      res.status(200).json({status:false, message: 'Failed to fetch balance.'});
    }
  } catch (error) {
    console.error('Error in getTotalBalance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 