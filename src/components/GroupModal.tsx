"use client";

import { getCUser, getSelectedChat, useRefetch } from "@/config/store";
import useDebounce from "@/config/useDebounce";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import Avater from "./Avater";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { User } from "@/types/adda";

export default function GroupModal() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { cUser } = getCUser();
  const { selectedChat } = getSelectedChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const debouncedInput = useDebounce(search, 1000);
  const { refetch, setRefetch } = useRefetch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredUsers(
      selectedChat.users.filter((item: User) => item._id !== cUser._id)
    );
  }, [cUser._id, selectedChat]);

  useEffect(() => {
    (async () => {
      const res = await axios.post(
        `/api/chat/search?search=${debouncedInput}`,
        {
          cUserID: cUser._id,
        }
      );
      const updatedRes = res.data.filter(
        (ar: User) => !selectedChat.users.find((rm) => rm._id === ar._id)
      );
      setUsers(updatedRes);
    })();
  }, [cUser._id, debouncedInput, selectedChat.users]);

  async function handleUpdate() {
    setLoading(true);
    await axios.put("/api/chat/grouprename", {
      chatId: selectedChat._id,
      chatName: name,
    });
    setRefetch(!refetch);
    setLoading(false);
  }
  async function handleAdd(item: User) {
    await axios.put("/api/chat/groupadd", {
      chatId: selectedChat._id,
      userId: item._id,
    });
    setRefetch(!refetch);
  }
  async function handleSelfRemove() {
    (inputRef.current as HTMLInputElement).value = "";
    (nameRef.current as HTMLInputElement).value = "";
    await axios.put("/api/chat/groupremove", {
      chatId: selectedChat._id,
      userId: cUser._id,
    });
    setRefetch(!refetch);
  }
  async function handleRemove(item: User) {
    if (filteredUsers.length <= 2) {
      window.GroupModal.close();
      toast.error("Two Users Are Required For A Group");
    } else {
      await axios.put("/api/chat/groupremove", {
        chatId: selectedChat._id,
        userId: item._id,
      });
      setRefetch(!refetch);
    }
  }

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          window.GroupModal.showModal();
        }}
      >
        <GiHamburgerMenu />
      </button>
      <dialog id="GroupModal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Add Users</h3>
          <div className="flex gap-2 items-center">
            <input
              ref={nameRef}
              className="input input-bordered input-primary w-full my-5"
              placeholder="Update Group Name"
              type="text"
              name="groupName"
              id="groupName"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
            <button
              disabled={loading}
              type="button"
              className="btn btn-primary"
              onClick={handleUpdate}
            >
              {loading ? (
                <p className="loading loading-spinner text-red-500"></p>
              ) : (
                "Update"
              )}
            </button>
          </div>
          <p>Remove A User</p>
          <div>
            <div className="flex gap-3 mt-3 overflow-x-scroll">
              {filteredUsers.length > 0 &&
                filteredUsers.map((item: User) => (
                  <span
                    className="bg-red-500 rounded-lg px-3 flex h-8 items-center justify-center"
                    key={item._id}
                  >
                    <p>{item.name}</p>
                    <button
                      type="button"
                      className="ml-3"
                      onClick={() => {
                        handleRemove(item);
                      }}
                    >
                      <IoClose />
                    </button>
                  </span>
                ))}
            </div>
            <input
              ref={inputRef}
              className="input input-bordered input-primary w-full my-3"
              placeholder="Add A New User"
              type="search"
              name="searchUser"
              id="searchUser"
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
            />
            {users.length > 0 &&
              users.map((item:User) => (
                <button
                  type="button"
                  key={item._id}
                  className="w-full"
                  onClick={async () => {
                    handleAdd(item);
                  }}
                >
                  <Avater user={item} key={item._id} />
                </button>
              ))}
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSelfRemove}>
              Leave Group
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                (inputRef.current as HTMLInputElement).value = "";
                (nameRef.current as HTMLInputElement).value = "";
              }}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
