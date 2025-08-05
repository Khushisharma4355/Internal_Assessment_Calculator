import Student from "../../model/Student.js";
import Course from "../../model/Course.js";
import TeacherSubjectSection from "../../model/TeacherSubSection.js"; // Ensure you import this
import Subject from "../../model/Subjects.js";
import Semester from "../../model/Semester.js";
import Section from "../../model/Section.js";

export default {
  Query: {
    // Fetch all students with their course details
    students: async () => await Student.findAll({ include: [Course] }),

getStudentsByClass: async (_, { emp_id, courseId, semester_id, section_id }) => {
  try {
    const semesterIdInt = Number(semester_id);

    // Get the assignment with subjectCode included
    const assignment = await TeacherSubjectSection.findOne({
      where: { emp_id, courseId, semester_id: semesterIdInt, section_id }
    });

    if (!assignment) {
      throw new Error("Access denied: You are not assigned to this class.");
    }

    // Fetch students of that class
    const students = await Student.findAll({
      where: { courseId, semester_id: semesterIdInt, section_id },
      attributes: ["registrationNo", "student_name", "student_email"]
    });

    // Attach subjectCode to each student record
    return students.map((student) => ({
      ...student.get(),           // convert Sequelize instance to plain object
      subjectCode: assignment.subjectCode
    }));
  } catch (err) {
    console.error("getStudentsByClass error:", err);
    throw err;
  }
}

,

    // Fetch all students for all classes assigned to a teacher
    getStudentsByTeacher: async (_, { emp_id }, { models }) => {
      try {
        const assignments = await models.TeacherSubjectSection.findAll({
          where: { emp_id },
          include: [
            { model: models.Subject, include: [models.Course, models.Semester] },
            { model: models.Section }
          ]
        });

        const classes = assignments.map((a) => ({
          courseId: a.Subject.courseId,
          semester_id: a.Subject.semester_id,
          section_id: a.section_id,
          courseName: a.Subject.Course.courseName,
          subjectCode: a.subjectCode,
          subjectName: a.Subject.subjectName
        }));

        const studentLists = await Promise.all(
          classes.map((cls) =>
            models.Student.findAll({
              where: {
                courseId: cls.courseId,
                semester_id: cls.semester_id, // already an int from DB
                section_id: cls.section_id
              },
              raw: true
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
              subjectName: classes[idx].subjectName
            })
          );
        });

        return results;
      } catch (err) {
        console.error("Failed to fetch students by teacher:", err);
        throw new Error("Failed to fetch students");
      }
    }
  },

  Student: {
    course: async (parent) => await Course.findByPk(parent.courseId)
  }
};
