"use client";
import Link from "next/link";
import { login, logout } from "./logic/auth";
import { useAuth } from "./mod/auth";
import { useState } from "react";

export default function Home() {
  const user = useAuth();
  const [wait, setwait] = useState<boolean>(false);

  const singin = async () => {
    setwait(true);
    try {
      await login();
    } catch (e) {
      console.error("エラー内容:\n", e);
    } finally {
      setwait(false);
    }
  };
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute top-4 right-4">
        {!user && !wait && (
          <button
            onClick={singin}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Login
          </button>
        )}
        {user && (
          <button
            onClick={logout}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Logout
          </button>
        )}
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col">
          <h1>Real Time Chat System</h1>
          <Link
            href={"pages/bcp"}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            rel="noopener noreferrer"
          >
            Basic Chat Start
          </Link>
          <Link
            href={"pages/pcp"}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            rel="noopener noreferrer"
          >
            Private Chat Start
          </Link>
        </div>
      </main>
    </div>
  );
}
