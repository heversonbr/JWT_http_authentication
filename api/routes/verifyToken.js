const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware that verifies if headers contain the 'auth-token' header
// with a valid token in it.

function verifyToken(req, res, next){

    const token = req.header('auth-token');

    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send(err.message) 
     }
}

module.exports = verifyToken;