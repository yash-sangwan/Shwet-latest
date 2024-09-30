import express, { Router, Request, Response, NextFunction } from 'express';
import * as workerController from '../Controllers/Worker';

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
}

const workerRouter: Router = express.Router();

/* Define user-related routes */
workerRouter.get("/fetchtask", checkWorker , (workerController as WorkerController).fetchTask);


export default workerRouter;
