import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import Chat from "@/Models/chatModel";
import cUser from "@/config/cUser";

export async function POST(req: NextRequest) {
  await connectDB();
  const { cUserID, userId } = await req.json();
  const session = await cUser(cUserID);
  const isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: session?._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  }).populate("users", "-password");

  if (isChat.length > 0) {
    return NextResponse.json(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [session?._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");
      return NextResponse.json(FullChat);
    } catch (error: Error | unknown) {
      throw new Error((error as Error).message);
    }
  }
}
