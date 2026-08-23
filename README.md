# Web-Prep

Interactive HTML and CSS revision for **CSE 4165 Web Programming**, plus step-by-step
walkthroughs of all twelve past-paper prototypes.

**Live: https://meteorboyF.github.io/Web-Prep/**

The exam is two screenshots of web page prototypes to reproduce in plain HTML and CSS —
90 minutes, 15 marks each. This site is built for that specific task.

## What is in it

| | |
|---|---|
| **[Lessons](https://meteorboyF.github.io/Web-Prep/lessons/part-1.html)** | Five parts, **125 sections**, **96 live playgrounds**, **4 interactive tools**. Every concept that can be demonstrated has an editor you can break rather than a paragraph describing what would happen. |
| **[Walkthroughs](https://meteorboyF.github.io/Web-Prep/exams/index.html)** | All **12 prototypes** from six past papers. Structure analysis first, then ordered build steps with a cumulative preview, a line diff of what changed, the annotated palette, a time budget and a what-to-skip note. |
| **[Cheatsheet](https://meteorboyF.github.io/Web-Prep/cheatsheet.html)** | **319 rows** across 27 groups, searchable and printable, with a "try it" playground on the rows where seeing it run helps. |
| **[Exam mode](https://meteorboyF.github.io/Web-Prep/exam-mode.html)** | A 90-minute clock, a prototype drawn at random, and two empty files. |
| **[Checklist](https://meteorboyF.github.io/Web-Prep/checklist.html)** | One printable page: what to type first, the order of attack, the time budget, and a symptom-to-cause table. |

### The interactive tools

- **Specificity calculator** (Part 2) — two selectors side by side, scored (A,B,C) with a chip
  per token showing what earned each point, and a verdict on which wins. Handles `:where()`,
  `:is()`, `:has()`, `:nth-child(n of S)` and comma lists correctly.
- **Flexbox playground** (Part 3) — a button per value of every container property, with the
  generated CSS underneath. `align-content` is disabled and labelled while `flex-wrap` is
  `nowrap`, because a control that silently does nothing teaches the wrong thing.
- **Grid track explorer** and **`grid-template-areas` editor** (Part 3) — type the layout as
  words and watch it become the layout. The areas editor catches ragged rows and says so,
  because the browser drops that declaration silently.

## Running it

No build step, no dependencies, no install:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000/`. Or just open `index.html` in a browser — both work, and
that is a deliberate constraint rather than an accident.

## How it is built

Plain HTML, CSS and vanilla JavaScript. One external dependency: CodeMirror 5 from a CDN for
the editors, version-pinned with SRI hashes, with a `<textarea>` fallback if it fails to
load. Everything else is local and works offline after the first visit.

```
index.html   404.html   cheatsheet.html   checklist.html   exam-mode.html   .nojekyll
lessons/     exams/     assets/css/   assets/js/   assets/js/tools/   assets/img/prototypes/
data/lessons/   data/exams/   data/playgrounds/   data/cheatsheet.js   data/site-index.js
```

Pages are thin shells. Content lives in `data/` as classic scripts that register onto a `WP`
global — not ES modules, which cannot load from `file://`.

**Every path is relative.** GitHub Pages serves this from the `/Web-Prep/` subfolder, so a
single leading `/` would work locally and 404 live. The home page carries a self-check panel
that reports what actually resolved on whatever host you are reading it from.

## Project documents

| File | What it is |
|---|---|
| [PLAN.md](PLAN.md) | Architecture, component contracts, phase plan |
| [CONTENT-MAP.md](CONTENT-MAP.md) | Every lesson section and every prototype, with what each needs |
| [PROGRESS.md](PROGRESS.md) | What was built in each phase, and the decisions taken |
| [CLAUDE.md](CLAUDE.md) | Conventions for anyone editing this repo |

## Source material

Built from five course notes covering HTML5, CSS fundamentals, layout, advanced CSS and
professional practice; the supersimple.dev HTML/CSS reference; and six past exam papers.
Those files are coursework and are not committed here.

Eight of the twelve prototypes carry hex codes printed on the paper — those are reproduced
exactly. The other four carry none; their colours were pixel-sampled from the printed
prototype and are **labelled as sampled** everywhere they appear, so a guess is never
presented as a specification.

## Licence

Personal revision material. The prototype images are reproduced from UIU exam papers for
study purposes.
