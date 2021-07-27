const nodemailer = require("nodemailer");

let transporter;

if(process.env.NODEMAILER_PRESET_SERVICE) {
    transporter = nodemailer.createTransport({
        pool: true,
        service: process.env.NODEMAILER_PRESET_SERVICE,
        auth: {
            user: process.env.NODEMAILER_SMTP_AUTH_USER,
            pass: process.env.NODEMAILER_SMTP_AUTH_PASS
        }
    })
} else {
    transporter = nodemailer.createTransport({
        pool: true,
        host: process.env.NODEMAILER_SMTP_HOST,
        port: process.env.NODEMAILER_SMTP_PORT,
        secure: process.env.NODEMAILER_SMTP_SECURE,
        auth: {
            type: process.env.NODEMAILER_SMTP_AUTH_TYPE,
            user: process.env.NODEMAILER_SMTP_AUTH_USER,
            pass: process.env.NODEMAILER_SMTP_AUTH_PASS
        }
    })
}

module.exports = transporter;