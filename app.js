// app.js


const express = require("express");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const sequelize = require("./db");
// Middleware
app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
sequelize.authenticate()
  .then(() => console.log('✅ MySQL connected via Sequelize'))
  .catch((err) => console.error('❌ DB connection error:', err));


// Sync models to the database
sequelize.sync({ alter: true }) // or { force: true } for dev reset
  .then(() => {
    console.log('✅ All models were synchronized');
  })
  .catch((err) => {
    console.error('❌ Sync failed:', err);
  });  


// Routes
app.use("/auth", authRoutes);
app.use("/api/profile", profileRoutes);
module.exports = app;


