const { Announcement } = require('../models');

module.exports = {
  Query: {
    getAllAnnouncements: async () => {
      return await Announcement.findAll({ order: [['createdAt', 'DESC']] });
    },
  },
  Mutation: {
    createAnnouncement: async (_, { input }) => {
      return await Announcement.create(input);
    },
  },
};
// This resolver handles fetching all announcements and creating a new announcement.
// It uses Sequelize to interact with the Announcement model, ensuring announcements are ordered by creation date.