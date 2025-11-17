import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import User from "@/models/user";
import { syncUser } from "@/actions/user.action"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect("http://localhost:3000/error");
    }

    const tokenRes = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.NOTION_CLIENT_ID +
            ":" +
            process.env.NOTION_CLIENT_SECRET
          ).toString("base64"),
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.NOTION_REDIRECT_URI,
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect("http://localhost:3000/error");
    }

    const data = await tokenRes.json();

    await connectDB();

    const dbUser = await syncUser()

    await User.findByIdAndUpdate(dbUser, {
accessToken: data.access_token,
      botId: data.bot_id,
        workspaceId: data.workspace_id,
          workspaceName: data.workspace_name,
            workspaceIcon: data.workspace_icon,
              owner: data.owner || null
    })

    /*await NotionIntegration.create({
    accessToken: data.access_token,
      botId: data.bot_id,
        workspaceId: data.workspace_id,
          workspaceName: data.workspace_name,
            workspaceIcon: data.workspace_icon,
              owner: data.owner || null,
    });*/

    // Redirect user back to your app
    return NextResponse.redirect("http://localhost:3000?notion=connected");

  } catch (err) {
    return NextResponse.redirect("http://localhost:3000/error");
  }
}
