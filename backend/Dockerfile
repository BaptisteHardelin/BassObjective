# --- Build stage: install deps (compiles the native better-sqlite3) and build ---
FROM node:20-slim AS builder

# Build tools required to compile better-sqlite3 if no prebuilt binary is available.
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Drop dev dependencies, keep the compiled native module.
RUN npm prune --omit=dev

# --- Runtime stage: minimal image with only what's needed to run ---
FROM node:20-slim AS runner

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Where the SQLite file lives (mount a volume here to persist data).
RUN mkdir -p /app/data
ENV DATABASE_PATH=/app/data/bassObjective.sqlite

EXPOSE 3000
CMD ["node", "dist/main"]
