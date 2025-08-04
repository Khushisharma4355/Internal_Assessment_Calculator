import Course from "../../model/Course.js";
import Section from "../../model/Section.js";
import Semester from "../../model/Semester.js";
import Subject from "../../model/Subjects.js";
export default {
  Query: {
    courses: async () => await Course.findAll(),
    sections: async () => await Section.findAll(),

    semester: async (_, { subjectCode }) => {
      const subject = await Subject.findOne({
        where: { subjectCode },
        include: [{ model: Semester }],
      });
      return subject ? subject.Semester : null;
    },
  },
};
