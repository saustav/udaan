#!/usr/bin/env python3
"""Pre-render JavaScript-built content into the HTML before upload.

The menu, footer, news lists, events and board are built by JavaScript in the
browser. Search engines and AI crawlers often read only the raw HTML, so they
missed all of that. This script opens every page in headless Chromium, takes
the HTML each script produced, and writes it into the matching empty container
in the .html file. The scripts still run for visitors and replace the content
with identical markup, so nothing changes on screen.

Runs in the cPanel deploy workflow on a temporary copy of the repo; the files
in the repository stay hand-editable and are NOT changed by it.
    pip install playwright && python -m playwright install chromium
    python3 scripts/prerender.py
"""
import asyncio
import os
import functools
import http.server
import re
import socketserver
import threading
from pathlib import Path

from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {"dist", "node_modules", "design-system", ".git", "scripts"}
CONTAINERS = [
    "site-nav", "site-footer",
    "home-news-list", "home-events-featured", "home-events-list",
    "news-page-list", "news-count",
    "events-hero-content", "events-grid",
    "board-grid", "contact-share-links",
]


def pages():
    for p in sorted(ROOT.rglob("*.html")):
        rel = p.relative_to(ROOT)
        if not (set(rel.parts) & SKIP_DIRS):
            yield rel.as_posix()


def replace_inner(html, el_id, inner):
    """Replace the inner HTML of the element with id=el_id (matching nested tags)."""
    m = re.search(r'<(\w+)\b[^>]*\bid="%s"[^>]*>' % re.escape(el_id), html)
    if not m:
        return html, False
    tag, start = m.group(1), m.end()
    depth, pos = 1, start
    pattern = re.compile(r"<(/?)%s\b[^>]*>" % tag)
    while depth:
        t = pattern.search(html, pos)
        if not t:
            return html, False
        depth += -1 if t.group(1) else 1
        pos = t.end()
    end = t.start()
    return html[:start] + inner + html[end:], True


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    handler = functools.partial(Quiet, directory=str(ROOT))
    httpd = socketserver.TCPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


async def main():
    httpd = serve()
    port = httpd.server_address[1]
    total = 0
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=os.environ.get("CHROME_PATH") or None)
        page = await browser.new_page(viewport={"width": 1280, "height": 900})
        for rel in pages():
            await page.goto("http://127.0.0.1:%d/%s" % (port, rel), wait_until="load")
            await page.wait_for_timeout(600)
            rendered = await page.evaluate(
                "ids => Object.fromEntries(ids.map(id => { const el = document.getElementById(id);"
                " return [id, el ? el.innerHTML : null]; }))",
                CONTAINERS,
            )
            path = ROOT / rel
            html = path.read_text(encoding="utf-8")
            done = []
            for el_id, inner in rendered.items():
                if inner and inner.strip():
                    html, ok = replace_inner(html, el_id, inner)
                    if ok:
                        done.append(el_id)
            path.write_text(html, encoding="utf-8")
            total += len(done)
            print("%-55s %s" % (rel, ", ".join(done) or "-"))
        await browser.close()
    httpd.shutdown()
    print("pre-rendered %d containers" % total)


if __name__ == "__main__":
    asyncio.run(main())
