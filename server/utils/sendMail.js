import nodemailer from "nodemailer";

export const sendEmailWithOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password",
    },
  });

  await transporter.sendMail({
    from: "your_email@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  });
};
