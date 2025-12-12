"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface TwitterStats {
  data: {
    id: string;
    name: string;
    username: string;
    profile_image_url?: string;
    description?: string;
    public_metrics: {
      followers_count: number;
      following_count: number;
      tweet_count: number;
      listed_count: number;
    };
  };
}

export default function Home() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<TwitterStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.accessToken) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/twitter/stats");
      const data = await response.json();
      if (!response.ok) {
        console.error("API error:", data);
        throw new Error(data.error || "Failed to fetch stats");
      }
      setStats(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load your X stats";
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-md flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-2">
          X Wrapped
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          See your X profile stats
        </p>

        {status === "loading" && (
          <div className="text-zinc-500">Loading...</div>
        )}

        {status === "unauthenticated" && (
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
        )}

        {status === "authenticated" && session && (
          <div className="w-full">
            {loading && (
              <div className="text-center text-zinc-500">Loading your stats...</div>
            )}

            {error && (
              <div className="text-center text-red-500 mb-4">{error}</div>
            )}

            {stats && (
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  {stats.data.profile_image_url && (
                    <Image
                      src={stats.data.profile_image_url.replace("_normal", "_400x400")}
                      alt={stats.data.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-black dark:text-white">
                      {stats.data.name}
                    </h2>
                    <p className="text-zinc-500">@{stats.data.username}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center">
                  <div className="text-6xl font-bold mb-2">
                    {stats.data.public_metrics.tweet_count.toLocaleString()}
                  </div>
                  <div className="text-lg opacity-90">Total Tweets</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-black dark:text-white">
                      {stats.data.public_metrics.followers_count.toLocaleString()}
                    </div>
                    <div className="text-sm text-zinc-500">Followers</div>
                  </div>
                  <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-black dark:text-white">
                      {stats.data.public_metrics.following_count.toLocaleString()}
                    </div>
                    <div className="text-sm text-zinc-500">Following</div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => signOut()}
              className="w-full py-3 px-6 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Sign out
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
