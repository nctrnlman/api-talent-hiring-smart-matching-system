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

/**
 * @swagger
 * /api/applicants/{id}/move-to-next-step:
 *   patch:
 *     tags: [Applicants]
 *     summary: Move applicant to the next step in the recruitment process and update status to IN_PROGRESS
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Applicant ID
 *       - in: body
 *         name: nextStepData
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             result:
 *               type: string
 *               description: The result of the recruitment step
 *             summary:
 *               type: string
 *               description: A summary of the recruitment process step
 *             flow:
 *               type: string
 *               description: The flow stage of the recruitment process
 *     responses:
 *       200:
 *         description: Applicant moved to the next step successfully and status updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Applicant not found
 */
router.patch(
  "/:id/move-to-next-step",
  authenticateToken,
  applicantController.moveToNextStep
);

module.exports = router;
