#!/bin/bash
# Build a production-ready dist/ folder for manual upload to cPanel public_html.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"

if [[ -f "$ROOT/package.json" ]]; then
  (cd "$ROOT" && npm run build:css)
fi

rm -rf "$DIST"
mkdir -p "$DIST"

copy_item() {
  rsync -a "$1" "$DIST/$(basename "$1")"
}

# Root pages and site metadata
for item in \
  index.html about.html contact.html events.html programs.html \
  robots.txt sitemap.xml; do
  if [[ -e "$ROOT/$item" ]]; then
    cp "$ROOT/$item" "$DIST/"
  fi
done

# Folders needed on the live site
for dir in assets css js data events news programs; do
  if [[ -d "$ROOT/$dir" ]]; then
    rsync -a --exclude '.DS_Store' "$ROOT/$dir" "$DIST/"
  fi
done

FILE_COUNT=$(find "$DIST" -type f | wc -l | tr -d ' ')
SIZE=$(du -sh "$DIST" | awk '{print $1}')

echo "Built dist/ with $FILE_COUNT files ($SIZE)"
echo "Upload everything inside dist/ to cPanel → public_html/"
