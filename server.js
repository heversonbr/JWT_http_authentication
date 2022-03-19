const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const authRoutes = require('./api/routes/auth');
const publicRoutes = require('./api/routes/public')

// This is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and it is based in the 'body-parser' module.
app.use(express.json());  

// Connect to the database.
console.log(process.env.DB_URL);
mongoose.connect(process.env.DB_URL, 
    function (err) {
        console.log('Connecting to database...')
        if (err) {
            console.log('ERROR: connecting to mongodb!');
            throw err;
        };
        console.log('Connected to mongodb!');
});

//Routes middlaware
app.use('/api/auth', authRoutes);
app.use('/api', publicRoutes);

// Server listener 
app.listen(3000, () => { 
    console.log('Running server at http://localhost:3000'); 
});