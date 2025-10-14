// checkAdmin.js
require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // ✅ Correctly required
const Admin = require("./models/Admin");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Error connecting to DB:", err));

// Function to check admin
const checkAdmin = async () => {
  try {
    const admin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!admin) {
      console.log("❌ Admin user does NOT exist");
      return;
    }

    console.log("✅ Admin found:");
    console.log({
      email: admin.email,
      passwordHash: admin.password.substring(0, 20) + "...",
      createdAt: admin.createdAt
    });

    // Test password match
    const isMatch = await bcrypt.compare("admin123", admin.password);
    console.log("🔑 Password match test:", isMatch ? "✅ Correct" : "❌ Wrong");

  } catch (err) {
    console.error("❌ Error checking admin:", err);
  } finally {
    mongoose.connection.close(); // 👈 Close connection after test
  }
};

// Run the function
checkAdmin(); // 👈 This line was missing!
