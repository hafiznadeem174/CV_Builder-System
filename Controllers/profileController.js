// Controllers/profileController.js
const Joi = require("joi");
const User = require("../Models/User");
const UserProfile = require("../Models/userProfile");

// ✅ Define validation schema
const profileSchema = Joi.object({
  address: Joi.string().max(255).required(),
  bio: Joi.string().max(500).required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required() // Adjust regex to match your phone format
});

exports.createProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    console.log("🚀 ~ userId:", userId);
    console.log("🚀 ~ req.body:", req.body);
    console.log("Logged-in User:", req.user);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { address, bio, phone } = req.body;
    const image = req.file?.filename;

    // ✅ Validate request body
    const { error } = profileSchema.validate({ address, bio, phone });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // ✅ Fetch user info
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    let userProfile = await UserProfile.findOne({ where: { userId } });

    const profileData = {
      address,
      bio,
      image,
      phone,
      name: user.name,
      email: user.email
    };

    if (userProfile) {
      await userProfile.update(profileData);
    } else {
      userProfile = await UserProfile.create({ userId, ...profileData });
    }

    console.log("🚀 ~ userProfile:", userProfile);
    return res.status(200).json({ userProfile });

  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ error: error.message });
  }
};
