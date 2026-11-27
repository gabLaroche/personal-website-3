/* eslint-disable */
require('dotenv').config();
const axios = require('axios');

const escapeHtml = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).send('Method not allowed');
    }

    const { name, email, text } = req.body || {};

    if (!name || !email || !text) {
        return res.status(400).send('Missing fields');
    }

    try {
        await axios.post(
            'https://api.resend.com/emails',
            {
                from: process.env.CONTACT_FROM,
                to: process.env.CONTACT_TO,
                reply_to: email,
                subject: `New message from: ${name}`,
                text: `Name: ${name}\nEmail: ${email}\n\n${text}`,
                html: `
                    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                    <p style="white-space: pre-wrap">${escapeHtml(text)}</p>
                `,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return res.status(200).send('success');
    } catch (err) {
        console.error('Resend error:', err.response ? err.response.data : err.message);
        return res.status(500).send('Failed to send email');
    }
};
