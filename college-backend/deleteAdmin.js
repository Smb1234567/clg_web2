require('dotenv').config();

const mongoose = require("mongoose");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Error connecting to DB:", err));

const deleteAdmin = async () => {
  try {
    const result = await Admin.deleteOne({ email: process.env.ADMIN_EMAIL });
    if (result.deletedCount === 0) {
      console.log("❌ No admin user found to delete");
    } else {
      console.log("🗑️ Admin user deleted successfully");
    }
  } catch (err) {
    console.error("❌ Error deleting admin:", err);
  } finally {
    mongoose.connection.close();
  }
};

deleteAdmin();
