import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import Connection from "../database/db.js";

const connection = await Connection();
console.log(" This connection is from use.js", Connection);

autoIncrement.initialize(mongoose.connection);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,

    unique: true,
    trim: true, // Added to remove leading/trailing whitespaces
  },
  password: {
    type: String,
    required: true,

    trim: true, // Added to remove leading/trailing whitespaces
  },
  email: {
    type: String,

    trim: true, // Added to remove leading/trailing whitespaces
  },
  id: {
    type: Number,
    unique: true,
  },
});

// For user_id Increment
userSchema.plugin(autoIncrement.plugin, {
  model: "user",
  field: "id",
  startAt: 1,
});

const user = mongoose.model("user", userSchema);

export default user;
