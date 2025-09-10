import Student from "../../model/Student.js";
import Course from "../../model/Course.js";
import TeacherSubjectSection from "../../model/TeacherSubSection.js";
import Subject from "../../model/Subjects.js";
import Semester from "../../model/Semester.js";
import Section from "../../model/Section.js";
import { Op } from "sequelize";

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

    //student by email
    studentByEmail: async (_, { student_email }) => {
      try {
        return await Student.findOne({
          where: { student_email },
          include: [Course]
        });
      } catch (err) {
        console.error("Failed to fetch student by email:", err);
        throw new Error("Student not found");
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
    },
    getStudentCount:async()=>{
      return await Student.count();
    }
  },

  Mutation: {
    bulkImportStudents: async (_, { data }) => {
      // Initialize result object with all required fields
      const result = {
        success: true,
        message: 'Import started',
        details: {
          created: 0,
          updated: 0,
          skipped: 0,
          errors: []
        }
      };

      try {
        // Filter out unwanted fields
        const filteredData = data.map(student => {
          const { classs, batch, ...validFields } = student;
          return validFields;
        });

        for (const [index, studentData] of filteredData.entries()) {
          const rowNumber = index + 1;
          try {
            // Validate required fields
            const requiredFields = ['registrationNo', 'student_name', 'student_email', 'courseId', 'rollno'];
            const missingFields = requiredFields.filter(field => !studentData[field]);
            
            if (missingFields.length > 0) {
              throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Convert BigInt fields safely
            const registrationNo = BigInt(studentData.registrationNo);
            const rollno = BigInt(studentData.rollno);

            // Check if student exists
            const existingStudent = await Student.findOne({
              where: {
                [Op.or]: [
                  { registrationNo },
                  { student_email: studentData.student_email }
                ]
              }
            });

            if (existingStudent) {
              // Update existing student
              await existingStudent.update({
                student_name: studentData.student_name,
                courseId: studentData.courseId,
                rollno,
                semester_id: studentData.semester_id || null,
                section_id: studentData.section_id || null,
                dep_id: studentData.dep_id || null,
                parent_Detail: studentData.parent_Detail || null
              });
              result.details.updated++;
            } else {
              // Create new student
              await Student.create({
                registrationNo,
                student_name: studentData.student_name,
                student_email: studentData.student_email,
                courseId: studentData.courseId,
                rollno,
                semester_id: studentData.semester_id || null,
                section_id: studentData.section_id || null,
                dep_id: studentData.dep_id || null,
                parent_Detail: studentData.parent_Detail || null
              });
              result.details.created++;
            }
          } catch (error) {
            result.details.skipped++;
            result.details.errors.push({
              row: rowNumber,
              registrationNo: studentData.registrationNo || 'N/A',
              error: error.message
            });
          }
        }

        // Update final status
        result.success = result.details.errors.length === 0;
        result.message = result.success
          ? `Import completed: ${result.details.created} created, ${result.details.updated} updated`
          : `Import completed with ${result.details.errors.length} errors`;

        return result;
      } catch (error) {
        console.error("Bulk import error:", error);
        return {
          success: false,
          message: `Import failed: ${error.message}`,
          details: {
            created: 0,
            updated: 0,
            skipped: data.length,
            errors: [{ row: 0, error: error.message }]
          }
        };
      }
    },
     removeStudent: async (_, { registrationNo }) => {
          try {
            const deleted = await Student.destroy({
              where: { registrationNo }
            });
    
            // destroy returns the number of rows deleted
            return deleted > 0;
          } catch (err) {
            console.error("Error removing student:", err);
            throw new Error("Failed to remove student");
          }
        }
  },

  // Student type resolvers
  Student: {
    course: async (parent) => await Course.findByPk(parent.courseId)
  }
};