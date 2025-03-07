// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/app/_utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CustomUser } from "../types/user";

type AuthContextType = {
    user: CustomUser | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<CustomUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch additional user data from Firestore
                const userDoc = await getDoc(doc(firestore, "users", firebaseUser.uid));
                const userData = userDoc.data();

                // Create merged user object
                const mergedUser: CustomUser = {
                    ...firebaseUser,
                    roles: userData?.roles || [],
                    firstName: userData?.firstName,
                    lastName: userData?.lastName
                };

                setUser(mergedUser);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);