#!/usr/bin/env python3
"""Subset the Material Symbols icon font to the icons the site actually uses.

Scans all HTML pages and js/*.js for Material Symbols icon names, then rewrites
every page's Google Fonts <link> so it requests only those icons
(~10 kB instead of ~1.1 MB). Runs automatically on deploy; you can also run it
locally after adding a new icon:  python3 scripts/update-icon-font.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP = {"dist", "node_modules", "design-system", ".git"}
BASE = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"

PATTERNS = [
    re.compile(r'material-symbols-outlined[^>]*>\s*([a-z0-9_]+)\s*<'),  # <span class="material-symbols-outlined ...">name</span>
    re.compile(r'\bicon\s*:\s*"([a-z0-9_]+)"'),                        # JS data: icon: "name"
    re.compile(r'renderSocialIconLink\([^)]*?"([a-z0-9_]+)"\s*,', re.S),  # footer.js helper
]
LINK_RE = re.compile(r'https://fonts\.googleapis\.com/css2\?family=Material\+Symbols\+Outlined[^"\']*')


def site_files():
    for p in ROOT.rglob("*"):
        if p.suffix not in (".html", ".js") or any(part in SKIP for part in p.relative_to(ROOT).parts):
            continue
        if p.suffix == ".js" and (p.parent.name != "js" or p.name == "core.js"):
            continue
        yield p


def main():
    names = set()
    files = list(site_files())
    for f in files:
        text = f.read_text(encoding="utf-8")
        for pat in PATTERNS:
            names.update(pat.findall(text))
    if not names:
        sys.exit("No icons found - refusing to rewrite font links")
    url = BASE + "&icon_names=" + ",".join(sorted(names)) + "&display=block"
    changed = 0
    for f in files:
        if f.suffix != ".html":
            continue
        text = f.read_text(encoding="utf-8")
        new = LINK_RE.sub(url, text)
        if new != text:
            f.write_text(new, encoding="utf-8")
            changed += 1
    print(f"{len(names)} icons; updated {changed} HTML files")


if __name__ == "__main__":
    main()
