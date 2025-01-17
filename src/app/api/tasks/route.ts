import { neon } from "@neondatabase/serverless";

//Fetch All Schedules - Mark

// Add task - Daniel

//Modify task - Chris

//Delete all tasks - Nathan
export async function DELETE() {
    const databaseUrl = process.env.DATABASE_URL || "";  // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);

    const response = await sql`DELETE FROM schedules;`;

    return new Response(null, { status: 200 }); 
}
