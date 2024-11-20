import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/userModel";
import cUser from "@/config/cUser";

export async function POST(req: NextRequest) {
  const { cUserID } = await req.json();
  const session = await cUser(cUserID);

  if (session) {
    const searchParam = req.nextUrl.searchParams.get("search");
    const keyword = searchParam
      ? {
          $or: [
            { name: { $regex: searchParam, $options: "i" } },
            { email: { $regex: searchParam, $options: "i" } },
          ],
        }
      : {};
    const users = await User.find(keyword)
      .find({
        email: { $ne: session?.email },
      })
      .limit(4);
    return NextResponse.json(users);
  } else {
    return NextResponse.json({ error: "Not Authorized !" });
  }
}
