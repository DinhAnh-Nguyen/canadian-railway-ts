import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import firebaseAdmin from "@/app/_utils/firebase-admin";

const databaseUrl = process.env.DATABASE_URL || "";
const sql = neon(databaseUrl);

// Get admin Firestore instance
const adminFirestore = firebaseAdmin.firestore();

export async function GET(req: NextRequest) {
    console.log("GET /api/users called");
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized - Missing Token" }, { status: 401 });
    }
    if (!authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized - Invalid Token Format" }, { status: 401 });
    }
    const idToken = authHeader.split("Bearer ")[1];
    if (!idToken) {
        return NextResponse.json({ error: "Unauthorized - Empty Token" }, { status: 401 });
    }
    let decodedToken: any;
    try {
        // Verify token with Admin SDK
        decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        console.log("Token verified for user:", decodedToken.uid);

        // Use Admin SDK for Firestore operations
        const userId = decodedToken.uid;
        console.log("Checking Firestore for user:", userId);

        // Get user document from Admin Firestore
        const userDocRef = adminFirestore.collection('users').doc(userId);
        const userDoc = await userDocRef.get();

        console.log("User document exists:", userDoc.exists);

        if (!userDoc.exists) {
            console.log("Creating user document for:", userId);
            // Create user document with admin privileges for testing
            await userDocRef.set({
                email: decodedToken.email,
                role: "admin", // Set as admin for testing
                createdAt: new Date().toISOString(),
            });

            // Return empty array for now since this is a new user
            return NextResponse.json([], { status: 200 });
        }

        const userData = userDoc.data();
        console.log("User data:", userData);

        // Use role from Firestore or default to user
        const userRole = userData?.role || "user";
        console.log("User role:", userRole);

        let response;
        if (userRole === "admin") {
            // Admins can see all users
            console.log("Admin user - fetching all users");
            response = await sql`SELECT * FROM users;`;
        } else {
            // Regular users only see their own data
            console.log("Regular user - fetching only own data");
            response = await sql`SELECT * FROM users WHERE email = ${decodedToken.email};`;
        }

        console.log("SQL response:", response);

        const modifiedUsers = response.map((user: any) => {
            const { role, ...rest } = user;
            return { ...rest, roles: role ? [role] : [] };
        });

        return NextResponse.json(modifiedUsers, { status: 200 });
    } catch (tokenError: any) {
        console.error("Error in GET /api/users:", tokenError);
        return NextResponse.json(
            {
                error: "Unauthorized - Invalid Token",
                details: tokenError.message || "Unknown error",
                decodedToken: decodedToken,
                authHeader,
                idToken,
            },
            { status: 401 }
        );
    }
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized - Missing Token" }, { status: 401 });
    }
    if (!authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized - Invalid Token Format" }, { status: 401 });
    }
    const idToken = authHeader.split("Bearer ")[1];
    if (!idToken) {
        return NextResponse.json({ error: "Unauthorized - Empty Token" }, { status: 401 });
    }
    let decodedToken: any;
    try {
        const userData = await req.json();
        if (!userData.email || !userData.name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

        // Use Admin SDK for Firestore operations
        const userDocRef = adminFirestore.collection('users').doc(decodedToken.uid);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            return NextResponse.json({ error: "User not found in Firestore" }, { status: 404 });
        }

        const userRole = userDoc.data()?.role || "user";
        if (userRole !== "admin") {
            return NextResponse.json({ error: "Forbidden - Admin Access Required" }, { status: 403 });
        }

        const result = await sql`
      INSERT INTO users (name, email, role)
      VALUES (${userData.name}, ${userData.email}, ${userData.role || 'user'})
      RETURNING *;
    `;
        const newUser = result[0];
        const { role, ...rest } = newUser;
        const formattedUser = { ...rest, roles: role ? [role] : [] };
        return NextResponse.json(formattedUser, { status: 201 });
    } catch (tokenError: any) {
        return NextResponse.json(
            {
                error: "Unauthorized - Invalid Token",
                details: tokenError.message || "Unknown error",
                decodedToken: decodedToken,
            },
            { status: 401 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized - Missing Token" }, { status: 401 });
    }
    if (!authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized - Invalid Token Format" }, { status: 401 });
    }
    const idToken = authHeader.split("Bearer ")[1];
    if (!idToken) {
        return NextResponse.json({ error: "Unauthorized - Empty Token" }, { status: 401 });
    }
    let decodedToken: any;
    try {
        decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

        // Use Admin SDK for Firestore operations
        const userDocRef = adminFirestore.collection('users').doc(decodedToken.uid);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            return NextResponse.json({ error: "User not found in Firestore" }, { status: 404 });
        }

        if (userDoc.data()?.role !== "admin") {
            return NextResponse.json({ error: "Forbidden - Admin Access Required" }, { status: 403 });
        }

        await sql`DELETE FROM users;`;
        return new Response(null, { status: 200 });
    } catch (tokenError: any) {
        return NextResponse.json(
            {
                error: "Unauthorized - Invalid Token",
                details: tokenError.message || "Unknown error",
                decodedToken: decodedToken,
            },
            { status: 401 }
        );
    }
}
