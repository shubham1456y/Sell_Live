# Comprehensive Project Documentation: Live Commerce Platform

## 1. System Architecture Overview

This project is a sophisticated **Live Commerce Ecosystem** connecting Sellers (Hosts) and Buyers (Viewers) through real-time video interaction. The system is architected as a **React Native (Expo)** frontend communicating with a **PostgreSQL** backend via a RESTful API.

### High-Level Components
1.  **Mobile Client (Frontend)**: Handles user interfaces, video playback/broadcasting, and local state.
2.  **API Gateway (Backend)**: Routes, authenticates, and validates requests.
3.  **Data Persistence (Database)**: Relational data storage for complex entity relationships.
4.  **Media Server (External)**: Handles RTMP ingestion and HLS delivery for live video (integrated logically via the Stream module).

---

## 2. Module Details

### A. Authentication & User Management Module
*   **Purpose**: Manages identity and security.
*   **Sub-Modules**:
    *   **Registration/Login**: Supports Email/Password authentication.
        *   *Key Logic*: Generates JWT for session management.
    *   **Profile Management**: Handles avatars, bios, and user preferences.
    *   **Address Book**: Manages multiple shipping addresses per user (`is_default` flag logic).
*   **Database Entities**: `users`, `profiles`, `addresses`.

### B. Seller Ecosystem Module
*   **Purpose**: Allows users to upgrade to "Seller" status and manage their business.
*   **Sub-Modules**:
    *   **Seller Application**: A multi-step wizard collecting:
        *   *Business Info*: Shop name, revenue, experience.
        *   *Verification*: ID checks (placeholder), Social links.
        *   *Logistics*: Return address configuration.
    *   **Shop Dashboard**: Central hub for analytics and quick actions.
    *   **Follow System**: Enables users to subscribe to sellers (`follows` table).
*   **Database Entities**: `sellers` (One-to-One with `users`).

### C. Inventory & Logistics Module
*   **Purpose**: Full CRUD capabilities for selling items.
*   **Sub-Modules**:
    *   **Product catalog**:
        *   **Core Attributes**: Title, Description, Base Price.
        *   **Variants (SKUs)**: Support for Size/Color combinations (e.g., "Small/Red") with independent inventory tracking and pricing.
        *   **Media**: JSON array of image URLs.
    *   **Logistics Engine**:
        *   **Shipping Profiles**: Normalized table (`shipping_profiles`) enabling reuse of shipping rules (e.g., "Standard - $5") across thousands of products.
    *   **Categories**: Hierarchical tree structure (Parent/Child categories) for navigation.
*   **Database Relationships**:
    *   Seller 1 -- N Products
    *   Shipping Profile 1 -- N Products
    *   Category 1 -- N Products

### D. Live Commerce Engine (The Core)
*   **Purpose**: Facilitates real-time selling.
*   **Sub-Modules**:
    *   **Scheduling System**:
        *   *Mandatory Scheduling*: Users must pick a future Date/Time to create a stream.
        *   *Logic*: Prevents "empty" streams by forcing meta-data entry (Title, Tags) beforehand.
    *   **Broadcaster Interface (`SellerLiveScreen`)**:
        *   *Product Selector*: Real-time modal to "Push" a product to the viewer's screen.
        *   *Stream Controls*: Start/Stop, Mute, Camera Flip.
    *   **Viewer Interface (`ViewerLiveScreen`)**:
        *   *Product Overlay*: Dynamically updates when the host selects a product.
        *   *Instant Checkout*: "Buy Now" button within the video interface.
        *   *Interactions*: Hearts (floating animation), Comments (scrolling list).
*   **Database Entities**: `streams`, `stream_messages` (optional).

### E. Order Processing Module
*   **Purpose**: Handles the transactional lifecycle.
*   **Sub-Modules**:
    *   **Checkout**: Calculates totals + Shipping cost based on the product's `shipping_profile_id`.
    *   **State Machine**:
        *   `PENDING` -> User initiated.
        *   `CONFIRMED` -> Payment successful (Inventory decremented).
        *   `SHIPPED` -> Seller marked as sent.
        *   `DELIVERED` -> Item arrived.
*   **Database Entities**: `orders`, `order_items`, `payments`.

### F. Financial & Reconciliation Module
*   **Purpose**: Manages moneys, refunds, and seller payouts.
*   **Sub-Modules**:
    *   **Seller Payouts**: Automated aggregation of "Cleared" funds to be paid out to sellers on a schedule (e.g., Weekly).
    *   **Refunds**: Handling partial or full refunds with reason codes and audit trails.
*   **Database Entities**: `refunds`, `seller_payouts`.

---

## 3. Database Schema & Relationships

The database is normalized to 3NF where appropriate to ensure data integrity.

### Key Entity-Relationship Diagrams (ERD Description)

1.  **User-Seller Relationship**
    *   `users.id` (PK) <---- `sellers.user_id` (FK, Unique)
    *   **Type**: **1:1**.
    *   *Explanation*: A User is the base entity. A User *can be* a Seller. If they are, they have exactly one Seller record.

2.  **Product-Logistics Relationship**
    *   `shipping_profiles.id` (PK) <---- `products.shipping_profile_id` (FK)
    *   **Type**: **1:N**.
    *   *Explanation*: One Shipping Profile (e.g., "Free Shipping") can be assigned to many Products. This allows bulk updating of shipping rules.

3.  **Stream-Seller Relationship**
    *   `sellers.id` (PK) <---- `streams.seller_id` (FK)
    *   **Type**: **1:N**.
    *   *Explanation*: A Seller can host multiple streams over time (history).

4.  **Order-LineItems Relationship**
    *   `orders.id` (PK) <---- `order_items.order_id` (FK)
    *   **Type**: **1:N**.
    *   *Explanation*: An Order consists of multiple Items. Each Item snapshots the price/data at the time of purchase to prevent historical data corruption if the original product changes.

---

## 4. Frontend Architecture (React Native)

### Screen Hierarchy (Navigation)
*   **Root Stack**:
    *   **Auth Stack**: `Login`, `Register`, `ProfileSetup`.
    *   **Main Tab Navigator**:
        *   `Home`: Feeds (Live Now, Following).
        *   `Browse`: Category search.
        *   `Sell`: Dashboard for Sellers.
        *   `Activity`: Notifications/Orders.
        *   `Profile`: Settings & User Profile.
    *   **Live Stack (Modals)**:
        *   `StartLive` (Scheduling configuration).
        *   `SellerLive` (Broadcasting view).
        *   `ViewerLive` (Watching view).
    *   **Product Stack**:
        *   `AddProduct`, `ProductListings`.

### Key UX Flows

#### Flow 1: Seller Onboarding (The "Sell" Tab)
1.  **Landing**: User sees value proposition ("Start Your Shop").
2.  **Application**: User moves through an 8-step wizard (`SellerApplicationScreen`).
3.  **Approval**: Once submitted, backend validates.
4.  **Dashboard**: User gains access to Product & Stream tools.

#### Flow 2: The "Go Live" Loop
1.  **Inventory Prep**: Seller adds products via `AddProductScreen`.
2.  **Schedule**: Seller sets time and cover image via `StartLiveScreen`.
3.  **Go Live**:
    *   System navigates to `SellerLiveScreen`.
    *   Seller checks camera/mic.
    *   Seller hits "LIVE".
4.  **Selling**:
    *   Seller opens "Product Selector".
    *   Taps "Nike Air Jordan".
    *   **System Event**: `active_product_id` updates on the Stream object.
    *   **Result**: All viewers see the Nike card pop up.

#### Flow 3: The Viewer Purchase
1.  **Discovery**: User taps a card on `HomeScreen`.
2.  **Watch**: Enters `ViewerLiveScreen`.
3.  **Trigger**: Host showcases a product.
4.  **Action**: User taps "Buy Now".
5.  **Checkout**: (Future dev) Native sheet opens for 1-click payment using saved address.

---

---

## 6. Security, Authorization & Role Enforcement

Security is critical in a platform handling payments and live video. We implement a strict **Role-Based Access Control (RBAC)** system combined with **Resource Ownership** checks.

### Role Definitions
1.  **Guest (Public)**: Unauthenticated users. Can only view public streams and catalog.
2.  **User (Buyer)**: Authenticated user. Can buy, chat, follow.
3.  **Seller**: A User who has verified their shop. Has all User permissions + Inventory/Stream management.
4.  **Admin**: System administrators (back-office).

### Authorization Matrix

| Action | Guest | User | Seller | Rule / Logic |
| :--- | :---: | :---: | :---: | :--- |
| **View Products** | ✅ | ✅ | ✅ | Public access |
| **Buy Item** | ❌ | ✅ | ✅ | Requires active account for billing |
| **Create Product** | ❌ | ❌ | ✅ | Role must be `seller` |
| **Edit Product** | ❌ | ❌ | ✅ | **OWNERSHIP CHECK**: `product.seller_id == current_user.seller_id` |
| **Start Stream** | ❌ | ❌ | ✅ | Role must be `seller` |
| **Chat in Stream** | ❌ | ✅ | ✅ | Authenticated only |
| **Ban User** | ❌ | ❌ | ✅ | **OWNERSHIP CHECK**: Stream Host only |

### Critical Enforcement Rules

#### 1. The "Seller-Buyer" Dual Role
*   **Concept**: A Seller **IS** a Buyer.
*   **Implementation**: Sellers do not lose "Buyer" access. They can watch other streams and buy items using their personal wallet.
*   *Restriction*: A Seller typically cannot buy their *own* products (self-dealing prevention).

#### 2. Resource Ownership (The "Owner" Scope)
*   Having the `Seller` role is not enough to edit *any* product.
*   **Middleware Logic**:
    ```javascript
    // Pseudo-code for PUT /products/:id
    function checkOwnership(req, res, next) {
      const product = await Product.findById(req.params.id);
      if (product.seller_id !== req.user.seller_id) {
        return res.status(403).send("You do not own this resource");
      }
      next();
    }
    ```

#### 3. API Token Scopes
*   Tokens contain claims: `{ "id": "u123", "role": "seller", "shop_id": "s999" }`.
*   APIs validate these claims before hitting the database.

---
