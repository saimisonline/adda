import connectDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Chat from "@/Models/chatModel";
export async function PUT(req: NextRequest) {
  await connectDB();
  const { chatId, chatName } = await req.json();
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  ).populate("users", "-password");

  if (!updatedChat) {
    throw new Error("Chat Not Found");
  } else {
    return NextResponse.json(updatedChat);
  }
}
