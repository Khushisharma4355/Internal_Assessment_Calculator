import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

import dotenv from "dotenv";
dotenv.config();
export const sendOTP = async (email) => {
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: process.env.MAIL_ID,
      // pass: process.env.MAIL_PASSWORD,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "UrLevel Login OTP - Valid for 5 Minutes",
text: `Dear User,

Thank you for choosing UrLevel – your trusted internal assessment platform.

To continue logging in to your UrLevel account, please use the following One-Time Password (OTP):

🔐 OTP: ${otp}

⚠️ This OTP is valid only for 5 minutes. Please do not share it with anyone.

If you did not request this OTP, please ignore this email.

Warm regards,  
Team UrLevel`

  };

  await transporter.sendMail(mailOptions);
  return otp;
};
