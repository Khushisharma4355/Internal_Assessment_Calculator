import Assessment from "../../model/Assessment.js";
import Student from "../../model/Student.js";
import Teacher from "../../model/Teacher.js";
import Subject from "../../model/Subjects.js";
import { sendWhatsAppMessage } from "../../twilioService.js";

export default {
  Query: {
    // Fetch assessments for a single student
    getStudentAssessment: async (_, { registrationNo }) => {
      return await Assessment.findAll({
        where: { registrationNo },
        include: [
          { model: Student, attributes: ["registrationNo", "student_name", "parent_Detail"] },
          { model: Teacher, attributes: ["emp_id", "emp_name"] },
          { model: Subject, attributes: ["subjectCode", "subjectName"] },
        ],
      });
    },

    // Fetch all students with their assessments
    getAllStudentsWithAssessments: async () => {
      const students = await Student.findAll({
        attributes: ["registrationNo", "student_name", "parent_Detail"]
      });

      const result = await Promise.all(
        students.map(async (student) => {
          const assessments = await Assessment.findAll({
            where: { registrationNo: student.registrationNo },
            include: [
              { model: Teacher, attributes: ["emp_id", "emp_name"] },
              { model: Subject, attributes: ["subjectCode", "subjectName"] },
            ],
          });

          return {
            registrationNo: student.registrationNo,
            studentName: student.student_name || "Unknown Student",
            parentPhone: student.parent_Detail || "",
            assessments
          };
        })
      );

      // Remove duplicate students if any
      return result.filter((item, index, self) =>
        index === self.findIndex(s => s.registrationNo === item.registrationNo)
      );
    },
  },

  Mutation: {
    // Send WhatsApp report dynamically to the parent's actual number
    sendReport: async (_, { parentPhone, message }) => {
      if (!parentPhone) {
        return { success: false, error: "Parent phone number is missing." };
      }

      try {
        const formattedPhone = parentPhone.startsWith("+") ? parentPhone : `+91${parentPhone}`;
        const response = await sendWhatsAppMessage(formattedPhone, message);
        return { success: true, sid: response.sid };
      } catch (err) {
        console.error("Twilio Error:", err.message);
        return { success: false, error: err.message };
      }
    },

    // Enter marks for one subject
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

      await Assessment.create({ registrationNo, subjectCode, [markType]: marks });
      return { success: true, message: `Entered ${markType} successfully.` };
    },

    // Bulk enter marks
   bulkEnterMarks: async (_, { marks, semester_id, emp_id, section_id }) => {
  try {
    for (const m of marks) {
      const existing = await Assessment.findOne({
        where: {
          registrationNo: m.registrationNo,
          subjectCode: m.subjectCode,
          semester_id,
          section_id,
        },
      });

      if (existing) {
        await existing.update({ [m.markType]: m.marks });
      } else {
        await Assessment.create({
          registrationNo: m.registrationNo,
          subjectCode: m.subjectCode,
          [m.markType]: m.marks,
          semester_id,
          emp_id,
          section_id,
        });
      }
    }
    return { success: true, message: "Marks saved successfully" };
  } catch (err) {
    console.error("Bulk mark entry error:", err);
    return { success: false, message: "Error saving marks" };
  }
}

,
  },

  Assessment: {
    student: async (parent) =>
      await Student.findOne({ where: { registrationNo: parent.registrationNo } }),
    teacher: async (parent) =>
      await Teacher.findOne({ where: { emp_id: parent.emp_id } }),
    subject: async (parent) =>
      await Subject.findOne({ where: { subjectCode: parent.subjectCode } }),
  },
};
