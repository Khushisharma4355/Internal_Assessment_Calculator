import Assessment from "../model/Assessment.js";
import Student from "../model/Student.js";
import Teacher from "../model/Teacher.js";
import Course from "../model/Course.js";
import Admin from "../model/Admin.js";

export const resolvers = {
  Query: {
    // Check if student email exists
    checkEmail: async (_, { email }) => {
      try {
        const student = await Student.findOne({ where: { student_email: email } });
        return !!student;
      } catch (err) {
        console.error("Error checking student email:", err);
        return false;
      }
    },

    // Check if teacher email exists
    checkTeacherEmail: async (_, { email }) => {
      try {
        const teacher = await Teacher.findOne({ where: { emp_email: email } });
        return !!teacher;
      } catch (err) {
        console.error("Error checking teacher email:", err);
        return false;
      }
    },

    // Check if admin email exists
    checkAdminEmail: async (_, { email }) => {
      try {
        const admin = await Admin.findOne({ where: { admin_email: email } });
        return !!admin;
      } catch (err) {
        console.error("Error checking admin email:", err);
        return false;
      }
    },

    // Fetch all students with courses
    students: async () => await Student.findAll({ include: Course }),

    // Fetch a student by registration number
    student: async (_, { registrationNo }) =>
      await Student.findOne({
        where: { registrationNo: registrationNo.toString() },
        include: [{ model: Course }],
      }),

    // Fetch a student by email
    studentByEmail: async (_, { student_email }) =>
      await Student.findOne({
        where: { student_email },
        include: Course,
      }),

    // Fetch all courses
    courses: async () => await Course.findAll(),

    // Fetch all assessments of a student
    getStudentAssessment: async (_, { registrationNo }) =>
      await Assessment.findAll({
        where: { registrationNo: registrationNo.toString() },
        include: [
          {
            model: Student,
            attributes: ["registrationNo", "student_name"],
          },
          {
            model: Teacher,
            attributes: ["emp_id", "emp_name"],
          },
        ],
      }),
  },

  Student: {
    name: (parent) => parent.student_name,
    course: async (parent) => await Course.findByPk(parent.courseId),
  },

  Assessment: {
    student: (parent) => parent.Student,
    teacher: (parent) => parent.Teacher,
  },
};
