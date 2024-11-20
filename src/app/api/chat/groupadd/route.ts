import connectDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import Chat from "@/Models/chatModel";

export async function PUT(req: NextRequest) {
  await connectDB();
  const { chatId, userId } = await req.json();
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  ).populate("users", "-password");

  if (!added) {
    throw new Error("Chat Not Found");
  } else {
    return NextResponse.json(added);
  }
}
