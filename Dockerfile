# Build stage
FROM node:22.13.1-bookworm-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 \
    libnss3 libxss1 libasound2 libxtst6 xauth xvfb perl gnutls-bin \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .

ARG NODE_ENV
ARG NODE_CONFIG_ENV
RUN npm run build

# Production stage
FROM node:22.13.1-bookworm-slim

WORKDIR /opt/app

# Update packages to fix security vulnerabilities
RUN apt-get update && apt-get upgrade -y \
    libc-bin libc6 libgnutls30 liblzma5 perl-base \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -r app -g 10001 && \
    useradd -r -u 10001 -g app -m -d /home/appuser appuser

# Copy built application and all dependencies (including dev deps for docker-compose.dev)
COPY --from=builder --chown=appuser:app /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:app /app/dist ./dist
COPY --from=builder --chown=appuser:app /app/package*.json ./
COPY --from=builder --chown=appuser:app /app/test ./test

# Create directories
RUN mkdir -p tmp logs output /app/output /home/appuser/.cache && \
    chown -R appuser:app /opt/app /home/appuser /app

USER appuser

CMD ["npm", "start"]
