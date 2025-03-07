"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth, firestore } from "@/app/_utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CustomUser } from "../types/user";

type AuthContextType = {
    user: CustomUser | null;
    isLoading: boolean;
    setUser: (user: CustomUser | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    setUser: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<CustomUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await setPersistence(auth, browserLocalPersistence);

                const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                    try {
                        if (firebaseUser) {
                            // 1. Create document reference using UID
                            const userRef = doc(firestore, "users", firebaseUser.uid);

                            // 2. Create document if it doesn't exist and re-fetch data
                            let userData: any;
                            const userDoc = await getDoc(userRef);
                            if (!userDoc.exists()) {
                                await setDoc(userRef, {
                                    email: firebaseUser.email,
                                    firstName: "",
                                    lastName: "",
                                    roles: ["user"] // Default role
                                });
                                // Re-fetch the document to obtain the updated data
                                const newUserDoc = await getDoc(userRef);
                                userData = newUserDoc.data();
                            } else {
                                userData = userDoc.data();
                            }

                            // 3. Validate document structure
                            if (!userData?.roles || !Array.isArray(userData.roles)) {
                                throw new Error("Invalid roles format in Firestore document");
                            }

                            // 4. Set user state with validated data
                            setUser({
                                uid: firebaseUser.uid,
                                email: firebaseUser.email!,
                                emailVerified: firebaseUser.emailVerified,
                                roles: userData.roles,
                                firstName: userData.firstName || "",
                                lastName: userData.lastName || ""
                            });
                        } else {
                            setUser(null);
                            console.log("Checking roles:", user?.roles);

                        }
                    } catch (error) {
                        console.error("Auth error:", error);
                        await signOut(auth);
                        setUser(null);
                    } finally {
                        setIsLoading(false);
                    }
                });

                return unsubscribe;
            } catch (error) {
                console.error("Persistence setup error:", error);
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
