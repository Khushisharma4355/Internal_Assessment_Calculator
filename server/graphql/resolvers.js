import Assessment from "../model/Assessment.js";
import Student from "../model/Student.js";
import Teacher from "../model/Teacher.js";
import Course from "../model/Course.js";
import { where } from "sequelize";

export const resolvers = {
  Query: {
    // Fetch all students with their courses
    students: async () => await Student.findAll({ include: Course }),

    // Fetch a student by registrationNo (BigInt), including course
    student: async (_, { registrationNo }) =>
      await Student.findOne({ where: { registrationNo: registrationNo.toString() }, 
    // include: Course 
     include: [{ model: Course }]
  }),

    // Fetch a student by email
    studentByEmail: async (_, { student_email }) =>
      await Student.findOne({
        where: { student_email },
        include: Course,
      }),

    // Fetch all courses
    courses: async () => await Course.findAll(),
    
    courseById:async(_,{courseId})=>{
      return await course.findByPk({
        where:{courseId:courseId.toString()},
      })
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

  Student: {
    // Map GraphQL 'name' field to Sequelize's 'student_name'
    name: (parent) => parent.student_name,

    // Resolve 'course' association by primary key
    course: async (parent) => await Course.findByPk(parent.courseId),
  },

  Assessment: {
    // Return the included Student and Teacher instances from Sequelize
    student: (parent) => parent.Student,
    teacher: (parent) => parent.Teacher,
    // course:(parent)=>parent.course
  },
};
