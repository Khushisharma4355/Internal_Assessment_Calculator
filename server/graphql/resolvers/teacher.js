import Teacher from "../../model/Teacher.js";
import TeacherSubjectSection from "../../model/TeacherSubSection.js";
import Subject from "../../model/Subjects.js";
import Semester from "../../model/Semester.js";
import Course from "../../model/Course.js";
import Section from "../../model/Section.js";
import Student from "../../model/Student.js";
import Department from "../../model/Department.js";
export default {
  Query: {
    getTeacher: async (_, { emp_id }) => {
      return await Teacher.findOne({
        where: { emp_id },
        attributes: ["emp_id", "emp_name", "emp_email", "emp_phone"],
      });
    },

    getAllTeachers: async () =>
      await Teacher.findAll({
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
      }),

    getTeacherClasses: async (_, { emp_id }) => {
      const assignments = await TeacherSubjectSection.findAll({
        where: { emp_id },
        include: [
          { model: Course, attributes: ["courseId", "courseName"] },
          { model: Semester, attributes: ["semester_id", "semester_Name"] },
          { model: Section, attributes: ["section_id", "section_name"] },
          { model: Subject, attributes: ["subjectCode", "subjectName"] }
        ],
        order: [["courseId", "ASC"], ["semester_id", "ASC"]]
      });

      return assignments.map(a => ({
        courseId: a.courseId,
        courseName: a.Course?.courseName || null,
        semester_id: a.semester_id,
        semester_Name: a.Semester?.semester_Name || null,
        section_id: a.section_id,
        section_name: a.Section?.section_name || null,
        subjectCode: a.subjectCode,
        subjectName: a.Subject?.subjectName || null
      }));
    },

    getStudentsByClass: async (_, { emp_id, courseId, semester_id, section_id }) => {
      try {
        // Check teacher assignment first
        const assigned = await TeacherSubjectSection.findOne({
          where: { emp_id, courseId, semester_id, section_id },
        });

        if (!assigned) {
          throw new Error("Access denied: You are not assigned to this class.");
        }

        // Fetch students if teacher assigned
        const students = await Student.findAll({
          where: { courseId, semester_id, section_id },
          attributes: ['registrationNo', 'student_name', 'student_email'],
        });

        return students;
      } catch (err) {
        console.error("getStudentsByClass error:", err);
        throw new Error("Failed to fetch students");
      }
    },
  },
  Mutation: {
    addTeacher: async (_, args) => {
      const teacher = await Teacher.create(args);
      const teacherCount = await Teacher.count();
      return {
        teacher,
        teacherCount
      };

    }
  },

  Teacher: {
    Subjects: async (parent) => {
      if (parent.TeacherSubjectSections) return parent.TeacherSubjectSections;
      return await TeacherSubjectSection.findAll({
        where: { emp_id: parent.emp_id },
        include: [{ model: Subject }],
      });
    },
  },

  TeacherSubSec: {
    subject: async (parent) => {
      if (parent.Subject) return parent.Subject;
      return await Subject.findOne({ where: { subjectCode: parent.subjectCode } });
    },
  },
};
