const express = require("express");
const {
  signup,
  verifyAccount,
  resendOTP,
  login,
  logout,
  forgetPassword,
  resetPassword,
} = require("../controller/authController");
const isAuthenticated = require("../middlewares/isAuthenticated");


const router = express.Router();

router.post("/signup", signup);
router.post("/verify", verifyAccount); // 🔓 No auth middleware
router.post("/resend-otp", resendOTP); // 🔓 No auth middleware
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);



module.exports = router;
