# Badges
The small inline labels: result pills, neutral tags, D-day chips, prep-gap counts and the 2027 year chip.

Static rendition of `pill()` in `media/media.js`, `.tag`, and the D-day logic in `media/js/schedule.js`.

| class | meaning | colours |
|---|---|---|
| `.pill.p-최초합` / `p-충원합` / `p-불합` / `p-미기재` | interview result | `pass`/`wait`/`fail`/`na` on their `-bg` |
| `.tag` | neutral attribute (year, interview type) | `muted` text, 1px `line` border, `radius-sm` |
| `.dday` · `.soon` (≤14 days or today) · `.past` | days until interview | `accent`/`fail`/`na` on soft fills |
| `.gap` · `.tight` (≤4 days) | days between 1st-stage result and interview | `muted` / bold `fail` |
| `.t27` | marks a 2027 update inline | `accent` on `accent-soft` |

- The pill's class suffix IS the Korean result word; always print the word — colour never stands alone.
- Light-theme pill pairs are 4.1–4.4:1 (just under AA at 11.5px); kept from source.
