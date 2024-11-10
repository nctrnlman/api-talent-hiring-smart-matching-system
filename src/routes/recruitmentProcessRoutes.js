// routes/recruitmentProcessRoutes.js
const express = require("express");
const recruitmentProcessController = require("../controllers/recruitmentProcessController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/recruitment-processes:
 *   get:
 *     tags: [Recruitment Processes]
 *     summary: Get all recruitment processes with optional filters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employerId
 *         schema:
 *           type: integer
 *         description: The ID of the employer to filter recruitment processes by
 *       - in: query
 *         name: flow
 *         schema:
 *           type: string
 *         description: The flow stage of the recruitment process
 *     responses:
 *       200:
 *         description: Recruitment processes fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecruitmentProcess'
 */
router.get(
  "/",
  authenticateToken,
  recruitmentProcessController.getAllRecruitmentProcesses
);
/**
 * @swagger
 * /api/recruitment-processes/{id}/update-result:
 *   patch:
 *     tags: [Recruitment Processes]
 *     summary: Update the result and summary of a recruitment process
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recruitment process
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               result:
 *                 type: string
 *                 description: The result of the recruitment process
 *               summary:
 *                 type: string
 *                 description: A summary of the recruitment process
 *     responses:
 *       200:
 *         description: Successfully updated result and summary
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.patch(
  "/:id/update-result",
  authenticateToken,
  recruitmentProcessController.updateRecruitmentProcessResult
);

module.exports = router;
