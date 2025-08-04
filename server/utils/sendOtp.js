import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

export const sendOTP = async (email) => {
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "Your OTP for Login",
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
  return otp;
};
