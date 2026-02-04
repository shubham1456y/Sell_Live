# Backend API Design Specification

This document outlines the RESTful API endpoints for the Live Stream Shopping Application, based on the new PostgreSQL schema.

## Base URL
`https://api.livecommerce.com/v1`

## Key Headers
- `Authorization`: `Bearer <jwt_token>`
- `Content-Type`: `application/json`

---

## 1. Auth & User Module

### Authentication
*   `POST /auth/register`
    *   **Body**: `{ "email", "password", "full_name" }`
    *   **Response**: `{ "token", "user": { "id", "email", ... } }`
*   `POST /auth/login`
    *   **Body**: `{ "email", "password" }`
    *   **Response**: `{ "token" }`
*   `GET /auth/me`
    *   **Auth**: Required
    *   **Response**: Current user profile + seller status + roles.

### Profiles
*   `GET /users/:id/profile`
    *   **Response**: Public profile (avatar, bio).
*   `PATCH /users/profile`
    *   **Auth**: Required
    *   **Body**: `{ "bio", "avatar_url", "preferences" }`
    *   **Note**: Updates `profiles` table.

### Addresses
*   `GET /users/addresses`
    *   **Auth**: Required
    *   **Response**: List of addresses.
*   `POST /users/addresses`
    *   **Body**: `{ "full_name", "address_line1", "address_line2", "city", "state", "postal_code", "country", "is_default" }`
*   `DELETE /users/addresses/:id`

### Notifications
*   `GET /notifications`
    *   **Query**: `?limit=20&offset=0`
*   `PATCH /notifications/:id/read`
    *   **Action**: Mark as read.

---

## 2. Seller Module

### Shop & Verification
*   `POST /sellers/onboard`
    *   **Auth**: Required
    *   **Body**: `{ "store_name", "description", "logo_url", "application_data": {...} }`
    *   **Action**: Creates `sellers` record with verification_status `pending`.
*   `GET /sellers/:id`
    *   **Response**: Public shop details (store name, logo, description).
*   `PATCH /sellers/me`
    *   **Auth**: Seller Only
    *   **Body**: Update store details (`return_address`, `platforms_sold_on`).

### Follows
*   `POST /sellers/:id/follow`
    *   **Auth**: User Only
*   `DELETE /sellers/:id/follow`
*   `GET /users/me/following`
    *   **Response**: List of followed sellers.

### Moderation
*   `POST /sellers/ban-viewer`
    *   **Auth**: Seller Only
    *   **Body**: `{ "user_id", "reason" }`
    *   **Action**: Adds to `banned_viewers`.

---

## 3. Catalog & Inventory Module

### Categories
*   `GET /categories`
    *   **Response**: Tree structure of categories (using `level` and `parent_id`).

### Products
*   `POST /products`
    *   **Auth**: Seller Only
    *   **Body**: `{ "title", "description", "base_price", "category_id", "shipping_profile_id", "images" }`
    *   **Response**: Created Product ID.
*   `GET /products`
    *   **Query**: `?seller_id=...&category_id=...&q=...`
*   `GET /products/:id`
    *   **Response**: Product details + **Variants list**.
*   `DELETE /products/:id`
    *   **Action**: Mark as `archived` (soft delete) or `sold_out`.

### Product Variants (SKUs)
*   `POST /products/:id/variants`
    *   **Auth**: Seller Only
    *   **Body**: `{ "sku", "title", "options": {"size": "M", "color": "Red"}, "price": 10.99, "quantity": 50 }`
*   `PATCH /products/variants/:id`
    *   **Body**: `{ "price", "quantity", "is_active" }`

### Shipping Profiles
*   `GET /sellers/shipping-profiles`
    *   **Auth**: Seller Only
*   `POST /sellers/shipping-profiles`
    *   **Body**: `{ "name", "delivery_days_min", "delivery_days_max", "price" }`

---

## 4. Live Stream Module

### Stream Management
*   `POST /streams`
    *   **Auth**: Seller Only
    *   **Body**: `{ "title", "scheduled_at" }`
    *   **Status**: Creates stream as `scheduled`.
*   `PATCH /streams/:id/start`
    *   **Action**: Sets status `live`, `started_at` = now.
*   `PATCH /streams/:id/end`
    *   **Action**: Sets status `ended`, `ended_at` = now.
*   `GET /streams/live`
    *   **Response**: List of currently active streams (`status` = 'live').

### Interactive Features
*   `PATCH /streams/:id/active-product`
    *   **Auth**: Seller (Host) Only
    *   **Body**: `{ "product_id" }`
    *   **Effect**: Pushes product card to all viewers.
*   `POST /streams/:id/chat`
    *   **Auth**: User
    *   **Body**: `{ "message" }`
*   `POST /streams/:id/reaction`
    *   **Body**: `{ "type": "heart" }`

---

## 5. Order & Cart Module

### Cart
*   `POST /cart`
    *   **Auth**: User
    *   **Body**: `{ "product_variant_id", "quantity" }`
*   `GET /cart`
*   `DELETE /cart/:id`

### Orders
*   `POST /orders/checkout`
    *   **Auth**: User
    *   **Body**: `{ "address_id", "payment_method_id" }`
    *   **Logic**:
        1.  Verify stock across `cart_items`.
        2.  Calculate Tax & Shipping.
        3.  Create `orders`, `order_items`.
        4.  Lock inventory (decrement `product_variants.quantity`).
        5.  Initiate Payment.
*   `GET /orders`
    *   **Query**: `?status=delivered`
*   `GET /orders/:id`

---

## 6. Financial Module

### Payments
*   `POST /payments/intent`
    *   **Purpose**: Get Stripe/Gateway Client Secret.
*   `GET /payments/:transaction_id`

### Refunds
*   `POST /orders/:id/refund`
    *   **Auth**: Admin or Seller (Limited)
    *   **Body**: `{ "amount", "reason" }`
    *   **Logic**:
        1.  Check `payments` status.
        2.  Call Gateway Refund API.
        3.  Create `refunds` record.

### Seller Payouts
*   `GET /sellers/payouts`
    *   **Auth**: Seller Only
    *   **Response**: History of payouts.
*   `GET /sellers/earnings`
    *   **Auth**: Seller Only
    *   **Response**: List of `seller_earnings` records (ledger), showing `platform_fee` and `seller_net_amount`.
*   `POST /sellers/payouts/request`
    *   **Auth**: Seller Only
    *   **Note**: Request a payout if eligible.
