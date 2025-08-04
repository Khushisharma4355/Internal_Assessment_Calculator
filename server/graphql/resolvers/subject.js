// import Subject from "../model/Subjects.js";
// import Course from "../model/Course.js";
import Subject from "../../model/Subjects.js";
import Course from "../../model/Course.js";

export default {
  Query: {
    subject: async (_, { subjectCode }) => {
      return await Subject.findOne({ where: { subjectCode }, include: [Course] });
    },

    getCourseBySubCode: async (_, { subjectCode }) => {
      const subject = await Subject.findOne({
        where: { subjectCode },
        include: [Course],
      });
      return subject?.Course || null;
    },
  },
};
