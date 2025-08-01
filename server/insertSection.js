// import sequelize from "./config/db.js";
// import Section from "./model/Section.js";

// const insertSections = async () => {
//   try {
//     await sequelize.sync({ force: true }); // ensures Sections table exists

//     await Section.bulkCreate([
//       // BCA (courseId: '1'), Semester 1 & 2
//       { section_id: "S001", section_name: "A", courseId: "1", semester_id: 1 },
//       { section_id: "S002", section_name: "B", courseId: "1", semester_id: 1 },
//       { section_id: "S003", section_name: "A", courseId: "1", semester_id: 2 },
//       { section_id: "S004", section_name: "B", courseId: "1", semesterId: 2 },

//       // BBA (courseId: '2'), Semester 1 & 2
//       { section_id: "S005", section_name: "A", courseId: "2", semesterId: 1 },
//       { section_id: "S006", section_name: "B", courseId: "2", semesterId: 1 },
//       { section_id: "S007", section_name: "A", courseId: "2", semesterId: 2 },
//       { section_id: "S008", section_name: "B", courseId: "2", semesterId: 2 }
//     ]);

//     console.log("Dummy sections inserted successfully");
//   } catch (error) {
//     console.error("Error inserting sections:", error);
//   } finally {
//     await sequelize.close();
//   }
// };

// insertSections();



import sequelize from "./config/db.js";
import Section from "./model/Section.js";

const insertSections = async () => {
  try {
    await sequelize.sync(); // recreate tables

    // Only two sections "A" and "B" per course (courseId: '1' for BCA, '2' for BBA)
    // We will NOT create separate section entries per semester.
    // Instead, semester_id is stored in Section to identify which semester the section belongs to.
    
    await Section.bulkCreate([
      // BCA - Semester 1 and 2 both share sections A and B
      { section_id: "S001", section_name: "A",  },
      { section_id: "S002", section_name: "B",  },
    ]);

    console.log("Dummy sections inserted successfully");
  } catch (error) {
    console.error("Error inserting sections:", error);
  } finally {
    await sequelize.close();
  }
};

insertSections();
