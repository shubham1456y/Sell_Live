const db = require('../config/db');

class ProductVariant {
    static async create({ productId, sku, title, options, price, quantity }) {
        const result = await db.query(
            `INSERT INTO product_variants (product_id, sku, title, options, price, quantity)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [productId, sku, title, JSON.stringify(options), price, quantity]
        );
        return result.rows[0];
    }

    static async findByProductId(productId) {
        const result = await db.query(
            `SELECT * FROM product_variants WHERE product_id = $1`,
            [productId]
        );
        return result.rows;
    }
}

module.exports = ProductVariant;
