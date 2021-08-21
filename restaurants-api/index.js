'use strict'

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurant');

// Server
const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/restaurant', restaurantRoutes);

app.listen(4000, () => {
    console.log("Server loaded")
});