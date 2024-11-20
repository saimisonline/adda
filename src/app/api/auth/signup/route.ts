import User from "@/Models/userModel";
import connectDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();
    const { name, email, password, pic } = body;
    const user = await User.findOne({ email });
    if (user && !user.password) {
      return NextResponse.json({
        success: false,
        error: "User Already Logged In With Google or Github !",
      });
    } else if (user) {
      return NextResponse.json({
        success: false,
        error: "User Already Logged In !",
      });
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      if (pic) {
        await User.create({
          name,
          email,
          pic,
          password: hashPass,
        });
      } else {
        await User.create({
          name,
          email,
          password: hashPass,
        });
      }
      return NextResponse.json({ success: true });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server Error" }, { status: 400 });
  }
}
