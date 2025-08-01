import Assessment from "../model/Assessment.js";
import Student from "../model/Student.js";
import Teacher from "../model/Teacher.js";
import Course from "../model/Course.js";
import Admin from "../model/Admin.js"; // You missed this import in your original code
import { Op } from "sequelize";
import TeacherSubjectSection from "../model/TeacherSubSection.js";
import Subject from "../model/Subjects.js";
import Semester from "../model/Semester.js";
import Section from "../model/Section.js";

export const resolvers = {
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
    getTeacher: async (_, { emp_id }) => {
      try {
        const teacher = await Teacher.findOne({
          where: { emp_id },
          attributes: ['emp_id', 'emp_name', 'emp_email', 'emp_phone']
        });

        if (!teacher) {
          console.log(`Teacher ${emp_id} not found in database`);
          return null;
        }

        return teacher;
      } catch (err) {
        console.error("Error in getTeacher resolver:", err);
        throw new Error("Failed to fetch teacher data");
      }
    },
   getAllTeachers: async () => {
      return await Teacher.findAll({
        include: [
          {
            model: TeacherSubjectSection,
            include: [
              {
                model: Subject,
                attributes: ["subjectName", "subjectCode"],
              },
            ],
          },
        ],
      });
    },

    // get semester info from Subject, return full Semester object (optional)
    semester: async (_, { subjectCode }) => {
      const subject = await Subject.findOne({
        where: { subjectCode },
        include: [{ model: Semester }],
      });
      return subject ? subject.Semester : null;
    },

    getStudentsByClass: async (_, { courseId, semester_id, section_id }) => {
      return await Student.findAll({
        where: { courseId, semester_id, section_id },
      });
    },

    courses: async () => await Course.findAll(),

    sections: async () => await Section.findAll(),

    getTeacherClasses: async (_, { emp_id }) => {
      const assignments = await TeacherSubjectSection.findAll({
        where: { emp_id },
      });

      const subjectCodes = [...new Set(assignments.map((a) => a.subjectCode))];

      const subjects = await Subject.findAll({
        where: { subjectCode: subjectCodes },
        include: [
          { model: Course, attributes: ["courseId", "courseName"] },
          { model: Semester, attributes: ["semester_id", "semester_Name"] },
        ],
        attributes: ["subjectCode", "subjectName", "courseId", "semester_id"],
      });

      const subjectMap = new Map(subjects.map((s) => [s.subjectCode, s]));

      return assignments.map((assign) => {
        const subject = subjectMap.get(assign.subjectCode);

        return {
          courseId: subject?.courseId || null,
          courseName: subject?.Course?.courseName || null,
          semester_id: subject?.semester_id || null,
          section_id: assign.section_id,
          subjectCode: assign.subjectCode,
          subjectName: subject?.subjectName || null,
        };
      });
    },

    getStudentAssessment: async (_, { registrationNo }) => {
      return await Assessment.findAll({
        where: { registrationNo: registrationNo.toString() },
        include: [
          { model: Student, attributes: ["registrationNo", "student_name"] },
          { model: Teacher, attributes: ["emp_id", "emp_name"] },
          { model: Subject, attributes: ["subjectCode", "subjectName"] }
        ],
      });
    },
  },

  Mutation: {
    enterMarks: async (_, { registrationNo, subjectCode, marks, markType }) => {
      try {
        const allowedFields = ["Class_test_1", "Class_test_2", "MTE", "ETE", "attendance"];
        if (!allowedFields.includes(markType)) {
          return { success: false, message: "Invalid mark type" };
        }

        const existing = await Assessment.findOne({
          where: { registrationNo, subjectCode },
        });

        if (existing) {
          await existing.update({ [markType]: marks });
          return { success: true, message: `Updated ${markType} successfully.` };
        } else {
          // You need student_id for creating Assessment; fetch student first:
          const student = await Student.findOne({ where: { registrationNo } });
          if (!student) {
            return { success: false, message: "Student not found" };
          }

          await Assessment.create({
            student_id: student.student_id,
            registrationNo,
            subjectCode,
            [markType]: marks,
          });

          return { success: true, message: `Entered ${markType} successfully.` };
        }
      } catch (err) {
        console.error("enterMarks error:", err);
        return { success: false, message: "Error saving marks" };
      }
    },

    // inside Mutation:
    bulkEnterMarks: async (_, { marks }) => {
      try {
        for (const m of marks) {
          const existing = await Assessment.findOne({
            where: {
              registrationNo: m.registrationNo,
              subjectCode: m.subjectCode,
            },
          });

          if (existing) {
            await existing.update({ [m.markType]: m.marks });
          } else {
            await Assessment.create({
              registrationNo: m.registrationNo,
              subjectCode: m.subjectCode,
              [m.markType]: m.marks,
            });
          }
        }
        return { success: true, message: "Marks saved successfully" };
      } catch (err) {
        console.error(err);
        return { success: false, message: "Error saving marks" };
      }
    }
    ,
  },

  Student: {
    // student_name: (parent) => parent.student_name,
    course: async (parent) => await Course.findByPk(parent.courseId),
  },

  Assessment: {
    student: (parent) => parent.Student,
    teacher: (parent) => parent.Teacher,
    subject:(parent)=>parent.Subject
  },
    Teacher: {
    Subjects: (parent) => parent.TeacherSubjectSections, // Sequelize default name
  },

  TeacherSubSec: {
    subject: (parent) => parent.Subject, // included from Sequelize
  },
};
