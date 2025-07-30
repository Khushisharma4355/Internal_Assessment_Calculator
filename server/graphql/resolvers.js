import Assessment from "../model/Assessment.js";
import Student from "../model/Student.js";
import Teacher from "../model/Teacher.js";
import Course from "../model/Course.js";
import { where } from "sequelize";

export const resolvers = {
  Query: {
    // Fetch all students
    students: async () => {
      // Fetch all students from the database
      // No need to manually map fields — handled by field resolvers below
      return await Student.findAll();
    },

    // Fetch a student by registrationNo (BigInt)
    student: async (_, { registrationNo }) =>
      await Student.findOne({
        where: { registrationNo: registrationNo.toString() },
      }),

    // Fetch a student by email
    studentByEmail: async (_, { student_email }) =>
      await Student.findOne({
        where: { student_email },
      }),

    // Fetch all courses

    courses: async () => {
      return await Course.findAll()
    },

    // Fetch assessment records for a student by registrationNo
    getStudentAssessment: async (_, { registrationNo }) => {
      return await Assessment.findAll({
        where: { registrationNo: registrationNo.toString() },
        include: [
          {
            model: Student,
            attributes: ["registrationNo", "student_name"], // DB field names
          },
          {
            model: Teacher,
            attributes: ["emp_id", "emp_name"],
          },
        ],
      });
    },
  },

  // Field resolvers for custom mappings
  Student: {
    // Map GraphQL 'name' field to Sequelize 'student_name'
    name: (parent) => parent.student_name,

    // Resolve 'course' relation using foreign key courseId
    course: async (parent) => {
      return await Course.findByPk(parent.courseId);
    },
  },

  Assessment: {
    // Return the included Student and Teacher instances from Sequelize
    student: (parent) => parent.Student,
    teacher: (parent) => parent.Teacher,
  },
};
