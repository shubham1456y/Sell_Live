require('dotenv').config();
const { Client } = require('pg');

const testConnection = async () => {
    console.log('Testing connection with:');
    console.log(`User: ${process.env.DB_USER}`);
    console.log(`DB: ${process.env.DB_NAME}`);
    console.log(`Host: ${process.env.DB_HOST}`);

    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();
        console.log('✅ Connection successful!');
        const res = await client.query('SELECT NOW()');
        console.log('Time form DB:', res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        if (err.message.includes('password authentication failed')) {
            console.error('👉 Cause: Incorrect password in .env');
        } else if (err.message.includes('database "' + process.env.DB_NAME + '" does not exist')) {
            console.error('👉 Cause: Database needs to be created (`createdb`)');
        }
    }
};

testConnection();
