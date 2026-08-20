#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: ./scripts/update-vercel-database.sh \"postgresql://...\""
  exit 1
fi

DATABASE_URL="$1"

if [[ "$DATABASE_URL" != postgresql://* && "$DATABASE_URL" != postgres://* ]]; then
  echo "Expected a PostgreSQL connection string."
  exit 1
fi

echo "Updating Vercel production DATABASE_URL..."
printf '%s' "$DATABASE_URL" | vercel env rm DATABASE_URL production --yes >/dev/null 2>&1 || true
printf '%s' "$DATABASE_URL" | vercel env add DATABASE_URL production

echo "Running migrations and seed against the new database..."
DATABASE_URL="$DATABASE_URL" npm run db:setup:remote

echo "Done. Redeploy with: vercel --prod"
