const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/auth");
const upload = require("../Middlewares/upload"); // multer config
const { createProfile } = require("../Controllers/profileController");

// Route: POST /api/profile
router.post("/", authMiddleware, upload.single("image"), createProfile);
router.put("/", authMiddleware, upload.single("image"), createProfile);

module.exports = router;


