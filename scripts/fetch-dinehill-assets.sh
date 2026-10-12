#!/usr/bin/env bash
# Downloads the DINEHILL homepage assets exported from Figma
# (file IFCiASF6UXvVlncVhxE5VC, node 29:70) into public/dinehill.
# Figma MCP asset URLs are temporary (about 7 days from 2026-10-12).
set -euo pipefail

DEST="$(cd "$(dirname "$0")/.." && pwd)/public/dinehill"
mkdir -p "$DEST"

A=https://www.figma.com/api/mcp/asset
HERO=$A/717cc7b7-c5ac-453a-9c33-48d21bfcbf06
REST=$A/dcd86b83-5b53-40fa-8658-9e9a87b5bdb2
PROMO=$A/97a7f1ba-1ffd-4a56-81a0-a2a434702977
GIFT=$A/a3648a4f-28cd-4291-9e0d-7cee6d347381
INSTA=$A/14e1dd1f-4bb3-44b8-a32e-30c1502849e1

while read -r name url; do
  [ -z "$name" ] && continue
  echo "→ $name"
  curl -fsSL -o "$DEST/$name" "$url"
done <<LIST
logo.svg $HERO/72174.svg
menu.svg $HERO/af33b.svg
hero.png $HERO/32a88.png
prev.svg $HERO/fc8c0.svg
next.svg $HERO/1bd22.svg
gen-card-bg.png $REST/1793d.png
gen-card.png $REST/66477.png
kan-card-bg.png $REST/cf4b9.png
kan-card.png $REST/025b0.png
gen-card-logo.svg $A/4f6885ed-961d-403f-9103-443b3c8b9895.svg
kan-card-logo.svg $A/f2bb0468-4752-49c1-ae91-3f078b5e8715.svg
promo-1.png $PROMO/bc0b6.png
promo-2.png $PROMO/ca188.png
promo-3.png $PROMO/d6590.png
promo-4.png $PROMO/9cc0b.png
giftcard-1.png $GIFT/e0880.png
giftcard-2.png $GIFT/5a70e.png
insta-1.png $INSTA/b6366.png
insta-2.png $INSTA/75e26.png
insta-3.png $INSTA/e5dfd.png
insta-4.png $INSTA/2dd1e.png
insta-5.png $INSTA/10108.png
insta-6.png $INSTA/8ede5.png
instagram.svg $INSTA/66e6c.svg
footer-logo.svg $A/847b54d3-bcf1-4b0d-a665-fdacb15f57df.svg
LIST

echo "Done → $DEST"
