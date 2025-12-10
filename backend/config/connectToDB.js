const mongoose = require("mongoose");

const connectToDB = async () => {
  const uri = process.env.MONGO_URI; // this is correct

  if (!uri) {
    throw new Error("MONGO_URI is not defined in .env");
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
    process.exit(1); // stop the server if DB connection fails
  }
};

module.exports = connectToDB;
