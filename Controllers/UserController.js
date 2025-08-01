// controllers/UserController.js
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      newUser
    });

  } catch (err) {
    console.error("🚨 Signup error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET,  {
    //   expiresIn: "7d"
    // });
    // login function in UserController.js
    const token = jwt.sign(
     { id: user.id, tokenVersion: user.tokenVersion },
     process.env.JWT_SECRET,
     { expiresIn: "7d" }
      );

    
    console.log("🚀 ~ token:", token);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("🚨 Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};



// controllers/UserController.js
const logout = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.tokenVersion += 1;
  await user.save();

  res.status(200).json({ message: "Logged out successfully" });
  console.log("🚀 ~ User logged out:", userId);
};



module.exports = { signup, login , logout };
