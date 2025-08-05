import Student from "../../model/Student.js";
import Course from "../../model/Course.js";
export default {
  Query: {
    students: async () => await Student.findAll({ include: [Course] }),

  getStudentsByClass: async (_, { emp_id, courseId, semester_id, section_id }) => {
  try {
    // Ensure the teacher is actually assigned to this exact class
    const assignment = await TeacherSubjectSection.findOne({
      where: { emp_id, courseId, semester_id, section_id }
    });

    if (!assignment) {
      throw new Error("Teacher not assigned to this class");
    }

    return await Student.findAll({
      where: { courseId, semester_id, section_id },
      attributes: ["registrationNo", "student_name", "student_email"]
    });
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to fetch students");
  }
},



    getStudentsByTeacher: async (_, { emp_id }, { models }) => {
      try {
        const assignments = await models.TeacherSubjectSection.findAll({
          where: { emp_id },
          include: [
            { model: models.Subject, include: [models.Course, models.Semester] },
            { model: models.Section }
          ],
        });

        const classes = assignments.map((a) => ({
          courseId: a.Subject.courseId,
          semester_id: a.Subject.semester_id,
          section_id: a.section_id,
          courseName: a.Subject.Course.courseName,
          subjectCode: a.subjectCode,
          subjectName: a.Subject.subjectName,
        }));

        const studentLists = await Promise.all(
          classes.map((cls) =>
            models.Student.findAll({
              where: {
                courseId: cls.courseId,
                semester_id: cls.semester_id,
                section_id: cls.section_id,
              },
              raw: true,
            })
          )
        );

        let results = [];
        studentLists.forEach((students, idx) => {
          students.forEach((s) =>
            results.push({
              ...s,
              courseName: classes[idx].courseName,
              subjectCode: classes[idx].subjectCode,
              subjectName: classes[idx].subjectName,
            })
          );
        });

        return results;
      } catch (err) {
        console.error("Failed to fetch students by teacher:", err);
        throw new Error("Failed to fetch students");
      }
    },
  },

  Student: {
    course: async (parent) => await Course.findByPk(parent.courseId),
  },
};
