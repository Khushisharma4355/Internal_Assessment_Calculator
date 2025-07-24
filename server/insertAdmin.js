import sequelize from "./config/db.js";
import Admin from "./model/Admin.js";

const insertAdmins = async () => {
  try {
    await sequelize.sync(); // ensures Admins table exists (no drop)

    await Admin.bulkCreate([
      {
        emp_id: "T001",
        password: "adminpass1"
      },
      {
        emp_id: "T002",
        password: "adminpass2"
      }
    ]);

    console.log("Dummy admin records inserted successfully.");
  } catch (error) {
    console.error("Error inserting admin records:", error);
  } finally {
    await sequelize.close();
  }
};

insertAdmins();
