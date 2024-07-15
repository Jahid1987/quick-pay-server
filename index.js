const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookiePerser = require("cookie-parser");
const { connectDb } = require("./db/connection");
const app = express();
const port = process.env.PORT || 5000;
// routes imported
const authRoutes = require("./routes/authRoutes");
const transectionsRoutes = require("./routes/transectionsRoutes");

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(cookiePerser());

// all routes
app.use("/auth", authRoutes);
app.use("/transetions", transectionsRoutes);

// Connecting to the server and then listening to the routers hit
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`This server is runnign at ${port}`);
    });
  })
  .catch((err) => console.error(err));
