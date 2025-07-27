import clsx from "clsx";
import Image from "next/image";
import { User } from "@/types/adda";

interface AvaterProps {
  user: User;
  isSelected?: boolean;
  chatName?: string | false;
}

export default function Avater({ user, isSelected, chatName }: AvaterProps) {
  return (
    <>
      <div
        className={clsx(
          "w-full px-5 py-3 flex items-center rounded-lg my-3 cursor-pointer",
          isSelected && "bg-red-500 dark:bg-red-500",
          !isSelected && "bg-slate-400 dark:bg-slate-700"
        )}
      >
        <Image
          className="rounded-full"
          src={
            chatName
              ? "/img/adda/groupLogo.jpg"
              : (user.pic as string) || "/img/adda/noUser.jpg"
          }
          alt="Avater"
          width={50}
          height={50}
        />
        <div className="w-full ml-5">
          <p className="text-sm text-left text-white">
            {chatName ? chatName : user.name}
          </p>
          <p className="mt-1 text-sm text-left text-white">
            {chatName ? "Group" : user.email}
          </p>
        </div>
      </div>
    </>
  );
}
