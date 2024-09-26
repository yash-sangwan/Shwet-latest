const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/userLogin');

/* Define user-related routes */
authRouter.get("/verify-email" , authController.emailVerification);
authRouter.post('/login', authController.login);
authRouter.post("/register" , authController.registerUser);
authRouter.post("/google-login" , authController.googleLogin);
authRouter.post("/github-login" , authController.githubLogin);
authRouter.get('/logout', authController.logout);
authRouter.post('/subscribe', authController.subscriptionEmail);
authRouter.post('/exists', authController.exists);

module.exports = authRouter;