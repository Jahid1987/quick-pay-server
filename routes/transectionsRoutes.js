const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { sendMoney, cashOut } = require("../controllers/transectionController");

const router = express.Router();

router.post("/sendmoney", authenticateToken, roleMiddleware("user"), sendMoney);
router.post("/cashout", authenticateToken, roleMiddleware("user"), cashOut);

module.exports = router;
