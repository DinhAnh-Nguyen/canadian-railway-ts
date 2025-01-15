import { neon } from "@neondatabase/serverless";

export async function POST() {
  try {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    //Can be used to create tables

    //Create a users table containing id, email, name, role.
    const response1 = await sql`CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL
        );`;
    //Create a products table containing id, name, description, price
    // const response2 = await sql `CREATE TABLE products (
    //   id SERIAL PRIMARY KEY,
    //   name VARCHAR(255) NOT NULL,
    //   description VARCHAR(255) NOT NULL,
    //   price DECIMAL(10, 2) NOT NULL
    // )`;
    // return Response.json({ response: [response1, response2] }, { status: 200 });

    //Create a schedules table containing id, description, status, due_date, piroty
    const response2 = await sql `CREATE TABLE schedules (
      id SERIAL PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL,
      due_date DATE NOT NULL,
      piroty VARCHAR(255) NOT NULL
    );`;

    return Response.json( {response1, response2}, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
//Delete all tables
export async function DELETE() {
  try {
    const databaseUrl = process.env.DATABASE_URL || ""; // Set a default value if DATABASE_URL is not defined
    const sql = neon(databaseUrl);
    //PostgresQL
    const response = await sql`DROP TABLE users;`;
    return Response.json({ response }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
