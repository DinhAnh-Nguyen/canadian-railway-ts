"use client";

import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const { user, googleSignIn } = useUserAuth();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex justify-center h-screen items-center bg-background text-foreground">
      <div className="rounded-md p-2 bg-[#393A3E] h-80">
        <h3 className="text-center text-lg font-bold mb-4">Canadian Railway</h3>
        <h3 className="text-center text-sm mb-4">Sign In To Proceed</h3>
        <button
          onClick={() => {
            googleSignIn();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
