const db = require('../config/db');

class User {
    static async create({ email, passwordHash, fullName, role = 'user' }) {
        const result = await db.query(
            `INSERT INTO users (email, password_hash, full_name, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, full_name, role, created_at`,
            [email, passwordHash, fullName, role]
        );
        return result.rows[0];
    }

    static async findByEmail(email) {
        const result = await db.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await db.query(
            `SELECT id, email, full_name, role, created_at, is_active 
       FROM users WHERE id = $1`,
            [id]
        );
        return result.rows[0];
    }
}

module.exports = User;
