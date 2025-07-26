import { NextRequest, NextResponse } from "next/server";
import Message from "@/Models/messageModel";
import connectDB from "@/config/db";

export async function POST(req: NextRequest) {
  await connectDB();
  const chatId = req.nextUrl.searchParams.get("chatId");
  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    return NextResponse.json(messages);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}
