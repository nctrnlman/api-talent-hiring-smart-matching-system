const express = require("express");
const authController = require("../controllers/authController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user (CANDIDATE or EMPLOYER)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Doe"
 *               birthOfDate:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Anytown"
 *               job:
 *                 type: string
 *                 example: "Software Developer"
 *               jobExperience:
 *                 type: object
 *                 example: {"company": "ABC Corp", "years": 3}
 *               cv:
 *                 type: string
 *                 example: "http://example.com/my_cv.pdf"
 *               instagram:
 *                 type: string
 *                 example: "http://instagram.com/johndoe"
 *               twitter:
 *                 type: string
 *                 example: "http://twitter.com/johndoe"
 *               linkedin:
 *                 type: string
 *                 example: "http://linkedin.com/in/johndoe"
 *               portfolio:
 *                 type: string
 *                 example: "http://johndoe.com"
 *               photoProfile:
 *                 type: string
 *                 example: "http://example.com/photo.jpg"
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *               role:
 *                 type: string
 *                 enum: [CANDIDATE, EMPLOYER]
 *                 example: "CANDIDATE"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "your_access_token_here"
 *                 role:
 *                   type: string
 *                   example: "CANDIDATE"
 *       401:
 *         description: Unauthorized
 */
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

module.exports = router;
