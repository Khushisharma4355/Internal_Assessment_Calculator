// import Student from "../model/Student.js";
// import Teacher from "../model/Teacher.js";
// import Admin from "../model/Admin.js";
import Student from "../../model/Student.js";
import Teacher from "../../model/Teacher.js";
import Admin from "../../model/Admin.js";
export default {
  Query: {
    checkEmail: async (_, { email }) => {
      try {
        const student = await Student.findOne({ where: { student_email: email } });
        return !!student;
      } catch (err) {
        console.error("Error checking student email:", err);
        return false;
      }
    },

    checkTeacherEmail: async (_, { email }) => {
      try {
        const teacher = await Teacher.findOne({ where: { emp_email: email } });
        return !!teacher;
      } catch (err) {
        console.error("Error checking teacher email:", err);
        return false;
      }
    },

    checkAdminEmail: async (_, { email }) => {
      try {
        const admin = await Admin.findOne({ where: { admin_email: email } });
        return !!admin;
      } catch (err) {
        console.error("Error checking admin email:", err);
        return false;
      }
    },
  },
};
