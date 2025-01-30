const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const gadgetRoutes = require('./routes/gadgetRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api', gadgetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });