const jwt = require('jsonwebtoken');
const config = require('../config');
const mongoose = require('mongoose');

const verifyCtrl = {};


verifyCtrl.verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }

    let jwtError = null;
    let decoded = {};
    await jwt.verify(token, config.secret, (err, resp) => {
        if (err) {
            jwtError = err;
            // return res.status(401).send('Unauthorized');
            console.log('Hay un error: ' + err);
        } else {
            decoded = resp;
            console.log(resp);
        }
    });

    if (jwtError) {
        return res.status(401).send('Unauthorized');
    }

    next();
}

module.exports = verifyCtrl;