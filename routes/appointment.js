import express from "express"
import Appointment from "../models/Appointment.js"

const router = express.Router()

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
    res.json(appointments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new appointment
router.post("/", async (req, res) => {
  const appointment = new Appointment(req.body)
  try {
    const newAppointment = await appointment.save()
    res.status(201).json(newAppointment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete an appointment
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id)
    res.json({ message: "Appointment deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

