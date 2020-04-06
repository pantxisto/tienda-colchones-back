const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const mailCtrl = require('./mail.controller');
const generatePassword = require('password-generator');

const authCtrl = {};

authCtrl.postSignin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email: email }, (err, resp) => {
        if (err) {
            console.log(err);
        }
    });
    
    if (!user) {
        return res.status(404).json({message: 'The email or password doesn´t match'});
    }
    
    if (user.password !== password) {
       return res.status(401).json({
           auth: false,
           token: null
       }); 
    } else {
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        });
        res.json({
            auth: true,
            token: token,
            role: user.role
        });
    }    
};

authCtrl.postRemember = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email: email }, (err, resp) => {
        if (err) {
            console.log(err);
        }
    });

    if (!user) {
        return res.status(404).send('No email found');
    }

    const newPassword = generatePassword(12, false);
    const newUser = {
        username: user.username, 
        email: user.email, 
        password: newPassword, 
        role: user.role
    };

    await User.updateOne({ _id : user._id}, {$set: newUser}, { new: true}, (err, raw) => {
        if (err) {
            console.log(err);
        }
    });

    // Si el usuario existe creamos una nueva contraseña para el y se la mandamos por email
    // Definimos el email
    const mailOptions = {
        from: 'Remitente',
        to: email,
        subject: 'New Password',
        text: 'Your new password is: ' + newPassword + ' Thank you.'
    };
    
    mailCtrl.transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(error);
            res.status(500).send(error.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};

/* GET users listing. */
authCtrl.getUsers = async (req, res, next) => {
    const users = await User.find();
    res.json(users);
};

module.exports = authCtrl;