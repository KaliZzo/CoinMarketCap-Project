//Packges
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

//Data Base connection
const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    mongoose.connect(DB);
    console.log("Database Connected");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
};

connectDB();

//Server Connection
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}...`);
});
