# BarChart
A horizontal bar chart whose rows are buttons: pressing one reveals example questions for that category in a `.samples` box.

Static rendition of `#chart` / `#samples` from `media/js/questions.js` (counts illustrative).

**Markup:** `div.chart > button.bar[aria-pressed]` → `span.nm` (label, 190px) · `span.tr > span.fl` (14px track on `soft`, fill `accent`, width = share of max) · `span.ct` (count, tabular, `muted`).

- Hover / `aria-pressed="true"`: row background `accent-soft`. Focus: 2px `accent` outline.
- Only one row pressed at a time; pressing it again hides the samples.
- `.samples`: `paper` box with `line` border, numbered list, source in 0.78rem `muted`.
- One hue only — don't colour bars by category.
