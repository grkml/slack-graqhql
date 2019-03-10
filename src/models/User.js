import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Export User Model
export default mongoose.model("User", userSchema);
