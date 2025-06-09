const fs = require('fs');
const path = require('path');
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  try {
    if (req.file && req.file.size === 0) {
      fs.unlinkSync(path.join(__dirname, '..', req.file.path));
    }

    const { firstName, lastName } = req.body;

    const avatar = req.file && req.file.size > 0 ? `/uploads/${req.file.filename}` : undefined;

    const updates = { firstName, lastName };
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
    }).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Ошибка при обновлении профиля:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.deleteProfile = async (req, res) => {
  await User.findByIdAndDelete(req.userId);
  res.status(204).end();
};
