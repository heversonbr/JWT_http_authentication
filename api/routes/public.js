const publicRouter = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verifyToken');


publicRouter.get('/' ,  verifyToken, (req, res) => { 
    res.send('Hello World!!'); 
});

// Test only
publicRouter.get('/users', verifyToken, async (req, res) => {
    const users = await User.find();
    if(!users) return res.status(400).send('no users found');
    res.status(201).send(users);

});



module.exports = publicRouter;



