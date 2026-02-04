# Database Setup Guide

It seems your local PostgreSQL password does not match the one in the `.env` file. Follow these steps to fix it.

## Step 1: Open PostgreSQL Terminal

Open your "SQL Shell (psql)" application from the Windows Start Menu, OR run this command in your terminal:
```bash
psql -U postgres
```
*(Press Enter for default values. When asked for Password, try to remember it. If you can't, you might need to reinstall Postgres or check `pg_hba.conf` to set method to `trust` temporarily).*

## Step 2: Reset Password (SQL Query)

Once logged in (you should see `postgres=#`), run this **exact query** to set the password to `password` (matching our `.env`):

```sql
ALTER USER postgres WITH PASSWORD 'password';
```
*You should see `ALTER ROLE` as a response.*

## Step 3: Create the Database

Now run this query to create the database:

```sql
CREATE DATABASE live_commerce;
```
*You should see `CREATE DATABASE`.*

## Step 4: Verify Connection

Exit `psql` by typing:
```sql
\q
```

Now, try running the initialization script in your VS Code terminal:

```bash
npm run db:init
```

If it says `Database initialized successfully!`, you are done!
