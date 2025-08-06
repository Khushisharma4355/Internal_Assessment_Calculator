import sequelize from "./config/db.js";
import Teacher from "./model/Teacher.js";

const insertDummyTeachers = async () => {
  try {
    await sequelize.sync(); // Ensure table exists

    await Teacher.bulkCreate([
      {
        emp_id: "T001",
        emp_name: "Anjali Sharma",
        emp_email: "anjali.sharma@example.com",
        emp_phone: "9876543210",
        dep_id: "DEP001" // Computer Applications
      },
      {
        emp_id: "T002",
        emp_name: "sarita rana",
        emp_email: "saritarana7788@gmail.com",
        emp_phone: "9123456789",
        dep_id: "DEP002" // Management Department
      },
      {
        emp_id: "T003",
        emp_name: "Priya Gupta",
        emp_email: "priya.gupta@example.com",
        emp_phone: "9988776655",
        dep_id: "DEP001" // Computer Applications
      }
    ]);

    console.log("Dummy teachers inserted successfully");
  } catch (error) {
    console.error("Error inserting teachers:", error);
  } finally {
    await sequelize.close();
  }
};

insertDummyTeachers();
