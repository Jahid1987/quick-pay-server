const { getDb } = require("../db/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};
// registerUser usign mongodb
async function registerUser(req, res) {
  try {
    const { name, pin, mobile, email, status, role } = req.body;
    const isExist = await getDb().collection("users").findOne({ email });
    if (isExist) {
      return res.status(409).send("This email is already exist.");
    }
    const hashedPin = await bcrypt.hash(pin, 10);
    const user = { name, password: hashedPin, mobile, status, role, email };
    const result = await getDb().collection("users").insertOne(user);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// loginUser using mongodb
async function loginUser(req, res) {
  try {
    const { email, pin } = req.body;
    const user = await getDb().collection("users").findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await bcrypt.compare(pin, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRETE, {
      expiresIn: "1h",
    });
    res.cookie("token", token, cookieOptions).send({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
module.exports = { registerUser, loginUser };
