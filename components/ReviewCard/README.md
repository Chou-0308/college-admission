# ReviewCard
One interview review, collapsed to a summary line and expanding to procedure, Q&A, reasons and tips in the original form's order.

Static rendition of the `<details class="card r-…">` template in `media/js/explorer.js` (content illustrative).

**Consumer provides:** university `u`, department `d`, number `n`, source page `p`, result `r` (최초합/충원합/불합/미기재), admission type, year, interview type, duration, GPA, optional `memo`, procedure `pr`, Q&A pairs, `why`, `tip`.

- The 4px left rule takes the result colour (`pass`/`wait`/`fail`, default `na`) — always paired with the result pill.
- Summary: bold university, `muted` department, tabular `#n · p.` on the right, meta row of pill + tags.
- Body: `.memo` (on `wait-bg`), `.proc` (on `soft`), `.qa` questions bold with answer indented behind a 2px `line` rule, `.note` rows (96px label).
- Open at most the first dozen; load more with the `.more` button.
