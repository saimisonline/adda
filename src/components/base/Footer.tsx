import Link from "next/link";
import ModeSwitch from "@/components/base/ModeSwitch";
import { CurrentYear } from "./Helper";

export default function Footer() {
  return (
    <>
      <div className={"mt-auto sticky"}>
        <footer className="bg-slate-400 rounded-lg shadow m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
            <span className="text-sm text-white sm:text-center dark:text-gray-400">
              <CurrentYear />{" "}
              <Link
                className="hover:underline text-red-500"
                href="https://cwsaim.vercel.app"
                target="_blank"
              >
                @CWS
              </Link>{" "}
              . All Rights Reserved.
            </span>
            <span className="flex items-center text-sm font-medium text-gray-200 dark:text-gray-400">
              <ModeSwitch />
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
