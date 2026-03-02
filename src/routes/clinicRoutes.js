/**
 * @swagger
 * tags:
 *   name: Clinics
 *   description: Clinic management endpoints
 */

/**
 * @swagger
 * /clinics:
 *   get:
 *     summary: Get all clinics
 *     tags: [Clinics]
 *     responses:
 *       200:
 *         description: List of clinics
 *
 *   post:
 *     summary: Add a new clinic
 *     tags: [Clinics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               doctors:
 *                 type: array
 *                 items:
 *                   type: string
 *               availableSlots:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Clinic added successfully
 *       403:
 *         description: Access denied (only admin)
 */

/**
 * @swagger
 * /clinics/{id}:
 *   get:
 *     summary: Get clinic by ID
 *     tags: [Clinics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Clinic ID
 *     responses:
 *       200:
 *         description: Clinic details
 *       404:
 *         description: Clinic not found
 */

// src/routes/clinicRoutes.js
import express from "express";
import { clinicValidationRules } from "../middleware/clinicValidation.js";
import { validationResult } from "express-validator";
import {
  addClinic,
  getClinics,
  getClinicById,
} from "../controller/clinicController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/add-clinic",
  authMiddleware,
  authorizeRoles("admin"),
  clinicValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addClinic,
); // 👈 بس admin
router.get("/clinics", getClinics);
router.get("/:id", getClinicById);

export default router;
