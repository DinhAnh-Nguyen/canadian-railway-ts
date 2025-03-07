import { neon } from "@neondatabase/serverless";

/**
 * 
 * Sources used: 
 * https://webdev2-git-dv-dereksaits-projects.vercel.app/week-12/api-implementation#api-implementation-with-nextjs 
 * https://github.com/warsylewicz/webdev2/blob/main/pages/week-12/api-implementation.mdx 
 */


//Fetch all users
export async function GET() {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const response = await sql`SELECT * FROM users;`;
    return new Response(JSON.stringify(response), { status: 200 });
}

//Add a user
export async function POST(request: Request) {
    const resquestData = await request.json();
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const response = await sql`INSERT INTO users (name, email, role) VALUES (${resquestData.name}, ${resquestData.email}, ${resquestData.role});`;
    return new Response(JSON.stringify(response), { status: 200 });
}

//Delete a all users
export async function DELETE() {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const response = await sql`DELETE FROM users;`;
    return new Response(null, { status: 200 });
}