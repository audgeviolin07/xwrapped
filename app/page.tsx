"use client";

import { useSession, signIn } from "next-auth/react";
import Slideshow from "./components/wrapped/Slideshow";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <main className="flex min-h-screen w-full max-w-md flex-col items-center justify-center py-16 px-8">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-2">
            X Wrapped
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            See your year on X, wrapped up (Tech Twitter Edition)
          </p>

          <button
            onClick={() => signIn("twitter")}
            className="flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black font-semibold py-3 px-6 rounded-full hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Sign in with X
          </button>
        </main>
      </div>
    );
  }

  if (status === "authenticated" && session) {
    return <Slideshow />;
  }

  return null;
}
