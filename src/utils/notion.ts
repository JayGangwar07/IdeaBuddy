import { Client } from "@notionhq/client";
import { syncUser } from "@/actions/user.action"

const user = await syncUser()

export const notion = new Client({
  auth: user.accessToken  // OAuth access token
});
