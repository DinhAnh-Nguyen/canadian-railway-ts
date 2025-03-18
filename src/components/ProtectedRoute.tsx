"use client";
import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
    const { user, role, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/logIn");
            } else if (role && !allowedRoles.includes(role)) {
                router.push("/unauthorized");
            }
        }
    }, [user, role, isLoading, allowedRoles, router]);

    if (isLoading) {
        return <p>Loading authentication...</p>;
    }

    if (!user) {
        return <p>You need to be logged in to access this page. Redirecting...</p>;
    }

    if (role && !allowedRoles.includes(role)) {
        return <p>You don't have permission to access this page. Redirecting...</p>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
