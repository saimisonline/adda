"use client";

import { signOut, useSession } from "next-auth/react";
import SearchTab from "./SearchTab";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const cpath = usePathname();

  return (
    <>
      {cpath === "/" && (
        <div className="w-full bg-slate-400 dark:bg-slate-700 h-16 flex items-center  rounded-b-lg relative justify-center">
          <div className="absolute left-3">
            <SearchTab />
          </div>
          <h1 className="justify-center text-xl">ADDA</h1>
          <div className="dropdown dropdown-end absolute right-3">
            <label tabIndex={0} className=" cursor-pointer">
              <Image
                src={(session?.user.pic as string) || "/img/adda/noUser.jpg"}
                alt="Profile Picture"
                width={50}
                height={50}
                className="cursor-pointer rounded-full"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mr-5"
            >
              <p className="text-center text-xl mt-5">Your Profile</p>
              <div className="pic flex justify-center">
                <Image
                  className="rounded-full"
                  src={(session?.user.pic as string) || "/img/adda/noUser.jpg"}
                  alt="Profile Picture"
                  width={50}
                  height={50}
                />
              </div>
              <h2 className="text-center mt-5">
                Name :{" "}
                <p className="text-red-500">
                  {session?.user.name || "Loading"}
                </p>
              </h2>
              <h2 className="text-center">
                Email :{" "}
                <p className="text-red-500">
                  {session?.user.email || "Loading"}
                </p>
              </h2>
              <button
                type="button"
                className="btn btn-primary my-5"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
