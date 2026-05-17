const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/connectDB");

const app = express();

const allowedOrigin = process.env.CLIENT_URL || process.env.FRONTEND_URL || "*";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "afyalink-backend" });
});

const start = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const gracefulShutdown = (signal) => {
      console.log(`${signal} received. Closing server gracefully...`);
      server.close(() => {
        console.log("HTTP server closed.");
        mongoose.connection.close(false, () => {
          console.log("MongoDB connection closed.");
          process.exit(0);
        });
      });
    };
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (err) {
    console.error("Server startup error:", err.message);
    process.exit(1);
  }
};

start();
