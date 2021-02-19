/* eslint-disable */
require('dotenv').config();
const nodemailer = require('nodemailer');

export default (req, res) => {
    const { name, email, text } = req.body;
    // const isProdEnv = process.env.NODE_ENV === 'production';
    const isProdEnv = false;

    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: isProdEnv ? 465 : 587,
        secure: isProdEnv,
        auth: {
            user: `${process.env.SENDGRID_USER}`,
            pass: `${process.env.SENDGRID_PASS}`
        },
    });

    const message = {
        from: `${process.env.CONTACT_FROM}`,
        to: `${process.env.CONTACT_TO}`,
        subject: `New message from: ${name}`,
        text: text,
        html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>${text}</p>
        `
    };

    transporter.sendMail(message, (err) => {
        if (err) {
            res.send('error' + JSON.stringify(err));
        } else {
            res.send('success', message);
        }
    });
}
