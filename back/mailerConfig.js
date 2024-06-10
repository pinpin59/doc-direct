const nodemailer = require('nodemailer');
require('dotenv').config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kevin.pintar@3wa.io',
        pass: process.env.MAILER_PASSWORD
    }
});

module.exports = transporter;