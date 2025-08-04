import Teacher from "../../model/Teacher.js";
import TeacherSubjectSection from "../../model/TeacherSubSection.js";
import Subject from "../../model/Subjects.js";
import Semester from "../../model/Semester.js";

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
  },

  Teacher: {
    Subjects: (parent) => parent.TeacherSubjectSections,
  },

  TeacherSubSec: {
    subject: (parent) => parent.Subject,
  },
};
