import { neon } from "@neondatabase/serverless";

//Add a task - Daniel

//Modify a task - Chris
export async function PUT( request : Request, { params }: { params: { id: Number | String} }) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const id = Number(params.id);
    const resquestData = await request.json();
    const response = await sql`UPDATE schedules SET description = ${resquestData.description}, status = ${resquestData.status}, due_date = ${resquestData.due_date}, piroty = ${resquestData.piroty} WHERE id = ${id};`;;
    return new Response(JSON.stringify(response), { status: 200 });
}

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
