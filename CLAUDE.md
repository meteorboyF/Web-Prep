# CLAUDE.md — conventions for Web-Prep

Read `PLAN.md` for architecture and `CONTENT-MAP.md` for what still needs writing.
`PROGRESS.md` is the running state: what is done, what is next, known issues.

## What this is

A static learning site for CSE 4165 Web Programming, deployed to
`https://meteorboyF.github.io/Web-Prep/`. It teaches HTML and CSS through live playgrounds,
and walks through solutions to 12 past-paper prototypes.

Source material lives one level up, outside the repo: five `.docx` notes, a reference PDF,
and six exam PDFs.

## Non-negotiables

1. **No build step.** Plain HTML, CSS, vanilla JS. It must run by opening `index.html` from
   the filesystem and on GitHub Pages, unchanged.
2. **No absolute paths.** Never a leading `/` in `href`, `src`, or any URL. Pages deploys to a
   project subfolder; `/assets/css/base.css` works locally and 404s live. Use `./` and `../`.

   Two checks before every push — both must return nothing:

   ```bash
   grep -rnE '(href|src)="/' --include='*.html' --include='*.css' .
   grep -rnE "(href|src)\s*[:=]\s*['\"]/" assets/js/
   ```

   `data/` is deliberately **not** checked. Paths there are lesson content — playground
   seeds that run inside a sandboxed `srcdoc`, and cheatsheet rows that quote
   `href="/style.css"` precisely to teach why it breaks. The site never fetches them, so
   they cannot affect the deployment. Only markup, stylesheets, and JS that builds real
   DOM or URLs matter.
3. **No ES modules.** They fail from `file://`. Data and code files are classic scripts that
   register onto the `WP` global.
4. **Exam answers stay exam-realistic.** One HTML file plus one CSS file or a `<style>` block.
   No frameworks, no JavaScript, no icon libraries **inside solution code**. The teaching site
   itself may use CodeMirror from a CDN; the answers may not.
5. **No secrets, no analytics, no tracking.** Nothing that phones home.
6. **Never force-push.**

## Where things go

| Adding | Edit |
|---|---|
| A lesson section | `data/lessons/part-N.js` — one entry in the `sections` array. Nothing else. |
| An exam walkthrough | `data/exams/<id>.js` — a new file. Register the id in `data/site-index.js`. |
| A cheatsheet row | `data/cheatsheet.js` |
| A nav entry | `data/site-index.js` |
| Shared styling | `assets/css/components.css` — check `tokens.css` first for an existing variable |

Pages under `lessons/` and `exams/` are thin shells. If you find yourself putting content
into an `.html` file, it belongs in a data file instead.

## Data shapes

`WP.lesson(id, data)`, `WP.exam(id, data)` — full shapes are in `PLAN.md` §3.
Two rules that matter:

- **Walkthrough steps store cumulative code, not diffs.** The renderer line-diffs step N
  against step N−1 to highlight what changed. Real build steps modify earlier lines; a
  pure-append model would be a lie. The last step *is* the final solution — there is no
  separate copy of it to drift.
- **Every palette entry records its source.** `paletteSource: 'annotated'` means the hex codes
  are printed on the exam paper and are worth marks — reproduce them exactly.
  `'sampled'` means they were eyedropped from the render and close is fine. Never present a
  sampled colour as if it were specified.

## Writing voice

Grounded and practical, matching the five source documents. Explain the *why* and the failure
mode. No cheerful filler, no "Great question!", no summarising what you are about to say.

- British spelling in prose (`colour`, `centre`, `behaviour`). Code stays conventional
  (`color`, `center`).
- A concept that can be demonstrated gets a playground, not a paragraph describing it.
- Playground seeds are 10–25 lines, one idea each. If a seed needs a scrollbar to read, it is
  teaching two things and should be split.
- Traps and tips come from the source documents' own trap tables. Do not invent them.
- Walkthroughs teach the *method*: structure analysis first, code second. State the build
  order every time — the order is the transferable skill, the code is not.

## Time budgets

The exam is 90 minutes for two 15-mark prototypes. Walkthrough steps carry a `minutes` value
and the totals should land near **40 minutes per prototype**, leaving 10 for reading and
panic. If a step's honest cost pushes the total past 45, that step belongs in the
`skipNote` instead.

## Verification before saying anything is done

```bash
python3 -m http.server 8000    # from the repo root, then actually load the changed pages
```

1. Load every page you touched. Console clean — no 404s, no errors.
2. `grep` for absolute paths (command above).
3. Check at 320px and 1920px. No horizontal scrollbar.
4. Push, wait for the Pages build, then load the **live** URL and confirm CSS, JS, data and
   images all resolve. Local passing does not imply live passing — that is the entire reason
   rule 2 exists.
5. Update `PROGRESS.md`.

Do not report a phase complete on the strength of having written the files.

## Commits

Small, with real messages. `feat(lessons): part 3 grid section`, `fix(playground): textarea
fallback on CDN failure`. Not `update`.

## Phase discipline

Work one phase at a time. Commit, push, confirm live, report, **stop**. Never start the next
phase without being asked. If a phase turns out larger than planned, split it and say so —
do not push a half-finished phase and call it done.

Report format at the end of each phase: what was built · what to look at on the live site ·
anything deferred · what the next phase will do.
