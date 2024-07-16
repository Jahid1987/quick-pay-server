const express = require("express");
const { getUserByMobile } = require("../controllers/userController");

const router = express.Router();

router.get("/:mobile", getUserByMobile);
module.exports = router;
