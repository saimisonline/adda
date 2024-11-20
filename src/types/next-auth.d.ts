/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      image?: any;
      name: string;
      email: string;
      _id: string;
      pic: string;
    };
  }
}
