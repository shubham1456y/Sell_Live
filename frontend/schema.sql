-- ======================================================
-- EXTENSIONS
-- ======================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ======================================================
-- USERS & PROFILES
-- ======================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  full_name VARCHAR NOT NULL,
  role VARCHAR NOT NULL CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE profiles (
  user_id UUID PRIMARY KEY,
  bio TEXT,
  avatar_url VARCHAR,
  preferences JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_profiles_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  full_name VARCHAR NOT NULL,
  address_line1 VARCHAR NOT NULL,
  address_line2 VARCHAR,
  city VARCHAR NOT NULL,
  state VARCHAR NOT NULL,
  postal_code VARCHAR NOT NULL,
  country VARCHAR NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT fk_addresses_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  type VARCHAR NOT NULL CHECK (type IN ('order', 'stream', 'follow', 'system')),
  title VARCHAR NOT NULL,
  message TEXT,
  data JSONB,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_notifications_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ======================================================
-- SELLERS & STORE
-- ======================================================

CREATE TABLE sellers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL,
  store_name VARCHAR UNIQUE NOT NULL,
  description TEXT,
  logo_url VARCHAR,
  verification_status VARCHAR NOT NULL CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  application_data JSONB,
  platforms_sold_on JSONB,
  return_address JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_sellers_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_follows_follower
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_follows_seller
    FOREIGN KEY (following_id) REFERENCES sellers(id) ON DELETE CASCADE,
  CONSTRAINT uq_follow UNIQUE (follower_id, following_id)
);

CREATE TABLE banned_viewers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL,
  user_id UUID NOT NULL,
  reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_banned_seller
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
  CONSTRAINT fk_banned_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ======================================================
-- CATALOG & INVENTORY
-- ======================================================

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  parent_id UUID,
  image_url VARCHAR,
  level INT NOT NULL,
  CONSTRAINT fk_category_parent
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE shipping_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  delivery_days_min INT NOT NULL,
  delivery_days_max INT NOT NULL,
  price DECIMAL NOT NULL,
  CONSTRAINT fk_shipping_seller
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL,
  category_id UUID NOT NULL,
  shipping_profile_id UUID NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  base_price DECIMAL NOT NULL,
  status VARCHAR NOT NULL CHECK (status IN ('draft', 'active', 'sold_out', 'archived')),
  images JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_products_seller
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT fk_products_shipping
    FOREIGN KEY (shipping_profile_id) REFERENCES shipping_profiles(id)
);

CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL,
  sku VARCHAR NOT NULL,
  title VARCHAR,
  options JSONB,
  price DECIMAL NOT NULL,
  quantity INT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT fk_variants_product
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE product_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL,
  user_id UUID NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_reviews_product
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  CONSTRAINT fk_reviews_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ======================================================
-- LIVE STREAMING
-- ======================================================

CREATE TABLE streams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL,
  title VARCHAR NOT NULL,
  status VARCHAR NOT NULL CHECK (status IN ('scheduled', 'live', 'ended')),
  scheduled_at TIMESTAMP,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  active_product_id UUID,
  viewer_count_peak INT,
  CONSTRAINT fk_streams_seller
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
  CONSTRAINT fk_streams_product
    FOREIGN KEY (active_product_id) REFERENCES products(id)
);

CREATE TABLE stream_chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stream_id UUID NOT NULL,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  is_persisted BOOLEAN NOT NULL DEFAULT false,
  sent_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_chat_stream
    FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE CASCADE,
  CONSTRAINT fk_chat_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE stream_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stream_id UUID NOT NULL,
  user_id UUID NOT NULL,
  type VARCHAR NOT NULL CHECK (type IN ('heart', 'like')),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_reactions_stream
    FOREIGN KEY (stream_id) REFERENCES streams(id) ON DELETE CASCADE,
  CONSTRAINT fk_reactions_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ======================================================
-- ORDERS
-- ======================================================

CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  product_variant_id UUID NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_cart_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_variant
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  seller_id UUID NOT NULL,
  total_amount DECIMAL NOT NULL,
  shipping_amount DECIMAL NOT NULL,
  tax_amount DECIMAL NOT NULL,
  status VARCHAR NOT NULL CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_address_snapshot JSONB,
  tracking_number VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_orders_seller
    FOREIGN KEY (seller_id) REFERENCES sellers(id)
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL,
  product_id UUID NOT NULL,
  product_variant_id UUID,
  quantity INT NOT NULL,
  price_at_purchase DECIMAL NOT NULL,
  product_snapshot JSONB,
  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT fk_order_items_variant
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);

-- ======================================================
-- PAYMENTS & REFUNDS
-- ======================================================

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL,
  payment_provider VARCHAR NOT NULL,
  transaction_id VARCHAR NOT NULL,
  amount DECIMAL NOT NULL,
  currency VARCHAR NOT NULL,
  status VARCHAR NOT NULL CHECK (status IN ('succeeded', 'failed', 'refunded')),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_payments_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE refunds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL,
  payment_id UUID NOT NULL,
  amount DECIMAL NOT NULL,
  reason TEXT,
  status VARCHAR NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed')),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_refunds_order
    FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT fk_refunds_payment
    FOREIGN KEY (payment_id) REFERENCES payments(id)
);

-- ======================================================
-- SELLER EARNINGS & PAYOUTS
-- ======================================================

CREATE TABLE seller_earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL,
  order_id UUID NOT NULL,
  order_item_id UUID NOT NULL,
  product_id UUID NOT NULL,
  product_variant_id UUID,
  quantity INT NOT NULL,
  item_price DECIMAL NOT NULL,
  platform_fee DECIMAL NOT NULL,
  seller_net_amount DECIMAL NOT NULL,
  is_eligible_for_payout BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_earnings_seller
    FOREIGN KEY (seller_id) REFERENCES sellers(id),
  CONSTRAINT fk_earnings_order
    FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT fk_earnings_order_item
    FOREIGN KEY (order_item_id) REFERENCES order_items(id),
  CONSTRAINT fk_earnings_product
    FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT fk_earnings_variant
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);

CREATE TABLE seller_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL,
  payout_amount DECIMAL NOT NULL,
  payout_status VARCHAR NOT NULL CHECK (payout_status IN ('pending', 'processing', 'paid', 'failed')),
  payout_period_start TIMESTAMP NOT NULL,
  payout_period_end TIMESTAMP NOT NULL,
  payout_date TIMESTAMP,
  payout_reference VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT fk_payouts_seller
    FOREIGN KEY (seller_id) REFERENCES sellers(id)
);

CREATE TABLE seller_payout_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_payout_id UUID NOT NULL,
  seller_earning_id UUID NOT NULL,
  CONSTRAINT fk_payout_items_payout
    FOREIGN KEY (seller_payout_id) REFERENCES seller_payouts(id),
  CONSTRAINT fk_payout_items_earning
    FOREIGN KEY (seller_earning_id) REFERENCES seller_earnings(id)
);
