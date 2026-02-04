const db = require('../config/db');

class Seller {
    static async create({ userId, storeName, description, logoUrl, verificationStatus = 'pending', applicationData = {} }) {
        const result = await db.query(
            `INSERT INTO sellers (user_id, store_name, description, logo_url, verification_status, application_data)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [userId, storeName, description, logoUrl, verificationStatus, applicationData]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await db.query(`SELECT * FROM sellers WHERE id = $1`, [id]);
        return result.rows[0];
    }

    static async findByUserId(userId) {
        const result = await db.query(`SELECT * FROM sellers WHERE user_id = $1`, [userId]);
        return result.rows[0];
    }

    static async update(id, { description, logoUrl, returnAddress, platformsSoldOn }) {
        // Dynamic update query could be better, but fixed for now
        const result = await db.query(
            `UPDATE sellers 
       SET description = COALESCE($2, description),
           logo_url = COALESCE($3, logo_url),
           return_address = COALESCE($4, return_address),
           platforms_sold_on = COALESCE($5, platforms_sold_on)
       WHERE id = $1
       RETURNING *`,
            [id, description, logoUrl, returnAddress, platformsSoldOn]
        );
        return result.rows[0];
    }
}

module.exports = Seller;
