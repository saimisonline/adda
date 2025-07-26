import { NextRequest, NextResponse } from "next/server";
import Message from "@/Models/messageModel";
import User from "@/Models/userModel";
import connectDB from "@/config/db";
import cUser from "@/config/cUser";

export async function POST(req: NextRequest) {
  await connectDB();
  const { cUserID, content, chatId } = await req.json();
  const session = await cUser(cUserID);
  const newMessage = {
    sender: session._id,
    content: content,
    chat: chatId,
  };
  try {
    let message = await Message.create(newMessage);
    
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    return NextResponse.json(message);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
}
