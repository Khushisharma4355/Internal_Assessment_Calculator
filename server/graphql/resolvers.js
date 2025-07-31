// import Assessment from "../model/Assessment.js";
// import Student from "../model/Student.js";
// import Teacher from "../model/Teacher.js";
// import Course from "../model/Course.js";
// import { where } from "sequelize";
// import TeacherSubjectSection from "../model/TeacherSubSection.js";
// import Subject from "../model/Subjects.js";
// import Semester from "../model/Semester.js";

// export const resolvers = {
//   Query: {
//     // Fetch all students
//     students: async () => {
//       // Fetch all students from the database
//       // No need to manually map fields — handled by field resolvers below
//       return await Student.findAll();
//     },

//     // Fetch a student by registrationNo (BigInt), including course
//     student: async (_, { registrationNo }) => {
//   try {
//     return await Student.findOne({ 
//       where: { registrationNo: registrationNo.toString() },
//       include: [Course],
//     });
//   } catch (err) {
//     throw new Error("Failed to fetch student");
//   }
// },
// getSubjects:async(_,{emp_id})=>{
//   return await TeacherSubjectSection.findAll({where:{emp_id}})
// },
// Subject:async(_,{subjectCode})=>{
// return await Subject.findOne({where:subjectCode})
// },
// semester:async(_,{subjectCode})=>{
// return await Subject.findOne({where:subjectCode});
// },
// getTeacher:async(_,{emp_id})=>{
// return await Teacher.findOne({where:{emp_id}});
// },
//     // Fetch a student by email
//     studentByEmail: async (_, { student_email }) =>
//       await Student.findOne({
//         where: { student_email },
//       }),

//     // Fetch all courses
//     courses: async () => await Course.findAll(),

//     courseById:async(_,{courseId})=>{
//       return await Course.findByPk({
//         where:{courseId:courseId.toString()},
//       })
//     },

//     // Fetch assessment records for a student by registrationNo
//     getStudentAssessment: async (_, { registrationNo }) => {
//       return await Assessment.findAll({
//         where: { registrationNo: registrationNo.toString() },
//         include: [
//           {
//             model: Student,
//             attributes: ["registrationNo", "student_name"], // DB field names
//           },
//           {
//             model: Teacher,
//             attributes: ["emp_id", "emp_name"],
//           },
//         ],
//       });
//     },
//   },

//   // Field resolvers for custom mappings
//   Student: {
//     // Map GraphQL 'name' field to Sequelize 'student_name'
//     name: (parent) => parent.student_name,

//     // Resolve 'course' relation using foreign key courseId
//     course: async (parent) => {
//       return await Course.findByPk(parent.courseId);
//     },
//   },

//   Assessment: {
//     // Return the included Student and Teacher instances from Sequelize
//     student: (parent) => parent.Student,
//     teacher: (parent) => parent.Teacher,
//   },
//    Teacher: {
//   Subjects: async (parent) => {
//     return await TeacherSubjectSection.findAll({ where: { emp_id: parent.emp_id } });
//   },
//   Subject: async (parent) => {
//     // Get all subjects assigned to this teacher
//     const teacherSubs = await TeacherSubjectSection.findAll({ where: { emp_id: parent.emp_id } });
//     const subjectCodes = teacherSubs.map(ts => ts.subjectCode);
//     return await Subject.findAll({ where: { subjectCode: subjectCodes } });
//   },
//   semester: async (parent) => {
//     const teacherSubs = await TeacherSubjectSection.findAll({ where: { emp_id: parent.emp_id } });
//     const subjectCodes = teacherSubs.map(ts => ts.subjectCode);
//     return await Semester.findAll({ where: { subjectCode: subjectCodes } });
//   }
// }
// };





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
    studentByEmail: async (_, { student_email }) => {
      return await Student.findOne({
        where: { student_email },
      });
    },

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

  // Custom field resolvers
  Student: {
    name: (parent) => parent.student_name,
    course: async (parent) => await Course.findByPk(parent.courseId),
  },

  Assessment: {
    student: (parent) => parent.Student,
    teacher: (parent) => parent.Teacher,
  },
};
