const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/auth');

// middleware to check if token is valid
const checkJWT = async (req, res, next) => {
    try {
        // check if the token is valid
        // get the token off of the headers
        // format is typically in Bearer token so we have to skip the first 7 characters in the string
        const validToken = await verifyToken(req.headers['authorization'].substring(7));
        // set the req.user to be the valid token payload so that checking the user permissions works
        req.user = validToken;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({message: "Unable to validate token"});
    }
}

module.exports = {
    checkJWT: checkJWT,
}