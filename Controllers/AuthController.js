// Controllers/AuthController.js

const db = require("../db");

const signup = (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  const sql = "INSERT INTO users (name, phone) VALUES (?, ?)";
  db.query(sql, [name, phone], (err, result) => {
      if (err) {
        console.log("🚀 ~ signup ~ err:", err)
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(201).json({
      message: "Signup successful",
      userId: result.insertId,
    });
  });
};

module.exports = { signup };
