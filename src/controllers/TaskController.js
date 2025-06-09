const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const { title, description } = req.query;

  const filter = { userId: req.userId };

  if (title) filter.title = { $regex: title, $options: 'i' };
  if (description) filter.description = { $regex: description, $options: 'i' };

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description, status, category, deadline } = req.body;

  const task = await Task.create({
    userId: req.userId,
    title,
    description,
    status,
    category,
    deadline,
  });

  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true },
  );
  if (!updated) return res.sendStatus(404);
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!deleted) return res.sendStatus(404);
  res.sendStatus(204);
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    res.json(task);
  } catch (error) {
    console.error('Ошибка при получении задачи:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};