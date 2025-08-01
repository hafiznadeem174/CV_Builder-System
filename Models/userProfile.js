// userProfile.js

const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const UserProfile = sequelize.define("UserProfile", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
   name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  bio: DataTypes.TEXT,
}, {
  tableName: "userprofiles",
  timestamps: true,
});

module.exports = UserProfile;
