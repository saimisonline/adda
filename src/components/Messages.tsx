/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { getCUser, getSelectedChat } from "@/config/store";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "@/config/addaLogic";
import Image from "next/image";
import clsx from "clsx";
import ScrollableFeed from "react-scrollable-feed";
import io from "socket.io-client";
import { Message } from "@/types/adda";

const socket = io(process.env.NEXT_PUBLIC_SOCKET as string, {
  autoConnect: false,
});

export default function Messages() {
  const { selectedChat } = getSelectedChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const { cUser } = getCUser();
  const [newMessage, setNewMessage] = useState("");
  const sendMsgRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [msgLoading, setMsgLoading] = useState(false);

  useEffect(() => {
    socket.connect();
    console.log("socket connected");
    socket.emit("setup", cUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cUser._id]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (selectedChat._id === newMessageRecieved.chat._id) {
        setMessages((prev: Message[]) => [...prev, newMessageRecieved]);
      }
    });
    return () => {
      socket.off("message recieved");
    };
  });

  useEffect(() => {
    setMsgLoading(true);
    if (selectedChat._id) {
      (async () => {
        const res = await axios.post(
          `/api/messages?chatId=${selectedChat._id}`
        );
        setMessages(res.data);
      })();
      socket.emit("join chat", selectedChat._id);
    } else {
      setMessages([]);
    }
    setMsgLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat._id]);

  async function handleSend() {
    setLoading(true);
    const { data } = await axios.post("/api/messages/sendmsg", {
      content: newMessage,
      chatId: selectedChat,
      cUserID: cUser._id,
    });
    setNewMessage("");
    (sendMsgRef.current as any).value = "";
    setMessages((perv: Message[]) => [...perv, data]);
    socket.emit("new message", data);
    setLoading(false);
  }

  function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && newMessage.trim()) {
      handleSend();
    }
  }

  return (
    <>
      <div className="h-full bg-slate-100 w-[85%] rounded-3xl dark:bg-slate-600 overflow-x-scroll p-5">
        {msgLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="loading loading-spinner text-red-500">
              Loading
            </span>
          </div>
        ) : !selectedChat?._id ? (
          <p className="text-3xl h-full w-full text-center flex justify-center items-center">
            Select a chat to start messaging
          </p>
        ) : (
          <ScrollableFeed>
            {messages &&
              messages.map((item: any, i: number) => (
                <div
                  key={i}
                  className={clsx(
                    "flex",
                    isSameUser(messages, item, i) ? "mt-3" : "mt-10"
                  )}
                  style={{
                    justifyContent:
                      isSameSenderMargin(messages, item, i, cUser._id) ===
                      "myself"
                        ? "end"
                        : "start",
                  }}
                >
                  {(isSameSender(messages, item, i, cUser._id) ||
                    isLastMessage(messages, i, cUser._id)) && (
                    <Image
                      className="rounded-full mr-3"
                      src={item.sender.pic || "/img/adda/noUser.jpg"}
                      alt="Avater"
                      width={50}
                      height={50}
                    />
                  )}
                  <span
                    className={clsx(
                      "text-white bg-red-500 px-5 py-2 flex items-center justify-center max-w-[75%] rounded-3xl",
                      isSameSenderMargin(messages, item, i, cUser._id) ===
                        "sameSender" && "ml-16"
                    )}
                  >
                    {item.content}
                  </span>
                </div>
              ))}
          </ScrollableFeed>
        )}
      </div>
      {selectedChat?._id && (
        <div className="send flex gap-3 mt-5 w-full justify-center">
          <input
            onKeyDown={(e) => {
              handleEnter(e);
            }}
            ref={sendMsgRef}
            type="text"
            name="msg"
            className="input input-bordered input-primary w-3/5 mt-auto"
            placeholder="Enter Your Message"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            disabled={loading || !newMessage.trim()}
            className="btn btn-primary"
            type="submit"
            onClick={handleSend}
          >
            {loading ? (
              <p className="loading loading-spinner text-red-500"></p>
            ) : (
              "Send"
            )}
          </button>
        </div>
      )}
    </>
  );
}
