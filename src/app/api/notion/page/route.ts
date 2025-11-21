import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { syncUser } from "@/actions/user.action"
import { NotionAPI } from 'notion-client'

export async function GET() {
  try {

    const user = await syncUser()
    if (!user) throw new Error("notion/route: Not logged in")

    const notion = new Client({ auth: user.accessToken });
    const pageId = "2b096547321580b588fdd3b57675dfd3";

    const notionApi = new NotionAPI()

    const recordMap = await notionApi.getPage('2b096547321580b588fdd3b57675dfd3')


    const blocks = await notion.blocks.children.list({ block_id: pageId });

    return NextResponse.json(recordMap);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
