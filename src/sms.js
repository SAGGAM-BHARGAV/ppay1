require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

const sendOTP = (mobileNumber, otp) => {
  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: twilioPhoneNumber,
      to: `+${mobileNumber}`
    })
    .then(message => console.log(`OTP sent to ${mobileNumber}: ${message.sid}`))
    .catch(error => console.error(`Error sending OTP: ${error}`));
};

module.exports = { sendOTP };