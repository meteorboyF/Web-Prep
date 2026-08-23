# PLAN — Web-Prep

A static, no-build learning site for CSE 4165 Web Programming, deployed to
`https://meteorboyF.github.io/Web-Prep/`.

Two jobs:

- **Learn** — every HTML/CSS concept from the five source documents, each with a live
  editable playground rather than a paragraph describing what would happen.
- **Solve** — step-by-step build walkthroughs for all 12 past-paper prototypes, teaching
  the *method of attack* under a 90-minute clock, not just the finished code.

---

## 0. Decisions you need to confirm before Phase 1

Three things. Two are deviations from section 4 of the brief, which said to ask first.

### D1 — Repo root location

The brief's working folder (`/home/meteorboyf/CSE/Web`) holds the source `.docx` and `.pdf`
files. Making that the repo root would commit ~2.7 MB of courseware and mix sources with site
code.

**Recommendation:** repo root at `/home/meteorboyf/CSE/Web/Web-Prep/` (already created,
holds this file). Sources stay one level up, outside the repo. Prototype target images get
rendered from the PDFs into `assets/img/prototypes/` and committed — those are needed by the
live site.

Say the word if you'd rather the repo be the `Web` folder itself with a `.gitignore`.

### D2 — Data files as classic scripts, not ES modules

The brief says content lives in JS data files that "export plain objects". Taken literally
that means ES modules — and ES modules **do not work from `file://`**. Opening `index.html`
directly would fail with a CORS error on every `import`. That breaks hard constraint 1
("must run by opening `index.html`").

**Recommendation:** classic `<script>` files that register onto one global namespace:

```js
// data/lessons/part-1.js
WP.lesson('part-1', {
  title: 'HTML5 Foundations',
  sections: [ /* ... */ ]
});
```

Same one-file-per-topic granularity, same thin-shell pages, works from `file://` **and** from
GitHub Pages, and lets the search page pull in all five lesson files on demand by injecting
`<script>` tags — which also works from `file://`, where `fetch()` would not.

### D3 — Four papers have no annotated hex codes

`243` Q1/Q2 and `252` Q1/Q2 carry **no red-arrow colour annotations**. The other four papers
do, and those codes are transcribed exactly (see `CONTENT-MAP.md`).

For the four unannotated prototypes I'll sample the colours directly out of the rendered PDF
page with a pixel eyedropper and record where each value came from. The walkthrough will say
plainly that these are **sampled, not specified** — so on a paper like that, close is fine and
you should not burn time colour-matching.

`252` is also unusual: almost every surface is a **gradient**, not a flat colour. That paper is
really a `linear-gradient` exam. Worth knowing before you sit one.

---

## 1. Hard constraints (restated, these govern every phase)

1. No build step. Plain HTML, CSS, vanilla JS. Runs from `file://` and from Pages.
2. **Every path relative.** No leading `/` in any `href`, `src`, or script URL. Pages
   deploys to a project subfolder; one absolute path breaks the live site while working
   locally. Verified explicitly in Phase 1 before any content is written.
3. `.nojekyll` at the repo root.
4. **Solution code is exam-realistic:** one HTML file + one CSS file (or a `<style>` block).
   No Bootstrap, no Tailwind, no JS, no icon libraries *in the answers*. Icons are inline
   SVG or a styled character, with a note on what to do in the real exam.
5. Prototype images become a solid-colour or gradient placeholder `<div>`, with a note that
   in the exam you write `<img src="a.jpg" alt="">` and move on.
6. Works offline after first load, except the CDN editor. `<textarea>` fallback if it fails.
7. Mobile-usable. Panes stack under 768px.
8. No secrets, no analytics, no tracking.

---

## 2. Repository layout

```
Web-Prep/
  .nojekyll
  index.html                    home: what to do next, progress, search
  404.html
  README.md  PLAN.md  CONTENT-MAP.md  CLAUDE.md  PROGRESS.md

  lessons/
    part-1.html … part-5.html   thin shells; all content comes from data/
  exams/
    index.html                  the 12 prototypes as a grid of cards
    walkthrough.html            one renderer, ?p=253-q1 selects the prototype
  cheatsheet.html
  exam-mode.html
  checklist.html                printable one-page exam checklist

  assets/
    css/
      tokens.css                custom properties: colour, space, type, radius, shadow
      base.css                  modern reset + base element styles
      layout.css                app shell, sidebar, header, content column
      components.css            cards, callouts, code, buttons, playground, walkthrough
      print.css                 cheatsheet + checklist print rules
    js/
      core.js                   WP namespace, registries, helpers, theme toggle
      nav.js                    renders nav from data/site-index.js, marks current page
      playground.js             the playground component
      lesson.js                 renders a lesson page from its data module
      walkthrough.js            renders a walkthrough, incl. the step diff
      cheatsheet.js             renders + filters the cheatsheet
      search.js                 lazy-loads all lesson data, filters titles
      progress.js               localStorage ticks, last position, reset control
      exam-mode.js              timer, random prototype, blank playground
      tools/specificity.js      specificity calculator (lives in Part 2)
      tools/flexgrid.js         flexbox + grid visual playgrounds (Part 3)
    img/
      prototypes/               243-q1.png … slot2-q2.png (cropped from the papers)

  data/
    site-index.js               nav tree + page registry
    lessons/part-1.js … part-5.js
    exams/243-q1.js … slot2-q2.js     one file per prototype
    cheatsheet.js
```

Every page is a thin shell: a `<head>`, the app shell markup, then `<script src="../data/…">`
and `<script src="../assets/js/…">`. Adding a lesson section is a one-file edit.

---

## 3. Component contracts

### 3.1 Playground — `WP.playground.mount(el, config)`

```js
{
  html: '<button class="btn">Click</button>',
  css:  '.btn { padding: .6rem 1rem; }',
  tryThis: 'Change flex-direction to column and watch the axes swap.',
  height: 260,          // preview height in px
  live: true            // live-update default; forced off under 768px
}
```

- Two editors, tabbed **HTML / CSS**, plus the preview pane. Tabs rather than one combined
  editor: it matches the exam's two-file reality and keeps each seed example short.
- Preview is an `<iframe srcdoc>` with `sandbox=""` — the maximally restrictive value.
  HTML and CSS still render; scripts, forms, popups and top-level navigation cannot run,
  so a playground can never navigate the parent. `allow-same-origin` is not needed.
- Debounce 300 ms. Buttons: **Run**, **Reset to original**, **Copy code**, **Full width**.
- Under 768px the panes stack and live-update defaults **off** — typing on a phone while the
  preview reflows every keystroke is unpleasant. **Run** is the mobile path.
- CodeMirror 5 from cdnjs (`codemirror.min.css`, `codemirror.min.js`, modes `xml`,
  `htmlmixed`, `css`). Loaded with `defer`. `playground.js` checks `typeof CodeMirror` and
  falls back to a styled monospace `<textarea>` with identical behaviour. CodeMirror 6 is not
  used — it requires bundling.
- Seeds are 10–25 lines, one idea each.

### 3.2 Lesson page — `WP.lesson(id, data)`

```js
{
  title, blurb,
  sections: [{
    id: 'box-model',
    title: 'The box model',
    body: [ 'paragraph', {table: [...]}, {list: [...]} ],
    playground: { /* playground config */ },
    trap: 'Element wider than you set → box-sizing is content-box.',
    tip:  'Set border-box once, globally, and never think about it again.',
    tool: 'specificity'      // optional: mounts an interactive tool here
  }]
}
```

Prose stays short. Anything demonstrable gets a playground instead of a description.
Every section gets an anchor id, a completion tick, and an entry in the search index.

### 3.3 Walkthrough — `WP.exam(id, data)`

```js
{
  id: '253-q1',
  paper: 'Mid Term 253 — Fall 2025, Q1',
  title: 'ProConnect — landing + signup',
  marks: 15,
  image: '../assets/img/prototypes/253-q1.png',
  palette: [{ hex: '#3F46A4', role: 'Brand indigo — logo, h1, Create Account' }],
  paletteSource: 'annotated',        // or 'sampled'
  structure: [{ region: 'Header', note: 'flex row, logo left, 3 links right' }],
  method: 'Why this build order for this particular layout.',
  steps: [{
    title: 'Skeleton and reset',
    minutes: 5,
    why: 'Costs nothing, prevents every box-model surprise later.',
    trap: 'optional',
    html: '<full cumulative HTML at this step>',
    css:  '<full cumulative CSS at this step>'
  }],
  marksNote: 'What earns marks here.',
  skipNote: 'What to drop if you are at 70 minutes with nothing on screen.'
}
```

Each step stores the **cumulative** code. The renderer line-diffs step N against step N−1 to
highlight what is new or changed. Storing diffs instead would be wrong: real build steps
*modify* earlier lines (adding a class, changing a width), they do not only append.

Page provides: pinned target image viewable beside your work, click-to-copy palette strip,
structure breakdown shown **before** any code, Prev/Next plus a jump list, cumulative preview
for the selected step, **Edit from here** into a full playground, and the final solution with
a copy button.

**The step order is stated in every walkthrough**, because the order is the thing being taught:

1. HTML skeleton and the reset (`box-sizing`, margin zero, font).
2. Rough block structure with visible outlines, no styling — get the boxes right.
3. Layout containers: outer grid or flex, widths, gaps.
4. Section by section, top to bottom.
5. Colours and typography from the palette.
6. Details: borders, radius, shadows, hover states.
7. Final comparison against the target image.

### 3.4 Progress — `WP.progress`

`localStorage` under one key, `webprep:v1`. Per-section completion ticks, last-visited page
and section. Visible **Reset progress** control in the footer and on the home page.

### 3.5 Search

Filters lesson section titles and cheatsheet rows. On first focus, `search.js` injects
`<script>` tags for all five lesson data files and the cheatsheet, then filters in memory.
No generated index file, so nothing can drift out of date, and it works from `file://`.

---

## 4. Design system

- Tokens in `tokens.css`: `--bg --surface --text --muted --border --brand --accent`, a
  space scale, a type scale, radii, two shadows.
- Light and dark, via `prefers-color-scheme` plus a `[data-theme]` manual override written
  to `localStorage` and applied before paint. This is Part 5's own advice, dogfooded.
- Layout: sidebar nav ≥1024px, top bar + drawer below. Content column `min(100% - 2rem, 68rem)`.
- Voice: grounded and practical. Explain the *why* and the failure mode, as the five
  documents do. British spelling in prose; code stays conventional (`color`).

---

## 5. Phase plan

Commit and push after each phase, report the live URL, then **stop for review**.

| Phase | Deliverable | Stop |
|---|---|---|
| 0 | Sources read. `PLAN.md`, `CONTENT-MAP.md`, `CLAUDE.md`. No site code. | **Yes** |
| 1 | Repo init, remote wired, `.nojekyll`, `README.md`, design system CSS, nav shell, one deliberately minimal page **live on Pages and confirmed loading with relative paths**. | **Yes** |
| 2 | Playground component: editor, live preview, run/reset/copy/full-width, mobile stacking, textarea fallback. One demo lesson page using it. | **Yes** |
| 3 | Part 1 lessons (HTML5). ~11 sections. | Yes |
| 4 | Part 2 lessons (CSS fundamentals) + specificity calculator. | Yes |
| 5 | Part 3 lessons (layout) + flexbox and grid visual playgrounds. | Yes |
| 6 | Part 4 lessons (advanced CSS + recipe library). | Yes |
| 7 | Part 5 lessons + searchable cheatsheet + print stylesheet. | Yes |
| 8 | Walkthrough component, demonstrated on **253 Q1 (ProConnect)**. | **Yes** |
| 9 | Remaining 11 prototypes, in batches. Push per batch. | Yes, per batch |
| 10 | Exam mode: timer, blank playground, random prototype, printable checklist. | Yes |
| 11 | Polish: 320px audit, keyboard nav, focus states, contrast, search, progress, 404, README with screenshots. | Yes |

### Phases I expect to split

Flagging now rather than silently shipping half a phase:

- **Phase 3** — Part 1 is the largest document. Likely `3a` sections 1–6 (structure, syntax,
  text, links, media), `3b` sections 7–11 (tables, forms, semantics, attributes, traps).
  Forms alone is a big section with several playgrounds.
- **Phase 5** — Part 3 plus two bespoke interactive tools. Likely `5a` flow/positioning/flexbox
  + flexbox playground, `5b` grid/responsive/centring + grid playground.
- **Phase 9** — 11 prototypes in four batches of 3, 3, 3, 2, ordered easiest structure first
  so the method is reinforced before the awkward ones:
  `9a` 253-q2, slot1-q1, slot2-q2 · `9b` 251-q1, 251-q2, slot1-q2 ·
  `9c` slot2-q1, 243-q1, 243-q2 · `9d` 252-q1, 252-q2 (the gradient-heavy pair, last).

---

## 6. Verification protocol

Nothing is reported done until all of this passes:

1. `python3 -m http.server` from the repo root; actually load every page changed this phase.
2. Browser console clean — no 404s, no errors.
3. `grep` the whole repo for absolute paths: `(href|src)="/` must return nothing.
4. Resize to 320px and to 1920px. No horizontal scrollbar.
5. Push, wait for the Pages build, then load the **live** URL and confirm the same pages
   render with working CSS, JS, data and images.
6. Update `PROGRESS.md`: phases done, phases remaining, known issues, decisions taken.

Commits are small with real messages — `feat(lessons): part 3 grid section`, not `update`.
Never force-push.

---

## 7. Risks

| Risk | Mitigation |
|---|---|
| Absolute path breaks the live site but not local | Retired in Phase 1 before content exists; `grep` gate in the checklist above |
| cdnjs blocked or offline | `<textarea>` fallback, built and tested in Phase 2, not bolted on later |
| Exam data files grow large | One file per prototype, loaded only on its own page |
| Walkthrough steps drift from the final solution | Steps store cumulative code; the last step **is** the final solution — single source of truth |
| Unannotated colours are guesses | Pixel-sampled, labelled `sampled` in the UI, with a note that exact matching is not worth exam time |
| Prototype images unreadable on a phone | Pinned panel with pinch-zoom and an "open full size" link |
