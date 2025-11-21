import mongoose from "mongoose";


const ChatSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  stageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stage"
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"},
  messages: [
    { sender: String, content: String, timestamp: { type: Date, default: Date.now } }
  ]
}, { timestamps: true });


export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);