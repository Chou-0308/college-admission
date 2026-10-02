# DataTable
The bordered, horizontally scrollable data table used for schedules, admission cuts and the special-track list.

Static rendition of `.tbl > table` in `schedule.html`, `cuts.html`, `special.html` (rows illustrative).

**Markup:** `div.tbl > table[.sched|.cuts|.spec|.subj]` with `thead th` and `tbody td`. Min width 760px (880px for `.cuts` / `.spec`) — the wrapper scrolls on phones.

- Header row: sticky, `soft` fill, `th` style in `muted`.
- `td.n` for numbers (tabular, nowrap); `td .sm` for a `muted` second line; `a.ulink` / `button.ulink` for a university that filters or links.
- Row hover: `soft`. Footnotes below in `p.fine`.
- Embed `Badges` (D-day, gap, t27) inside cells rather than colouring cells.
