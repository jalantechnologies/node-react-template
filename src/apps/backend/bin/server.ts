#!/usr/bin/env node
/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';

import App from '../app';

const secretsDir = process.env.SECRETS_DIR || '/opt/app/secrets';

fs.readdirSync(secretsDir).forEach((file) => {
  if (file.startsWith('.')) return;

  const fullPath = path.join(secretsDir, file);
  if (!fs.statSync(fullPath).isFile()) return;

  process.env[file] = fs.readFileSync(fullPath, 'utf8').trim();
});

App.startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
