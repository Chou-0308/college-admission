# CardLink
A tile that links to a 계열 or sub-page, in an auto-filling grid (`.cards`, min 240px per tile).

Static rendition from `index.html` and `media/index.html`.

**Markup:** `a.cardlink` → `h3`, `p` (0.86rem `muted`), optional `span.m` meta line (0.74rem, tabular).

- `paper` fill, `line` border, 3px `accent` top rule; hover turns the border `accent`.
- `.cardlink.soon` (a `div`, not a link): `line` top rule, `soft` fill, `muted` title — for sections in preparation.
- One or two sentences of description; say what's inside and how many.
