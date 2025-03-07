"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
    allowedRoles,
    children,
}: {
    allowedRoles: string[];
    children: React.ReactNode;
}) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/logIn");
            } else if (!user.roles?.some(role => allowedRoles.includes(role))) {
                router.push("/unauthorized");
            }
        }
    }, [user, isLoading, allowedRoles]);

    if (isLoading) return <div>Loading...</div>;
    if (!user || !user.roles?.some(role => allowedRoles.includes(role))) return null;

    return <>{children}</>;
}