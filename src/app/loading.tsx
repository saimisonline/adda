import s from "../styles/loading.module.css";

export default function Loading() {
  return (
    <>
      <div className="bg-gray-800 opacity-75 fixed z-[2000] w-full h-full"></div>
      <div className="flex justify-center items-center w-full h-full fixed z-[2001]">
        <div className={s.loading}></div>
      </div>
    </>
  );
}
