"use client";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const ModeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className={"flex items-center"}>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => {
            if (theme === "dark") {
              setTheme("light");
            } else {
              setTheme("dark");
            }
          }}
        />
        <FaSun className={"swap-on fill-current w-6 h-6"} />
        <FaMoon className={"swap-off fill-current w-6 h-6"} />
      </label>
    </div>
  );
};
export default ModeSwitch;
