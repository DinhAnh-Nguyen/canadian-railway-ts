"use client";
import { useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

type ProtectedRouteProps = {
    children: React.ReactNode;
    allowedRoles?: string[];
    requiredPermissions?: string[];
};

const ProtectedRoute = ({
    children,
    allowedRoles = [],
    requiredPermissions = []
}: ProtectedRouteProps) => {
    const { user, role, isLoading, hasPermission } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/logIn");
            } else if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
                router.push("/unauthorized");
            } else if (requiredPermissions.length > 0) {
                const hasAllPermissions = requiredPermissions.every(permission =>
                    hasPermission(permission)
                );

                if (!hasAllPermissions) {
                    router.push("/unauthorized");
                }
            }
        }
    }, [user, role, isLoading, allowedRoles, requiredPermissions, router, hasPermission]);

    if (isLoading) {
        return <p>Loading authentication...</p>;
    }

    if (!user) {
        return <p>You need to be logged in to access this page. Redirecting...</p>;
    }

    if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
        return <p>You don't have permission to access this page. Redirecting...</p>;
    }

    if (requiredPermissions.length > 0) {
        const hasAllPermissions = requiredPermissions.every(permission =>
            hasPermission(permission)
        );

        if (!hasAllPermissions) {
            return <p>You don't have the required permissions. Redirecting...</p>;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
