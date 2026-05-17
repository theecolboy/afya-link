const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");

const app = express();

app.use(cors());
app.use(express.json());

connectDB().then(() => {
  app.get("/", (req, res) => {
    res.send("AfyaLink API Running");
  });

  const authRoutes = require("./routes/authRoutes");
  const appointmentRoutes = require("./routes/appointmentRoutes");
  const postRoutes = require("./routes/postRoutes");

  app.use("/api/auth", authRoutes);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/posts", postRoutes);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
  });
}).catch(function (err) {
  console.log("Server startup error:", err.message);
  process.exit(1);
});
