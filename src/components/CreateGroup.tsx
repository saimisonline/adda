"use client";

import { useEffect, useRef, useState } from "react";
import { getCUser, getSelectedChat } from "@/config/store";
import useDebounce from "@/config/useDebounce";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Avater from "./Avater";
import toast from "react-hot-toast";
import { User } from "@/types/adda";

export default function CreateGroup() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { cUser } = getCUser();
  const { setSelectedChat } = getSelectedChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const debouncedInput = useDebounce(search, 1000);

  useEffect(() => {
    if (debouncedInput) {
      (async () => {
        const res = await axios.post(
          `/api/chat/search?search=${debouncedInput}`,
          {
            cUserID: cUser._id,
          }
        );
        const updatedRes = res.data.filter(
          (ar: User) => !selectedUsers.find((rm) => rm._id === ar._id)
        );
        setUsers(updatedRes);
      })();
    } else {
      setUsers([]);
    }
  }, [cUser._id, debouncedInput, selectedUsers]);

  async function handleSubmit() {
    (inputRef.current as HTMLInputElement).value = "";
    (nameRef.current as HTMLInputElement).value = "";
    setSelectedUsers([]);
    if (!name || !selectedUsers.length)
      toast.error("Fill All The Fields !", {
        id: "error",
      });
    else if (name && !(selectedUsers.length >= 2)) {
      console.log(selectedUsers.length);
      toast.error("More than 2 users are required !", {
        id: "error",
      });
    } else {
      (async () => {
        const res = await axios.post("/api/chat/group", {
          cUserID: cUser._id,
          name,
          users: JSON.stringify(Array.from(selectedUsers, (i: User) => i._id)),
        });
        setSelectedChat(res.data);
        setSelectedUsers([]);
      })();
    }
  }

  return (
    <>
      <button
        className="btn btn-primary text-sm"
        onClick={() => {
          window.createGroupModal.showModal();
        }}
      >
        <p className="hidden md:flex">New Group</p>
        <FaPlus />
      </button>
      <dialog id="createGroupModal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Add Users</h3>
          <input
            ref={nameRef}
            className="input input-bordered input-primary w-full my-5"
            placeholder="Enter Group Name"
            type="text"
            name="groupName"
            id="groupName"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            ref={inputRef}
            className="input input-bordered input-primary w-full mb-3"
            placeholder="Search User"
            type="search"
            name="searchUser"
            id="searchUser"
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            <div className="flex gap-3 overflow-x-scroll">
              {selectedUsers.length > 0 &&
                selectedUsers.map((item: User) => (
                  <span
                    className="bg-red-500 rounded-lg px-3 flex h-8 items-center justify-center"
                    key={item._id}
                  >
                    <p>{item.name}</p>
                    <button
                      type="button"
                      className="ml-3"
                      onClick={() => {
                        setSelectedUsers(
                          selectedUsers.filter((i: User) => i._id !== item._id)
                        );
                      }}
                    >
                      <IoClose />
                    </button>
                  </span>
                ))}
            </div>
            {users.length > 0 &&
              users.map((item: User) => (
                <button
                  type="button"
                  key={item._id}
                  className="w-full"
                  onClick={() => {
                    setSelectedUsers([...selectedUsers, item]);
                  }}
                >
                  <Avater user={item} key={item._id} />
                </button>
              ))}
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Done
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                (inputRef.current as HTMLInputElement).value = "";
                setSelectedUsers([]);
                (nameRef.current as HTMLInputElement).value = "";
                setSelectedUsers([]);
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
