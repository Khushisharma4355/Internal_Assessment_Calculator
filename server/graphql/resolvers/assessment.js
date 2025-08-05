// import Assessment from "../model/Assessment.js";
// import Student from "../model/Student.js";
// import Teacher from "../model/Teacher.js";
// import Subject from "../model/Subjects.js";
import Assessment from "../../model/Assessment.js";
import Student from "../../model/Student.js";
import Teacher from "../../model/Teacher.js";
import Subject from "../../model/Subjects.js";

export default {
  Query: {
    getStudentAssessment: async (_, { registrationNo }) =>
      await Assessment.findAll({
        where: { registrationNo: registrationNo.toString() },
        include: [
          { model: Student, attributes: ["registrationNo", "student_name"] },
          { model: Teacher, attributes: ["emp_id", "emp_name"] },
          { model: Subject, attributes: ["subjectCode", "subjectName"] },
        ],
      }),
  },

  Mutation: {
    enterMarks: async (_, { registrationNo, subjectCode, marks, markType }) => {
      const allowed = ["Class_test_1", "Class_test_2", "MTE", "ETE", "attendance"];
      if (!allowed.includes(markType)) {
        return { success: false, message: "Invalid mark type" };
      }

      const existing = await Assessment.findOne({ where: { registrationNo, subjectCode } });
      if (existing) {
        await existing.update({ [markType]: marks });
        return { success: true, message: `Updated ${markType} successfully.` };
      }

      const student = await Student.findOne({ where: { registrationNo } });
      if (!student) return { success: false, message: "Student not found" };

      await Assessment.create({
        student_id: student.student_id,
        registrationNo,
        subjectCode,
        [markType]: marks,
      });

      return { success: true, message: `Entered ${markType} successfully.` };
    },

    bulkEnterMarks: async (_, { marks }) => {
      try {
        for (const m of marks) {
          const existing = await Assessment.findOne({
            where: { registrationNo: m.registrationNo, subjectCode: m.subjectCode },
          });

          if (existing) {
            await existing.update({ [m.markType]: m.marks });
          } else {
            await Assessment.create({
              registrationNo: m.registrationNo,
              subjectCode: m.subjectCode,
              [m.markType]: m.marks,
            });
          }
        }

        return { success: true, message: "Marks saved successfully" };
      } catch (err) {
        console.error(err);
        return { success: false, message: "Error saving marks" };
      }
    },
  },

  Assessment: {
    student: (parent) => parent.Student,
    teacher: (parent) => parent.Teacher,
    subject: (parent) => parent.Subject,
  },
};
