import { validateOrReject } from "class-validator";
import { hospitalRepo, patientRepo } from "../data-source";
import { Patient } from "../entity";
import * as express from "express";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - email
 *         - password
 *         - photo
 *       properties:
 *         name:
 *           type: string
 *         address:
 *           type: string
 *           minLength: 10
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *           minLength: 10
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 15
 *           minLowercase: 1
 *           minUppercase: 1
 *           minNumbers: 1
 *         photo:
 *           type: string
 *           format: binary
 */

/**
 * @swagger
 * /patient:
 *   post:
 *     summary: Register a new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Patient registered successfully
 *       400:
 *         description: Invalid request
 *     tags:
 *       - Patients
 */
router.post("/patient", async (req, res) => {
  const patient = new Patient();
  patient.create(req.body);
  try {
    await validateOrReject(patient);
    const newPatient = await patientRepo.save(patient);
    res.send({ newPatient });
  } catch (error) {
    res.status(400).send({ error });
  }
});

/**
 * @swagger
 * /psychiatrists/{hospitalId}:
 *   get:
 *     summary: Get the details of psychiatrists and their patients for a hospital
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Psychiatrists and patients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hospitalName:
 *                   type: string
 *                 totalPsychiatristCount:
 *                   type: integer
 *                 totalPatientsCount:
 *                   type: integer
 *                 psychiatristDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         patientsCount:
 *                           type: integer
 *
 *       404:
 *         description: Hospital not found
 *     tags:
 *       - Psychiatrists
 */
router.get("/psychiatrists/:hospitalId", async (req, res) => {
  const hospitalId = req.params.hospitalId;

  try {
    // Fetch the hospital details from the database
    const hospital = await hospitalRepo.findOne({
      where: { id: +hospitalId },
      relations: {
        patients: true,
        psychiatrists: {
          patients: true,
        },
      },
    });

    // Calculate the total number of patients for each psychiatrist
    const psychiatrists = hospital.psychiatrists.map((psychiatrist) => {
      const patientsCount = psychiatrist.patients.length;
      return { ...psychiatrist, patientsCount };
    });
    return res.status(200).send({
      hospitalName: hospital.name,
      totalPsychiatristCount: psychiatrists.length,
      totalPatientsCount: hospital.patients.length,
      psychiatristDetails: psychiatrists.map((psychiatrist) => ({
        id: psychiatrist.id,
        name: psychiatrist.name,
        patientsCount: psychiatrist.patientsCount,
      })),
    });
  } catch (error) {
    return res.status(404).send({ error: "Hospital not found" });
  }
});

export default router;
