import { execSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ENV_LOCAL = resolve(process.cwd(), ".env.local");
const SERVER_NAME = "pet-shop";

function readDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (!existsSync(ENV_LOCAL)) return null;

  const match = readFileSync(ENV_LOCAL, "utf8").match(
    /^DATABASE_URL=(["']?)(.+?)\1$/m,
  );
  return match?.[2] ?? null;
}

async function canConnect(url: string) {
  try {
    const { PrismaPg } = await import("@prisma/adapter-pg");
    const { PrismaClient } = await import("../src/generated/prisma/client");
    const adapter = new PrismaPg({ connectionString: url });
    const db = new PrismaClient({ adapter });
    await db.$queryRaw`SELECT 1`;
    await db.$disconnect();
    return true;
  } catch {
    return false;
  }
}

function startPrismaDev() {
  const result = spawnSync(
    "npx",
    ["prisma", "dev", "-d", "-n", SERVER_NAME],
    {
      cwd: process.cwd(),
      encoding: "utf8",
    },
  );

  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim();
  const url = output
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("postgres"));

  if (!url) {
    throw new Error(
      "Could not start local Prisma Postgres. Run `npm run db:dev` manually.",
    );
  }

  return url;
}

function writeEnvLocal(url: string) {
  const lines = existsSync(ENV_LOCAL)
    ? readFileSync(ENV_LOCAL, "utf8").split("\n")
    : [];
  const withoutDb = lines.filter((line) => !line.startsWith("DATABASE_URL="));
  withoutDb.push(`DATABASE_URL="${url}"`);
  writeFileSync(`${withoutDb.filter(Boolean).join("\n")}\n`, ENV_LOCAL);
}

async function main() {
  const existing = readDatabaseUrl();
  if (existing && (await canConnect(existing))) {
    console.log("Local database is ready.");
    return;
  }

  console.log("Starting local Prisma Postgres...");
  const url = startPrismaDev();
  writeEnvLocal(url);
  console.log("Wrote DATABASE_URL to .env.local");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
