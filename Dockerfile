FROM node:22.13.1-bookworm-slim

WORKDIR /app

# install dependencies for node and cypress
RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb perl gnutls-bin

COPY package.json /.project/package.json
COPY package-lock.json /.project/package-lock.json
RUN cd /.project && npm ci
RUN mkdir -p /opt/app && cp -a /.project/. /opt/app/

WORKDIR /opt/app

RUN npm ci

COPY . /opt/app

# build arguments
ARG NODE_ENV
ARG NODE_CONFIG_ENV

RUN npm run build

# Create non-root user for security - use consistent UID/GID across environments
RUN groupadd -r -g 10001 app && \
    useradd -r -u 10001 -g 10001 -m appuser

# Create directories and set ownership for non-root user to write files
RUN mkdir -p /opt/app/tmp /opt/app/logs /opt/app/output /home/appuser/.cache /app/output && \
    chown -R appuser:app /opt/app /home/appuser /app/output

USER appuser

CMD [ "npm", "start" ]
