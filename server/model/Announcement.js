// models/Announcement.js
module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define("Announcement", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uploadedBy: {
      type: DataTypes.STRING,  // OR foreign key if you relate with User model
      allowNull: false,
    },
  });

  return Announcement;
  
};
