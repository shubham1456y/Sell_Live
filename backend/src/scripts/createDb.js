require('dotenv').config();
const { Client } = require('pg');

const createDatabase = async () => {
    // Connect to default 'postgres' database to create our database
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: 'postgres', // Connect to default DB
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL');

        // Check if database exists
        const checkDb = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [process.env.DB_NAME]
        );

        if (checkDb.rows.length > 0) {
            console.log(`✅ Database "${process.env.DB_NAME}" already exists`);
        } else {
            await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log(`✅ Database "${process.env.DB_NAME}" created successfully!`);
        }

        await client.end();
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
};

createDatabase();
