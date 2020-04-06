var nodemailer = require('nodemailer');

const mailCtrl = {};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ginzocolchones@gmail.com',
        pass: 'ginzocolchones123'
    }
});

// Enviamos el email
mailCtrl.transporter = transporter;

module.exports = mailCtrl;
