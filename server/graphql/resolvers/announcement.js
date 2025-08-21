

import Announcement from "../../model/Announcement.js";
import Teacher from "../../model/Teacher.js";

export const announcementResolvers = {
  Query: {
    getAnnouncements: async () => {
      try {
        return await Announcement.findAll({ include: Teacher });
      } catch (error) {
        throw new Error("Failed to fetch announcements: " + error.message);
      }
    },
  },

  Mutation: {
    createAnnouncement: async (_, { input }) => {
      try {
        const { title, description, type, filePath, emp_id } = input;

        const teacher = await Teacher.findByPk(emp_id);
        if (!teacher) {
          throw new Error(`Teacher with emp_id ${emp_id} not found`);

        }

        const announcement = await Announcement.create({
          title,
          description,
          type,
          filePath,
          createdBy: emp_id,
        });

        return announcement;
      } catch (error) {
        throw new Error("Failed to create announcement: " + error.message);
      }
    },



    updateAnnouncement: async (_, { id, input }) => {
      try {
        // Step 1: Find the existing announcement
        const announcement = await Announcement.findByPk(id);
        if (!announcement) {
          throw new Error(`Announcement with ID ${id} not found`);
        }

        // Step 2: Extract and map emp_id to createdBy
        const { emp_id, ...rest } = input;

        if (emp_id) {
          const teacher = await Teacher.findByPk(emp_id);
          if (!teacher) {
            throw new Error(`Teacher with emp_id ${emp_id} not found`);
          }
          rest.createdBy = emp_id;
        }

        // Step 3: Update the announcement
        await announcement.update(rest);

        // Step 4: Return the updated announcement with teacher details
        return await Announcement.findByPk(id, {
          include: {
            model: Teacher,
            attributes: ["emp_id", "emp_name"],
          },
        });
      } catch (error) {
        throw new Error("Failed to update announcement: " + error.message);
      }
    },

    deleteAnnouncement: async (_, { id }) => {
      try {
        const deleted = await Announcement.destroy({ where: { id } });
        return deleted > 0;
      } catch (error) {
        throw new Error("Failed to delete announcement: " + error.message);
      }
    },
  },

  Announcement: {
    
createdBy: async (announcement) => {
  const teacher = await Teacher.findOne({
    where: { emp_id: announcement.createdBy }
  });

  if (!teacher) {
    return {
      emp_id: announcement.createdBy,
      emp_name: "Unknown",
      announcements: [],
    };
  }

  return teacher;
},


    createdAt: (announcement) => {
      return announcement.createdAt?.toISOString(); // ✅ ensures valid format
    },


  },
};
