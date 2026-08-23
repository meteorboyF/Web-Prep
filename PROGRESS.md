# PROGRESS

**Live:** https://meteorboyF.github.io/Web-Prep/

## Done

### Phase 0 — sources read, planning documents written
- Read all five `.docx` notes (converted with `python-docx`; `pandoc` is not installed).
- Read the reference PDF (19 pages, supersimple.dev) as text.
- Rendered all six exam PDFs to PNG and viewed all 12 prototypes.
- Extracted the annotated hex codes from the PDF text layer rather than reading them off
  images — more reliable, and confirmed against the rendered pages.
- Wrote `PLAN.md`, `CONTENT-MAP.md`, `CLAUDE.md`.

### Phase 1 — deployment skeleton, live and verified
- `git init`, remote `https://github.com/meteorboyF/Web-Prep.git`, branch `main`.
- `.nojekyll`, `.gitignore`, `README.md`.
- Design system: `tokens.css` (light + dark, manual override beats the media query),
  `base.css` (the Part 5 reset), `layout.css` (sticky header, sidebar ≥64rem, drawer below),
  `components.css` (buttons, cards, badges, callouts).
- `core.js` — `WP` namespace, lesson/exam registries, `WP.loadScript`, guarded
  `localStorage` wrapper, theme toggle. Theme is applied by an inline `<head>` script before
  paint, so there is no flash of the wrong theme.
- `nav.js` renders the sidebar from `data/site-index.js`, prefixing every href with the
  page's `data-base`. Unbuilt pages render as greyed text, never as dead links.
- `selfcheck.js` reports at runtime which relative paths actually resolved.
- Pages: `index.html`, `lessons/part-1.html` (nested, exercises `../`), `404.html`.
- GitHub Pages enabled from `main` / root. Build succeeded.

**Verified**, in this order: repo root over HTTP · a simulated `/Web-Prep/` subfolder ·
`file://` · then the live site. All five self-checks pass in every case, no console errors,
every asset 200, no horizontal overflow at 320px, mobile drawer toggles, `404.html` renders
styled at arbitrary depth and computes the correct home link.

## Next

**Phase 2** — the playground component: tabbed HTML/CSS editors, sandboxed `srcdoc` preview
debounced at 300 ms, Run / Reset / Copy / Full-width, CodeMirror 5 from cdnjs with a
`<textarea>` fallback, panes stacking under 768px with live-update defaulting off. Plus one
demo lesson page using it.

## Remaining

Phases 3–11 per `PLAN.md` §5. Expected splits: 3a/3b, 5a/5b, 9a–9d.

## Decisions taken

| # | Decision | Rationale |
|---|---|---|
| D1 | Repo root at `Web-Prep/`, sources stay one level up | Confirmed. Keeps 2.7 MB of courseware out of the repo and separates sources from site code. |
| D2 | Data files are classic scripts registering onto a `WP` global, not ES modules | Confirmed. ES modules fail from `file://`, which would break the "opens by double-clicking `index.html`" constraint. |
| D3 | Unannotated palettes are pixel-sampled and labelled `sampled` in the UI | Confirmed. Papers 243 and 252 carry no red-arrow hex codes. Sampled values must not be presented as specified ones. |
| D4 | Walkthrough steps store cumulative code; the renderer line-diffs to highlight changes | Real build steps modify earlier lines, not only append. Also makes the last step the single source of truth for the final solution. |
| D5 | Playground preview iframe uses `sandbox=""` (fully restrictive) | HTML and CSS still render; scripts, forms and navigation cannot. Stricter than the brief's suggestion and no capability is lost. |
| D6 | Live-update defaults **off** below 768px | Reflowing the preview on every keystroke is unpleasant on a phone. **Run** is the mobile path. |
| D7 | `404.html` is self-contained: styles inline, no external assets | Pages serves it for missing URLs at any depth, where a relative asset path resolves against the wrong folder. Its home link is computed at runtime, not hardcoded. |
| D8 | Nav shows unbuilt pages as greyed text rather than links | The shape of the site is visible from Phase 1, and nothing ever links to a 404. |
| D9 | Theme palette is the one from Part 5 §6 of the course notes | Dogfoods the source material, and every pair was contrast-checked: brand 5.5:1 light and 9.9:1 dark, muted text 5.9:1, `--border-strong` 3.6:1 for input borders. |

## Known issues

None outstanding.

## Environment notes

- `pandoc` and `python-docx` are not installed system-wide. A venv at
  `<scratchpad>/venv` has `python-docx` and `pillow`.
- `pdftoppm` and `pdftotext` are available; ImageMagick is not. Pillow covers cropping.
- `gh` is authenticated as `meteorboyF`; `gh auth setup-git` configured the HTTPS credential
  helper for pushes.
- Git identity is set **per-repo** (`meteorboyF` / `fardinjahangir9@gmail.com`) — there is no
  global git identity on this machine.
