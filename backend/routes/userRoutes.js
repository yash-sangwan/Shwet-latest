const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* Define user-related routes */
router.get("/verified" , userController.isVerified);
router.get("/get-info" , userController.getUserDetails);
router.get("/check" , userController.checkUser);

module.exports = router;