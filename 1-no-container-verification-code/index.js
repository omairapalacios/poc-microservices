const express = require('express');
const { sendVerificationCode, verifyCode } = require('./twilio');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/messages", (req, res) => {
    res.json({ name: 'POC - Microservice - Patpro', version: '1.0.0' });
})

app.post('/messages/send-code',async (req, res) => {
    const to = req.body.to;
    try {
        await sendVerificationCode(to);
        res.status(200).json({
            meesage: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

app.post('/messages/verify-code', async (req, res) => {
    const to = req.body.to;
    const code = req.body.code;
    try {
        const value = await verifyCode(to, code);
        res.status(200).json({
            message: value
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
});

app.listen(3000, () => {
    console.log("Server online");
})