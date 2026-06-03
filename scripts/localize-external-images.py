#!/usr/bin/env python3
"""Download external image URLs and rewrite references to local asset paths."""

from __future__ import annotations

import hashlib
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" / "images"

# Stable local filenames for known Google-hosted placeholder images.
URL_TO_FILENAME = {
    "AB6AXuD88TpI4Ow06uxdF0FRygcsEA-KllzZduYWvFnTeF-eoKpNeyezJql3rp3pZr4HzjU50D1rmiOC0ZOh5t53WPtNe2Fd4X2wTHFzdLumtjpR0z2H92gLhsABn-D0PZqvpjAbXu9OaIGEZonNVUT63TjD8Qovaj23h0O3fRHJ_xCCQow9cEWMqK81zMSKzSOmOi33fFGtna-qyhDkNNror4NCOJq_N7mduzXlvSVowYbXuSCK9blUjop2ahehGIQvhiea2ISXqyg0El0": "hero-drone-himalayas-sunrise.jpg",
    "AB6AXuD-4fQPzteKvCzHrjYiTPxCNTPj_2hEULYY5Xei6Mm5j935PXifQCQd1quau5G-KSAM8rkSEDDclnAa40ljS6EfS4XjBoR6YxdiwY1QHX5TGvpoXFEyDi5ttznoUZ2NJ1dUqXboFUjEjwyMM6CdlzB58RIyUTl7UndBADgVEErierHRwiE6YVLeV9hEhhXP1Qe9AP_Dmbt34ruH_mTEn1pbun70X46H5sYckde9NJCfl8loO6E-5ya7UurXrjctv3nLAr535P2Nzww": "hero-himalayas-dawn-drone.jpg",
    "AB6AXuCbJcrwVtjiLqw1B3JvfpdNsT4EZsLeXTO2npwHoMdpKQg4bHl3WnezrB-W0x7EgmdJvy-SdK4wpiFZTpW2Z69L5jhF5VjDdmrPP1PwgkF9VajOlRxJXb2keHKvz9xKM_CcBLqZWB4AE0nwybRZogJd23W_LVsIcJIkx7siF9wLXEvU6-o8O9kr67eUI1yVnV5u9WQdyNsjCcmIpKhfQ_GounFdVlxRYmFaVes1qlQmFBikRK0KVw6F9rlqHjoDXclAQwjnB1MYYus": "hero-himalayan-peaks-drone.jpg",
    "AB6AXuCr65G0-DMA5db8Pt2iOmnoH8Zv18YEUZomF8BAGXl3ukVxc2lmjOKQSRqgfekhLPDGfNkb8STGGEtv4bSlhx-bve3NzYy4de3aJ-egAiW8O-RcBZylv6j2hCc2eZlyFNMqEDErVNkXhbKrWnnPzblH3EQYthdjeVb9fS6eTA5Genc4myZCSBznOFEYPJO1XClX2dtC-NGlZ8ekUm7LGzAn4PLTB0htBg9Jahvt5tjBeqN7DkIyDv3EAAo3WvIf5YLkaZDrmj2Y_ac": "disaster-response-drone.jpg",
    "AB6AXuDFsWkUHgtC_l5N9lnivYR2zLmnlqZRax5IsUTIeyfg3DH27iTsP5nVfgihg48mktpGtF64F8IHg9Nvzx2XYp5mUix591qpvraNBVqJF2PtwpqF8i3dKLWAoBnnyySyL664YeZ1yrpT_FPSVgtToJc5X7Ubl055f82U3dA2lU6KzytVpy-La6A2NHMOXa_RwBN_Oms5XDJ_3SWAA0NLH1_4MELsWz308R30ohft4pcVvkmQ9BD7OBRXoa-3vA1w-NiHRJimir5ETYY": "government-industry-meeting.jpg",
    "AB6AXuCbWtTE2NpSEewKuxwowSj_yoh9jJE1Ehc1yMJ8YlYFqpXyCSApixTYqr2LvuyPm4JwOz-NGmHovVrBwEe51DamkapoAHtvJiLjtyG6ZXFLJtgkg3i3u-eJAexV0L9VY1l49SeD2TtfflkR7zLiTW9ChPdXdmE5Ijhw5L_n_nuvAfGgM1yoKik3txK4JCb6nRPprvQJrMcANWBShe0e4XHS8QDeQlL46PlwNnq44Z8f0SJzK0m2PLdiLha3Lhzl2MVfO8qo5lFxQG8": "drone-assembly-engineers.jpg",
    "AB6AXuCgOi1OdvMxAC4e0_NwXpKdhAko9qZVCmhUfzLm9OM94kCE-hUGRjKGBMQk7ZEPkfuh2PkcR_b1rZOAKjusM8OVXx1ayJJS91G-hX-a2qOwpiSSjRxxmuQKrSP3oXFrj_meeCXkSFzZKm26C3N6nLOK5EsQyiM-a0jnfifegW6j1_SFRt30JWFYd2KHubgMdEMhcUcidTzqaE6BCMKp7Im3rvOK3lCslyh24qn1iKunJP1tr6Iw64nKEXWqUeAMrnH7j5V1BlV2-1Q": "drone-himalayan-peaks.jpg",
    "AB6AXuAkiCfur7YiSrCVKpar3PtKzEdVX4MjvXsmdy_VExOIKyIzD5CLeZ7dUIfpLO7xezNxuVrEusrbhjf8LxUAzu0wrrs9WngdGToPD6f_TpwuTrGNIpDrK-wexNKTHKoOUX-YQyUjUTXGxEg7OhG5t1XALfrXseSRba4a2VNcOPgm25W3jhbp1IPglnw4QgOFll5gdJklnSpYWRjycRHT7ZRotcMdKzquMsT3aWIaZa0d--vxGaHhNAUGg5bx8K3OCJTIrygOhgmucuM": "udaan-community-gathering.jpg",
    "AB6AXuBqPTEslTJuiWFqKu-NNE71gN4rsZou6549iUMmqDO7FRtWkB33OCtvbltS_2xo45pp1F2NuE6bvOYO8QStusNJkO0utoUfbZZadTwrnHoYyC1gYyGCrrqW2K0kWeiUQdV50jidu8h0vpaYd47VnJjY1lxJrvXOlwRg5geVs-WL5XqahmQjTSxPwN3pO2Ye4AOXwE1Zn2gnaW2vONXn38_mM9E1JwgF_EJj1oVkHhL3sKxr-h8IpB1dWUdM5zynKa1wZ-yJOhSLZhs": "kathmandu-office-map.jpg",
    "AB6AXuBZjzSi1rBDOhXZieHK4lgilVcaHbyFrKwLJVuZPRy2P-aJZT-KP1zB6O3nWHBlOL7USdXMbSn44kBoN0T_Ps2QFfNib-zCTz2UXWml70mqTX7i3XuUQS_IaiT05tILTdxym5-NInAolgyDbNlJzIFAA4O1CM33dvdb3aRXMIw28MYws4DjhhbJjwv7vXgMZZRSqWYifS4N_n9BUxev7AEDfG0ZA4M3Myh-bHtDAlgnPqBI3CjveUpkwCFigAk9xs6Xl4bwhyoSjcM": "air-traffic-control-center.jpg",
    "AB6AXuDil-HokNHP-8P4mHkC4HWErial_-fyJ86kXAhplcltOZkfMPTbVPGJWwZNvZ2sBP3DEQxt0DTwpzsJ605NslH-CX7uvYXhq3baEDNZa7KwXAwc2aVB16whavoCGNyEH8QZULwLyM2SDncE1CsnoojT9lzN3lLfMiTatjbbPOBvLLJPUbHayin9BlYDz5E3rfH9C6OxA57UQdo5wU8tgcWPV71fcDjv15ivNpjVxKkScGmcywEWKS6XiCYYIP0Ef6Rz_ZQMU-RQCs0": "kathmandu-valley-aerial.jpg",
    "AB6AXuAjgYpNWs5K9n3ErXyqp3_2vu8STT4g-QykZNsFAsloSuUaigJogxiuGyhCNTM2xcUXC4yf3GiOMFwRdx4Q5QMeGB26okxzz5kNdOkuwu7QuCqK0rITwCOyl9vn2CzGruYK2zFz64RQyAgsb7JhN-5kDV9LYEx_b4_bp_O5lH60FIv8y9ivrzx-zmrJnJPm_sPbLrxEIJX5aTTCpTxTW7DuFXIf-w0qfGDfPMFKK-HpkayKFbeqhPQM2gI1VGc9WNVYewuedJnjugY": "drone-motor-propeller.jpg",
    "AB6AXuBrDppdS-hXx4i_Gt_FLpnIBsgE_KqryLvIiJv6PoXTOUapvY8JOCBjCvtjj_DquzwmjqBXDVYtTrkeiNqfxVD6AANK7DvHFU5nqK4mya6PvHHa7IuNAki3uu05HVcIur2lcMS5AeNPCBW5NQWtS237XBsJWMN7J23i0vRO4wC6a1buYh9rp1_KgqdZ99gnbgX6DSIykpPmDoqQBn6iPrqT3MHWS_Ox2pdtRSyveC7qpQNs3mdUEvHmWVB1Y24CVHsV47OZBHJymqU": "children-watching-drone.jpg",
    "AB6AXuCrdFEEpF_Q1Fyk4iGW5aan13p7v7bVEN-IHb0PM_6v7yS4525iFY41PTZJwhnLpOfhn0KY-pja9X48HFB7utjdszyoSamiJOdyvE5HMFyxf2LA-crBW7nTBCOJJUN3YV58CS6c8EPvp62RpgGBalDWRAHHCoI--XBhIu2JV9LI6Tei3VFhFjuS5NTvfgHXPi0afQ4QFjId470ipgogGeC_zMsKLr4LwdqNtZ-1sGXU6YbB7jjj8QwgCp09Ai8f2VTXbZEuX7HktYM": "drone-airspace-map.jpg",
}

IMAGE_URL_RE = re.compile(
    r"https?://[^\s\"'<>]+?(?:\.(?:jpg|jpeg|png|gif|webp|svg)|googleusercontent\.com/[^\s\"'<>]+)",
    re.IGNORECASE,
)

SCAN_EXTENSIONS = {".html", ".js", ".css", ".json"}


def local_path_for_url(url: str) -> str:
    for token, filename in URL_TO_FILENAME.items():
        if token in url:
            return f"assets/images/{filename}"

    digest = hashlib.sha1(url.encode("utf-8")).hexdigest()[:12]
    parsed = urlparse(url)
    ext = Path(parsed.path).suffix.lower()
    if ext not in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}:
        ext = ".jpg"
    return f"assets/images/external-{digest}{ext}"


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 0:
        return
    subprocess.run(
        ["curl", "-fsSL", url, "-o", str(dest)],
        check=True,
    )


def collect_urls() -> set[str]:
    urls: set[str] = set()
    for path in ROOT.rglob("*"):
        if path.suffix.lower() not in SCAN_EXTENSIONS:
            continue
        if "node_modules" in path.parts or ".git" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        for match in IMAGE_URL_RE.findall(text):
            if "udaan.org.np" in match:
                continue
            if "googleusercontent.com" in match or re.search(r"\.(jpg|jpeg|png|gif|webp|svg)(?:\?|$)", match, re.I):
                urls.add(match)
    return urls


def rewrite_files(url_map: dict[str, str]) -> int:
    replacements = 0
    for path in ROOT.rglob("*"):
        if path.suffix.lower() not in SCAN_EXTENSIONS:
            continue
        if "node_modules" in path.parts or ".git" in path.parts:
            continue
        original = path.read_text(encoding="utf-8")
        updated = original
        for url, local in url_map.items():
            if url in updated:
                updated = updated.replace(url, local)
                replacements += original.count(url)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
    return replacements


def main() -> int:
    urls = collect_urls()
    if not urls:
        print("No external image URLs found.")
        return 0

    url_map: dict[str, str] = {}
    for url in sorted(urls):
        local = local_path_for_url(url)
        url_map[url] = local
        download(url, ROOT / local)
        print(f"saved {local} <- {url[:72]}...")

    count = rewrite_files(url_map)
    print(f"Updated {count} references across site files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
