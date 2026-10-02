# FilterBar
The sticky filter toolbar above the review list: a search field, select menus, a segmented result toggle, a count and a reset link.

Static rendition of `.tools` in `media/reviews.html` (logic in `media/js/explorer.js`).

**Consumer provides:** options for each select, the segment values, and a count string ("N건 중 M건").

- `.tools` sticks to the top on `bg` with a `line` bottom border; `.tools.static` for an inline, non-sticky version.
- Inputs: 0.9rem, 8px × 10px padding, `line` border, `radius-md`, `paper` fill. Search grows (`flex:1 1 240px`).
- `.seg`: buttons divided by `line`; pressed = `accent` fill with `paper` text. Use `aria-pressed`.
- `.clear` is a text button in `accent`. Filters should also be reflected in the URL (`?u=`, `?c=`, `?r=`, `?q=`).
