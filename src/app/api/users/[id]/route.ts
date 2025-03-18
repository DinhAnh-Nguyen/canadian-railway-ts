import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import firebaseAdmin from "@/app/_utils/firebase-admin";

const databaseUrl = process.env.DATABASE_URL || "";
const sql = neon(databaseUrl);

// Get admin Firestore instance
const adminFirestore = firebaseAdmin.firestore();

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string | number } }
) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized - Missing Token" }, { status: 401 });
    }
    const idToken = authHeader.split("Bearer ")[1];
    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
        console.log(decodedToken);

        // Use Admin SDK for Firestore operations
        const userDocRef = adminFirestore.collection('users').doc(decodedToken.uid);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
            return NextResponse.json({ error: "User not found in Firestore" }, { status: 404 });
        }

        const userRole = userDoc.data()?.role || "user";
        const id = Number(params.id);
        let response;
        if (userRole === 'admin') {
            response = await sql`SELECT * FROM users WHERE id = ${id};`;
        } else {
            response = await sql`SELECT * FROM users WHERE id = ${id} AND email = ${decodedToken.email};`;
        }
        const user = response[0] as any;
        if (!user) {
            return NextResponse.json({ error: "User not found or access denied" }, { status: 404 });
        }
        const modifiedUser = { ...user, roles: user.role ? [user.role] : [] };
        delete modifiedUser.role;
        return NextResponse.json(modifiedUser, { status: 200 });
    } catch (tokenError: any) {
        return NextResponse.json(
            {
                error: "Unauthorized - Invalid Token",
                details: tokenError.message || "Unknown error",
            },
            { status: 401 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string | number } }
) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized - Missing Token" }, { status: 401 });
    }
    const idToken = authHeader.split("Bearer ")[1];
    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

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

        const id = Number(params.id);
        const requestData = await request.json();
        const response = await sql`
      UPDATE users 
      SET email = ${requestData.email}, name = ${requestData.name}, role = ${requestData.role} 
      WHERE id = ${id}
      RETURNING *;
    `;
        const updatedUser = response[0] as any;
        if (!updatedUser) {
            return NextResponse.json({ error: "User not found or update failed" }, { status: 404 });
        }
        const modifiedUser = { ...updatedUser, roles: updatedUser.role ? [updatedUser.role] : [] };
        delete modifiedUser.role;
        return NextResponse.json(modifiedUser, { status: 200 });
    } catch (tokenError: any) {
        return NextResponse.json(
            {
                error: "Unauthorized - Invalid Token",
                details: tokenError.message || "Unknown error",
            },
            { status: 401 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string | number } }
) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized - Missing Token" }, { status: 401 });
    }
    const idToken = authHeader.split("Bearer ")[1];
    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

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

        const id = Number(params.id);
        const response = await sql`DELETE FROM users WHERE id = ${id};`;
        if (!response) {
            return NextResponse.json({ error: "User not found or delete failed" }, { status: 404 });
        }
        return new Response(null, { status: 200 });
    } catch (tokenError: any) {
        return NextResponse.json(
            {
                error: "Unauthorized - Invalid Token",
                details: tokenError.message || "Unknown error",
            },
            { status: 401 }
        );
    }
}
