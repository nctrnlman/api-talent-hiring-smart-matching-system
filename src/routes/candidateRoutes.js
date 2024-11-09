// src/routes/candidateRoutes.js

const express = require("express");
const candidateController = require("../controllers/candidateController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Candidates
 *   description: Operations related to candidates
 */

/**
 * @swagger
 * /api/candidates:
 *   get:
 *     tags: [Candidates]
 *     summary: Get a list of candidates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of candidates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Candidate'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/candidates/{id}:
 *   get:
 *     tags: [Candidates]
 *     summary: Get detailed information of a candidate by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the candidate
 *     responses:
 *       200:
 *         description: Candidate details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Candidate'
 *       404:
 *         description: Candidate not found
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/",
  authenticateToken,
  authorizeRole("EMPLOYER"),
  candidateController.listCandidates
);
router.get("/:id", authenticateToken, candidateController.getCandidateById);
router.put("/:id", authenticateToken, candidateController.updateCandidate);
module.exports = router;
