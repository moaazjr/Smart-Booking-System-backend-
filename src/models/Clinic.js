// src/models/Clinic.js
import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    doctors: [{ type: String }], // ممكن تعمل Doctor schema منفصل لو عايز
    availableSlots: [
      {
        date: { type: Date, required: true },
        time: { type: String, required: true }, // مثال: "10:00 AM"
        isBooked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Clinic", clinicSchema);
