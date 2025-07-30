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
import { Op } from "sequelize";
import TeacherSubjectSection from "../model/TeacherSubSection.js";
import Subject from "../model/Subjects.js";
import Semester from "../model/Semester.js";

export const resolvers = {
  Query: {
    // Fetch all students
    students: async () => await Student.findAll(),

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

    // Fetch subjects for a given teacher
    getSubjects: async (_, { emp_id }) => {
      return await TeacherSubjectSection.findAll({ where: { emp_id } });
    },

    // Fetch a single subject by subjectCode
    Subject: async (_, { subjectCode }) => {
      return await Subject.findOne({ where: { subjectCode } });
    },

    // Fetch semester info for a subject (includes associated semester)
    semester: async (_, { subjectCode }) => {
      const subject = await Subject.findOne({
        where: { subjectCode },
        include: [Semester], // assumes association defined
      });
      return subject?.semester_id || null;
    },

    // Fetch teacher by ID
    getTeacher: async (_, { emp_id }) => {
      return await Teacher.findOne({
  where: { emp_id },
  include: [
    {
      model: Subject,
      include: [
        { model: Semester },  // 👈 this is crucial
        { model: Course }
      ]
    },
    {
      model: TeacherSubjectSection
    }
  ]
});
    },

    // Fetch a student by email
    studentByEmail: async (_, { student_email }) => {
      return await Student.findOne({
        where: { student_email },
      });
    },

    // Fetch all courses
    courses: async () => await Course.findAll(),

    // Fetch a course by ID
    courseById: async (_, { courseId }) => {
      return await Course.findByPk(courseId.toString());
    },

    // Fetch all assessments for a student
    getStudentAssessment: async (_, { registrationNo }) => {
      return await Assessment.findAll({
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
      });
    },
  },

  // Custom field resolvers
  Student: {
    name: (parent) => parent.student_name,
    course: async (parent) => {
      return await Course.findByPk(parent.courseId);
    },
  },

  Assessment: {
    student: (parent) => parent.Student,
    teacher: (parent) => parent.Teacher,
  },

  Teacher: {
    Subjects: async (parent) => {
      return await TeacherSubjectSection.findAll({
        where: { emp_id: parent.emp_id },
      });
    },

    Subject: async (parent) => {
  const teacherSubs = await TeacherSubjectSection.findAll({
    where: { emp_id: parent.emp_id },
  });
  const subjectCodes = teacherSubs.map((ts) => ts.subjectCode);

  return await Subject.findAll({
    where: { subjectCode: { [Op.in]: subjectCodes } },
    include: [Course, Semester], // <- this is what was missing
  });
},

    semester: async (parent) => {
      const teacherSubs = await TeacherSubjectSection.findAll({
        where: { emp_id: parent.emp_id },
      });
      const subjectCodes = teacherSubs.map((ts) => ts.subjectCode);

      const subjects = await Subject.findAll({
        where: { subjectCode: { [Op.in]: subjectCodes } },
        include: [Semester],
      });

      const semesters = subjects
        .map((s) => s.Semester)
        .filter(
          (sem, index, self) =>
            sem &&
            index === self.findIndex((s) => s.semester_id === sem.semester_id)
        );

      return semesters;
    },
  },
};
