import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Create Schema
const messageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
    required: true
  }
});

// Export Message Model
export default mongoose.model("Message", messageSchema);
