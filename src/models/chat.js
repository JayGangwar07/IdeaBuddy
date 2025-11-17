import mongoose from "mongoose";


const ChatSchema = new mongoose.Schema({
  projectId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  messages: [
    { sender: String, content: String, timestamp: { type: Date, default: Date.now } }
  ]
}, { timestamps: true });


export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);