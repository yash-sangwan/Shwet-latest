import express, { Router, Request, Response, NextFunction } from 'express';
import * as workerController from '../Controllers/Worker';
import * as proofController from '../Controllers/ProofController';

interface AuthenticatedRequest extends Request {
  email?: string;
  role?: string;
}

// Make allowedRoles an array to support multiple roles
const checkRole = (allowedRoles: string[]): express.RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authenticatedReq = req as AuthenticatedRequest;

    if (!authenticatedReq.role) {
      res.status(403).json({ error: 'Access denied. No role provided.' });
      return;
    }
    
    // Check if the user's role is in the allowedRoles array
    if (!allowedRoles.includes(authenticatedReq.role)) {
      res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      return;
    }

    next();
  };
};

const checkWorker = checkRole(['WORKER']);

// Define an interface for the WorkerController
interface WorkerController {
    fetchTask: express.RequestHandler;
    imageTaskSubmission: express.RequestHandler;
    audioTaskSubmission: express.RequestHandler;
    textTaskSubmission: express.RequestHandler;
    hasCompleted: express.RequestHandler;
    tokens: express.RequestHandler;
    processWithdraw: express.RequestHandler;
    getTotalBalance: express.RequestHandler;
  }

interface ProofController {
  requestProof: express.RequestHandler;
}

const workerRouter: Router = express.Router();

/* Define user-related routes */
workerRouter.get("/fetchtask", checkWorker , (workerController as WorkerController).fetchTask);
workerRouter.post("/image", checkWorker , (workerController as WorkerController).imageTaskSubmission);
workerRouter.post("/audio", checkWorker , (workerController as WorkerController).audioTaskSubmission);
workerRouter.post("/text", checkWorker , (workerController as WorkerController).textTaskSubmission);
workerRouter.post("/completed", checkWorker , (workerController as WorkerController).hasCompleted);
workerRouter.get("/tokens", checkWorker , (workerController as WorkerController).tokens);
workerRouter.post("/withdraw", checkWorker , (workerController as WorkerController).processWithdraw);
workerRouter.get("/get-overview", checkWorker , (workerController as WorkerController).getTotalBalance);
workerRouter.get("/request-proof", checkWorker , (proofController as ProofController).requestProof);

export default workerRouter;
