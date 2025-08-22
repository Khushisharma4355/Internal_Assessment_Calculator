import Admin from "../../model/Admin.js";
import Teacher from "../../model/Teacher.js";
import Student from "../../model/Student.js";
import Course from "../../model/Course.js";
export default {
  Query: {
    getAdmin: async (_, { emp_id }) => {
      const admin = await Admin.findByPk(emp_id, {
        include: [{
          model: Teacher,
          attributes: ["emp_id", "emp_name", "emp_email", "emp_phone"]
        }]
      });

      if (!admin) return null;
      return admin;
    }

  },
  Mutation: {
    addAdmin: async (_, args) => {
      // Create admin
      const admin = await Admin.create(args);

      // Fetch again with Teacher relation included
      const adminWithTeacher = await Admin.findByPk(admin.emp_id, {
        include: [
          {
            model: Teacher,
            attributes: ["emp_id", "emp_name", "emp_email", "emp_phone"]
          }
        ]
      });

      return adminWithTeacher;
    },
    removeAdmin: async (_, { emp_id }) => {
      try {
        const deleted = await Admin.destroy({
          where: { emp_id }
        });

        // destroy returns the number of rows deleted
        return deleted > 0;
      } catch (err) {
        console.error("Error removing admin:", err);
        throw new Error("Failed to remove admin");
      }
    }
  }
  ,

  Admin: {
    teacher: (parent) => parent.Teacher,
    emp_name: (parent) => parent.Teacher ? parent.Teacher.emp_name : null
  }

};
