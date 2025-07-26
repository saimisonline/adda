import cUser from "@/config/cUser";
import connectDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Chat from "@/Models/chatModel";

export async function POST(req: NextRequest) {
  await connectDB();
  const { cUserID } = await req.json();
  const session = await cUser(cUserID);
  try {
    const results = await Chat.find({
      users: { $elemMatch: { $eq: session?._id } },
    })
      .populate("users", "-password")
      .sort({ updatedAt: -1 });
    return NextResponse.json(results);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}
