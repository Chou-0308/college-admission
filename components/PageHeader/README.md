# PageHeader
The top of every page: an eyebrow kicker, the page title and a muted lede, inside the 760px reading column.

Static rendition, hand-written from `index.html` / `media/index.html`.

**Markup:** `<header class="read">` → `p.eyebrow` → `h1` → `p.lede` (max 62ch). Sections below it use `h2` + `p.sec-sub`.

**Consumer provides:** the eyebrow (source or category, joined with ` · `), the title, a one- to three-sentence lede.

- Do keep the eyebrow short and factual (자료 출처 · 범위).
- Do put `<b>` highlights inside the lede only for the one number that matters.
- Don't add a second h1 or decorative imagery; the header is type only.
