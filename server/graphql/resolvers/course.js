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

    // Fetch the semester for a specific subject
    semester: async (_, { subjectCode }) => {
      const subject = await Subject.findOne({
        where: { subjectCode },
        include: [{ model: Semester }],
      });
      return subject && subject.Semester ? {
        semester_id: subject.Semester.semester_id,
        semester_Name: subject.Semester.semester_Name,
        subject: [{
          subjectCode: subject.subjectCode,
          subjectName: subject.subjectName
        }]
      } : null;
    },

    // Fetch course by ID with semesters and their subjects
    courseById: async (_, { courseId }) => {
      const course = await Course.findByPk(courseId);
      if (!course) return null;

      // Get all subjects for this course
      const subjects = await Subject.findAll({ where: { courseId } });

      // Group subjects by semester safely
      const semestersMap = {};
      for (let sub of subjects) {
        const semester = await Semester.findByPk(sub.semester_id);
        if (!semester) continue; // skip if semester does not exist

        if (!semestersMap[semester.semester_id]) {
          semestersMap[semester.semester_id] = {
            semester_id: semester.semester_id,
            semester_Name: semester.semester_Name,
            subject: [],
          };
        }

        semestersMap[semester.semester_id].subject.push({
          subjectCode: sub.subjectCode,
          subjectName: sub.subjectName,
        });
      }

      // Convert map to array
      course.dataValues.semesters = Object.values(semestersMap);

      return course;
    },
  },
};
