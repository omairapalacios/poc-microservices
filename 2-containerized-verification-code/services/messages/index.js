const express = require('express');
const { sendVerificationCode, verifyCode } = require('./twilio');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.get("/api", (req, res) => {
  res.json({ name: 'POC - Microservice - Patpro', version: '1.0.0' });
})

app.post('/api/messages/send-code', async (req, res) => {
  const to = req.body.to;
  try {
    await sendVerificationCode(to);
    res.status(200).json({
      message: true
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
});

app.post('/api/messages/verify-code', async (req, res) => {
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

app.listen(app.get('port'), () => {
  console.info(
    '\x1b[33m%s\x1b[0m',
    `>>> Server listening on port ${app.get('port')} 🚀 `
  );
});