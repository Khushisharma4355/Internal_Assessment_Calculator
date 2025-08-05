import Student from "../../model/Student.js";
import Course from "../../model/Course.js";
import TeacherSubjectSection from "../../model/TeacherSubSection.js";
import Subject from "../../model/Subjects.js";
import Semester from "../../model/Semester.js";
import Section from "../../model/Section.js";

export default {
  Query: {
    // Fetch all students with their course details
    students: async () => await Student.findAll({ include: [Course] }),

    // Get students by class (based on teacher's assignment)
    getStudentsByClass: async (_, { emp_id, courseId, semester_id, section_id }) => {
      const sectionMap = { A: "S001", B: "S002" };
      const dbSectionId = sectionMap[section_id] || section_id;

      try {
        const semesterIdInt = Number(semester_id);

        const assignment = await TeacherSubjectSection.findOne({
          where: {
            emp_id,
            courseId,
            semester_id: semesterIdInt,
            section_id: dbSectionId
          }
        });

        if (!assignment) {
          throw new Error("Access denied: You are not assigned to this class.");
        }

        const students = await Student.findAll({
          where: {
            courseId,
            semester_id: semesterIdInt,
            section_id: dbSectionId
          },
          attributes: ["registrationNo", "student_name", "student_email"]
        });

        return students.map((student) => ({
          ...student.get(),
          subjectCode: assignment.subjectCode
        }));
      } catch (err) {
        console.error("getStudentsByClass error:", err);
        throw err;
      }
    },

    // Get all students for the teacher across all assigned classes
    getStudentsByTeacher: async (_, { emp_id }) => {
      try {
       const assignments = await TeacherSubjectSection.findAll({
  where: { emp_id },
  include: [
    { model: Subject, include: [Course, Semester] },
    { 
      model: Section,
      attributes: ['section_id', 'section_name', 'createdAt', 'updatedAt']
    }
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
            Student.findAll({
              where: {
                courseId: cls.courseId,
                semester_id: cls.semester_id,
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

  // Student type resolvers (placed outside Query)
  Student: {
    course: async (parent) => await Course.findByPk(parent.courseId)
  }
};
