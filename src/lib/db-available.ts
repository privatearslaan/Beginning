import { db } from "@/lib/db";

let dbAvailable: boolean | null = null;
let lastCheckedAt = 0;
const CACHE_MS = 30_000;

export async function isDbAvailable(force = false) {
  const now = Date.now();
  if (!force && dbAvailable !== null && now - lastCheckedAt < CACHE_MS) {
    return dbAvailable;
  }

  try {
    await db.$queryRaw`SELECT 1`;
    dbAvailable = true;
  } catch {
    dbAvailable = false;
  }

  lastCheckedAt = now;
  return dbAvailable;
}
