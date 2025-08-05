import sequelize from "./config/db.js";
import Subject from "./model/Subjects.js";

const insertSubjects = async () => {
  try {
    await sequelize.sync(); // ensure table exists

    await Subject.bulkCreate([
      // ===== BCA (courseId: 1) =====
      { subjectCode: "SUB001", subjectName: "Mathematics", courseId: "1", semester_id: 1, subjectType: "Theory" },
      { subjectCode: "SUB002", subjectName: "Data Structures", courseId: "1", semester_id: 2, subjectType: "Theory" },
      { subjectCode: "SUB004", subjectName: "DBMS Lab", courseId: "1", semester_id: 2, subjectType: "Practical" },
      { subjectCode: "SUB005", subjectName: "Computer Networks", courseId: "1", semester_id: 3, subjectType: "Theory" },
      { subjectCode: "SUB006", subjectName: "Web Development", courseId: "1", semester_id: 4, subjectType: "Theory" },
      { subjectCode: "SUB007", subjectName: "Java Programming", courseId: "1", semester_id: 4, subjectType: "Practical" },
      { subjectCode: "SUB008", subjectName: "Software Engineering", courseId: "1", semester_id: 5, subjectType: "Theory" },
      { subjectCode: "SUB009", subjectName: "AI & Machine Learning", courseId: "1", semester_id: 6, subjectType: "Theory" },

      // ===== BBA (courseId: 2) =====
      { subjectCode: "SUB010", subjectName: "Principles of Management", courseId: "2", semester_id: 1, subjectType: "Theory" },
      { subjectCode: "SUB011", subjectName: "Business Economics", courseId: "2", semester_id: 1, subjectType: "Theory" },
      { subjectCode: "SUB012", subjectName: "Marketing Management", courseId: "2", semester_id: 2, subjectType: "Theory" },
      { subjectCode: "SUB013", subjectName: "Financial Accounting", courseId: "2", semester_id: 3, subjectType: "Theory" },
      { subjectCode: "SUB003", subjectName: "Operating Systems", courseId: "2", semester_id: 3, subjectType: "Theory" }, // already in your list
      { subjectCode: "SUB014", subjectName: "Organizational Behaviour", courseId: "2", semester_id: 4, subjectType: "Theory" },
      { subjectCode: "SUB015", subjectName: "Strategic Management", courseId: "2", semester_id: 5, subjectType: "Theory" },
      { subjectCode: "SUB016", subjectName: "Business Ethics & Corporate Governance", courseId: "2", semester_id: 6, subjectType: "Theory" },

      // ===== MBA (courseId: 3) =====
      { subjectCode: "SUB017", subjectName: "Managerial Economics", courseId: "3", semester_id: 1, subjectType: "Theory" },
      { subjectCode: "SUB018", subjectName: "Business Research Methods", courseId: "3", semester_id: 2, subjectType: "Theory" },
      { subjectCode: "SUB019", subjectName: "Operations Management", courseId: "3", semester_id: 2, subjectType: "Theory" },
      { subjectCode: "SUB020", subjectName: "Human Resource Management", courseId: "3", semester_id: 3, subjectType: "Theory" },
      { subjectCode: "SUB021", subjectName: "International Business", courseId: "3", semester_id: 4, subjectType: "Theory" },
      { subjectCode: "SUB022", subjectName: "Entrepreneurship Development", courseId: "3", semester_id: 4, subjectType: "Theory" },
      { subjectCode: "SUB023", subjectName: "Financial Management", courseId: "3", semester_id: 5, subjectType: "Theory" },
      { subjectCode: "SUB024", subjectName: "Business Strategy", courseId: "3", semester_id: 6, subjectType: "Theory" },

      // ===== MCA (courseId: 4) =====
      { subjectCode: "SUB025", subjectName: "Advanced Mathematics", courseId: "4", semester_id: 1, subjectType: "Theory" },
      { subjectCode: "SUB026", subjectName: "Advanced Data Structures", courseId: "4", semester_id: 2, subjectType: "Theory" },
      { subjectCode: "SUB027", subjectName: "Cloud Computing", courseId: "4", semester_id: 3, subjectType: "Theory" },
      { subjectCode: "SUB028", subjectName: "Advanced Database Systems", courseId: "4", semester_id: 4, subjectType: "Theory" },
      { subjectCode: "SUB029", subjectName: "Big Data Analytics", courseId: "4", semester_id: 5, subjectType: "Theory" },
      { subjectCode: "SUB030", subjectName: "Deep Learning", courseId: "4", semester_id: 6, subjectType: "Theory" }
    ]);

    console.log("Dummy subjects inserted successfully");
  } catch (error) {
    console.error("Error inserting subjects:", error);
  } finally {
    await sequelize.close();
  }
};

insertSubjects();
