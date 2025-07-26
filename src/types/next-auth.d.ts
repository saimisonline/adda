import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image?: any;
      name: string;
      email: string;
      _id: string;
      pic: string;
    };
  }
}
