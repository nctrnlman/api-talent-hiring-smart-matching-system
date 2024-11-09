// routes/applicantRoutes.js
const express = require("express");
const applicantController = require("../controllers/applicantController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/applicants:
 *   get:
 *     tags: [Applicants]
 *     summary: List all applicants or filter by vacancyId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: vacancyId
 *         schema:
 *           type: integer
 *         description: The ID of the vacancy to filter applicants by
 *     responses:
 *       200:
 *         description: Applicants fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Applicant'
 */
router.get("/", authenticateToken, applicantController.listApplicants);

/**
 * @swagger
 * /api/applicants:
 *   post:
 *     tags: [Applicants]
 *     summary: Apply to a vacancy
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               vacancyId:
 *                 type: integer
 *               status:
 *                 type: string
 *               flow:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Applicant'
 */
router.post("/", authenticateToken, applicantController.applyToVacancy);

module.exports = router;
