// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// export const sendEmailWithOTP = async (email, otp) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//        user: process.env.MAIL_USER, // your email address
//     pass: process.env.MAIL_PASS  // your app password or real password
//     },
//   });
 

// transporter.verify((error, success) => {
//   if (error) {
//     console.log("❌ Transporter error:", error);
//   } else {
//     console.log("✅ Server is ready to take our messages", success);
//   }
// });

//   await transporter.sendMail({
//     from: "thakur.sarita7788@gmail.com",
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP is: ${otp}`,
//   });
// };
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendTestMail = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log("❌ Verify Error:", error);
    } else {
      console.log("✅ Ready to send email");
    }
  });

  try {
    const info = await transporter.sendMail({
      from: `"UrLevel App" <${process.env.MAIL_USER}>`,
      to: "youremail@example.com", // 🛑 Replace with your test email
      subject: "Testing OTP Email",
      text: "This is a test OTP message!",
    });

    console.log("✅ Mail sent: ", info.messageId);
  } catch (err) {
    console.log("❌ SendMail Error:", err);
  }
};

sendTestMail();
