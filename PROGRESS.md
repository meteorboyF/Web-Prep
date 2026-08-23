# PROGRESS

## Done

### Phase 0 — sources read, planning documents written (awaiting review)
- Read all five `.docx` notes (converted with `python-docx`; `pandoc` is not installed).
- Read the reference PDF (19 pages, supersimple.dev) as text.
- Rendered all six exam PDFs to PNG and viewed all 12 prototypes.
- Extracted the annotated hex codes from the PDF text layer rather than reading them off
  images — more reliable, and confirmed against the rendered pages.
- Wrote `PLAN.md`, `CONTENT-MAP.md`, `CLAUDE.md`.
- No site code written. No repo initialised yet.

## Next

**Phase 1** — `git init`, wire the remote, `.nojekyll`, `README.md`, design-system CSS,
navigation shell, and one deliberately minimal page deployed and confirmed live on GitHub
Pages. Deployment risk is retired before any content is written.

## Remaining

Phases 2–11 per `PLAN.md` §5. Expected splits: 3a/3b, 5a/5b, 9a–9d.

## Decisions taken

| # | Decision | Rationale |
|---|---|---|
| D1 | Repo root at `Web-Prep/`, sources stay one level up | Keeps 2.7 MB of courseware out of the repo and separates sources from site code. **Awaiting confirmation.** |
| D2 | Data files are classic scripts registering onto a `WP` global, not ES modules | ES modules fail from `file://`, which would break the "opens by double-clicking `index.html`" constraint. **Deviation from brief §4 — awaiting confirmation.** |
| D3 | Unannotated palettes are pixel-sampled and labelled `sampled` in the UI | Papers 243 and 252 carry no red-arrow hex codes. Sampled values must not be presented as specified ones. |
| D4 | Walkthrough steps store cumulative code; the renderer line-diffs to highlight changes | Real build steps modify earlier lines, not only append. Also makes the last step the single source of truth for the final solution. |
| D5 | Playground preview iframe uses `sandbox=""` (fully restrictive) | HTML and CSS still render; scripts, forms and navigation cannot. Stricter than the brief's suggestion and no capability is lost. |
| D6 | Live-update defaults **off** below 768px | Reflowing the preview on every keystroke is unpleasant on a phone. **Run** is the mobile path. |

## Known issues

None yet — no code written.

## Environment notes

- `pandoc` and `python-docx` are not installed system-wide. A venv at
  `<scratchpad>/venv` has `python-docx` and `pillow`.
- `pdftoppm` and `pdftotext` are available; ImageMagick is not. Pillow covers cropping.
- `gh` is authenticated as `meteorboyF` with `repo` and `workflow` scopes.
- `github.com/meteorboyF/Web-Prep` exists, is public and **empty**; default branch `main`;
  Pages not yet enabled.
