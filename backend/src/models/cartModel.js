const db = require('../config/db');

class Cart {
    static async addItem({ userId, productVariantId, quantity }) {
        // Upsert logic: if item exists, update quantity
        const result = await db.query(
            `INSERT INTO cart_items (user_id, product_variant_id, quantity)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_variant_id) 
       DO UPDATE SET quantity = cart_items.quantity + $3
       RETURNING *`,
            [userId, productVariantId, quantity]
        );
        // Note: Schema might need UNIQUE constraint on (user_id, product_variant_id) for this ON CONFLICT to work.
        // If not present, we should add it or use SELECT + UPDATE/INSERT.
        // Assuming unique constraint exists or we rely on logic.
        return result.rows[0];
    }

    static async getCart(userId) {
        const result = await db.query(
            `SELECT ci.*, pv.title as variant_title, pv.price, pv.sku, p.title as product_title, p.images, p.seller_id
       FROM cart_items ci
       JOIN product_variants pv ON ci.product_variant_id = pv.id
       JOIN products p ON pv.product_id = p.id
       WHERE ci.user_id = $1`,
            [userId]
        );
        return result.rows;
    }

    static async removeItem(id, userId) {
        await db.query(`DELETE FROM cart_items WHERE id = $1 AND user_id = $2`, [id, userId]);
    }

    static async clearCart(userId, client = db) {
        await client.query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);
    }
}

module.exports = Cart;
