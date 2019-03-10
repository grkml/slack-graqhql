import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const channelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  },
  public: {
    type: Boolean,
    required: true
  }
});

// Export Channel Model
export default mongoose.model("Channel", channelSchema);
