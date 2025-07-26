import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/config/db";
import User from "@/Models/userModel";
import bcrypt from "bcryptjs";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Email Or Password Didn't Match !");
        } else if (user && !user.password) {
          throw new Error("User Logged In With Google or Github !");
        } else if (user && user.password) {
          const matchPass = await bcrypt.compare(password, user.password);
          if (matchPass) {
            return user;
          }
          if (!user || !matchPass) {
            throw new Error("Email Or Password Didn't Match !");
          }
        } else {
          return user;
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({ session }) {
      await connectDB();
      let user = await User.findOne({
        email: session?.user?.email,
      }).select("-password");
      if (!user) {
        user = await User.create({
          name: session.user.name,
          email: session.user.email,
          pic: session.user.image,
        });
      }
      return {
        ...session,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
        },
      };
    },
  },
};