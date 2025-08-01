// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
    tokenVersion: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'Users' // use this if your table is lowercase or plural in DB
});
// models/User.js
// tokenVersion: {
//   type: DataTypes.INTEGER,
//   defaultValue: 0,
// },
module.exports = User;
User.sync({ force: false })
  .then(() => {
    console.log("User table created successfully.");
  }).catch(err => {
    console.error("Error creating User table:", err);
  });