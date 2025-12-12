# Build stage (Cypress deps for dev/test)
FROM node:22.13.1-bookworm-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 \
    libnss3 libxss1 libasound2 libxtst6 xauth xvfb perl gnutls-bin \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci && npm cache clean --force  # All deps for dev/test
COPY . .
ARG NODE_ENV NODE_CONFIG_ENV
RUN npm run build

# Production stage (minimal)
FROM node:22.13.1-bookworm-slim
WORKDIR /opt/app
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 libxss1 libxtst6 && rm -rf /var/lib/apt/lists/*

RUN groupadd -r app -g 10001 && \
    useradd -r -u 10001 -g app -m appuser && \
    mkdir -p /opt/app/{tmp,logs,output} /app/output /home/appuser/.cache && \
    chown -R appuser:app /opt/app /home/appuser /app

COPY --from=builder --chown=appuser:app /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:app /app/dist ./dist
COPY --from=builder --chown=appuser:app package*.json ./

USER appuser
EXPOSE 8080
CMD ["npm", "start"]

