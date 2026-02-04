# Backend Structure & Architecture

## Core Entities & Responsibilities

1.  **Identity & Profiles**
    *   **Tables**: `users`, `profiles`, `addresses`, `notifications`
    *   **Responsibility**: Identity management, authentication, user preferences, shipping addresses, and system notifications.
    *   **Key Logic**: 
        *   Role-based access (`user` vs `admin`).
        *   Profile separation from auth credentials.
        *   Address management with default flags.

2.  **Sellers & Store**
    *   **Tables**: `sellers`, `follows`, `banned_viewers`
    *   **Responsibility**: Seller profiling, store management, follower relationships, and moderation.
    *   **Key Logic**:
        *   Seller verification workflow (`pending` -> `approved`).
        *   Follower graph management.
        *   Seller-side blocking of abusive viewers.

3.  **Catalog & Inventory**
    *   **Tables**: `categories`, `shipping_profiles`, `products`, `product_variants`, `product_reviews`
    *   **Responsibility**: Product data, hierarchical categories, shipping configurations, and inventory.
    *   **Key Logic**:
        *   Hierarchical categories (`parent_id`).
        *   Shipping profiles per seller.
        *   Product variants (SKUs) for size/color options.
        *   Inventory tracking at the variant level.

4.  **Live Streaming**
    *   **Tables**: `streams`, `stream_chat_messages`, `stream_reactions`
    *   **Responsibility**: Live stream metadata, life-cycle management, and engagement.
    *   **Key Logic**:
        *   Stream lifecycle (`scheduled`, `live`, `ended`).
        *   Active product highlighting during streams.
        *   Chat and reaction persistence.

5.  **Orders & Checkout**
    *   **Tables**: `cart_items`, `orders`, `order_items`
    *   **Responsibility**: Cart management, order processing, and tracking.
    *   **Key Logic**:
        *   Cart associated with product variants.
        *   Order snapshots (price, product details, address) at time of purchase.
        *   Order status state machine.

6.  **Financials (Payments & Payouts)**
    *   **Tables**: `payments`, `refunds`, `seller_earnings`, `seller_payouts`, `seller_payout_items`
    *   **Responsibility**: Payment processing, refund handling, and seller payout calculations.
    *   **Key Logic**:
        *   Granular earnings per order item.
        *   Platform fee deduction.
        *   Payout aggregation and status tracking.

## Key Relationships

*   **Identity**: `profiles.user_id` - `users.id` (1:1), `addresses.user_id` > `users.id` (N:1)
*   **Sellers**: `sellers.user_id` - `users.id` (1:1), `follows.following_id` > `sellers.id` (N:1)
*   **Catalog**: 
    *   `products.seller_id` > `sellers.id` (N:1)
    *   `product_variants.product_id` > `products.id` (N:1)
    *   `products.shipping_profile_id` > `shipping_profiles.id` (N:1)
*   **Live**: `streams.seller_id` > `sellers.id` (N:1), `stream_chat_messages.stream_id` > `streams.id` (N:1)
*   **Orders**: 
    *   `orders.user_id` > `users.id` (N:1)
    *   `order_items.order_id` > `orders.id` (N:1)
    *   `order_items.product_variant_id` > `product_variants.id` (N:1)
*   **Financials**:
    *   `payments.order_id` > `orders.id` (N:1)
    *   `seller_earnings.order_item_id` > `order_items.id` (1:1 usually)
    *   `seller_payout_items.seller_payout_id` > `seller_payouts.id` (N:1)

## suggested API Endpoints

### Auth Module
*   `POST /auth/register` - Create user
*   `POST /auth/login` - Get JWT
*   `GET /auth/me` - Current user profile
*   `PATCH /auth/profile` - Update bio/avatar

### Store Module
*   `GET /sellers/:id` - Shop details
*   `GET /sellers/:id/products` - Store inventory
*   `POST /sellers/apply` - Become a seller

### Product Module
*   `GET /products` - Search users/filters
*   `GET /products/:id` - Detailed view
*   `GET /categories` - Tree view of categories

### Live Module
*   `GET /streams/live` - List active streams
*   `POST /streams` - Schedule/Start stream (Seller only)

### Cart & Checkout Module
*   `POST /orders/checkout` - Initialize checkout flow
*   `POST /orders` - Finalize/Place order
*   `GET /orders/:id` - Order receipt/status

### User Data Module
*   `GET /users/addresses` - List shipping addresses
*   `POST /users/addresses` - Add new address
