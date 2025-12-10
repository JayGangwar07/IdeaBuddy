import mongoose from "mongoose";

const STAGE_NAMES = [
  "ProblemScoping",
  "ProblemSolution",
  "MarketResearch",
  "Validation",
  "CompetitorResearch",
  "BeatCompetition",
  "MVPPlanner",
  "FindClients",
  "Marketing",
];

const StageSchema = new mongoose.Schema(
  {
    projectId: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      enum: STAGE_NAMES,
      required: true,
    },
    aiSummary: String,
    aiSuggestions: [String],
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export default mongoose.models.Stage || mongoose.model("Stage", StageSchema);

