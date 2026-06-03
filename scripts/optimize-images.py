#!/usr/bin/env python3
"""Convert site raster assets to WebP and recompress social preview JPEG."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
CWEBP = "/opt/homebrew/bin/cwebp"

PHOTO_QUALITY = 82
PNG_QUALITY = 85
MAX_HERO_WIDTH = 1920


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL)


def convert_to_webp(source: Path) -> Path:
    target = source.with_suffix(".webp")
    args = [CWEBP, "-quiet", "-m", "6"]

    if source.suffix.lower() == ".png":
        args.extend(["-q", str(PNG_QUALITY), "-alpha_q", "100"])
    else:
        args.extend(["-q", str(PHOTO_QUALITY)])
        if source.name == "particle-hero-background.jpg":
            args.extend(["-resize", str(MAX_HERO_WIDTH), "0"])

    args.extend([str(source), "-o", str(target)])
    run(args)
    return target


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


def human_size(num: int) -> str:
    for unit in ("B", "KB", "MB"):
        if num < 1024 or unit == "MB":
            return f"{num / (1024 if unit != 'B' else 1):.1f}{unit}" if unit != "B" else f"{num}B"
        num /= 1024
    return f"{num:.1f}MB"


def main() -> int:
    if not Path(CWEBP).exists():
        print("cwebp not found. Install with: brew install webp", file=sys.stderr)
        return 1

    sources = sorted(ASSETS.rglob("*"))
    sources = [p for p in sources if p.suffix.lower() in {".jpg", ".jpeg", ".png"}]

    before = 0
    after = 0

    for source in sources:
        before += source.stat().st_size
        target = convert_to_webp(source)
        after += target.stat().st_size
        print(
            f"{source.relative_to(ROOT)} -> {target.relative_to(ROOT)} "
            f"({human_size(source.stat().st_size)} -> {human_size(target.stat().st_size)})"
        )

    og_image = ASSETS / "og-image.jpg"
    if og_image.exists():
        old = og_image.stat().st_size
        recompress_jpeg(og_image, quality=80)
        new = og_image.stat().st_size
        print(f"Recompressed {og_image.relative_to(ROOT)} ({human_size(old)} -> {human_size(new)})")

    print(f"\nTotal WebP output: {human_size(before)} source -> {human_size(after)} webp")
    return 0


if __name__ == "__main__":
    sys.exit(main())
