const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  cashOut,
  createTransection,
  getTransections,
  updateTransection,
  updateBalance,
  getAllTransections,
} = require("../controllers/transectionController");

const router = express.Router();

router.post(
  "/getall",
  authenticateToken,
  roleMiddleware("admin"),
  getAllTransections
);

router.get(
  "/",
  authenticateToken,
  roleMiddleware(["user", "agent"]),
  getTransections
);
router.patch(
  "/:id",
  authenticateToken,
  roleMiddleware("agent"),
  updateTransection
);
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
