import mongoose from "mongoose";

const NotionIntegrationSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  botId: String,
  workspaceId: String,
  workspaceName: String,
  workspaceIcon: String,
  owner: Object,  // raw JSON
});

export default mongoose.models.NotionIntegration ||
  mongoose.model("NotionIntegration", NotionIntegrationSchema);
