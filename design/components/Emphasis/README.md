# Emphasis
The three inline emphasis styles used across all prose.

From the README's "강조 표시" rule and `assets/style.css`.

| markup | look | use for |
|---|---|---|
| `<b>…</b>` | bold `ink` over an `hl` highlighter band | the number or phrase to remember |
| `<b class="warn">…</b>` | bold `em` (orange) | a caveat or "don't misread this" |
| `<mark>` | `accent-soft` background | search hits only |

- The highlighter applies inside `.find`, `.cols`, `.prose`, `.sec-sub`, `.spnotes`, `.keybox`, `.qlist`, `.lede`.
- Links are plain `accent`. Use one or two highlights per paragraph, never whole sentences.
