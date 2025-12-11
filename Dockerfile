FROM node:22.13.1-bookworm-slim

WORKDIR /app

# Install dependencies for node and cypress, update packages for security
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 \
    libnss3 libxss1 libasound2 libxtst6 xauth xvfb perl gnutls-bin \
    && apt-get upgrade -y libc-bin libc6 libgnutls30 liblzma5 perl-base \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user and group
RUN groupadd -r app -g 10001 && \
    useradd -r -u 10001 -g app -m -d /home/appuser appuser

COPY package.json /.project/package.json
COPY package-lock.json /.project/package-lock.json
RUN cd /.project && npm ci
RUN mkdir -p /opt/app && cp -a /.project/. /opt/app/

WORKDIR /opt/app

RUN npm ci

COPY . /opt/app

# Build arguments
ARG NODE_ENV
ARG NODE_CONFIG_ENV

RUN npm run build

# Create necessary directories and change ownership to appuser
RUN mkdir -p /opt/app/tmp /opt/app/logs /opt/app/output /app/output /home/appuser/.cache && \
    chown -R appuser:app /opt/app /home/appuser /app

# Switch to the non-root user
USER appuser

CMD [ "npm", "start" ]
