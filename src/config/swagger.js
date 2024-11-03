const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "HR Tech API",
    version: "1.0.0",
    description: "API documentation for Human Resource Management System",
  },
  servers: [
    {
      url: "http://localhost:3000", // Ubah sesuai dengan URL Anda
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Menentukan file yang berisi anotasi Swagger
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
