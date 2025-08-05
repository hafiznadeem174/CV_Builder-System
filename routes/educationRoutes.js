const express = require("express");
const router = express.Router();
const educationController = require("../Controllers/educationController");
const auth = require("../Middlewares/auth"); // assumes you have JWT middleware
const validate = require("../Middlewares/validateRequest");
const educationSchema = require("../validations/educationValidation");

router.post("/", auth, validate(educationSchema), educationController.createEducation);
router.get("/", auth, educationController.getAllEducation);
router.put("/:id", auth, validate(educationSchema), educationController.updateEducation);
router.delete("/:id", auth, educationController.deleteEducation);

module.exports = router;
