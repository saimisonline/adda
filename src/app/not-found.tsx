import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col gap-5">
        <h1 className="font-extrabold text-3xl text-red-500">404 ERROR !</h1>
        <h1 className="font-bold text-2xl">Page Is Not Found !</h1>
        <h2>Go To Homepage !</h2>
        <Link className="btn btn-primary" href={"/"}>
          Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
