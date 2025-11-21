import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  aiSummary: String,
  notionPageId: String,
  stages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stage"
    }
  ]
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
