const mongoose = require("mongoose");
function DbConnect() {
  const DB_URL = process.env.DB_URL;
  // Database connection
  mongoose.connect(
    "mongodb+srv://darthy1:hello123@cluster1.9rz2f.mongodb.net/movieLibrary",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });
}

module.exports = DbConnect;
