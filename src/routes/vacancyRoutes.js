const express = require("express");
const vacancyController = require("../controllers/vacancyController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/vacancies:
 *   post:
 *     tags: [Vacancies]
 *     summary: Create a new vacancy
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vacancyName:
 *                 type: string
 *               jobPosition:
 *                 type: string
 *               jobLevelId:
 *                 type: integer
 *               employmentStatusId:
 *                 type: integer
 *               vacancyStatus:
 *                 type: string
 *               responsibilities:
 *                 type: string
 *               gender:
 *                 type: string
 *               minAge:
 *                 type: integer
 *               maxAge:
 *                 type: integer
 *               minYearExperience:
 *                 type: integer
 *               minEducationLevelId:
 *                 type: integer
 *               employerId:
 *                 type: integer
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: integer
 *               hardSkills:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Vacancy created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacancy'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/vacancies/{id}:
 *   put:
 *     tags: [Vacancies]
 *     summary: Update a vacancy by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the vacancy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vacancyName:
 *                 type: string
 *               jobPosition:
 *                 type: string
 *               jobLevelId:
 *                 type: integer
 *               employmentStatusId:
 *                 type: integer
 *               vacancyStatus:
 *                 type: string
 *               responsibilities:
 *                 type: string
 *               gender:
 *                 type: string
 *               minAge:
 *                 type: integer
 *               maxAge:
 *                 type: integer
 *               minYearExperience:
 *                 type: integer
 *               minEducationLevelId:
 *                 type: integer
 *               employerId:
 *                 type: integer
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: integer
 *               hardSkills:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Vacancy updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacancy'
 *       404:
 *         description: Vacancy not found
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/",
  authenticateToken,
  authorizeRole("EMPLOYER"),
  vacancyController.listVacancies
);
router.post(
  "/",
  authenticateToken,
  authorizeRole("EMPLOYER"),
  vacancyController.createVacancy
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRole("EMPLOYER"),
  vacancyController.getVacancyById
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("EMPLOYER"),
  vacancyController.updateVacancy
);

module.exports = router;
