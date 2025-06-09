const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../utils/upload');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/ProfileController');

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6655f99c401c9a3f7a7e90c8
 *                 email:
 *                   type: string
 *                   example: test@example.com
 *                 firstName:
 *                   type: string
 *                   example: Иван
 *                 lastName:
 *                   type: string
 *                   example: Иванов
 *                 avatar:
 *                   type: string
 *                   example: /uploads/avatar.jpg
 */

/**
 * @swagger
 * /api/profile:
 *   patch:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Алексей
 *               lastName:
 *                 type: string
 *                 example: Смирнов
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Updated profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 avatar:
 *                   type: string
 */

/**
 * @swagger
 * /api/profile:
 *   delete:
 *     summary: Delete user account
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully
 */
router.get('/', auth, getProfile);
router.patch('/', auth, upload.single('avatar'), updateProfile);
router.delete('/', auth, deleteProfile);

module.exports = router;
