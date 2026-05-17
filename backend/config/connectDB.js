const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    // Don't exit, allow server to start for testing
    console.log("Continuing without MongoDB connection...");
  }
};

module.exports = connectDB;
