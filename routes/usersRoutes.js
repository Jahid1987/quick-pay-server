const express = require("express");
const {
  getUserByMobile,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.patch("/:id", authenticateToken, roleMiddleware(["admin"]), updateUser);
router.get("/", authenticateToken, roleMiddleware(["admin"]), getAllUsers);
router.get("/:mobile", authenticateToken, getUserByMobile);

module.exports = router;
