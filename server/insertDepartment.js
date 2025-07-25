import sequelize from "./config/db.js";
import Department from "./model/Department.js";
const insertDummyDepartments = async () => {
  try {
    await sequelize.sync(); // ensures the table exists (doesn't drop anything)

    await Department.bulkCreate([
      {
        dep_id: "DEP001",
        dept_name: "Computer Applications"
      },
      {
        dep_id: "DEP002",
        dept_name: "Management Department"
      }
    ]);

    console.log("Dummy departments inserted successfully");
  } catch (error) {
    console.error("Error inserting departments:", error);
  } finally {
    await sequelize.close();
  }
};
insertDummyDepartments();