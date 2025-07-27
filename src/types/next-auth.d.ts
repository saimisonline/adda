import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      image?: string;
      name: string;
      email: string;
      _id: string;
      pic: string;
    };
  }
}
