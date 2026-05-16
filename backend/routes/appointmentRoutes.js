const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;