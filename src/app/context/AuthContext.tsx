"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, firestore } from "@/app/_utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CustomUser } from "../types/user";

type AuthContextType = {
    user: CustomUser | null;
    role: string | null;
    isLoading: boolean;
    setUser: (user: CustomUser | null) => void;
    logout: () => Promise<void>;
    getAuthToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<CustomUser | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getAuthToken = async (): Promise<string | null> => {
        if (!auth.currentUser) return null;
        try {
            const token = await auth.currentUser.getIdToken(true);
            return token;
        } catch (tokenError) {
            return null;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        const userRole = userDoc.data().role || "user";
                        setUser({
                            ...currentUser,
                            roles: [userRole],
                        } as CustomUser);
                        setRole(userRole);
                    } else {
                        setUser(null);
                        setRole(null);
                    }
                } catch (error) {
                    setUser(null);
                    setRole(null);
                }
            } else {
                setUser(null);
                setRole(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setRole(null);
        } catch (error) {
            // Optionally handle logout error
        }
    };

    return (
        <AuthContext.Provider value={{ user, role, isLoading, setUser, logout, getAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
