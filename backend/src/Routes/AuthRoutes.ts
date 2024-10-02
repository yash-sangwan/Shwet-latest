import express, { Router } from 'express';
import * as authController from '../Controllers/Authorization';

// Define an interface for the authController
interface AuthController {
  emailVerification: express.RequestHandler;
  login: express.RequestHandler;
  registerUser: express.RequestHandler;
  googleLogin: express.RequestHandler;
  githubLogin: express.RequestHandler;
  logout: express.RequestHandler;
  subscriptionEmail: express.RequestHandler;
  exists: express.RequestHandler;
  sample: express.RequestHandler;

}

const authRouter: Router = express.Router();

/* Define user-related routes */
authRouter.get("/verify-email", (authController as AuthController).emailVerification);
authRouter.post('/login', (authController as AuthController).login);
authRouter.post("/register", (authController as AuthController).registerUser);
authRouter.post("/google-login", (authController as AuthController).googleLogin);
authRouter.post("/github-login", (authController as AuthController).githubLogin);
authRouter.get('/logout', (authController as AuthController).logout);
authRouter.post('/subscribe', (authController as AuthController).subscriptionEmail);
authRouter.post('/exists', (authController as AuthController).exists);
authRouter.post('/sample', (authController as AuthController).sample);


export default authRouter;