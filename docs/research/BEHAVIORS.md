# mauvevn.com — Behaviors & Topology (extracted 2026-10-02)

## Page topology (top → bottom)
1. Header (static in flow): `.header-top` (instagram line) + `.header-bottom` (logo / nav / icons)
2. Hero slider `#slider` — 3 slides, fade, autoplay 4000ms, speed 1000ms, infinite. Hidden ≤767px.
3. 3-banner row — 3 × 33.2333% images (≥992). <992: slide carousel (autoplay 4s, speed 1s, dots).
4. "Bộ sưu tập mới - Mộng đời thường" product carousel — 10 cards, 4.1 / 3 / 2.2 visible, non-infinite, arrows on hover. ≤767: native horizontal scroll, card 45%.
5. "MAUVE LADIES" — 5 lookbook images, 5 / 3(≤1024) / 2.2(≤991). ≤767: horizontal scroll 45%.
6. Footer — 4-column grid (≥992); ≤991 accordion columns, info centered.
7. Overlays: cart sidebar (right, 36vw, max 100%), account dropdown, search bar, mobile menu (left, 80%).

## Global tokens
- body bg `#FDFDFA`, text `#212529`, links `#333`, accent `#8D5868` (dots, cart CTA, count `#8D5668`), login button `#965468`, hot "Mới" `#B71C1C`, divider `#ccc` 0.5px
- Fonts: brand "MauveSansSerif" light (body) + regular (`-re`, nav/titles). Body 14px/21px.

## Header
- Scroll > 400px → `.header-bottom` becomes `position: fixed; top:0; width:100%; padding:10px 0 5px` (header collapses, no animation). ≤400 → back to relative.
- Nav item hover: `border-bottom:1px solid #333; padding-bottom:1px` (instant).
- Megamenu (items with children): hover li → full-width panel (bg #FDFDFA, margin-top 10px, padding 15px 15px 15px 146px), items 14px light, 7px apart, hover underline. Instant show/hide (display toggle).
- Search icon click → toggles 404×40 input bar left of icons (padding-left 40, border-bottom .5px #ccc, 13px, magnifier button inside left).
- Account icon click → toggles dropdown 400px (border #dfe3e8, shadow 0 1px 5px 2px rgba(0,0,0,.1)); opacity .4s cubic-bezier(0,1,.4,1), transform .4s cubic-bezier(.18,1.25,.4,1). Floating labels. "Forgot password" swaps to recover panel. X closes.
- Cart icon click → cart sidebar slides from right (transform .5s, opacity), overlay rgba(0,0,0,.6); overlay / X closes. "Ghi chú" opens note panel sliding up from bottom (.4s).
- ≤992: nav hidden, hamburger (left) toggles mobile menu: fixed below header, width 80%, `transform .5s cubic-bezier(.77,.2,.05,1)`; hamburger → X. Sub-menus slideToggle 400ms, chevron rotates 180°. Transparent overlay closes. Body scroll locked.
- 768–1024: `.header-top` hidden. ≤767: account icon hidden, icon gap 7px.

## Product card
- Hover image area → 2nd image fades in (opacity .3s ease).
- Hover swatch → main image swaps to that color's image.
- Name 13px/20px weight 300 single line, price 14px weight 300.

## Footer
- Link hover: border-bottom 1px #333.
- ≤991: column titles get chevron; click toggles content (slide), chevron rotates 180° (.2s linear).
