import Activity from "../../model/Activity.js";
import Teacher from "../../model/Teacher.js";

const activityResolvers = {
  Query: {
    // Get all recent activities
    getActivities: async (_, { limit = 10 }) => {
      return await Activity.findAll({
        include: [{ model: Teacher }],
        order: [["createdAt", "DESC"]],
        limit
      });
    },

    // Get activities by specific teacher
    getTeacherActivities: async (_, { emp_id, limit = 10 }) => {
      return await Activity.findAll({
        where: { emp_id },
        include: [{ model: Teacher }],
        order: [["createdAt", "DESC"]],
        limit
      });
    }
  },

  Mutation: {
    // Log a new activity
    createActivity: async (_, { input }) => {
      const activity = await Activity.create(input);
      return activity;
    }
  },

  // Resolver for relation: Activity.teacher
  Activity: {
    teacher: async (parent) => {
      return await Teacher.findByPk(parent.emp_id);
    }
  }
};

export default activityResolvers;
