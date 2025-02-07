import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import appointmentRoutes from "./routes/appointment.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
// app.use(cors({
//     origin: ['https://appointment-booking-system-iota.vercel.app', 'http://localhost:5173'],
//     credentials: true
// }));

app.use(cors({
    origin: [
      process.env.CLIENT_URL,
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.use("/api/appointments", appointmentRoutes)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

