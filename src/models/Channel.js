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
  publicChannel: {
    type: Boolean,
    required: true
  },
  channelMemberId: {
    // If Private Channel
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// Export Channel Model
export default mongoose.model("Channel", channelSchema);
