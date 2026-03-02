/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Book a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clinicId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 example: "09:00 AM"
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all appointments for logged-in user
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 */
/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Cancel an appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment cancelled successfully
 *       403:
 *         description: Not authorized to cancel this appointment
 *       404:
 *         description: Appointment not found
 */

// src/routes/appointmentRoutes.js
import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getUserAppointments,
} from "../controller/appointmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { appointmentValidationRules } from "../middleware/appointmentValidation.js";
import { validationResult } from "express-validator";

const router = express.Router();

// حجز موعد جديد (محتاج يكون المستخدم عامل login)
// router.post("/book-appointment", authMiddleware, bookAppointment);
// حجز موعد جديد مع التحقق من البيانات
router.post(
  "/book-appointment",
  authMiddleware,
  appointmentValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  bookAppointment,
);

// إلغاء موعد (محتاج يكون المستخدم عامل login)
router.delete("/:id", authMiddleware, cancelAppointment);

// عرض مواعيد المستخدم (محتاج يكون المستخدم عامل login)
router.get("/", authMiddleware, getUserAppointments);

export default router;
