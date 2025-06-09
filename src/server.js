// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { swaggerUi, specs } = require('./docs/swagger');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// src/server.js (добавь middleware для отдачи файлов)
app.use('/uploads', express.static('uploads'));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', require('./routes/AuthRoutes'));
app.use('/api/tasks', require('./routes/TaskRoutes'));
app.use('/api/profile', require('./routes/ProfileRoutes'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
