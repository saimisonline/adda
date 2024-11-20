import connectDB from "@/config/db";
import Chat from "@/Models/chatModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await connectDB();
  const { chatId, userId } = await req.json();
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  ).populate("users", "-password");

  if (!removed) {
    throw new Error("Chat Not Found");
  } else {
    return NextResponse.json(removed);
  }
}
