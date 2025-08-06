import Student from "../../model/Student.js";
import Teacher from "../../model/Teacher.js";
import Admin from "../../model/Admin.js";
import Otp from "../../model/Otp.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { sendOTP } from "../../utils/sendOtp.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const emailResolvers = {

   Query: {
  checkEmail: async (_, { email, role }) => {
    try {
      let model;
      let emailField;

      switch (role.toLowerCase()) {
        case "student":
          model = Student;
          emailField = "student_email";
          break;
        case "teacher":
          model = Teacher;
          emailField = "emp_email";
          break;
        case "admin":
          model = Admin;
          emailField = "emp_email";
          break;
        default:
          return {
            success: false,
            message: "Invalid role provided",
          };
      }

      const user = await model.findOne({ where: { [emailField]: email } });

      if (user) {
        return {
          success: true,
          message: "Email exists",
        };
      } else {
        return {
          success: false,
          message: "Email does not exist",
        };
      }
    } catch (error) {
      console.error("Error in checkEmail resolver:", error);
      return {
        success: false,
        message: "Internal server error",
      };
    }
  },
},

  Mutation: {
    sendLoginOtp: async (_, { email, role }) => {
      let model;
      let emailField;

      switch (role.toLowerCase()) {
        case "student":
          model = Student;
          emailField = "student_email";
          break;
        case "teacher":
          model = Teacher;
          emailField = "emp_email";
          break;
        case "admin":
          model = Admin;
          emailField = "emp_email";
          break;
        default:
          throw new Error("Invalid role");
      }

      const user = await model.findOne({
        where: { [emailField]: email.toLowerCase() },
      });

      if (!user) return { success: false, message: "Email not found" };

      const otp = await sendOTP(email);

      await Otp.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60000), // 5 minutes expiry
      });

      return { success: true, message: "OTP sent to email" };
    },

    verifyLoginOtp: async (_, { email, otp, role }) => {
      const record = await Otp.findOne({
        where: {
          email,
          otp,
          expiresAt: { [Op.gt]: new Date() },
        },
      });

      if (!record) {
        return {
          success: false,
          token: null,
          message: "Invalid or expired OTP",
        };
      }

      await Otp.destroy({ where: { email } });

      const payload = { email, role };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      return {
        success: true,
        token,
        // role,
        message: "OTP verified successfully",
      };
    },
  },
};
