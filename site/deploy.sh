#!/usr/bin/env bash
#
# Build the site and push the static output to the VPS.
#
# Prereqs:
#   - SSH key auth already set up to the server (ssh <SSH_TARGET> should just work)
#   - rsync installed locally and on the server
#
# Fill in the two placeholders below (pending the VPS OS reinstall), then run:
#   ./deploy.sh
#
set -euo pipefail

# ---- CONFIG (edit these) ---------------------------------------------------
SSH_TARGET="podman@alastorcurns.com"          # e.g. alastor@1.2.3.4  or an ~/.ssh/config alias (set after VPS reinstall)
WEBROOT="~/www/"      # nginx root for this site (must exist on server)
# ---------------------------------------------------------------------------

cd "$(dirname "$0")"

echo "▶ Building…"
npm run build   # runs prebuild (sync:resume) then astro build → ./dist

echo "▶ Deploying dist/ → ${SSH_TARGET}:${WEBROOT}"
# --delete prunes files on the server that no longer exist locally.
# Trailing slash on dist/ copies the *contents*, not the directory itself.
rsync -avz -e 'ssh -p 5022' --delete \
  --human-readable \
  dist/ "${SSH_TARGET}:${WEBROOT}/"

echo "✓ Done."
