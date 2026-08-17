# Pawfect Pets — Pet Shop Website

Full-stack pet shop website with e-commerce, service booking, admin panel, and Stripe payments.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** + custom UI components
- **PostgreSQL** + Prisma ORM
- **Auth.js (NextAuth v5)** — credentials auth with customer/admin roles
- **Stripe Checkout** — payments (demo mode when Stripe keys not configured)
- **Uploadthing** — image uploads (optional)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Database

Local development uses **SQLite** (`prisma/dev.db`) — no Docker required.

For production, switch the Prisma datasource to PostgreSQL and set `DATABASE_URL` to your [Neon](https://neon.tech) connection string.

### 3. Set up environment

Copy `.env.example` to `.env` and update values as needed. The default `.env` works with local Docker Postgres.

### 4. Run migrations and seed

```bash
npm run db:migrate
npm run db:seed
```

### 5. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Accounts

| Role     | Email                    | Password     |
|----------|--------------------------|--------------|
| Admin    | admin@pawfectpets.com    | admin123     |
| Customer | customer@example.com     | customer123  |

## Features

- **Shop** — product catalog with search, filters, cart, and checkout
- **Services** — grooming and care services with appointment booking
- **Account** — order history and appointment management
- **Admin** — manage products, services, orders, bookings, and contact messages
- **Contact** — contact form with admin inbox

## Stripe

Without real Stripe keys, checkout runs in **demo mode** — orders are marked paid without redirecting to Stripe. Add your test keys to `.env` for full Stripe Checkout.

## Deployment

1. Create a [Neon](https://neon.tech) PostgreSQL database
2. Set environment variables on [Vercel](https://vercel.com)
3. Deploy: `vercel --prod`
4. Configure Stripe webhook: `POST /api/webhooks/stripe`

## Scripts

| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed sample data         |
| `npm run db:studio` | Open Prisma Studio     |
