// src/middleware/appointmentValidation.js
import { body } from "express-validator";

export const appointmentValidationRules = [
  body("clinicId")
    .notEmpty().withMessage("Clinic ID is required")
    .isMongoId().withMessage("Clinic ID must be a valid Mongo ObjectId"),

  body("date")
    .notEmpty().withMessage("Date is required")
    .isISO8601().withMessage("Date must be a valid ISO8601 date"),

  body("time")
    .notEmpty().withMessage("Time is required")
    .matches(/^([0-9]{1,2}:[0-9]{2}\s?(AM|PM))$/).withMessage("Time must be in format HH:MM AM/PM")
];