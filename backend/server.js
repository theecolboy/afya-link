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

  app.use("/api/auth", authRoutes);
  app.use("/api/appointments", appointmentRoutes);

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});