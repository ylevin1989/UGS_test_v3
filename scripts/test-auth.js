const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
    connectionString: 'postgresql://postgres:e8Aliacwy73yHboh@db.hlwyscthkuohbrksklnn.supabase.co:5432/postgres'
});

async function testAuth() {
    await client.connect();
    const { rows } = await client.query('SELECT * FROM users WHERE username = $1', ['Admin']);
    if (rows.length === 0) {
        console.log('Admin user not found!');
    } else {
        console.log('Found Admin:', rows[0].username);
        console.log('Hash:', rows[0].password_hash);
        const isMatch = await bcrypt.compare('APEXhot1', rows[0].password_hash);
        console.log('bcrypt compare APEXhot1:', isMatch);
    }
    await client.end();
}

testAuth();
