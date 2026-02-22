const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:e8Aliacwy73yHboh@db.hlwyscthkuohbrksklnn.supabase.co:5432/postgres'
});

async function setupBucket() {
    try {
        await client.connect();

        // Create bucket
        await client.query(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('uploads', 'uploads', true) 
      ON CONFLICT DO NOTHING;
    `);

        // We can grant permission to anon roles.
        await client.query(`
      CREATE POLICY public_select_uploads ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
    `).catch(e => console.log('Policy might already exist:', e.message));

        await client.query(`
      CREATE POLICY public_insert_uploads ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads');
    `).catch(e => console.log('Policy might already exist:', e.message));

        console.log("✅ Bucket 'uploads' is ready.");
    } catch (err) {
        console.error("❌ Setup error:", err);
    } finally {
        await client.end();
    }
}

setupBucket();
