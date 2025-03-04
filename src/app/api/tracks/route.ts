import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

// Get all tracks - Chris
export async function GET() {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const response = await sql`SELECT * FROM tracks;`;
    return new Response(JSON.stringify(response), { status: 200 }); 
}

// Delete all tracks 

export async function DELETE() {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
  
    const response = await sql`DELETE FROM tracks;`;
  
    return new Response(null, { status: 200 });
  }