import Assessment from "../model/Assessment.js";
import Student from "../model/Student.js";
import Teacher from "../model/Teacher.js";
import Course from "../model/Course.js";
import { Op } from "sequelize";
import TeacherSubjectSection from "../model/TeacherSubSection.js";
import Subject from "../model/Subjects.js";
import Semester from "../model/Semester.js";
import Section from "../model/Section.js";

export const resolvers = {
  Query: {
    // Check if student email exists
    checkEmail: async (_, { email }) => {
      try {
        const student = await Student.findOne({ where: { student_email: email } });
        return !!student;
      } catch (err) {
        console.error("Error checking student email:", err);
        return false;
      }
    },

    // Check if teacher email exists
    checkTeacherEmail: async (_, { email }) => {
      try {
        const teacher = await Teacher.findOne({ where: { emp_email: email } });
        return !!teacher;
      } catch (err) {
        console.error("Error checking teacher email:", err);
        return false;
      }
    },

    // Check if admin email exists
    checkAdminEmail: async (_, { email }) => {
      try {
        const admin = await Admin.findOne({ where: { admin_email: email } });
        return !!admin;
      } catch (err) {
        console.error("Error checking admin email:", err);
        return false;
      }
    },
  
    // Fetch semester info for a subject (includes associated semester)
    semester: async (_, { subjectCode }) => {
      const subject = await Subject.findOne({
        where: { subjectCode },
        include: [Semester], // assumes association defined
      });
      return subject?.semester_id || null;
    },
 getStudentsByClass: async (_, { courseId, sem_id, section_id }) => {
  return await Student.findAll({
    where: {
      courseId,
      semester_id: sem_id,   // map input sem_id to DB column semester_id
      section_id
    }
  });
},


   
  courses: async () => {
    return await Course.findAll();
  },
 semester: async (_, { subjectCode }) => {
  const subject = await Subject.findOne({
    where: { subjectCode },
    include: [Semester],
  });
  return subject?.semester_id || null;  // return FK from Subject
},
  sections: async () => {
    return await Section.findAll();
  },

getTeacherClasses: async (_, { emp_id }) => {
  // Fetch all teacher assignments
  const assignments = await TeacherSubjectSection.findAll({
    where: { emp_id }
  });

  // Extract unique subjectCodes from assignments
  const subjectCodes = [...new Set(assignments.map(a => a.subjectCode))];

  // Fetch all subjects with related Course and Semester in one query
  const subjects = await Subject.findAll({
    where: { subjectCode: subjectCodes },
    include: [
      { model: Course, attributes: ['courseId', 'courseName'] },
      { model: Semester, attributes: ['sem_id'] }
    ],
    attributes: ['subjectCode', 'subjectName', 'courseId', 'semester_id']
  });

  // Map subjectCode → Subject object for quick lookup
  const subjectMap = new Map(subjects.map(s => [s.subjectCode, s]));

  // Build results by combining assignment + subject info
  const results = assignments.map(assign => {
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

  return results;
}
,

    // Fetch all courses
    courses: async () => await Course.findAll(),

    // Fetch all assessments of a student
    getStudentAssessment: async (_, { registrationNo }) =>
      await Assessment.findAll({
        where: { registrationNo: registrationNo.toString() },
        include: [
          {
            model: Student,
            attributes: ["registrationNo", "student_name"],
          },
          {
            model: Teacher,
            attributes: ["emp_id", "emp_name"],
          },
        ],
      }),
  },

Mutation:{
enterMarks: async (_, { registrationNo, subjectCode, marks, markType }) => {
  try {
    // Validate markType against allowed fields
    const allowedFields = ["Class_test_1", "Class_test_2", "MTE", "ETE", "attendance"];
    if (!allowedFields.includes(markType)) {
      return {
        success: false,
        message: "Invalid mark type",
      };
    }

    const existing = await Assessment.findOne({
      where: {
        registrationNo:registrationNo,
        subjectCode: subjectCode,
      },
    });

    if (existing) {
      // Update only the specified field
      await existing.update({
        [markType]: marks,
      });

      return {
        success: true,
        message: `Updated ${markType} successfully.`,
      };
    } else {
      // Create new record with only one mark field set
      const newRecord = {
        student_id: student_id,
        subjectCode: subjectCode,
        [markType]: marks,
      };

      await Assessment.create(newRecord);

      return {
        success: true,
        message: `Entered ${markType} successfully.`,
      };
    }
  } catch (err) {
    console.error("enterMarks error:", err);
    return {
      success: false,
      message: "Error saving marks",
    };
  }
},

bulkEnterMarks: async (_, { marks }) => {
  try {
    for (const m of marks) {
      const existing = await Assessment.findOne({
        where: {
          student_id: m.student_id,
          subjectCode: m.subjectCode,
        }
      });

      if (existing) {
        await existing.update({ [m.markType]: m.marks });
      } else {
        await Assessment.create({
          student_id: m.student_id,
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
}


},
  // Custom field resolvers
  Student: {
    name: (parent) => parent.student_name,
    course: async (parent) => await Course.findByPk(parent.courseId),
  },

  Assessment: {
    student: (parent) => parent.Student,
    teacher: (parent) => parent.Teacher,
  },
};
