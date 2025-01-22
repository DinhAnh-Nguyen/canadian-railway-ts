import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

//Fetch a user by id
export async function GET({ params }: { params: { id: Number | String } }) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const id = Number(params.id);
    const response = await sql`SELECT * FROM users WHERE id = ${id};`;
    const user = response[0];

    if (!user) {
        return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
}

//Update all the information of a user
export async function PUT(request: Request, { params }: { params: { id: Number | String } }) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const id = Number(params.id);
    const requestData = await request.json();
    const response = await sql`UPDATE users SET email = ${requestData.email}, name = ${requestData.name}, role = ${requestData.role} WHERE id = ${id};`;
    return new Response(JSON.stringify(response), { status: 200 });
}

//Delete a user by id
export async function DELETE(request: Request, { params }: { params: { id: Number } }) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    const response = await sql`DELETE FROM users WHERE id = ${params.id};`;

    if (!response) {
        return new Response(null, { status: 404 });
    }

    return new Response(null, { status: 200 });
}