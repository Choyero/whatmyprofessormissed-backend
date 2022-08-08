const jwt = require('jsonwebtoken');

const secret = 'supersecret' // this is a secret probably should be much more longer or generated from another server

const signToken = (userRole, userId) => {
    // add permissions for token whether the userRole
    // is admin or a standard user
    let permissions = [];
    if (userRole == 'admin') {
        permissions = [
            'create:post',
            'read:post',
            'delete:post',
            'update:post'
        ]
    } else if (userRole == 'user') {
        permissions = [
            'read:post'
        ]
    }
    // set up to return a promise for asynchronous execution
    return new Promise((resolve, reject) => {
        jwt.sign({
            user: userId,
            permissions: permissions,
            role: userRole
            // you can add further data for your purposes   
        },
        secret, {
            algorithm: 'HS256',
            issuer: 'localhost:3000', // whatever issuer you want to put
            expiresIn: '30d' // you can add your own expiration date numeric values are interpreted as seconds
        }, (err, token) => {
            if (err) {
                // if error reject
                return reject(err);
            }
            return resolve(token);
        })
    });
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {
            issuer: 'localhost:3000',
            algorithms: ['HS256']
        }, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        })
    });
}

module.exports = {
    signToken: signToken,
    verifyToken: verifyToken,
}