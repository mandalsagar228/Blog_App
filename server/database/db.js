import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.set("strictQuery", true);
// Initialising the Dotenv File.
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
// Connecting to the database.
const Connection = async () => {
  const URL = `mongodb+srv://${username}:${password}@blogapp.lsxszpt.mongodb.net/?retryWrites=true&w=majority`;

  const connection = await mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  try {
    console.log("database connected succesfully.");
  } catch (error) {
    console.log("Cannot connected to the database", error);
  }
};

export default Connection;
