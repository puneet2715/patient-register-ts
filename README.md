# My API

This is an API for managing patients and psychiatrists. It allows you to register new patients, fetch the details of psychiatrists and their patients for a hospital, and more.
Libraries and Frameworks

---

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

---

## Libraries and Frameworks

The following libraries and frameworks were used in the development of this API:

- Express: A popular web framework for Node.js, used for defining the routes and handling the requests and responses of the API.

- TypeORM: An ORM (Object-Relational Mapper) that simplifies the interaction with the database and allows you to define the models and their relationships in a clear and concise way.

- Swagger: A tool for documenting and testing APIs, used to generate the API documentation and provide a user-friendly interface for testing the APIs.

## API Endpoints

The following is a list of the API endpoints and their functionality:

- POST /api/register: Register a new patient.

- GET /api/psychiatrists/:hospitalId: Get the details of psychiatrists and their patients for a hospital.

- GET /docs : Swagger documentation for the API.
