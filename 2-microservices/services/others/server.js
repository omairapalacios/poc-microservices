const express = require('express');
const { sendVerificationCode, verifyCode } = require('./twilio');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.get('/api', (req, res) => {
  res.json({ name: 'POC - Microservice - Patpro', version: '1.0.0' });
});

app.get('/api/others', async (req, res) => {
  res.json({ name: 'others services', version: '1.0.0' });
});

app.listen(app.get('port'), () => {
  console.info(
    '\x1b[33m%s\x1b[0m',
    `>>> Server listening on port ${app.get('port')} 🚀 `
  );
});
