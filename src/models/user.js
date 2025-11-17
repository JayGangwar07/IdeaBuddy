import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  accessToken: { type: String, required: true },
  botId: String,
  workspaceId: String,
  workspaceName: String,
  workspaceIcon: String,
  name: String,
  email: String,
  notionAccessToken: String,
  notionWorkspaceName: String,
  notionWorkspaceId: String,
  notionConnected: { type: Boolean, default: false },
  hasCreatedProject: Number
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
