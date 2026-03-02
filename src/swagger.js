// src/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clinic Booking API",
      version: "1.0.0",
      description: "API documentation for clinic booking system"
    },
    servers: [
      {
        url: "http://localhost:3000/api"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/*.js"], // 👈 هنا بنحدد مكان الـ routes
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };