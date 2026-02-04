const db = require('../config/db');

class Product {
    static async create({ sellerId, categoryId, shippingProfileId, title, description, basePrice, status = 'draft', images = [] }) {
        const result = await db.query(
            `INSERT INTO products (seller_id, category_id, shipping_profile_id, title, description, base_price, status, images)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
            [sellerId, categoryId, shippingProfileId, title, description, basePrice, status, JSON.stringify(images)]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await db.query(`SELECT * FROM products WHERE id = $1`, [id]);
        return result.rows[0];
    }

    static async findAll({ sellerId, categoryId, limit = 20, offset = 0 }) {
        let query = `SELECT * FROM products WHERE status = 'active'`;
        const params = [];
        let paramIndex = 1;

        if (sellerId) {
            query += ` AND seller_id = $${paramIndex++}`;
            params.push(sellerId);
        }
        if (categoryId) {
            query += ` AND category_id = $${paramIndex++}`;
            params.push(categoryId);
        }

        query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
        params.push(limit, offset);

        const result = await db.query(query, params);
        return result.rows;
    }
}

module.exports = Product;
