const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  cashOut,
  createTransection,
  getAllTransections,
  updateTransection,
  updateBalance,
} = require("../controllers/transectionController");

const router = express.Router();

router.get(
  "/",
  authenticateToken,
  roleMiddleware(["user", "agent"]),
  getAllTransections
);
router.patch("/:id", updateTransection);
router.post(
  "/create",
  authenticateToken,
  roleMiddleware("user"),
  createTransection
);
router.post(
  "/updatebalance",
  authenticateToken,
  roleMiddleware("user"),
  updateBalance
);
router.post("/cashout", authenticateToken, roleMiddleware("user"), cashOut);

module.exports = router;
