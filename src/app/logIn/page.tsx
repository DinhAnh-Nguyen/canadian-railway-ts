"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/app/_utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogIn = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      console.log(user);

      if (user.emailVerified) {
        const registrationData = localStorage.getItem("registrationData");
        const { firstName = "", lastName = "" } = registrationData
          ? JSON.parse(registrationData)
          : {};

        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(firestore, "users", user.uid), {
            firstName,
            lastName,
            email: user.email,
          });
        }
        router.push("/dashboard");
      } else {
        setError("Please verify your email before logging in.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#33313B] p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-center text-lg font-bold mb-6 text-white">
          RAILLY
        </h3>
        <form className="space-y-4 md:space-y-6" onSubmit={handleLogIn}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
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
              id="password"
              placeholder="••••••••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-2.5 mb-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <Link href="/changePassword" className="text-sm hover:underline">Change Password</Link>
          {error && <p className="text-red-500 text-sm ">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-blue-300"
          >
            Log In
          </button>
        </form>
        <div className="flex justify-center mt-6">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signIn" className="hover:underline">
              Sign Up here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
