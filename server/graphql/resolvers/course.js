import Course from "../../model/Course.js";
import Section from "../../model/Section.js";
import Semester from "../../model/Semester.js";
import Subject from "../../model/Subjects.js";

export default {
  Query: {
    // Fetch all courses
    courses: async () => await Course.findAll(),

    // Fetch all sections
    sections: async () => await Section.findAll(),

    // Fetch semester by subjectCode
    semester: async (_, { subjectCode }) => {
      const subject = await Subject.findOne({
        where: { subjectCode },
        include: [{ model: Semester }],
      });
      return subject && subject.Semester
        ? {
            semester_id: subject.Semester.semester_id,
            semester_Name: subject.Semester.semester_Name,
          }
        : null;
    },

    // Fetch a single course with all its semesters and subjects
   courseById: async (_, { courseId }) => {
  const course = await Course.findByPk(courseId, {
    include: [
      {
        model: Semester,
        through: { attributes: [] }, // remove join table fields from result
        include: [
          {
            model: Subject,
            attributes: ["subjectCode", "subjectName"],
          },
        ],
      },
    ],
    order: [[Semester, "semester_id", "ASC"]],
  });

  if (!course) return null;

  return {
    courseId: course.courseId,
    courseName: course.courseName,
    semesters: course.Semesters.map((sem) => ({
      semester_id: sem.semester_id,
      semester_Name: sem.semester_Name,
      subjects: sem.Subjects.map((sub) => ({
        subjectCode: sub.subjectCode,
        subjectName: sub.subjectName,
      })),
    })),
  };
}

  },
};
