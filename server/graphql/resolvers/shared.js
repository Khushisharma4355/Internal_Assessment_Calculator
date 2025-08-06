// import Student from "../../model/Student.js";
// import Teacher from "../../model/Teacher.js";
// import Admin from "../../model/Admin.js";
// import Otp from "../../model/Otp.js";
// import jwt from "jsonwebtoken";
// import { Op } from "sequelize";
// import { sendOTP } from "../../utils/sendOtp.js";

// const JWT_SECRET = process.env.JWT_SECRET;

// export const emailResolvers = {

//    Query: {
//   checkEmail: async (_, { email, role }) => {
//     try {
//       let model;
//       let emailField;

//       switch (role.toLowerCase()) {
//         case "student":
//           model = Student;
//           emailField = "student_email";
//           break;
//         case "teacher":
//           console.log("Role: teacher, Email:", email);
//           model = Teacher;
//           emailField = "emp_email";
//           break;


//         case "admin":
//           model = Admin;
//           emailField = "emp_email";
//           break;

//         // case "admin":
//         // // Special logic for admin check
//         // const teacher = await Teacher.findOne({ where: { emp_email: email } });

//         // if (!teacher) {
//         //   return {
//         //     success: false,
//         //     message: "No teacher found with this email",
//         //   };
//         // }

//         // const admin = await Admin.findOne({ where: { emp_id: teacher.emp_id } });

//         // if (!admin) {
//         //   return {
//         //     success: false,
//         //     message: "Teacher is not an admin",
//         //   };
//         // }

//         // return {
//         //   success: true,
//         //   message: "Admin email verified",
//         // };

//         default:
//           return {
//             success: false,
//             message: "Invalid role provided",
//           };
//       }

//       const user = await model.findOne({ where: { [emailField]: email } });

//       if (user) {
//         return {
//           success: true,
//           message: "Email exists",
//         };
//       } else {
//         return {
//           success: false,
//           message: "Email does not exist",
//         };
//       }
//     } catch (error) {
//       console.error("Error in checkEmail resolver:", error);
//       return {
//         success: false,
//         message: "Internal server error",
//       };
//     }
//   },
// },

//   Mutation: {
//     sendLoginOtp: async (_, { email, role }) => {
//       let model;
//       let emailField;

//       switch (role.toLowerCase()) {
//         case "student":
//           model = Student;
//           emailField = "student_email";
//           break;
//         case "teacher":
//           model = Teacher;
//           emailField = "emp_email";
//           break;
//         case "admin":
//           model = Admin;
//           emailField = "emp_email";
//           break;
//         default:
//           throw new Error("Invalid role");
//       }

//       const user = await model.findOne({
//         where: { [emailField]: email.toLowerCase() },
//       });

//       if (!user) return { success: false, message: "Email not found" };

//       const otp = await sendOTP(email);

//       await Otp.create({
//         email,
//         otp,
//         expiresAt: new Date(Date.now() + 5 * 60000), // 5 minutes expiry
//       });

//       return { success: true, message: "OTP sent to email" };
//     },

// //     sendLoginOtp: async (_, { email, role }) => {
// //   let model;
// //   let emailField;

// //   switch (role.toLowerCase()) {
// //     case "student":
// //       model = Student;
// //       emailField = "student_email";
// //       break;
// //     case "teacher":
// //       model = Teacher;
// //       emailField = "emp_email";
// //       break;
// //     case "admin": {
// //       const teacher = await Teacher.findOne({ where: { emp_email: email.toLowerCase() } });

// //       if (!teacher) return { success: false, message: "No teacher found with this email" };

// //       const admin = await Admin.findOne({ where: { emp_id: teacher.emp_id } });

// //       if (!admin) return { success: false, message: "Teacher is not an admin" };

// //       const otp = await sendOTP(email);

// //       await Otp.create({
// //         email,
// //         otp,
// //         expiresAt: new Date(Date.now() + 5 * 60000),
// //       });

// //       return { success: true, message: "OTP sent to email" };
// //     }
// //     default:
// //       throw new Error("Invalid role");
// //   }

// //   const user = await model.findOne({
// //     where: { [emailField]: email.toLowerCase() },
// //   });

// //   if (!user) return { success: false, message: "Email not found" };

// //   const otp = await sendOTP(email);

// //   await Otp.create({
// //     email,
// //     otp,
// //     expiresAt: new Date(Date.now() + 5 * 60000),
// //   });

// //   return { success: true, message: "OTP sent to email" };
// // },


//     verifyLoginOtp: async (_, { email, otp, role }) => {
//       const record = await Otp.findOne({
//         where: {
//           email,
//           otp,
//           expiresAt: { [Op.gt]: new Date() },
//         },
//       });

//       if (!record) {
//         return {
//           success: false,
//           token: null,
//           message: "Invalid or expired OTP",
//         };
//       }

//       await Otp.destroy({ where: { email } });

//       const payload = { email, role };
//       const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

//       return {
//         success: true,
//         token,
        
//         message: "OTP verified successfully",
//       };
//     },
//   },
// };

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
        email = email.toLowerCase();

        if (role.toLowerCase() === "student") {
          const student = await Student.findOne({ where: { student_email: email } });
          if (student) return { success: true, message: "Email exists" };
          return { success: false, message: "Student email not found" };
        }

        if (role.toLowerCase() === "teacher") {
          const teacher = await Teacher.findOne({ where: { emp_email: email } });
          if (teacher) return { success: true, message: "Email exists" };
          return { success: false, message: "Teacher email not found" };
        }

        if (role.toLowerCase() === "admin") {
          const teacher = await Teacher.findOne({ where: { emp_email: email } });
          if (!teacher) return { success: false, message: "No teacher found with this email" };

          const admin = await Admin.findOne({ where: { emp_id: teacher.emp_id } });
          if (!admin) return { success: false, message: "Teacher is not an admin" };

          return { success: true, message: "Admin email verified" };
        }

        return { success: false, message: "Invalid role provided" };
      } catch (error) {
        console.error("Error in checkEmail:", error);
        return { success: false, message: "Internal server error" };
      }
    },
  },

  Mutation: {
    sendLoginOtp: async (_, { email, role }) => {
      try {
        email = email.toLowerCase();

        if (role.toLowerCase() === "student") {
          const student = await Student.findOne({ where: { student_email: email } });
          if (!student) return { success: false, message: "Student email not found" };
        } else if (role.toLowerCase() === "teacher") {
          const teacher = await Teacher.findOne({ where: { emp_email: email } });
          if (!teacher) return { success: false, message: "Teacher email not found" };
        } else if (role.toLowerCase() === "admin") {
          const teacher = await Teacher.findOne({ where: { emp_email: email } });
          if (!teacher) return { success: false, message: "No teacher found with this email" };

          const admin = await Admin.findOne({ where: { emp_id: teacher.emp_id } });
          if (!admin) return { success: false, message: "Teacher is not an admin" };
        } else {
          return { success: false, message: "Invalid role" };
        }

        const otp = await sendOTP(email);

        await Otp.create({
          email,
          otp,
          expiresAt: new Date(Date.now() + 5 * 60000), // 5 minutes expiry
        });

        return { success: true, message: "OTP sent to email" };
      } catch (error) {
        console.error("Error in sendLoginOtp:", error);
        return { success: false, message: "Internal server error" };
      }
    },

    verifyLoginOtp: async (_, { email, otp, role }) => {
      try {
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
          message: "OTP verified successfully",
        };
      } catch (error) {
        console.error("Error in verifyLoginOtp:", error);
        return {
          success: false,
          token: null,
          message: "Internal server error",
        };
      }
    },
  },
};

