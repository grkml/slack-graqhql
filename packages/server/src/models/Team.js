import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const teamSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false //true (false for testing)
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
});

// Export Team Model
export default mongoose.model("Team", teamSchema);
