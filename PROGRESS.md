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

### Phase 2 — playground component
- `assets/js/playground.js` — tabbed HTML/CSS editors, sandboxed `srcdoc` preview debounced
  at 300 ms, Live / Run / Reset / Copy / Preview-only.
- `assets/css/playground.css` — two-pane layout, stacking under 48rem, CodeMirror themed
  from the site tokens rather than a second CDN theme file.
- CodeMirror 5.65.16 from cdnjs, version-pinned with SRI hashes and
  `crossorigin="anonymous"`. Pinned URLs are immutable, so the hashes cannot go stale.
- `data/playgrounds/demo.js` — five seeds: a button, content-box vs border-box, the flexbox
  axes, a three-card stat row driven by one custom property, and an HTML-only entities
  example that exercises the single-pane path.
- `lessons/demo.html` — the component's own demo and test page.

**Verified**: CodeMirror path, textarea-fallback path (a copy of the page with the CDN host
rewritten to an unreachable domain), `file://`, 375px and 320px, and the live site. Copy was
confirmed with a real mouse click — a scripted `.click()` has no user activation, so the
clipboard API correctly refuses it and the button falls back to "Select and copy".

Two bugs found and fixed during that testing:

1. **Stale debounce timer.** Switching Live off, or pressing Run or Reset, did not cancel a
   timer already in flight, so the preview updated once more a moment later — undoing what
   the user had just asked for. All three paths now cancel first.
2. **`set()` was silently inconsistent between editor kinds.** CodeMirror's `setValue` fires
   a change event; assigning to `textarea.value` does not. Any future code calling `set()`
   would have worked with the CDN present and silently failed without it — exactly the kind
   of bug that only shows up offline. The textarea editor now dispatches `input`.

### Phase 3a — lesson renderer, and Part 1 sections 1–14
- `assets/js/lesson.js` — builds a whole lesson page from its data file: intro, progress
  bar, numbered sections with anchors, body blocks (paragraph, subheading, list, table,
  code figure, callout, playground), completion ticks, sidebar contents and a scrollspy.
- `assets/js/progress.js` — `localStorage` ticks and last-read position, with a visible
  reset control on every lesson page.
- `assets/css/lesson.css` — section furniture, progress bar, contents with tick dots, and
  wide tables that scroll inside their own box rather than breaking the page.
- `data/lessons/part-1.js` — 14 sections, 12 playgrounds: what HTML is, the document
  skeleton, syntax rules, entities, headings, paragraphs, inline elements, lists, links and
  paths, link attributes, images, responsive images, media and figures, SVG and icons.
- `lessons/part-1.html` is now a thin shell.

Added to the playground: a **`doc: true`** mode where the HTML pane holds a complete
document, used verbatim with only the stylesheet injected, and no reset added. It is what
makes the doctype-and-quirks-mode demonstration possible, and it is the mode the exam
walkthroughs will need in phase 8, where the answer *is* a whole file.

Three bugs found and fixed:

1. **`scroll-padding-top` and `scroll-margin-top` were both applying.** `base.css` sets the
   first on `<html>` for the sticky header and `lesson.css` set the second on every section.
   They add rather than override, so every anchor jump landed 144px down instead of 72px,
   and the contents highlighted the section *above* the one clicked.
2. **The scrollspy used an IntersectionObserver, which is the wrong tool.** It reports which
   elements *changed* state, so when the band spans a section boundary the answer depends on
   entry order. Replaced with a deterministic check: the last section whose top has passed
   under the header, rAF-throttled.
3. **The renderer overwrote `document.title`**, dropping the "Part 1 ·" prefix the shell page
   declares. It no longer touches it — a unique, descriptive title per page is a Part 5
   requirement, and this site should meet the ones it teaches.

### Phase 3b — Part 1 complete
Ten more sections, taking Part 1 to **24 sections and 21 playgrounds**: tables, the three
rules of a form field, input types, validation attributes, textarea/select/datalist,
semantic structure, the exam starter skeleton, global attributes and data hooks, ARIA and
the accessibility checklist, and the traps table.

Two of these are the highest-value sections on the page:

- **The exam starter skeleton** (`#exam-skeleton`) — the roughly three minutes of typing to
  produce without thinking before looking at the prototype properly. Runs in `doc: true`
  mode, so the reset can be commented out to see what each line was preventing.
- **Traps that cost hours** — the full table, every symptom of which looks nothing like its
  cause.

Added a narrowly scoped **`allowForms: true`** playground option. `sandbox=""` blocks form
submission outright, so a submit button does nothing and native validation never appears —
which makes the whole validation section undemonstrable. One playground now sets
`sandbox="allow-forms"`. Verified through the browser's own `DOMTokenList` that this grants
form submission **and nothing else**: scripts, top-navigation and same-origin all stay off,
so the worst a submit can do is replace the preview's own contents. `selfcheck.js` now
treats any sandbox value outside `{'', 'allow-forms'}` as a failure.

**Verified**: 24 sections all park at 72px with no scrollspy mismatch; 21 playgrounds mount
with none left unmounted; exactly one widened sandbox, which survives re-render; doc-mode
keeps the document verbatim including its `<link rel="stylesheet">`; CDN-failure variant
falls back to textareas with all 21 still rendering; no console errors; no page overflow.

### Phase 4a — Part 2 selectors and the cascade, plus the specificity calculator
Split as flagged: Part 2 is 31 sections in `CONTENT-MAP.md`, so 4a takes the coherent first
half — how a rule finds its element and who wins when two disagree.

- `data/lessons/part-2.js` — 11 sections, 9 playgrounds: CSS delivery, rule anatomy, basic
  selectors, combinators, attribute selectors, pseudo-classes, nth-child formulas,
  pseudo-elements, the cascade, specificity, inheritance.
- `assets/js/tools/specificity.js` — the **specificity calculator**. Two selectors side by
  side, each scored (A,B,C) with a chip per token showing what earned each point, and a
  verdict saying which wins. Handles the parts people get wrong: `:where()` scores zero,
  `:is()`/`:not()`/`:has()` take their most specific argument rather than the sum,
  `:nth-child(n of S)` adds its `of` argument, single-colon legacy pseudo-elements count as
  column C, and a comma-separated list is scored per selector rather than combined.
- `assets/css/tools.css` — widget styling, with the three specificity columns kept visually
  distinct in both themes.
- `lesson.js` gains a `{ tool: 'name' }` body block, resolved from a `WP.tools` registry.

The calculator was unit-tested against 20 selectors before being wired up. One "failure"
turned out to be a wrong expectation on my part rather than a bug: in `a[href$=".pdf"]::after`
the pseudo-*element* is column C, not B, so `(0,1,2)` is right.

**Verified**: 11 sections all park at 72px with no scrollspy mismatch; the tool mounts,
presets load, verdicts are correct for eleven-classes-versus-one-id, exact ties,
`:where`, `:is`, pseudo-element columns and `!important`; comma lists render one scored row
each; collapses to a single column below 52rem; still works with the CDN blocked.

Also worth recording: two apparent failures during testing were **browser cache**, not code —
the page was running a `lesson.js` from before the tool branch existed. Serving from a fresh
port confirmed it. Worth remembering before debugging anything that "should" work.

### Phase 4b — Part 2 complete
Twenty more sections, taking Part 2 to **31 sections and 23 playgrounds**: the box model,
margin and its shorthand, margin collapsing, borders and outline, units, value types,
colour, opacity against alpha, a palette method, typography, the font shorthand,
truncation, web fonts, backgrounds, gradients, shadows, overflow, list styling, table
styling and the traps table.

Several sections are anchored to specific past papers rather than left abstract:

- **colour** opens with the point that eight of the twelve papers print hex codes on the
  prototype, and the first two minutes of the exam belong to copying them into `:root`.
  Its playground is the annotated Slot 2 Q1 palette, transcribed exactly.
- **gradients** builds the real three-stop sidebar from 252 Q2, because that paper is
  effectively a `linear-gradient` exam.
- **shadows** contrasts the stacked soft recipe with the deliberate hard offset shadow on
  the 251 Q1 pricing cards — the one case where no blur is correct.
- **opacity against alpha** uses the CORE-TECH translucent stat pill, where picking the
  wrong one visibly greys the label.
- **web fonts** ends by advising against them in the exam: a Google Fonts link is a network
  request that may not resolve, and no prototype is marked on its typeface.

**Verified**: 31 sections all park at 72px with no scrollspy mismatch; 23 playgrounds
mounted with nothing left unmounted; no `[unrecognised block]` fallbacks; the specificity
tool still mounts; CSS unicode escapes (`\2713`, `\2197`) survive the data file intact; no
console errors; no page overflow — locally on a fresh port and then live.

### Phase 5a — Part 3 flow, positioning and flexbox, with the flexbox playground
Split as planned. **12 sections, 11 playgrounds**, plus the flexbox visual playground:
normal flow and display values, the inline-block whitespace gap, floats, positioning, the
containing block rule, sticky, z-index and stacking contexts, the two axes, container
properties, item properties, the five patterns, and the gotchas.

`assets/js/tools/flexbox.js` — a button per value of every container property, a live
stage, and the CSS it would take to produce what you are looking at. Click an item to cycle
its `flex` through `1`, `2` and `none`. `align-content` is disabled and labelled while
`flex-wrap` is `nowrap`, and omitted from the generated CSS, rather than sitting there
silently doing nothing.

Controls are real radio inputs with styled labels rather than buttons with ARIA. Radios
come with arrow-key navigation, grouping and screen reader announcement already correct;
re-implementing that with `role="radio"` is how you end up with a widget that looks fine
and is unusable by keyboard.

Sections lead with the failure mode wherever there is one — the whitespace gap, the missing
`position: relative` that sends a badge to the corner of the page, the parent stacking
context that defeats `z-index: 9999`, and `min-width: auto`, which is the reason a flex row
overflows far more often than it has any business being.

**Verified**: 12 sections park at 72px with no scrollspy mismatch; the tool's five radio
groups, gap slider, item counter (guarded at 1 and 8), per-item flex cycling, generated CSS
and full Reset all behave; nothing escapes a 320px column; no console errors — locally on a
fresh port and then live.

## Next

**Phase 5b** — the rest of Part 3: defining a grid, placing items, implicit tracks,
alignment, subgrid, flexbox-or-grid, responsive design, media queries, `clamp()`, container
queries, `aspect-ratio`, multi-column, every way to centre, and the traps — plus the **grid
visual playground**.

## Remaining

Phases 6–11 per `PLAN.md` §5. Expected split: 9a–9d.

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
| D10 | The playground builds a `<textarea>` first, then upgrades to CodeMirror | The fallback is the path that always runs, so it cannot rot. A slow or blocked CDN degrades rather than breaking, and no page load waits on cdnjs. |
| D11 | The preview iframe is always light, never themed | It is a page preview, and every exam prototype is a light-background design. Theming it would show you something you are not building. |
| D12 | **Copy** copies the pane you are looking at, not the assembled document | HTML and CSS stay separate, matching the two files an exam answer is written in. |
| D13 | CodeMirror is pinned at 5.65.16 with SRI hashes | Version-pinned cdnjs URLs are immutable, so the hashes can never go stale, and a compromised CDN cannot inject script into the site. |

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
