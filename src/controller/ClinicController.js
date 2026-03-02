// src/controller/clinicController.js
import Clinic from "../models/Clinic.js";

// إضافة عيادة جديدة
 const addClinic = async (req, res) => {
  try {
    const { name, address, doctors, availableSlots } = req.body;
    const clinic = await Clinic.create({ name, address, doctors, availableSlots });
    res.status(201).json({ message: "Clinic added successfully", clinic });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// عرض كل العيادات
 const getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// عرض عيادة معينة
const getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: "Clinic not found" });
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export { addClinic, getClinics, getClinicById };