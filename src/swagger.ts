import * as swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
  swagger: "2.0",
  info: {
    title: "Patient Management API",
    version: "1.0.0",
    description: "API for managing patients and psychiatrists",
  },
  basePath: "/api/",
  servers: [
    {
      url: "http://localhost:3000/api/",
    },
  ],
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
