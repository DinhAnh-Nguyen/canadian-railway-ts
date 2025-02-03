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
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#33313B] p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-center text-lg font-bold mb-6 text-white">
          RAILLY
        </h3>
        <form className="space-y-4 md:space-y-6" action="#">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="example@gmail.com"
              required
            ></input>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            <a
              href="#"
              className="block text-sm font-medium text-blue-500 hover:underline mt-2"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-blue-300"
          >
            Sign in
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Don’t have an account yet?
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
          <button
            onClick={() => {
              googleSignIn();
              console.log("Worked");
            }}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sign In with Google
          </button>
        </form>
      </div>
    </div>
  );
}
