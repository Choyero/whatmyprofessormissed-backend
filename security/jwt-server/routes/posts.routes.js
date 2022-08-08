const express = require('express');
const { checkJWT } = require('../middleware/auth.middleware');
const router = express.Router();
const guard = require('express-jwt-permissions')({
    permissionsProperty: 'permissions'
}); // middleware to check the permissions of the jwts

router.get('/', checkJWT, guard.check(['read:post']), async (req, res) => {
    try {
        // this is where you would query your database for posts
        return res.status(200).send('all posts');
    } catch (err) {
        return res.status(500).send({message: "Internal Server Error"});
    }
});

router.post('/', checkJWT, guard.check(['create:post']), async (req, res) => {
    try {
        // create a new post in your database
        return res.status(200).send('new post');
    } catch (err) {
        return res.status(500).send({message: "Internal Server Error"});
    }
});

router.put('/', checkJWT, guard.check(['update:post']), async (req, res) => {
    try {
        // update post in your database
        return res.status(200).send('updated post');
    } catch (err) {
        return res.status(500).send({message: "Internal Server Error"});
    }
});

router.delete('/', checkJWT, guard.check(['delete:post']), async (req, res) => {
    try {
        // delete post in your database
        return res.status(200).send('deleted post');
    } catch (err) {
        return res.status(500).send({message: "Internal Server Error"});
    }
});


module.exports = router;