import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import database from "./config/db.js";
import clinicRoutes from "./routes/clinicRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import limiter from "./middleware/rateLimiter.js";
import helmet from "helmet";
import cors from "cors";
import { swaggerUi, swaggerSpec } from "./swagger.js";


const app = express();

app.use(express.json());
app.use(errorHandler);
// 🛡️ Helmet: بيضيف هيدرز حماية
app.use(helmet());

// 🌍 CORS: يسمح للـ frontend يتصل بالـ backend
app.use(cors({
  origin: "http://localhost:3000", // 👈 عدّل حسب الـ frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use(limiter); // 🕒 تطبيق الـ rate limiter على كل الطلبات
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));





app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  database.connect();
});
