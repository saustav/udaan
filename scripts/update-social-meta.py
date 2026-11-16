#!/usr/bin/env python3
"""Social preview images + Google structured data for article, event and program pages.

For every page in news/, events/ and programs/:
  1. Builds a 1200x630 JPEG social card (assets/social/<page>.jpg) from the
     page's main photo, and points og:image / twitter:image at it with an
     absolute URL (Facebook and LinkedIn ignore relative image URLs).
  2. Writes JSON-LD structured data: NewsArticle for news/, Event for events/
     (dates, places and descriptions come from js/news.js and js/events.js).
Top-level pages keep the site-wide og-image.jpg, made absolute.

Run after adding or changing an article or event:
    python3 scripts/update-social-meta.py
Needs Pillow (pip install pillow). Safe to run repeatedly.
"""
import html
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://udaan.org.np"
SOCIAL_DIR = ROOT / "assets" / "social"
CARD_W, CARD_H = 1200, 630
ORG_NAME = "Nepal Unmanned Aircraft (Drone) Association — UDAAN"
ORG = {
    "@type": "Organization",
    "name": ORG_NAME,
    "alternateName": "UDAAN",
    "url": SITE + "/",
    "logo": {"@type": "ImageObject", "url": SITE + "/assets/apple-touch-icon.png", "width": 180, "height": 180},
}

# Pages whose hero is a stock photo or a slideshow: use a more representative
# image. focus = vertical position (0 top .. 1 bottom) kept when cropping.
OVERRIDES = {
    "news/drone-film-festival-2026.html": ("assets/news/drone-film-festival-2026-thanks.webp", 0.55),
    "news/farewell-dinesh-dc-film-development-board.html": ("assets/news/dinesh-dc-farewell-udaan.webp", 0.45),
    "news/udaan-meets-kmc-acting-mayor.html": ("assets/news/udaan-kmc-acting-mayor-2.webp", 0.4),
    "news/udaan-meets-minister-gupta.html": ("assets/images/udaan-meets-minister-gupta.webp", 0.2),
}
# Organiser for events UDAAN did not host itself (default: UDAAN).
EVENT_ORGANIZER = {
    "fdb-drone-training-2026": {"@type": "Organization", "name": "Film Development Board, Nepal"},
}


def js_items(path):
    """Parse the simple object literals in js/news.js or js/events.js."""
    text = (ROOT / path).read_text(encoding="utf-8")
    items = []
    for block in re.findall(r"\{\s*\n\s*id:[\s\S]*?\n\s*\},", text):
        item = {}
        for key, value in re.findall(r'(\w+):\s*\n?\s*"((?:[^"\\]|\\.)*)"', block):
            item.setdefault(key, value.replace('\\"', '"'))
        items.append(item)
    return items


def social_card(page, src, focus):
    out = SOCIAL_DIR / (page.replace("/", "-").replace(".html", ".jpg"))
    im = Image.open(ROOT / src).convert("RGB")
    target = CARD_W / CARD_H
    w, h = im.size
    if w / h > target:  # too wide: crop sides
        nw = round(h * target)
        left = (w - nw) // 2
        im = im.crop((left, 0, left + nw, h))
    else:  # too tall: crop top/bottom around the focus point
        nh = round(w / target)
        top = min(max(round(h * focus - nh / 2), 0), h - nh)
        im = im.crop((0, top, w, top + nh))
    im = im.resize((CARD_W, CARD_H), Image.LANCZOS)
    SOCIAL_DIR.mkdir(parents=True, exist_ok=True)
    im.save(out, "JPEG", quality=82, optimize=True, progressive=True)
    return out.relative_to(ROOT).as_posix()


def meta(s, attr, name):
    m = re.search(r'<meta %s="%s" content="([^"]*)"' % (attr, re.escape(name)), s)
    return html.unescape(m.group(1)) if m else ""


def set_image_meta(s, url, alt):
    s = re.sub(r'\n<meta property="og:image:(width|height|alt)" content="[^"]*"/>', "", s)
    s = re.sub(r'\n<meta name="twitter:image:alt" content="[^"]*"/>', "", s)
    s = re.sub(r'(<meta property="og:image" content=")[^"]*("/>)', r"\g<1>" + url + r"\2", s)
    s = re.sub(r'(<meta name="twitter:image" content=")[^"]*("/>)', r"\g<1>" + url + r"\2", s)
    alt = html.escape(alt, quote=True)
    extra = (
        '\n<meta property="og:image:width" content="%d"/>' % CARD_W
        + '\n<meta property="og:image:height" content="%d"/>' % CARD_H
        + '\n<meta property="og:image:alt" content="%s"/>' % alt
    )
    s = re.sub(r'(<meta property="og:image" content="[^"]*"/>)', lambda m: m.group(1) + extra, s, count=1)
    s = re.sub(
        r'(<meta name="twitter:image" content="[^"]*"/>)',
        lambda m: m.group(1) + '\n<meta name="twitter:image:alt" content="%s"/>' % alt,
        s,
        count=1,
    )
    return s


def set_jsonld(s, data):
    s = re.sub(r'\n?<script type="application/ld\+json" id="udaan-structured-data">[\s\S]*?</script>', "", s)
    if data is None:
        return s
    block = (
        '\n<script type="application/ld+json" id="udaan-structured-data">\n'
        + json.dumps(data, ensure_ascii=False, indent=2).replace("</", "<\\/")
        + "\n</script>"
    )
    return s.replace("\n</head>", block + "\n</head>", 1)


def main():
    news = js_items("js/news.js")
    events = {e["id"]: e for e in js_items("js/events.js")}
    news_by_page = {}
    for item in news:
        news_by_page.setdefault(item.get("href", ""), item)
        news_by_page.setdefault("news/%s.html" % item.get("id", ""), item)

    pages = sorted(
        p.relative_to(ROOT).as_posix()
        for d in ("news", "events", "programs")
        for p in (ROOT / d).glob("*.html")
        if p.name != "index.html"
    )
    report = []
    for page in pages:
        path = ROOT / page
        s = path.read_text(encoding="utf-8")
        hero = re.search(r'<img[^>]*src="([^"]+)"[^>]*fetchpriority="high"', s) or re.search(
            r'<img[^>]*fetchpriority="high"[^>]*src="([^"]+)"', s
        )
        src, focus = OVERRIDES.get(page, (hero.group(1) if hero else "assets/og-image.jpg", 0.5))
        card = social_card(page, src, focus)
        url = SITE + "/" + card
        title = re.sub(r"\s*\|\s*UDAAN\s*$", "", html.unescape(re.search(r"<title>(.*?)</title>", s).group(1))).strip()
        desc = meta(s, "name", "description")
        canonical = SITE + "/" + page
        s = set_image_meta(s, url, title)

        data = None
        if page.startswith("news/"):
            item = news_by_page.get(page)
            if page.startswith("news/") and s.count('property="og:type" content="website"'):
                s = s.replace('property="og:type" content="website"', 'property="og:type" content="article"')
            data = {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                "headline": title[:110],
                "description": desc,
                "image": [url],
                "author": ORG,
                "publisher": ORG,
                "mainEntityOfPage": {"@type": "WebPage", "@id": canonical},
                "url": canonical,
                "inLanguage": "en",
            }
            if item and item.get("date"):
                data["datePublished"] = item["date"]
        elif page.startswith("events/"):
            ev = events.get(Path(page).stem)
            if ev:
                data = {
                    "@context": "https://schema.org",
                    "@type": "Event",
                    "name": ev.get("titleFull") or ev.get("title"),
                    "description": ev.get("description") or desc,
                    "startDate": ev["date"],
                    "eventStatus": "https://schema.org/EventScheduled",
                    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                    "location": {
                        "@type": "Place",
                        "name": ev.get("location", "Kathmandu, Nepal"),
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": ev.get("location", ""),
                            "addressLocality": "Kathmandu",
                            "addressCountry": "NP",
                        },
                    },
                    "image": [url],
                    "organizer": EVENT_ORGANIZER.get(ev["id"], ORG),
                    "url": canonical,
                }
        s = set_jsonld(s, data)
        path.write_text(s, encoding="utf-8")
        report.append("%-58s %-40s %s" % (page, card.split("/")[-1], data["@type"] if data else "-"))

    # Top-level pages: keep the site-wide image, but as an absolute URL
    for page in sorted(p.name for p in ROOT.glob("*.html")):
        path = ROOT / page
        s = path.read_text(encoding="utf-8")
        new = s.replace('content="assets/og-image.jpg"', 'content="%s/assets/og-image.jpg"' % SITE)
        if new != s:
            path.write_text(new, encoding="utf-8")
            report.append("%-58s %s" % (page, "og-image.jpg (absolute URL)"))
    print("\n".join(report))


if __name__ == "__main__":
    main()
