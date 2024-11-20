"use client";

import { FaArrowLeft } from "react-icons/fa";
import { getSender } from "@/config/addaLogic";
import GroupModal from "@/components/GroupModal";
import { getCUser, getSelectedChat } from "@/config/store";

export default function Header() {
  const { selectedChat, setSelectedChat } = getSelectedChat();
  const { cUser } = getCUser();
  return (
    <div className="flex my-5 items-center justify-between px-8 md:px-20 w-full relative">
      {selectedChat?._id && (
        <button
          type="button"
          className="btn btn-primary md:hidden"
          onClick={() =>
            setSelectedChat({
              _id: "",
              chatName: "",
              isGroupChat: false,
              users: [],
            })
          }
        >
          <FaArrowLeft />
        </button>
      )}
      <h3 className="text-md md:text-2xl">
        {selectedChat?.chatName === "sender"
          ? getSender(cUser, selectedChat?.users).name
          : selectedChat?.chatName}
      </h3>
      {selectedChat?.isGroupChat && (
        <div>
          <GroupModal />
        </div>
      )}
    </div>
  );
}
