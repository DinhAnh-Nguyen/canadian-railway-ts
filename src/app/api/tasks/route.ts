import { neon } from "@neondatabase/serverless";


//Fetch All tasks - Mark
export async function GET() {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const response = await sql`SELECT * FROM tasks;`;
    return new Response(JSON.stringify(response), { status: 200 });
}

// Add task - Daniel
export async function POST(request: Request) {
    const requestData = await request.json();
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL

    const response = await sql`INSERT INTO tasks (description, status, due_date, priority) VALUES (${requestData.description}, ${requestData.status}, ${requestData.due_date}, ${requestData.piroty});`;
    return new Response(JSON.stringify(response), { status: 200 });
}

// Modify task - Mark 
export async function PUT(request: Request) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const requestData = await request.json();
    const response = await sql`

        UPDATE tasks SET
            description = ${requestData.description}, 
            status = ${requestData.status}, 
            due_date = ${requestData.due_date}, 
            priotity = ${requestData.priotity} 
            WHERE id = ${requestData.id};`;

    return new Response(JSON.stringify(response), { status: 200 });
}


//Delete all tasks - Nathan Delete all tasks from table. Keep table.

export async function DELETE() {
    const databaseUrl = process.env.DATABASE_URL || "";  // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);

    const response = await sql`DELETE FROM schedules;`;

    return new Response(null, { status: 200 });
}
