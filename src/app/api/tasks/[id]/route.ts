import { neon } from "@neondatabase/serverless";
// Add a task - Daniel
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


//Modify a task - Chris
export async function PUT(request: Request, { params }: { params: { id: Number | String } }) {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const id = Number(params.id);
    const resquestData = await request.json();
    const response = await sql`UPDATE tasks SET description = ${resquestData.description}, status = ${resquestData.status}, assigned_to = ${resquestData.assigned_to}, created_by = ${resquestData.created_by}, due_date = ${resquestData.due_date}, priority = ${resquestData.priority}, date = ${resquestData.date} WHERE id = ${id};`;
    return new Response(JSON.stringify(response), { status: 200 });
}

//Delete a task - Nathan
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
      const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
      const sql = neon(databaseUrl);
  
      // Convert id to number
      const id = Number(params.id);
  
      // Delete the task from the database
      const response = await sql`DELETE FROM tasks WHERE id = ${id}`;
  
      if (!response) {
        return new Response(null, { status: 404 }); // Task not found
      }
  
      return new Response(null, { status: 200 }); // Success
    } catch (error) {
      console.error("Error deleting task:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
  }

