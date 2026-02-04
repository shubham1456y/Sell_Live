const db = require('../config/db');

class Stream {
    static async create({ sellerId, title, scheduledAt, status = 'scheduled' }) {
        const result = await db.query(
            `INSERT INTO streams (seller_id, title, scheduled_at, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [sellerId, title, scheduledAt, status]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await db.query(`SELECT * FROM streams WHERE id = $1`, [id]);
        return result.rows[0];
    }

    static async findActiveBySeller(sellerId) {
        const result = await db.query(
            `SELECT * FROM streams WHERE seller_id = $1 AND status = 'live'`,
            [sellerId]
        );
        return result.rows[0];
    }

    static async updateStatus(id, status, timeField = null) {
        let query = `UPDATE streams SET status = $2`;
        const params = [id, status];

        if (timeField === 'started_at') {
            query += `, started_at = NOW()`;
        } else if (timeField === 'ended_at') {
            query += `, ended_at = NOW(), active_product_id = NULL`;
        }

        query += ` WHERE id = $1 RETURNING *`;

        const result = await db.query(query, params);
        return result.rows[0];
    }

    static async setActiveProduct(id, productId) {
        const result = await db.query(
            `UPDATE streams SET active_product_id = $2 WHERE id = $1 RETURNING *`,
            [id, productId]
        );
        return result.rows[0];
    }

    static async listLive({ limit = 20, offset = 0 }) {
        const result = await db.query(
            `SELECT s.*, sel.store_name, sel.logo_url 
       FROM streams s
       JOIN sellers sel ON s.seller_id = sel.id
       WHERE s.status = 'live'
       ORDER BY s.started_at DESC
       LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        return result.rows;
    }
}

module.exports = Stream;
