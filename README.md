# Web-Prep

Interactive HTML and CSS revision for **CSE 4165 Web Programming**, plus step-by-step
walkthroughs of twelve past-paper prototypes.

**Live:** https://meteorboyF.github.io/Web-Prep/

The exam is two screenshots of web page prototypes to reproduce in plain HTML and CSS,
90 minutes, 15 marks each. This site is built for that: learn the concept with an editor you
can break, then watch a real prototype get built one step at a time.

## What is in it

- **Lessons** — five parts covering the full HTML and CSS surface area, from the document
  skeleton to print stylesheets. Every concept that can be demonstrated has a live editable
  example rather than a paragraph describing what would happen.
- **Walkthroughs** — twelve prototypes from six past papers. Structure analysis first, then
  ordered build steps with a cumulative preview, the annotated colour palette, a time budget
  per step, and a note on what to skip when the clock runs down.
- **Cheatsheet** — one searchable, printable page.
- **Exam mode** — a 90-minute timer, a blank two-pane editor, a random prototype.

## Running it

No build step, no dependencies, no install. Either:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000/`, or just open `index.html` in a browser. Both work —
that is a deliberate constraint, not an accident.

## How it is built

Plain HTML, CSS and vanilla JavaScript. One external dependency: CodeMirror 5 from a CDN for
the editors, with a `<textarea>` fallback if it fails to load. Everything else is local and
works offline after the first visit.

Pages are thin shells. Content lives in data files under `data/` as classic scripts that
register onto a `WP` global — not ES modules, which cannot load from `file://`.

```
index.html            404.html            .nojekyll
lessons/              exams/              cheatsheet.html
assets/css/           assets/js/          assets/img/
data/lessons/         data/exams/         data/site-index.js
```

Every path in the site is relative. GitHub Pages serves this from the `/Web-Prep/`
subfolder, so a single leading `/` would work locally and 404 live. The home page carries a
self-check panel that reports what actually resolved, on whatever host you are reading it
from.

## Project documents

| File | What it is |
|---|---|
| [PLAN.md](PLAN.md) | Architecture, component contracts, phase plan |
| [CONTENT-MAP.md](CONTENT-MAP.md) | Every lesson section and every prototype, with what each needs |
| [PROGRESS.md](PROGRESS.md) | Running state: done, next, decisions, known issues |
| [CLAUDE.md](CLAUDE.md) | Conventions for anyone (or anything) editing this repo |

## Source material

Built from five course notes covering HTML5, CSS fundamentals, layout, advanced CSS and
professional practice; the supersimple.dev HTML/CSS reference; and six past exam papers.
Those files are coursework and are not committed here.

## Licence

Personal revision material. The prototype images are reproduced from UIU exam papers for
study purposes.
