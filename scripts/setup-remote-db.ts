import { execSync } from "node:child_process";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is required.");
  console.error("Example:");
  console.error(
    '  DATABASE_URL="postgresql://..." npm run db:setup:remote',
  );
  process.exit(1);
}

if (databaseUrl.startsWith("file:")) {
  console.error("DATABASE_URL must be a PostgreSQL connection string.");
  process.exit(1);
}

function run(command: string) {
  execSync(command, {
    stdio: "inherit",
    env: process.env,
  });
}

console.log("Applying migrations...");
run("npx prisma migrate deploy");

console.log("Seeding database...");
run("npm run db:seed");

console.log("Remote database setup complete.");
