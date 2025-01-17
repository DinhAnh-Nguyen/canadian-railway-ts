import { neon } from "@neondatabase/serverless";

//Add a Schedule - Daniel

//Modify a Schedule - Chris

//Delete a Schedule - Nathan
export async function DELETE(request: Request, { params }: { params: { id: number } }) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);

    const response = await sql`DELETE FROM schedules WHERE id = ${params.id};`;

    if (!response) {
        return new Response(null, { status: 404 }); //When Task Not Found
    }

    return new Response(null, { status: 200 }); 
}
