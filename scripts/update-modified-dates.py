#!/usr/bin/env python3
"""Write each page's last-modified date (from git history) into the page.

- <meta property="og:updated_time"> on every page (read by the footer's
  "Page last updated" line in js/footer.js)
- <meta property="article:modified_time"> on article pages
- "dateModified" in any JSON-LD block that has "datePublished"

Runs in the deploy workflow (needs full git history: fetch-depth 0).
Run it after scripts/update-social-meta.py, which rewrites the JSON-LD.
"""
import datetime
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = ("dist/", "node_modules/", "design-system/", ".git/")
SKIP_FILES = {"404.html"}


def last_modified(rel):
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", rel],
            cwd=ROOT, capture_output=True, text=True, check=True,
        ).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        out = ""
    return out or datetime.date.today().isoformat()


def set_meta(s, prop, value):
    tag = '<meta property="%s" content="%s"/>' % (prop, value)
    pattern = r'<meta property="%s" content="[^"]*"\s*/?>' % re.escape(prop)
    if re.search(pattern, s):
        return re.sub(pattern, tag, s, count=1)
    return s.replace("</head>", tag + "\n</head>", 1)


def set_ld_modified(s, value):
    def fix(m):
        try:
            data = json.loads(m.group(2))
        except ValueError:
            return m.group(0)
        if not isinstance(data, dict) or "datePublished" not in data:
            return m.group(0)
        published = str(data["datePublished"])[:10]
        data["dateModified"] = max(value, published)
        return '<script type="application/ld+json"%s>\n%s\n</script>' % (m.group(1), json.dumps(data, ensure_ascii=False, indent=2))

    return re.sub(r'<script type="application/ld\+json"([^>]*)>\s*(.*?)\s*</script>', fix, s, flags=re.S)


def main():
    changed = 0
    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT).as_posix()
        if rel.startswith(SKIP_DIRS) or rel in SKIP_FILES:
            continue
        date = last_modified(rel)
        s = path.read_text(encoding="utf-8")
        new = set_meta(s, "og:updated_time", date)
        if 'property="og:type" content="article"' in new:
            new = set_meta(new, "article:modified_time", date)
        new = set_ld_modified(new, date)
        if new != s:
            path.write_text(new, encoding="utf-8")
            changed += 1
        print("%-58s %s" % (rel, date))
    print("updated %d files" % changed)


if __name__ == "__main__":
    main()
