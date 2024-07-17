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

router.post("/getall", getAllTransections);
router.get(
  "/",
  authenticateToken,
  roleMiddleware(["user", "agent", "parchent"]),
  getTransections
);
router.patch(
  "/:id",
  authenticateToken,
  roleMiddleware(["agent"]),
  updateTransection
);
router.post("/create", createTransection);
router.post("/updatebalance", updateBalance);

module.exports = router;
