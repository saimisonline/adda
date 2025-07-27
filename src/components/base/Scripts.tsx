"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { getCUser, getSelectedChat, useRefetch } from "@/config/store";
import { SelectedChat } from "@/types/adda";
import axios from "axios";

export default function Scripts() {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const { setCUser, cUser } = getCUser();
  const { setSelectedChat, selectedChat } = getSelectedChat();
  const { refetch } = useRefetch();

  // DARK MODE

  useEffect(() => {
    if (
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.querySelector("html")?.setAttribute("data-theme", "dark");
      document
        ?.querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", " #020817");
    } else {
      document.querySelector("html")?.setAttribute("data-theme", "light");
      document
        ?.querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#ffffff");
    }
  }, [theme]);

  //GET CURRENT USER

  useEffect(() => {
    if (!session?.user) {
      const defaultData = { name: "", email: "", _id: "", pic: "" };
      setCUser(defaultData);
    }
    if (session?.user) {
      const response = {
        name: session?.user.name,
        email: session?.user.email,
        _id: session?.user._id,
        pic: session?.user?.pic,
      };
      setCUser(response);
    }
  }, [session, setCUser]);

  useEffect(() => {
    if (selectedChat._id) {
      (async () => {
        const res = await axios.post("/api/chat/accesschat", {
          cUserID: cUser._id,
        });
        const updatedRes = res.data.find(
          (item: SelectedChat) => item._id === selectedChat._id
        );
        setSelectedChat(updatedRes);
      })();
    }
  }, [refetch, selectedChat._id, setSelectedChat, cUser._id]);

  return null;
}
