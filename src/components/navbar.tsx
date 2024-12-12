"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/_utils/auth-context";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/app/_utils/firebase";

export default function Nav() {
  const router = useRouter();
  const {user, logOut, signIn} = useUserAuth();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Pass auth if you're using firebase's signOut
      router.push("/");
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

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
        {user ? (
          <>
            <span className="font-medium">{user?.displayName || "Anonymous"}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
}
