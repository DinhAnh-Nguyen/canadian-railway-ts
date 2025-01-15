import { neon } from "@neondatabase/serverless";

//Fetch All tasks - Mark
export async function GET() {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const response = await sql`SELECT * FROM schedules;`;
    return new Response(JSON.stringify(response), { status: 200 });
}

// Add task - Daniel
export async function POST(request: Request) {
    const resquestData = await request.json();
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const response = await sql`INSERT INTO schedules (description, status, due_date, piroty) VALUES (${resquestData.description}, ${resquestData.status}, ${resquestData.due_date}, ${resquestData.piroty});`;
    return new Response(JSON.stringify(response), { status: 200 });
}

//Modify task - Chris


//Delete all tasks - Nathan