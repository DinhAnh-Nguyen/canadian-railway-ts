"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/app/_utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { User } from "firebase/auth";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.emailVerified) {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (!userDoc.exists()) {
            // Retrieve user data from local storage
            const registrationData = localStorage.getItem("registrationData");
            const { firstName = "", lastName = "" } = registrationData
              ? JSON.parse(registrationData)
              : {};

            await setDoc(doc(firestore, "users", user.uid), {
              firstName,
              lastName,
              email: user.email,
            });

            // Clear registration data from local storage
            localStorage.removeItem("registrationData");
          }

          setUser(user);
          router.push("/dashboard");
        } else {
          setUser(null);
          router.push("/logIn");
        }
      } else {
        setUser(null);
        router.push("/logIn");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {user ? "Redirecting to dashboard..." : "Redirecting to login..."}
    </div>
  );
}
