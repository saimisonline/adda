import { create } from "zustand";
import {
  CUser,
  User,
  SelectedChat,
  SetSelectedChat,
  Refetch,
} from "@/types/adda";

export const getSelectedChat = create<SetSelectedChat>((set) => ({
  selectedChat: {
    _id: "",
    chatName: "",
    isGroupChat: false,
    users: [],
  },
  setSelectedChat: (selectedChat: SelectedChat) => set({ selectedChat }),
}));

export const useRefetch = create<Refetch>()((set) => ({
  refetch: false,
  setRefetch: (refetch: boolean) => set({ refetch }),
}));

export const getCUser = create<CUser>((set) => ({
  cUser: {
    name: "",
    email: "",
    _id: "",
    pic: "",
  },
  setCUser: (cUser: User) => set({ cUser }),
}));
