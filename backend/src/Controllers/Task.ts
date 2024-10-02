import dotenv from 'dotenv';
import { PublicKey } from "@solana/web3.js";
import { createRpc, Rpc } from "@lightprotocol/stateless.js";
import { Request, Response } from "express";
import { generateSignedUploadData } from "../Cloudinary/ImageUpload";
import Group from "../Models/Group";
import ImageTask from "../Models/ImageTask";
import User from "../Models/User";
import TaskType from "../Models/TaskType";
import AudioTask from "../Models/AudioTask";
import TextTask from "../Models/TextTask";

interface AuthenticatedRequest extends Request {
  email?: string;
  role?: string;
}

dotenv.config();

// Endpoint to get signed upload data
export const generateSignedUrl = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const folder = req.body.folderWorkType;
    if (folder) {
      const uploadData = await generateSignedUploadData(folder);
      res
        .status(200)
        .json({
          uploadData,
          status: true,
          message: "Presigned urls generated.",
        }); // Send only non-sensitive data
    }else{
      res.status(200).json({ status: false, message: "Group not found." }); // Send only non-sensitive data
    }
  } catch (error) {
    console.error("Error in generateSignedUrl:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createGroup = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const groupTitle = req.body.groupTitle;
    const icon = req.body.icon;
    const type = req.body.workType;
    console.log(groupTitle);
    console.log(icon);
    console.log(type);
    const tasktype = await TaskType.findOne({ taskTitle: type });
    const user = await User.findOne({ email: req.email });

    console.log(tasktype, user);

    if (tasktype && user && groupTitle) {
      const newGroup = new Group({
        taskerId: user._id,
        groupTitle: groupTitle,
        taskType: tasktype.taskTitle,
        folder: tasktype.folder,
        icon: icon,
      });

      const result = await newGroup.save();
      console.log("created");
      res
        .status(200)
        .json({ status: true, message: "Group created.", data: result });
    } else {
      res.status(200).json({ status: false, message: "Error creating group." });
    }
  } catch (error) {
    console.error("Error in createGroup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createImageTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {

    const taskDetails = req.body.taskDetails;
    const transactionSignature = taskDetails.txid;
    const groupid = taskDetails.groupId;

    const validated = true;
    if (validated && groupid) {
      const group = await Group.findById(groupid);
      const user = await User.findOne({ email: req.email });
      if (group && user) {
        const imageMap: Record<number, string> = {};

        // Loop through image URLs and assign them to the imageMap dynamically
        taskDetails.images.forEach((url: string, index: number) => {
          imageMap[index + 1] = url; // Index starts from 1
        });

        const newTask = new ImageTask({
          taskerId: user._id,
          groupId: group._id,
          signature: transactionSignature,
          amount: taskDetails.budget,
          workerCount: taskDetails.workerCount,
          taskTitle: taskDetails.title,
          description: taskDetails.description,
          images: imageMap,
          active: true,
        });

        const result = await newTask.save();
        res.status(200).json({
          status: true,
          message: "Task created successfully.",
          data: result,
        });
      } else {
        res
          .status(200)
          .json({ status: false, message: "Could not create task." });
      }
    } else {
      res.status(200).json({
        status: false,
        message:
          "Txid validation failed, ensure you provide the correct transaction id.",
      });
    }
  } catch (error) {
    console.error("Error in createImageTask:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAudioTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const taskDetails = req.body.taskDetails;

    const transactionSignature = taskDetails.txid;
    const groupid = taskDetails.groupId;

    // Calcualte the number of workers
    const validated = true;
    if (validated && groupid) {
      const group = await Group.findById(groupid);
      const user = await User.findOne({ email: req.email });
      if (group && user) {
        const audioMap: Record<number, string> = {};

        // Loop through image URLs and assign them to the imageMap dynamically
        taskDetails.audios.forEach((url: string, index: number) => {
          audioMap[index + 1] = url; // Index starts from 1
        });

        const newTask = new AudioTask({
          taskerId: user._id,
          groupId: group._id,
          signature: transactionSignature,
          amount: taskDetails.budget,
          workerCount: taskDetails.workerCount,
          taskTitle: taskDetails.title,
          description: taskDetails.description,
          audios: audioMap,
          active: true,
        });

        const result = await newTask.save();
        res.status(200).json({
          status: true,
          message: "Task created successfully.",
          data: result,
        });
      } else {
        res
          .status(200)
          .json({ status: false, message: "Could not create task." });
      }
    } else {
      res.status(200).json({
        status: false,
        message:
          "Txid validation failed, ensure you provide the correct transaction id.",
      });
    }
  } catch (error) {
    console.error("Error in createImageTask:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createTextTask = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const taskDetails = req.body.taskDetails;

    const transactionSignature = taskDetails.txid;
    const groupid = taskDetails.groupId;

    const validated = true;
    if (validated && groupid) {
      const group = await Group.findById(groupid);
      const user = await User.findOne({ email: req.email });
      if (group && user) {
        const textMap: Record<number, string> = {};

        // Loop through image URLs and assign them to the imageMap dynamically
        taskDetails.text.forEach((url: string, index: number) => {
          textMap[index + 1] = url; // Index starts from 1
        });

        const newTask = new TextTask({
          taskerId: user._id,
          groupId: group._id,
          signature: transactionSignature,
          amount: taskDetails.budget,
          workerCount: taskDetails.workerCount,
          taskTitle: taskDetails.title,
          description: taskDetails.description,
          text: textMap,
          active: true,
        });

        const result = await newTask.save();
        res.status(200).json({
          status: true,
          message: "Task created successfully.",
          data: result,
        });
      } else {
        res
          .status(200)
          .json({ status: false, message: "Could not create task." });
      }
    } else {
      res.status(200).json({
        status: false,
        message:
          "Txid validation failed, ensure you provide the correct transaction id.",
      });
    }
  } catch (error) {
    console.error("Error in createImageTask:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchTasksUnderGroup = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const group = await Group.findById(req.body.groupId);
    const user = await User.findOne({ email: req.email });

    if (user && group) {
      if (group.taskType === "IMAGE") {
        const result = await ImageTask.find({
          taskerId: user._id,
          groupId: group._id,
        });
        res
          .status(200)
          .json({ status: true, message: "Task fetched.", data: result });
      } else if (group.taskType === "TEXT") {
        const result = await TextTask.find({
          taskerId: user._id,
          groupId: group._id,
        });
        res
          .status(200)
          .json({ status: true, message: "Task fetched.", data: result });
      } else if (group.taskType === "AUDIO") {
        const result = await AudioTask.find({
          taskerId: user._id,
          groupId: group._id,
        });
        res
          .status(200)
          .json({ status: true, message: "Task fetched.", data: result });
      } else {
        res
          .status(200)
          .json({ status: false, message: "Failed to fetched task." });
      }
    } else {
      res
        .status(200)
        .json({ status: false, message: "User or group not found." });
    }
  } catch (error) {
    console.error("Error in fetchTasksUnderGroup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchGroups = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    console.log("Fetching groups")
    const user = await User.findOne({ email: req.email });

    if (user) {
      const groups = await Group.find({ taskerId: user._id });

      res
        .status(200)
        .json({ status: true, message: "Groups fetched", data: groups });
    } else {
      res
        .status(200)
        .json({ status: false, message: "Failed to fetch groups." });
    }
    return;
  } catch (error) {
    console.error("Error in fetchGroups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const publicKey = new PublicKey(req.body.PublicKey);
    const transactionSignature = req.body.TransactionSignature;
    const amount = req.body.Amount; // Amount in lamports
    const api = process.env.HELIUS_DEVNET_API as string;
    const RPC_ENDPOINT =
      `https://devnet.helius-rpc.com?api-key=${api}`;
    const connection = createRpc(RPC_ENDPOINT);

    // Function to fetch transactions
    const getAllTransactions = async (address: PublicKey, numTx: number) => {
      return await connection.getSignaturesForAddress(address, { limit: numTx });
    };

    const transactionList = await getAllTransactions(publicKey, 5);

    for (let transaction of transactionList) {
      if (transaction.signature === transactionSignature) {
        // Fetch the transaction details
        const transactionDetails = await connection.getParsedTransaction(transactionSignature, {
          maxSupportedTransactionVersion: 0,
        });

        
        // Check if the transaction is confirmed
        const confirmationStatus = transaction.confirmationStatus;
        if (confirmationStatus !== "confirmed" && confirmationStatus !== "finalized") {
          res.status(400).json({ status: false, message: 'Transaction not confirmed' });
          return;
        }
        
        if (!transactionDetails || !transactionDetails.transaction) {
          res.status(404).json({ status: false, message: 'Transaction not found' });
          return;
        }
        
        // Sum the lamports transferred in the transaction
        let totalLamports = 0;
        if(transactionDetails){
          transactionDetails.transaction.message.instructions.forEach((instruction: any) => {
            if (instruction.program === 'system' && instruction.parsed?.type === 'transfer') {
              totalLamports += instruction.parsed.info.lamports;
            }
          });
        }
        // Verify the amount matches
        if (totalLamports === amount) {
           console.log("Success");
           res.status(200).json({ status: true, message: 'Transaction verified successfully' });
           return;
        } else {
           res.status(400).json({ status: false, message: 'Amount mismatch' });
           return;
        }
        break;
      }
    }
    // If the transaction signature wasn't found
    res.status(404).json({ status: false, message: 'Transaction signature not found' });
  } catch (error) {
    console.error("Error in verifyTransaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

