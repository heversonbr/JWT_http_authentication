const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {registerValidation} = require('../validation');
const {loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {

    // Validate the data (req.body) according to the validation schema. 
    // it returns an object  
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {name, email, password} = req.body;

    // Check if user already exists.
    const mailExist = await User.findOne({ email: email });
    if(mailExist) return res.status(400).send('Email already exists!');

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 14);  // 14: Salt value(hash difficulty)

    // Create new User object 
    const user = new User({ 
        name: name , 
        email : email , 
        password : hashedPassword
    }); 

    // try to save in the database.
    try{
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    }
    catch(err){
        res.status(400).send(err);
    }    
});

router.post('/login', async (req, res) => {

    // Validate the data (req.body) according to the validation schema. 
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {email, password} = req.body;

    // Check if user exists.
    const user = await User.findOne({ email: email });
    if(!user) return res.status(400).send('Email or password is wrong'); 
    // the 'Email or password is wrong' is kind of vague, but it is better 
    // not revealing to much information to avoid attacks. 

    // Check if password is correct
    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // Create a JWT token 
    const payload = { id: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h"} );
    res.header('auth-token', token).send(token);

});

module.exports = router;