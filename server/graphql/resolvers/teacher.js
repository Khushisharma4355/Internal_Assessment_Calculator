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
        order: [
          [Course, "courseId", "ASC"],
          [Semester, "semester_id", "ASC"]
        ]
      });

      return assignments.map(a => ({
        courseId: a.Course?.courseId || "N/A",
        courseName: a.Course?.courseName || "Unknown Course",
        semester_id: a.Semester?.semester_id || "N/A",
        semester_Name: a.Semester?.semester_Name || "Unknown Semester",
        section_id: a.Section?.section_id || "N/A",
        section_name: a.Section?.section_name || "Unknown Section",
        subjectCode: a.Subject?.subjectCode || "N/A",
        subjectName: a.Subject?.subjectName || "Unknown Subject"
      }));
    },

    getStudentsByClass: async (_, { emp_id, courseId, semester_id, section_id }) => {
      try {
        // Check if teacher is assigned to the class
        const assigned = await TeacherSubjectSection.findOne({
          where: { emp_id, courseId, semester_id, section_id },
        });

        if (!assigned) {
          console.warn("Teacher not assigned to class:", { emp_id, courseId, semester_id, section_id });
          return [];
        }

        // Fetch students
        const students = await Student.findAll({
          where: { courseId, semester_id, section_id },
          attributes: ['registrationNo', 'student_name', 'student_email'],
        });

        return students.map(s => ({
          registrationNo: s.registrationNo || "N/A",
          student_name: s.student_name || "Unknown Name",
          student_email: s.student_email || "Unknown Email"
        }));

      } catch (err) {
        console.error("getStudentsByClass error:", err);
        return [];
      }
    },
  },

  Mutation: {
    addTeacher: async (_, args) => {
      const teacher = await Teacher.create(args);
      const teacherCount = await Teacher.count();
      return { teacher, teacherCount };
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
