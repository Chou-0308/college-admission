# SideNav
The left menu shared by every page, generated from the `SITE` list in `assets/nav.js`.

Static rendition of what `nav.js` renders into `<aside class="side" id="side" data-root="…">`.

**Consumer provides:** `SITE` — groups `{name, dir, pages:[[file, label]…]}`, or `{name, soon:true}` for a 계열 in preparation. `data-root` is `""` on the hub and `"../"` inside a 계열 folder.

- Current page: `aria-current="page"` → 3px `accent` left border, `accent-soft` fill, bold `accent` text.
- `.side-home` sits above a 2px `ink` rule; group titles (`.side-gt`) are 0.8rem `muted`.
- Below 900px (`bp-nav`) it collapses to a breadcrumb plus a horizontally scrolling pill row for the current group only; the current pill fills with `accent` and `paper` text.
- To add a page: add one line to `SITE` — never hand-edit a page's menu.
