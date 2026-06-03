#!/usr/bin/env python3
"""Crop a portrait photo for UDAAN board member cards.

Usage:
  python3 scripts/crop-board-photo.py path/to/photo.jpg saustav-bhattarai
  python3 scripts/crop-board-photo.py path/to/photo.jpg prabin-bhattarai --size 512

Output: assets/board/<slug>.png (512×512 square, watermark strip removed)

Then add to js/board.js and data/board.json:
  photo: "assets/board/<slug>.png"
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip install Pillow")


DEFAULT_SIZE = 512
ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "assets" / "board"


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def find_content_bottom(img: Image.Image) -> int:
    """Trim phone camera watermark banners from the bottom."""
    width, height = img.size
    scan_start = max(0, height - 220)

    for y in range(height - 1, scan_start, -1):
        samples = [img.getpixel((x, y)) for x in range(0, width, max(1, width // 40))]
        average = sum(sum(channel) for channel in samples) / (3 * len(samples))
        if average < 235:
            return min(y + 10, height)

    return height


def crop_board_photo(input_path: Path, output_path: Path, size: int) -> None:
    img = Image.open(input_path).convert("RGB")
    width, height = img.size
    content_bottom = find_content_bottom(img)
    img = img.crop((0, 0, width, content_bottom))

    width, height = img.size
    side = min(width, height)
    left = (width - side) // 2
    top = max(0, int((height - side) * 0.12))
    if top + side > height:
        top = max(0, height - side)

    img = img.crop((left, top, left + side, top + side))
    img = img.resize((size, size), Image.Resampling.LANCZOS)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(output_path, "PNG", optimize=True)
    print(f"Saved {output_path} ({size}x{size})")


def main() -> None:
    parser = argparse.ArgumentParser(description="Crop board member photos for UDAAN.")
    parser.add_argument("input", type=Path, help="Source photo path")
    parser.add_argument("slug", help="Output filename slug, e.g. saustav-bhattarai")
    parser.add_argument("--size", type=int, default=DEFAULT_SIZE, help="Output square size in px")
    args = parser.parse_args()

    if not args.input.exists():
        sys.exit(f"Input not found: {args.input}")

    slug = slugify(args.slug)
    output_path = OUTPUT_DIR / f"{slug}.png"
    crop_board_photo(args.input, output_path, args.size)


if __name__ == "__main__":
    main()
