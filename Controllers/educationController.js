const Education = require("../models/Education");

// Create
exports.createEducation = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const data = { ...req.body, userId };
    const education = await Education.create(data);
    res.status(201).json(education);
  } catch (err) {
    res.status(500).json({ message: "Error creating education", error: err.message });
  }
};



// Read all for logged-in user
exports.getAllEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const educationList = await Education.findAll({ where: { userId } });
    res.json(educationList);
  } catch (err) {
    res.status(500).json({ message: "Error fetching education records", error: err.message });
  }
};

// Update by ID
exports.updateEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const education = await Education.findOne({ where: { id, userId } });
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    await education.update(req.body);
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: "Error updating education", error: err.message });
  }
};

// Delete
exports.deleteEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const education = await Education.findOne({ where: { id, userId } });
    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    await education.destroy();
    res.json({ message: "Education deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting education", error: err.message });
  }
};
