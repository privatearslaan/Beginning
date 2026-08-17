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
