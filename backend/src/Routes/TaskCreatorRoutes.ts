import express, { Router, Request, Response, NextFunction } from 'express';
import * as taskController from '../Controllers/Task';

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

const checkProvider = checkRole(['PROVIDER']);

// Define an interface for the taskController
interface TaskController {
    generateSignedUrl: express.RequestHandler;
    createGroup: express.RequestHandler;
    createImageTask: express.RequestHandler;
    createAudioTask: express.RequestHandler;
    createTextTask: express.RequestHandler;
    fetchGroups: express.RequestHandler;
    verifyTransaction: express.RequestHandler;
    fetchTasksUnderGroup: express.RequestHandler;
}

const taskRouter: Router = express.Router();

/* Define user-related routes */
taskRouter.post("/presignedurl", checkProvider , (taskController as TaskController).generateSignedUrl);
taskRouter.post("/creategroup", checkProvider , (taskController as TaskController).createGroup);
taskRouter.post("/image", checkProvider , (taskController as TaskController).createImageTask);
taskRouter.post("/text", checkProvider , (taskController as TaskController).createTextTask);
taskRouter.post("/audio", checkProvider , (taskController as TaskController).createAudioTask);
taskRouter.get("/groups", checkProvider , (taskController as TaskController).fetchGroups);
taskRouter.post("/groups/task", checkProvider , (taskController as TaskController).fetchTasksUnderGroup);
taskRouter.post('/verify-transaction', (taskController as TaskController).verifyTransaction);

export default taskRouter;
