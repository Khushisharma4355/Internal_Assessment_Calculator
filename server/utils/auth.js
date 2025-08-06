// utils/auth.js
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

export async function sendEmailWithOtp(to, otp) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"UrLevel OTP Login" <no-reply@urlevel.com>',
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  });
}

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}
