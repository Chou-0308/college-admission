# KeyBox
A reference box of key–value facts beside a column of notes (`.spgrid`: 300px box + flexible notes).

Static rendition from `media/special.html`.

**Markup:** `div.keybox` → `h3`, `p.small`, `dl > div > dt + dd` (110px key column, `line` dividers). Notes column: `div.spnotes` → `h3` + `ul`.

- `paper` fill, `line` border, 3px `accent` top rule.
- Stacks to one column below 760px.
- Use `<b>` for the rule that changes eligibility, `<b class="warn">` for an exception.
