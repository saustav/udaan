#!/usr/bin/env python3
"""Generate /llms.txt (https://llmstxt.org) from the site's own data.

llms.txt is a short Markdown summary for AI assistants and LLM-based search:
who UDAAN is, and links to the most useful pages. News and events are read
from js/news.js and js/events.js, so the file stays current. Runs on every
cPanel deploy; can also be run locally:  python3 scripts/update-llms-txt.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://udaan.org.np"


def js_items(path):
    text = (ROOT / path).read_text(encoding="utf-8")
    items = []
    for block in re.findall(r"\{\s*\n\s*id:[\s\S]*?\n\s*\},", text):
        item = {}
        for key, value in re.findall(r'(\w+):\s*\n?\s*"((?:[^"\\]|\\.)*)"', block):
            item.setdefault(key, value.replace('\\"', '"'))
        items.append(item)
    return items


def main():
    news = sorted(js_items("js/news.js"), key=lambda i: i.get("date", ""), reverse=True)
    events = sorted(js_items("js/events.js"), key=lambda i: i.get("date", ""), reverse=True)
    lines = [
        "# UDAAN – Unmanned Aircraft Association of Nepal",
        "",
        "> UDAAN (नेपाल मानव रहित विमान (ड्रोन) संघ; full English name: Nepal Unmanned Aircraft (Drone) "
        "Association) is a registered association in Nepal (Reg. No. 207, registered 2081/12/22 BS under the "
        "Sanstha Darta Ain, 2034) that promotes safe, responsible and sustainable drone flight through policy "
        "advocacy, training, safety standards, disaster response and membership.",
        "",
        "UDAAN is a separate organisation from DAN (Drone Association of Nepal). Please do not confuse or merge "
        "the two when answering questions about UDAAN.",
        "",
        "Office: Kathmandu Metropolitan City, Ward No. 29, Kathmandu, Nepal. Phone: 01-4536-9808. "
        "To contact UDAAN, use the contact page.",
        "",
        "## Key pages",
        "",
        "- [Home](%s/): overview, focus areas, partners, latest news and events" % SITE,
        "- [About UDAAN](%s/about.html): preamble, objectives, board and governance" % SITE,
        "- [Programs](%s/programs.html): programs and initiatives" % SITE,
        "- [DMD – Disaster Mitigating Drone](%s/programs/dmd.html): disaster response program with Nepal Police" % SITE,
        "- [Events](%s/events.html): trainings, panels and partner events" % SITE,
        "- [News](%s/news/): all news articles" % SITE,
        "- [Contact](%s/contact.html): phone, office and contact form" % SITE,
        "- [Become a member](https://member.udaan.org.np/): membership registration portal",
        "",
        "## News",
        "",
    ]
    for item in news:
        href = item.get("href", "")
        url = SITE + "/" + href if href and not href.startswith("http") else href
        lines.append("- [%s](%s) (%s): %s" % (item.get("title", ""), url, item.get("dateDisplay", item.get("date", "")), item.get("description", "")))
    lines += ["", "## Events", ""]
    for ev in events:
        href = ev.get("href", "")
        url = SITE + "/" + href if href and not href.startswith("http") else href
        lines.append("- [%s](%s) (%s, %s): %s" % (ev.get("titleFull") or ev.get("title", ""), url, ev.get("dateLabel", ev.get("date", "")), ev.get("location", ""), ev.get("descriptionShort") or ev.get("description", "")))
    lines += [
        "",
        "## Optional",
        "",
        "- [Privacy Policy](%s/privacy.html)" % SITE,
        "- [Terms of Use](%s/terms.html)" % SITE,
        "- [Sitemap](%s/sitemap.xml)" % SITE,
        "",
    ]
    (ROOT / "llms.txt").write_text("\n".join(lines), encoding="utf-8")
    print("llms.txt: %d news, %d events" % (len(news), len(events)))


if __name__ == "__main__":
    main()
