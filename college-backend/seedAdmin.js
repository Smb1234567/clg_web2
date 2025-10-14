require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // ✅ Must be bcryptjs
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Error connecting to DB:", err));

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 👈 Use bcryptjs.hash
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    console.log("🎉 Admin created successfully!");
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
