import connectDB from "@/config/db";
import User from "@/Models/userModel";

export default async function getSession(cUserID: string) {
  if (!cUserID) return;
  await connectDB();
  const user = await User.findOne({ _id: cUserID }).select("name email pic");
  return user;
}
