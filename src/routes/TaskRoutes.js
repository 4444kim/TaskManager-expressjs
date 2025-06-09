// src/routes/TaskRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require('../controllers/TaskController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *           example: Завершить проект
 *         description:
 *           type: string
 *           example: Подготовить презентацию и отправить заказчику
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *           description: |
 *             Статус задачи:
 *             - `pending`: ещё не начата
 *             - `in-progress`: в процессе
 *             - `completed`: завершена
 *
 *             ⚠️ Просроченная задача — это та, у которой `deadline < текущая дата` и статус ≠ `completed`
 *         category:
 *           type: string
 *           example: Работа
 *         deadline:
 *           type: string
 *           format: date-time
 *           example: 2025-06-01T18:00:00.000Z
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks (поиск по title/description)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Поиск по названию
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Поиск по описанию
 *     responses:
 *       200:
 *         description: Список задач
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', auth, getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.get('/:id', auth, getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Завершить проект
 *               description:
 *                 type: string
 *                 example: Подготовить презентацию и отправить заказчику
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 example: pending
 *               category:
 *                 type: string
 *                 example: Работа
 *               deadline:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-06-01T18:00:00.000Z
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/', auth, createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *               category:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */
router.patch('/:id', auth, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete('/:id', auth, deleteTask);

module.exports = router;
