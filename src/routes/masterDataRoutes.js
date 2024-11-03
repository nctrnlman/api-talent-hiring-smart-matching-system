const express = require("express");
const masterDataController = require("../controllers/masterDataController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MasterData
 *   description: Operations related to master data
 */

/**
 * @swagger
 * /api/master:
 *   get:
 *     tags: [MasterData]
 *     summary: Get master data based on query parameters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [jobLevels, employmentStatuses, softSkills, hardSkills]
 *           description: Comma-separated list of data types to retrieve
 *     responses:
 *       200:
 *         description: Master data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobLevels:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobLevel'
 *                 employmentStatuses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmploymentStatus'
 *                 softSkills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SoftSkill'
 *                 hardSkills:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/HardSkill'
 *       401:
 *         description: Unauthorized
 */

router.get("/", authenticateToken, masterDataController.getMasterData);

module.exports = router;
