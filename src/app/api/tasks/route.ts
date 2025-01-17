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
    const response = await sql`INSERT INTO schedules (description, status, due_date, priority) VALUES (${resquestData.description}, ${resquestData.status}, ${resquestData.due_date}, ${resquestData.piroty});`;
    return new Response(JSON.stringify(response), { status: 200 });
}

//Modify task - Mark 
export async function PUT(request: Request) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const resquestData = await request.json();
    const response = await sql`UPDATE schedules SET description = ${resquestData.description}, status = ${resquestData.status}, due_date = ${resquestData.due_date}, priotity = ${resquestData.priotity} WHERE id = ${resquestData.id};`;
    return new Response(JSON.stringify(response), { status: 200 });
}


//Delete all tasks - Nathan Delete all tasks from table. Keep table.

export async function DELETE() {
    const databaseUrl = process.env.DATABASE_URL || "";  // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);

    const response = await sql`DELETE FROM schedules;`;

    return new Response(null, { status: 200 });
}
