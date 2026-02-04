require('dotenv').config();
const { Client } = require('pg');

const verifySchema = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();
        console.log('✅ Connected to database:', process.env.DB_NAME);

        const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

        console.log('\n📋 Tables in database:');
        result.rows.forEach(row => console.log('  -', row.table_name));
        console.log(`\n✅ Total: ${result.rows.length} tables`);

        await client.end();
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
};

verifySchema();
