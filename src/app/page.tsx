"use client";

import clsx from "clsx";
import ChatList from "@/components/ChatList";
import { getSelectedChat } from "@/config/store";
import Messages from "@/components/Messages";
import Header from "@/components/Header";

export default function Home() {
  const { selectedChat } = getSelectedChat();

  return (
    <>
      <div className="flex h-[90vh] w-full gap-3 p-5 md:my-0">
        <div
          className={clsx(
            "bg-slate-400 w-full p-5 md:w-1/3 rounded-3xl flex flex-col items-center dark:bg-slate-700",
            selectedChat?._id && "hidden md:flex"
          )}
        >
          <ChatList />
        </div>
        <div
          className={clsx(
            "bg-slate-400 w-full py-5 mx-auto md:mx-0 md:w-2/3 rounded-3xl md:flex flex-col items-center dark:bg-slate-700",
            selectedChat?._id && "flex",
            !selectedChat?._id && "hidden md:flex"
          )}
        >
          <Header />
          <Messages />
        </div>
      </div>
    </>
  );
}
