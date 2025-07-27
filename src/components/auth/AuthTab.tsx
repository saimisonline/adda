"use client";

import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import clsx from "clsx";
import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { FaGithub, FaGoogle } from "react-icons/fa";

const AuthTab = () => {
  const [isSignupCom, setIsSignupCom] = useState(false);
  return (
    <div className="border-4 rounded-xl p-10 mb-5 w-full flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800 shadow-xl">
      {/* <button
        className="btn btn-primary text-xs"
        onClick={() => signIn("google")}
      >
        <FaGoogle />
        Continue with Google
      </button>
      <button
        className="btn btn-primary mt-3 text-xs"
        onClick={() => signIn("github")}
      >
        <FaGithub />
        Continue with Github
      </button> */}
      {/* <p className="my-5">Or</p> */}
      <div className="tabs tabs-boxed flex justify-center w-full md:w-1/2">
        <a
          className={clsx("tab w-1/2", !isSignupCom && "tab-active")}
          onClick={() => setIsSignupCom(false)}
        >
          Sign In
        </a>
        <a
          className={clsx("tab w-1/2", isSignupCom && "tab-active")}
          onClick={() => setIsSignupCom(true)}
        >
          Sign Up
        </a>
      </div>
      <div className="my-5 w-full md:w-1/2">
        {!isSignupCom ? <Login /> : <Signup />}
      </div>
    </div>
  );
};
export default AuthTab;
