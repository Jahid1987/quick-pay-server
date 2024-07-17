const express = require("express");
const {
  registerUser,
  loginUser,
  loginUserWithMobile,
  confirmPin,
} = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/mobilelogin", loginUserWithMobile);
router.post("/confirmpin", authenticateToken, confirmPin);

module.exports = router;
