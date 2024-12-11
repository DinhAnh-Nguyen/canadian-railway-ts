"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
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
        <button
          type="button"
          onClick={() => router.push("/manageusers")}
          className="hover:underline"
        >
          Schedule
        </button>
        <Link href="/weather" className="hover:underline">
          Weather
        </Link>
        <Link href="/manageusers">
          <button className="hover:underline">Manage Users</button>
        </Link>
      </div>
      {/* RIGHT */}
      <div className="w-full md:w-[30%] flex items-center justify-end gap-4 text-sm"> 
          <button
            
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sign In with Google
          </button>
        
      </div>
    </div>
  );
}
