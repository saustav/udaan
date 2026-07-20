#!/usr/bin/env python3
"""Recompress site WebP assets and optimize social preview JPEG."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
CWEBP = "/opt/homebrew/bin/cwebp"
WEBPINFO = "/opt/homebrew/bin/webpinfo"

HERO_QUALITY = 70
CARD_QUALITY = 68
DEFAULT_QUALITY = 72
MAX_CARD_WIDTH = 960
MAX_HERO_WIDTH = 1280


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL)


def human_size(num: int) -> str:
    if num < 1024:
        return f"{num}B"
    if num < 1024 * 1024:
        return f"{num / 1024:.1f}KB"
    return f"{num / (1024 * 1024):.1f}MB"


def read_dimensions(path: Path) -> tuple[int, int]:
    result = subprocess.run(
        [WEBPINFO, str(path)],
        capture_output=True,
        text=True,
        check=True,
    )
    width = height = 0
    for line in result.stdout.splitlines():
        stripped = line.strip()
        if stripped.startswith("Width:"):
            width = int(stripped.split(":", 1)[1].strip())
        elif stripped.startswith("Height:"):
            height = int(stripped.split(":", 1)[1].strip())
    if not width or not height:
        raise ValueError(f"Could not read dimensions for {path}")
    return width, height


def quality_for(path: Path) -> int:
    rel = path.relative_to(ASSETS).as_posix()
    if rel.startswith("images/hero-"):
        return HERO_QUALITY
    if rel.startswith(("events/", "news/", "images/")):
        return CARD_QUALITY
    return DEFAULT_QUALITY


def max_width_for(path: Path, width: int) -> int | None:
    rel = path.relative_to(ASSETS).as_posix()
    if rel.startswith("images/hero-"):
        return MAX_HERO_WIDTH if width > MAX_HERO_WIDTH else None
    if width > MAX_CARD_WIDTH:
        return MAX_CARD_WIDTH
    return None


def recompress_webp(source: Path) -> tuple[int, int]:
    width, _height = read_dimensions(source)
    quality = quality_for(source)
    resize_to = max_width_for(source, width)

    tmp = source.with_suffix(".opt.webp")
    args = [CWEBP, "-quiet", "-m", "6", "-q", str(quality)]
    if resize_to:
        args.extend(["-resize", str(resize_to), "0"])
    args.extend([str(source), "-o", str(tmp)])

    before = source.stat().st_size
    run(args)
    after = tmp.stat().st_size

    if after < before:
        tmp.replace(source)
        return before, after

    tmp.unlink(missing_ok=True)
    return before, before


def recompress_jpeg(source: Path, quality: int = 80) -> None:
    tmp = source.with_suffix(".tmp.jpg")
    run(
        [
            "sips",
            "-s",
            "format",
            "jpeg",
            "-s",
            "formatOptions",
            str(quality),
            str(source),
            "--out",
            str(tmp),
        ]
    )
    tmp.replace(source)


def main() -> int:
    for tool in (CWEBP, WEBPINFO):
        if not Path(tool).exists():
            print(f"{tool} not found. Install with: brew install webp", file=sys.stderr)
            return 1

    webps = sorted(ASSETS.rglob("*.webp"))
    if not webps:
        print("No WebP files found under assets/", file=sys.stderr)
        return 1

    before_total = 0
    after_total = 0
    saved = 0

    for source in webps:
        before, after = recompress_webp(source)
        before_total += before
        after_total += after
        if after < before:
            saved += before - after
            print(
                f"{source.relative_to(ROOT)} "
                f"({human_size(before)} -> {human_size(after)}, "
                f"-{human_size(before - after)})"
            )

    og_image = ASSETS / "og-image.jpg"
    if og_image.exists():
        old = og_image.stat().st_size
        recompress_jpeg(og_image, quality=80)
        new = og_image.stat().st_size
        print(f"Recompressed {og_image.relative_to(ROOT)} ({human_size(old)} -> {human_size(new)})")

    print(
        f"\nWebP total: {human_size(before_total)} -> {human_size(after_total)} "
        f"(saved {human_size(saved)})"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
