"use client";

import { useEffect, useState } from "react";
import Avater from "./Avater";
import { getCUser, getSelectedChat, useRefetch } from "@/config/store";
import axios from "axios";
import CreateGroup from "./CreateGroup";
import { getSender } from "@/config/addaLogic";
import { SelectedChat } from "@/types/adda";

export default function ChatList() {
  const { cUser } = getCUser();
  const [users, setUsers] = useState<SelectedChat[]>([]);
  const { selectedChat, setSelectedChat } = getSelectedChat();
  const { refetch } = useRefetch();

  useEffect(() => {
    if (cUser._id) {
      (async () => {
        const res = await axios.post("/api/chat/accesschat", {
          cUserID: cUser._id,
        });
        setUsers(res.data);
      })();
    }
  }, [cUser._id, selectedChat, refetch]);

  return (
    <>
      <div className="flex justify-between w-full px-5 items-center mb-3">
        <h2 className="my-3 text-md text-white">Your Chats</h2>
        <CreateGroup />
      </div>
      <div className="w-full h-full bg-slate-100 rounded-3xl dark:bg-slate-600 p-5 overflow-y-scroll">
        <div className="w-full">
          {users.length > 0 ? (
            users.map((item: SelectedChat) => (
              <button
                key={item._id}
                type="button"
                className="w-full"
                onClick={() => setSelectedChat(item)}
              >
                <Avater
                  chatName={item.chatName === "sender" ? false : item.chatName}
                  user={getSender(cUser, item.users)}
                  isSelected={selectedChat._id === item._id}
                />
              </button>
            ))
          ) : (
            <p className="text-3xl text-center">
              Search a User To Start Chatting
            </p>
          )}
        </div>
      </div>
    </>
  );
}
