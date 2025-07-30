import Assessment from "../model/Assessment.js";
import Student from "../model/Student.js";
import Teacher from "../model/Teacher.js";
import Course from "../model/Course.js";
import { where } from "sequelize";
import TeacherSubjectSection from "../model/TeacherSubSection.js";

export const resolvers = {
  Query: {
    // Fetch all students
    students: async () => {
      // Fetch all students from the database
      // No need to manually map fields — handled by field resolvers below
      return await Student.findAll();
    },

    // Fetch a student by registrationNo (BigInt), including course
    student: async (_, { registrationNo }) => {
  try {
    return await Student.findOne({ 
      where: { registrationNo: registrationNo.toString() },
      include: [Course],
    });
  } catch (err) {
    throw new Error("Failed to fetch student");
  }
},
getSubjects:async(_,{emp_id})=>{
  return await TeacherSubjectSection.findAll({where:{emp_id}})
},
getTeacher:async(_,{emp_id})=>{
return await Teacher.findOne({where:{emp_id}});
},
    // Fetch a student by email
    studentByEmail: async (_, { student_email }) =>
      await Student.findOne({
        where: { student_email },
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
   Teacher: {
    Subjects: async (parent) => {
      return await TeacherSubjectSection.findAll({ where: { emp_id: parent.emp_id } });
    }
  },
};
