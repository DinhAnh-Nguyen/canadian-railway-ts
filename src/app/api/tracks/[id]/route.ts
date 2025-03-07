import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

//Fetch a track by id
export async function GET({ params }: { params: { id: string } }) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const id = Number(params.id);
    const response = await sql`SELECT * FROM tracks WHERE id = ${id};`;
    const user = response[0];

    if (!user) {
        return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
}

// Delete a track
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const databaseUrl = process.env.DATABASE_URL || "";
        const sql = neon(databaseUrl);

        const { id } = params;
        const taskId = Number(id);

        // Log the ID for debugging purposes
        console.log("Deleting track with ID:", id);

        // Delete the track from the database
        const response = await sql`DELETE FROM tracks WHERE track_id = ${taskId} RETURNING *;`;

        // Log the response for debugging purposes
        console.log("Delete response:", response);

        if (!response) {
            return NextResponse.json({ error: "Track not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: "Failed to delete track." }, { status: 500 });
    }
}