const bcrypt = require("bcryptjs");

const password = "admin123";

// Generate hash
bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;

  console.log("Generated hash:", hash);

  // Test if it matches
  bcrypt.compare(password, hash, (err, result) => {
    if (err) throw err;
    console.log("Match test:", result ? "✅ Correct" : "❌ Wrong");
  });
});
