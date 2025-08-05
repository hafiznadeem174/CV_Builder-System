const { DataTypes } = require('sequelize');
const sequelize = require('../db');
// const User = require('./User'); // If you have foreign key to user

const Education = sequelize.define('Education', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  degree: { type: DataTypes.STRING, allowNull: false },
  institute: { type: DataTypes.STRING, allowNull: false },
  startYear: { type: DataTypes.INTEGER, allowNull: false },
  endYear: { type: DataTypes.INTEGER, allowNull: false },
  grade: { type: DataTypes.STRING },
  fieldOfStudy: { type: DataTypes.STRING },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // exact table name
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'Educations' // match exactly with MySQL table name (capital E optional)
});

// Sync table
Education.sync({ alter: true }) // or { force: true } to recreate table
  .then(() => {
    console.log("✅ Education table created or updated.");
  })
  .catch(err => {
    console.error("❌ Error creating Education table:", err);
  });

module.exports = Education;
