// src/middleware/clinicValidation.js
import { body } from "express-validator";

export const clinicValidationRules = [
  body("name").notEmpty().withMessage("Clinic name is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("doctors").isArray().withMessage("Doctors must be an array"),
  body("availableSlots").isArray().withMessage("Available slots must be an array")
];