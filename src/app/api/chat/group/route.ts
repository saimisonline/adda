import connectDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Chat from "@/Models/chatModel";
import cUser from "@/config/cUser";

export async function POST(req: NextRequest) {
  await connectDB();
  const { cUserID, users, name } = await req.json();
  const session = await cUser(cUserID);
  const groupUsers = JSON.parse(users);
  if (groupUsers.length < 2) {
    NextResponse.json("More than 2 users are required to form a group chat !");
  }
  groupUsers.push(session._id);
  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: groupUsers,
      isGroupChat: true,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
      "users",
      "-password"
    );
    return NextResponse.json(fullGroupChat);
  } catch (error: Error | unknown) {
    throw new Error((error as Error).message);
  }
}
