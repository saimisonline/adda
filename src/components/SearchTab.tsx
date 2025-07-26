/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getCUser } from "@/config/store";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Avater from "./Avater";
import { getSelectedChat } from "@/config/store";
import useDebounce from "@/config/useDebounce";
import { User } from "@/types/adda";

export default function SearchTab() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { cUser } = getCUser();
  const { setSelectedChat } = getSelectedChat();
  const inputRef = useRef(null);
  const debouncedInput = useDebounce(search, 1000);

  useEffect(() => {
    (async () => {
      const res = await axios.post(
        `/api/chat/search?search=${debouncedInput ? debouncedInput : "saiful"}`,
        {
          cUserID: cUser._id,
        }
      );
      setUsers(res.data);
    })();
  }, [cUser._id, debouncedInput]);

  async function handleSubmit(item: User) {
    const res = await axios.post("/api/chat", {
      cUserID: cUser._id,
      userId: item._id,
    });
    setSelectedChat(res.data);
    setSearch("");
    (inputRef.current as any).value = "";
  }

  return (
    <>
      <button
        className="btn btn-primary ml-3"
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          window.searchModal.showModal();
        }}
      >
        <p className="hidden md:flex">Search</p>
        <FaSearch />
      </button>
      <dialog id="searchModal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Search A User</h3>
          <input
            ref={inputRef}
            className="input input-bordered input-primary w-full my-5"
            placeholder="Search User"
            type="search"
            name="searchUser"
            id="searchUser"
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            {users.length > 0 &&
              users.map((item: any) => (
                <button
                  key={item._id}
                  className="w-full modal-action mt-0"
                  onClick={() => {
                    handleSubmit(item);
                  }}
                >
                  <Avater user={item} />
                </button>
              ))}
          </div>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => ((inputRef.current as any).value = "")}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
