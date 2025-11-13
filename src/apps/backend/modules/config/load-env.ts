import fs from 'fs';
import path from 'path';

export default function loadEnvVars() {
  if (process.env.NODE_CONFIG_ENV === 'testing') {
    return;
  }
  const secretsDir = `${process.env.SECRETS_DIR}`;
  if (!fs.existsSync(secretsDir)) {
    return;
  }
  fs.readdirSync(secretsDir).forEach((file) => {
    if (file.startsWith('.')) return;
    const fullPath = path.join(secretsDir, file);
    if (!fs.statSync(fullPath).isFile()) return;

    process.env[file] = fs.readFileSync(fullPath, 'utf8').trim();
  });
}

loadEnvVars();
