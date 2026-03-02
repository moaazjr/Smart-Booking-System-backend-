// src/middleware/rateLimiter.js
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // أقصى عدد طلبات لكل IP
  message: { message: "Too many requests, please try again later." }
});

export default limiter;