# Pawfect Pets — Pet Shop Website

Full-stack pet shop website with e-commerce, service booking, admin panel, and Razorpay payments (INR).

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** + custom UI components
- **PostgreSQL** + Prisma ORM
- **Auth.js (NextAuth v5)** — credentials auth with customer/admin roles
- **Razorpay** — UPI, cards, netbanking, wallets (INR, optional later)
- **Cash on Delivery (COD)** — active checkout method
- **Uploadthing** — image uploads (optional)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Database

This project uses **PostgreSQL** with Prisma.

**Local development (no Docker):**

```bash
npm run db:dev          # starts local Prisma Postgres, prints DATABASE_URL
npm run db:setup        # migrate + seed
```

Or auto-start and write `.env.local`:

```bash
npm run db:ensure
npm run db:setup
```

**Production (Neon + Vercel):**

1. Accept Neon terms: https://vercel.com/arslaan2/~/integrations/accept-terms/neon
2. Install integration: `vercel integration add neon`
3. Copy the Neon `DATABASE_URL` from the Vercel project env
4. Provision schema + seed:

```bash
./scripts/update-vercel-database.sh "postgresql://..."
vercel --prod
```

The Vercel build runs `prisma migrate deploy` automatically on each deploy.

### 3. Set up environment

Copy `.env.example` to `.env.local` and run `npm run db:ensure` to create a local Postgres URL automatically.

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

## Payments

Checkout uses **Cash on Delivery (COD)** only for now. Customers place orders online and pay when the order is delivered.

Admin order flow for COD:
1. **Pending** — order placed
2. **Shipped** — out for delivery
3. **Delivered** — cash collected (mark **Paid** if you track payment separately)

Razorpay integration is included for later if you want online payments.

## Deployment

1. Create a [Neon](https://neon.tech) PostgreSQL database
2. Set environment variables on [Vercel](https://vercel.com) including Razorpay keys
3. Deploy: `vercel --prod`
4. Configure Razorpay webhook: `https://your-domain.vercel.app/api/webhooks/razorpay`

## Scripts

| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Start development server |
| `npm run build`   | Production build         |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed sample data         |
| `npm run db:studio` | Open Prisma Studio     |
