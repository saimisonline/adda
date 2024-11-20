"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorTypes = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorTypes) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="w-full h-[80vh] flex justify-center items-center flex-col gap-5">
        <h1 className="font-extrabold text-3xl text-red-500">{error.name}</h1>
        <h1 className="font-bold text-2xl text-center">{error.message}</h1>
        <div className="flex flex-col justify-center items-center gap-5">
          <button className="btn btn-primary w-4/5" onClick={reset}>
            Retry
          </button>
          <Link className="btn btn-primary" href={"/"}>
            Go To Homepage !
          </Link>
        </div>
      </div>
    </>
  );
}
