import Image from "next/image";
import AuthTab from "@/components/auth/AuthTab";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Auth({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  if (session && !searchParams.callbackUrl) {
    redirect("/");
  } else if (session && searchParams.callbackUrl) {
    redirect(searchParams.callbackUrl as string);
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center w-4/5 mx-auto mb-10">
        <div className="p-5 flex flex-col items-center justify-center rounded-xl">
          <Image
            className="rounded-xl"
            src="/img/logoBGRemoved.png"
            alt="logo"
            width={125}
            height={125}
          />
          <span className="text-lg font-bold md:text-3xl">
            ADDA Authentication
          </span>
        </div>
        <AuthTab />
      </div>
    </>
  );
}
