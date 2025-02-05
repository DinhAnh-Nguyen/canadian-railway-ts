"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/_utils/auth-context";

export default function Nav() {
  const router = useRouter();
  const { user, googleSignOut } = useUserAuth();

  return (
    <div className="h-24 flex items-center justify-between px-4 shadow-md">
      {/* LEFT */}
      <div className="hidden md:block lg:w-[20%]">
        <Link href="/" className="text-2xl font-bold">
          Railway App
        </Link>
      </div>
      {/* CENTER */}
      {/* Add navigation links if needed */}
      <div className="hidden md:flex md:w-[50%] justify-center gap-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/trackOverview">
          <button className="hover:underline">Track Overview</button>
        </Link>
        <Link href="/weather" className="hover:underline">
          Weather
        </Link>
        <button
          type="button"
          onClick={() => router.push("/schedule")}
          className="hover:underline"
        >
          Schedule
        </button>
        <Link href="/manageusers">
          <button className="hover:underline">Manage Users</button>
        </Link>
      </div>
      {/* RIGHT */}
      <div className="w-full md:w-[30%] flex items-center justify-end gap-4 text-sm">
        <div>
          <span className="font-medium p-3">
            {user?.displayName || "Anonymous"}
          </span>
          <button
            onClick={() => {
              googleSignOut();
              router.push("/signIn");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
