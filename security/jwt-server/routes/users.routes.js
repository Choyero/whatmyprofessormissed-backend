const express = require('express');
const { signToken } = require('../utils/auth');
const router = express.Router();


// route to login user by passing credentials and generating a jwt
router.post('/login', async (req, res) => {
    try {
        // this is where you would handle user credentials
        // typically you would have a hashed value of the user's password in a database
        // that you would decode and compare to the passed in password
        const {username, password} = req.body; // extract username and password from body
        // in a live system you should find the user with the provided username
        // and compare the password
        // if successfull you would get a user with their id and maybe their roles
        // in this example we will assume the passed in user has a admin role
        // let's get a signed token for the user
        const token = await signToken('admin', '1'); // pass in the user role and their id
        // return token in response
        return res.status(200).send({token: token});
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: "Internal Server Error"});
    }
});

module.exports = router;