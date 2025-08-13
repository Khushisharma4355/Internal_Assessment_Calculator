import Teacher from "../../model/Teacher.js";
import TeacherSubjectSection from "../../model/TeacherSubSection.js";
import Subject from "../../model/Subjects.js";
import Semester from "../../model/Semester.js";
import Course from "../../model/Course.js";
import Section from "../../model/Section.js";
import Student from "../../model/Student.js";
import Department from "../../model/Department.js";
import sequelize from "../../config/db.js";
export default {
  Query: {
    getTeacher: async (_, { emp_id }) => {
      return await Teacher.findOne({
        where: { emp_id },
        attributes: ["emp_id", "emp_name", "emp_email", "emp_phone"],
      });
    },

    getAllTeachers: async () =>
      await Teacher.findAll({
        include: [
          {
            model: TeacherSubjectSection,
            include: [
              {
                model: Subject,
                attributes: ["subjectName", "subjectCode"],
              },
            ],
          },
        ],
      }),

    getTeacherClasses: async (_, { emp_id }) => {
      const assignments = await TeacherSubjectSection.findAll({
        where: { emp_id },
        include: [
          { model: Course, attributes: ["courseId", "courseName"] },
          { model: Semester, attributes: ["semester_id", "semester_Name"] },
          { model: Section, attributes: ["section_id", "section_name"] },
          { model: Subject, attributes: ["subjectCode", "subjectName"] }
        ],
        order: [
          [Course, "courseId", "ASC"],
          [Semester, "semester_id", "ASC"]
        ]
      });

      return assignments.map(a => ({
        courseId: a.Course?.courseId || "N/A",
        courseName: a.Course?.courseName || "Unknown Course",
        semester_id: a.Semester?.semester_id || "N/A",
        semester_Name: a.Semester?.semester_Name || "Unknown Semester",
        section_id: a.Section?.section_id || "N/A",
        section_name: a.Section?.section_name || "Unknown Section",
        subjectCode: a.Subject?.subjectCode || "N/A",
        subjectName: a.Subject?.subjectName || "Unknown Subject"
      }));
    },

    getStudentsByClass: async (_, { emp_id, courseId, semester_id, section_id }) => {
      try {
        // Check if teacher is assigned to the class
        const assigned = await TeacherSubjectSection.findOne({
          where: { emp_id, courseId, semester_id, section_id },
        });

        if (!assigned) {
          console.warn("Teacher not assigned to class:", { emp_id, courseId, semester_id, section_id });
          return [];
        }

        // Fetch students
        const students = await Student.findAll({
          where: { courseId, semester_id, section_id },
          attributes: ['registrationNo', 'student_name', 'student_email'],
        });

        return students.map(s => ({
          registrationNo: s.registrationNo || "N/A",
          student_name: s.student_name || "Unknown Name",
          student_email: s.student_email || "Unknown Email"
        }));

      } catch (err) {
        console.error("getStudentsByClass error:", err);
        return [];
      }
    },
  },

  Mutation: {
    addTeacher: async (_, args) => {
      const teacher = await Teacher.create(args);
      const teacherCount = await Teacher.count();
      return {
        teacher,
        teacherCount
      };

    },
    // Replace the existing bulkImportTeachers with this:
bulkImportTeachers: async (_, { input }) => {
  // input shape per schema: { teachers: [TeacherInput!]!, overwrite?: Boolean }
  const { teachers, overwrite = true } = input || {};

  if (!Array.isArray(teachers)) {
    throw new Error("Invalid input: 'teachers' must be a non-empty array");
  }

  const results = {
    created: 0,
    updated: 0,
    skipped: 0,
    errors: []
  };

  for (const [index, teacher] of teachers.entries()) {
    try {
      // Minimal sanity checks (your frontend already validates too)
      if (!teacher.emp_id || !teacher.emp_name || !teacher.emp_email || !teacher.dep_id) {
        throw new Error("Missing required fields (emp_id, emp_name, emp_email, dep_id)");
      }

      const existing = await Teacher.findOne({ where: { emp_id: teacher.emp_id } });

      if (existing) {
        if (overwrite) {
          await existing.update(teacher);
          results.updated++;
        } else {
          results.skipped++;
          results.errors.push({
            row: index + 1,
            emp_id: teacher.emp_id,
            error: "Teacher exists (enable overwrite to update)"
          });
        }
      } else {
        await Teacher.create(teacher);
        results.created++;
      }
    } catch (error) {
      results.skipped++;
      results.errors.push({
        row: index + 1,
        emp_id: teacher?.emp_id ?? null,
        error: error.message
      });
    }
  }

  return {
    success: results.errors.length === 0,
    message:
      results.errors.length === 0
        ? "All teachers imported successfully"
        : results.errors.length === teachers.length
          ? "Import failed - all rows had errors"
          : "Import completed with some errors",
    details: results
  };
},



    // Add this mutation to update multiple teachers
    bulkUpdateTeachers: async (_, { input }) => {
      try {
        const { teachers } = input;
        const results = {
          updated: 0,
          skipped: 0,
          errors: []
        };

        for (const [index, teacherData] of teachers.entries()) {
          try {
            if (!teacherData.emp_id) {
              throw new Error('Missing emp_id');
            }

            const teacher = await Teacher.findOne({
              where: { emp_id: teacherData.emp_id }
            });

            if (!teacher) {
              throw new Error('Teacher not found');
            }

            await teacher.update(teacherData);
            results.updated++;
          } catch (error) {
            results.skipped++;
            results.errors.push({
              row: index + 1,
              emp_id: teacherData?.emp_id || 'N/A',
              error: error.message
            });
          }
        }

        return {
          success: results.errors.length === 0,
          message: results.errors.length > 0
            ? 'Update completed with some errors'
            : 'All teachers updated successfully',
          details: results
        };
      } catch (error) {
        console.error('Bulk update error:', error);
        throw new Error('Failed to process bulk update');
      }
    }
  },

  Teacher: {
    Subjects: async (parent) => {
      if (parent.TeacherSubjectSections) return parent.TeacherSubjectSections;
      return await TeacherSubjectSection.findAll({
        where: { emp_id: parent.emp_id },
        include: [{ model: Subject }],
      });
    },
  },

  TeacherSubSec: {
    subject: async (parent) => {
      if (parent.Subject) return parent.Subject;
      return await Subject.findOne({ where: { subjectCode: parent.subjectCode } });
    },
  },
  BulkImportResult: {
    success: (parent) => parent.success,
    message: (parent) => parent.message,
    details: (parent) => parent.details
  },

  ImportDetails: {
    created: (parent) => parent.created,
    updated: (parent) => parent.updated,
    skipped: (parent) => parent.skipped,
    errors: (parent) => parent.errors
  },

  ImportError: {
    row: (parent) => parent.row,
    emp_id: (parent) => parent.emp_id,
    error: (parent) => parent.error
  }
};
