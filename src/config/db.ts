// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI Is Not Defined !");
}

export default async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
  } catch {
    await mongoose.disconnect();
  }
}
