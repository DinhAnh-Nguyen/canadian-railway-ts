import { neon } from "@neondatabase/serverless";

// Add a Schedule - Daniel
export async function GET({ params }: { params: { id: Number | String } }) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const id = Number(params.id);
    const response = await sql`SELECT * FROM tasks WHERE id = ${id};`;
    const user = response[0];

    if (!user) {
        return new Response(null, { status: 404 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
}

// Modify a Schedule - Chris

// Delete a Schedule - Nathan