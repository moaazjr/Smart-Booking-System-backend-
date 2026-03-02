// src/controller/appointmentController.js
import Appointment from "../models/Appointments.js";
import Clinic from "../models/Clinic.js";

// حجز موعد جديد
export const bookAppointment = async (req, res) => {
  try {
    const { clinicId, date, time } = req.body;
    const userId = req.user.id; // لازم يكون عندك middleware بيضيف user من الـ JWT

    // تأكد إن العيادة موجودة
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });

    // تأكد إن الـ slot موجود ومش محجوز
    const slot = clinic.availableSlots.find(
      s => s.date.toISOString().split("T")[0] === date && s.time === time && !s.isBooked
    );
    if (!slot) return res.status(400).json({ message: "Slot not available" });

    // علّم الـ slot إنه محجوز
    slot.isBooked = true;
    await clinic.save();

    // أنشئ موعد جديد
    const appointment = await Appointment.create({
      user: userId,
      clinic: clinicId,
      slot: { date, time }
    });

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// إلغاء موعد
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    // تأكد إن المستخدم هو صاحب الموعد
    if (appointment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to cancel this appointment" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    // رجّع الـ slot متاح تاني
    const clinic = await Clinic.findById(appointment.clinicId); // تأكد من اسم الحقل
    if (clinic) {
      const slot = clinic.availableSlots.find(
        s =>
          s.date.toISOString().split("T")[0] === appointment.slot.date.toISOString().split("T")[0] &&
          s.time === appointment.slot.time
      );
      if (slot) {
        slot.isBooked = false;
        await clinic.save();
      }
    }

    res.json({ message: "Appointment cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// عرض مواعيد المستخدم
export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({ user: userId }).populate("clinic");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};