/* eslint-disable no-unused-vars */

export interface User {
  name: string;
  email: string;
  _id: string;
  pic: string;
}

export interface CUser {
  cUser: User;
  setCUser: (cUser: User) => void;
}

export interface SelectedChat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  sender?: User;
}

export interface Message {
  chat: SelectedChat;
  sender: User;
  content: string;
}

export interface SetSelectedChat {
  selectedChat: SelectedChat;
  setSelectedChat: (selectedChat: SelectedChat) => void;
}

export interface Refetch {
  refetch: boolean;
  setRefetch: (refetch: boolean) => void;
}
