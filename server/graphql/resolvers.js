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
    // Fetch all students
    students: async () => await Student.findAll(),

    // Fetch a student by registrationNo (BigInt), including course
    student: async (_, { registrationNo }) => {
      try {
        return await Student.findOne({
          where: { registrationNo: registrationNo.toString() },
          include: [Course],
        });
      } catch (err) {
        throw new Error("Failed to fetch student");
      }
    },

    // Fetch subjects for a given teacher
    getSubjects: async (_, { emp_id }) => {
      return await TeacherSubjectSection.findAll({ where: { emp_id } });
    },

    // Fetch a single subject by subjectCode
    Subject: async (_, { subjectCode }) => {
      return await Subject.findOne({ where: { subjectCode } });
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
        where: { courseId, sem_id, section_id }
      });
    },
   
  courses: async () => {
    return await Course.findAll();
  },
  semesters: async () => {
    return await Semester.findAll();
  },
  sections: async () => {
    return await Section.findAll();
  },

getTeacherClasses: async (_, { emp_id }) => {
  const assignments = await TeacherSubjectSection.findAll({ where: { emp_id } });

  const results = await Promise.all(assignments.map(async (assign) => {
    const subject = await Subject.findOne({
      where: { subjectCode: assign.subjectCode },
      include: [Course, Semester],
    });

    return {
      courseId: subject.course?.courseId,
      courseName: subject.course?.courseName,
      sem_id: subject.Semester?.sem_id,
      section_id: assign.section_id,
      subjectCode: assign.subjectCode,
      subjectName: subject.subjectName,
    };
  }));

  return results;
}
,

   

    // Fetch a student by email
   studentByEmail: async (_, { student_email }) => {
  return await Student.findOne({
    where: { student_email },
    include: [Course], // <-- include the association
  });
},

    // Fetch all courses
    courses: async () => await Course.findAll(),

    // Fetch a course by ID
    courseById: async (_, { courseId }) => {
      return await Course.findByPk(courseId.toString());
    },

    // Fetch all assessments for a student
    getStudentAssessment: async (_, { registrationNo }) => {
      return await Assessment.findAll({
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
      });
    },
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
    course: async (parent) => {
      return await Course.findByPk(parent.courseId);
    },
  },

  Assessment: {
    student: (parent) => parent.Student,
    teacher: (parent) => parent.Teacher,
  },

  Teacher: {
    Subjects: async (parent) => {
      return await TeacherSubjectSection.findAll({
        where: { emp_id: parent.emp_id },
      });
    },

    Subject: async (parent) => {
  const teacherSubs = await TeacherSubjectSection.findAll({
    where: { emp_id: parent.emp_id },
  });
  const subjectCodes = teacherSubs.map((ts) => ts.subjectCode);

  return await Subject.findAll({
    where: { subjectCode: { [Op.in]: subjectCodes } },
    include: [Course, Semester], // <- this is what was missing
  });
},

    semester: async (parent) => {
      const teacherSubs = await TeacherSubjectSection.findAll({
        where: { emp_id: parent.emp_id },
      });
      const subjectCodes = teacherSubs.map((ts) => ts.subjectCode);

      const subjects = await Subject.findAll({
        where: { subjectCode: { [Op.in]: subjectCodes } },
        include: [Semester],
      });

      const semesters = subjects
        .map((s) => s.Semester)
        .filter(
          (sem, index, self) =>
            sem &&
            index === self.findIndex((s) => s.semester_id === sem.semester_id)
        );

      return semesters;
    },
  },
};
