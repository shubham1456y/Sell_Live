const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const schemaPath = path.join(__dirname, '../../docs/schema.sql');

const runSchema = async () => {
    console.log('⏳ Connecting to database...');

    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });

    try {
        const client = await pool.connect();
        console.log('✅ Connected to database.');

        console.log('⏳ Reading schema file...');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('⏳ Executing schema...');
        await client.query(schema);

        console.log('✅ Database initialized successfully!');
        client.release();
    } catch (err) {
        // WRITE ERROR TO LOG FILE
        try {
            fs.writeFileSync('init_error.log', JSON.stringify({
                message: err.message,
                code: err.code,
                detail: err.detail,
                hint: err.hint,
                stack: err.stack
            }, null, 2));
        } catch (writeErr) {
            console.error('Failed to write error log:', writeErr);
        }

        if (err.code === '3D000') {
            console.error('❌ Error: Database does not exist.');
            console.error(`   Please create the database "${process.env.DB_NAME}" first.`);
        } else if (err.code === '28P01') {
            console.error('❌ Error: Authentication failed (Password incorrect).');
        } else {
            console.error('❌ Error initializing database:', err);
        }
        process.exit(1);
    } finally {
        await pool.end();
    }
};

runSchema();
