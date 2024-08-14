const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose'); // Add this line to import mongoose
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projectRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/projects', projectRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));