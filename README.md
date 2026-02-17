# Real Estate Platform

A modern real estate platform built with Next.js, Prisma, and Tailwind CSS.

## Project Structure

This project is organized into two main directories:

- `frontend/`: Contains the Next.js application, UI components, and static assets.
- `backend/`: Contains the database schema (Prisma), API routes logic (conceptually), server actions, and utility scripts.

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (or your preferred database)

### Installation

1.  Clone the repository
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables in `.env` (see `.env.example` if available)

### Development

To start the development server:

```bash
npm run dev
```

This will start the Next.js frontend at `http://localhost:3000`.

### Database

The Prisma schema is located in `backend/prisma/schema.prisma`.

To push schema changes:
```bash
npx prisma db push --schema=./backend/prisma/schema.prisma
```

To run migrations:
```bash
npx prisma migrate dev --schema=./backend/prisma/schema.prisma
```

### Build

To build the application for production:

```bash
npm run build
```

This command generates the Prisma client and builds the Next.js frontend.

## API & Backend

Server actions and API logic are located in `backend/`. The frontend imports these using the `@backend` alias.
- `@backend/actions`: Server actions
- `@backend/lib`: Backend utilities and database client
- `@backend/prisma`: Database schema

The frontend uses `@frontend` or `@/` for its own components.
