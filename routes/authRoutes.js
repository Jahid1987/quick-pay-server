const express = require("express");
const {
  registerUser,
  loginUser,
  loginUserWithMobile,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/mobilelogin", loginUserWithMobile);

module.exports = router;
