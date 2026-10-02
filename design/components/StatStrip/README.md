# StatStrip
A four-cell row of headline numbers, drawn like the boxes of the original interview-review form.

Static rendition of `#strip` built by `media/js/overview.js` (numbers here are illustrative).

**Markup:** `div.strip` with four children; each holds `div.v` (`stat-value`, tabular) and `div.l` (0.78rem `muted`). The last cell may carry a `.resbar` — an 8px stacked bar in `pass` / `wait` / `fail` / `line` widths by share.

- Cells are separated by 1px `line` rules on `paper`, no gaps, no radius.
- Below 640px it becomes 2 × 2.
- Do keep exactly four cells. Don't add icons or colour to the numbers.
