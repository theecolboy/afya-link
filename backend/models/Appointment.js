const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patient: String,
  doctor: String,
  hospital: String,
  date: Date,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);