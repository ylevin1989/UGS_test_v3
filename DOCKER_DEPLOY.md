# Docker Configuration for UGC Agency

This configuration allows you to run the app as a Docker container alongside your existing projects.

## 1. Local Filesystem Persistency (IMPORTANT)
Since you use an admin panel that writes to `data/content.json`, we MUST mount this file as a volume to prevent data loss on container restarts/updates.

## 2. Dockerfile
Create a file named `Dockerfile` in the project root:

```dockerfile
# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --uid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/data ./data

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

## 3. docker-compose.yml
Create a `docker-compose.yml` to manage the container and volumes:

```yaml
services:
  ugc-agency:
    build: .
    container_name: ugs-agency
    restart: always
    ports:
      - "3005:3000" # Change 3005 to any free port on your VPS
    volumes:
      - ./data:/app/data # Persist admin panel changes
    environment:
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}
```

## 4. Next.js Config Update
To use Docker efficiently, we need to enable `standalone` output in `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker
};

export default nextConfig;
```

## 5. Deployment Steps
1. Push changes to Git.
2. On VPS: `git pull`.
3. Create `.env` file in the same folder with your Telegram credentials.
4. Run: `docker compose up -d --build`.
5. Update your existing **Nginx Proxy Manager** or **Traefik** (or manual Nginx) to point your domain `ugs.uno-ai.pw` to `http://localhost:3005`.
