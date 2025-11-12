#!/usr/bin/env bash
set -euo pipefail

SECRET_DIR="${SECRET_DIR:-/opt/app/secrets}"

if [ -d "${SECRET_DIR}" ]; then
  for secret_path in "${SECRET_DIR}"/*; do
    [ -f "${secret_path}" ] || continue
    key="$(basename "${secret_path}")"
    value="$(cat "${secret_path}")"
    export "${key}"="${value}"
  done
fi

exec "$@"

