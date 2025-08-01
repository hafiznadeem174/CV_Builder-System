const express = require("express");
const router = express.Router();
const { signup , login, logout } = require("../Controllers/UserController");
const authMiddleware = require("../Middlewares/auth");
router.post("/signup", signup);
router.post("/login", login);
// routes/userRoutes.js
router.post("/logout", authMiddleware, logout);

module.exports = router;
