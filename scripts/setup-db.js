const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:e8Aliacwy73yHboh@db.hlwyscthkuohbrksklnn.supabase.co:5432/postgres'
});

async function setup() {
    try {
        await client.connect();
        console.log("✅ Successfully connected to Supabase PostgreSQL database!");

        // Create the leads table for the contact form
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS leads (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        role TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

        await client.query(createTableQuery);
        console.log("✅ Table 'leads' ensures to exist.");

    } catch (err) {
        console.error("❌ Error setting up database:", err);
    } finally {
        await client.end();
    }
}

setup();
