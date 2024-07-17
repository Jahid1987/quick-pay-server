const express = require("express");
const {
  getUserByMobile,
  getAllUsers,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();
router.get("/", authenticateToken, roleMiddleware(["admin"]), getAllUsers);
router.get("/:mobile", getUserByMobile);
module.exports = router;
