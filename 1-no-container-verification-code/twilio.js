const Twilio = require('twilio')
require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sid = process.env.TWILIO_SMS_SID;

const client = new Twilio(accountSid, authToken);

async function sendVerificationCode(to) {
  try {
    await client.verify.services(sid)
      .verifications
      .create({ to: to, channel: 'sms' })
  }
  catch (error) {
    throw Error(error);
  }
};

async function verifyCode(to, code) {
  try {
    const result = await client.verify.services(sid)
      .verificationChecks
      .create({ to: to, code: code })
    return result.status;
  }
  catch (error) {
    throw Error(error);
  }
}

module.exports = {
  sendVerificationCode,
  verifyCode
}