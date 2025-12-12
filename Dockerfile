# Build stage (Cypress deps for dev/test)
FROM node:22.13.1-bookworm-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 \
    libnss3 libxss1 libasound2 libxtst6 xauth xvfb perl gnutls-bin \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci && npm cache clean --force  # All deps for dev/test
COPY . .
ARG NODE_ENV
ARG NODE_CONFIG_ENV
RUN npm run build

# Production dependencies stage
FROM node:22.13.1-bookworm-slim AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Production stage (minimal)
FROM node:22.13.1-bookworm-slim
WORKDIR /app
RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
    libnss3 libxss1 libxtst6 && rm -rf /var/lib/apt/lists/*

RUN groupadd -r app -g 10001 && \
    useradd -r -u 10001 -g app -m appuser && \
    mkdir -p /app/logs /app/dist /home/appuser/.cache && \
    chown -R appuser:app /app /home/appuser

# Copy production dependencies from prod-deps stage
COPY --from=prod-deps --chown=appuser:app /app/node_modules ./node_modules
# Copy build artifacts from builder stage
COPY --from=builder --chown=appuser:app /app/dist ./dist
COPY --from=builder --chown=appuser:app /app/package*.json ./

USER appuser
EXPOSE 8080
CMD ["npm", "start"]

