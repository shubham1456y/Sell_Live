# Live Stream Shopping - Backend

Production-ready Node.js backend API for the Live Stream Shopping application.

## 🏗️ Architecture

**Pattern**: Route → Controller → Service → Database (Raw SQL)

```
src/
├── config/          # Database connection
├── controllers/     # HTTP handlers + Zod validation
├── middlewares/     # Auth, Error handling, Validation
├── models/          # Database queries (PostgreSQL)
├── routes/          # Express routes
├── services/        # Business logic
├── utils/           # Helpers (AppError, catchAsync, logger)
└── server.js        # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS)
- PostgreSQL

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Create database:**
```bash
# Using psql
psql -U postgres
CREATE DATABASE LiveStream;
\q
```

4. **Initialize schema:**
```bash
npm run db:init
```

5. **Start server:**
```bash
npm run dev  # Development
npm start    # Production
```

## 📡 API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Create new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)

### Sellers (`/api/v1/sellers`)
- `POST /onboard` - Become a seller (protected)
- `GET /:id` - Get seller profile
- `PATCH /:id` - Update seller profile (protected)

### Products (`/api/v1/products`)
- `POST /` - Create product (seller only)
- `GET /` - List products
- `GET /:id` - Get product details
- `POST /:id/variants` - Add product variant (seller only)

### Live Streams (`/api/v1/streams`)
- `GET /live` - List active streams
- `POST /` - Schedule stream (seller only)
- `PATCH /:id/start` - Start stream (seller only)
- `PATCH /:id/end` - End stream (seller only)
- `PATCH /:id/active-product` - Set active product (seller only)

## 🔒 Security Features

- Helmet (Security headers)
- CORS enabled
- Rate limiting (100 req/hour per IP)
- JWT authentication
- Bcrypt password hashing
- SQL injection protection (parameterized queries)

## 📊 Database

- **Engine**: PostgreSQL
- **Schema**: 23 tables
- **Migrations**: See `docs/schema.sql`

## 🧪 Testing

```bash
# Verify database connection
node test_db.js

# Verify schema
node verify_db.js
```

## 📝 Environment Variables

```env
PORT=5000
NODE_ENV=development

DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=LiveStream

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: PostgreSQL (pg)
- **Validation**: Zod
- **Logging**: Pino
- **Auth**: JWT + Bcrypt

## 📄 License

ISC
