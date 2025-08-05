// // Middlewares/auth.js

// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const authHeader = req.headers.authorization;

//   console.log("🔐 Incoming Auth Header:", authHeader); // Log raw header

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("⛔ No or invalid auth header");
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("📦 Extracted Token:", token); // Log the token itself

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("✅ Decoded Token Payload:", decoded); // Should contain { id: user.id }

//     req.user = decoded;
//     console.log("✅ Decoded Token Payload:", decoded); // Should now show { id: 1, ... }

//     next();
//   } catch (err) {
//     console.error("❌ JWT Verification Failed:", err);
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };




// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // 🔐 Check token version match
    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({ error: "Token expired. Please login again." });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

