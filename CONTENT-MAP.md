# CONTENT-MAP

Every lesson section and every exam prototype, with a one-line note on what each needs.
Source column refers to the five `.docx` notes and the reference PDF.

Legend: **PG** = needs a playground · **T** = trap callout exists in the source ·
**TIP** = tip callout · **TOOL** = bespoke interactive widget · **REF** = reference/table only,
no runnable demo possible.

---

## Part 1 — HTML5 Foundations → `data/lessons/part-1.js`

| # | Section | Needs |
|---|---|---|
| 1.1 | What HTML actually is | REF. Three-layer table (HTML/CSS/JS) + the DOM-as-tree model. Short. |
| 1.2 | The rendering pipeline | REF. One paragraph: DOM → CSSOM → render tree → layout → paint → composite. Sets up "animate transform, not width" in Part 4. |
| 2.1 | Document structure | PG. Seed the full skeleton; **try this:** delete the doctype and watch quirks mode change the box model. |
| 2.2 | Where to put scripts | REF. `defer` vs `async` vs neither. Table only. |
| 3.1 | Syntax rules | PG. Void elements, overlapping nesting, boolean attributes. **Try this:** `disabled="false"` still disables. |
| 3.2 | Comments | PG (tiny). Visible in view-source; used to label section ends. |
| 3.3 | Character entities | PG. Table of entities rendered live — this one genuinely benefits from seeing output. |
| 4.1 | Headings | PG + T. h1–h6 as outline, not sizes. Trap: choosing `h4` because it looks right. |
| 4.2 | Paragraphs, breaks, rules | PG + T. `<p>` cannot contain block elements — demo the auto-close. |
| 4.3 | Inline semantic elements | PG. The whole strong/b, em/i table rendered live so the "looks the same" pairs are visible. |
| 4.4 | Lists | PG. ul/ol/dl, `start` `reversed` `type`, correct nesting inside `<li>`. |
| 5.1 | Links and paths | PG + T. href forms table. **Directly exam-relevant** and directly Pages-relevant. |
| 5.2 | Link attributes | PG. `target="_blank"` + `rel="noopener"`, `download`, why `title` is not accessible. |
| 5.3 | Absolute vs relative, practically | T. The root-relative-breaks-in-a-subfolder bug — the exact bug this site must avoid. Call it out hard. |
| 6.1 | The image element | PG + T. `alt`, `width`/`height` for CLS, `loading="lazy"`. Trap: lazy on the hero. |
| 6.2 | Responsive images | PG. `srcset`/`sizes` vs `<picture>`. Placeholder gradients stand in for real files. |
| 6.3 | figure, audio, video, iframe | PG. `<figcaption>` position rule; autoplay needs muted; iframe needs `title`. |
| 6.4 | SVG | PG. Inline SVG recoloured on hover with `currentColor` — the exam icon technique. Flag it. |
| 7 | Tables | PG + T. Full structure: caption, thead/tbody/tfoot, `scope`, colspan/rowspan, `border-collapse`. |
| 8.1 | The three rules of a form field | PG + T. name, real label, placeholder-is-not-a-label. |
| 8.2 | Input types | PG. Every type rendered live in one grid — much better seen than read. |
| 8.3 | Validation attributes | PG. required, pattern, min/max/step, readonly vs disabled. |
| 8.4 | Other form controls | PG. textarea, select/optgroup, datalist, progress, meter, button types. |
| 8.5 | Form traps | T. Button reloads page; form submits nothing; only first radio works. |
| 9.1 | Semantic structure | PG. header/nav/main/article/section/aside/footer + landmark roles. |
| 9.2 | section vs article vs div | REF. Three questions to decide. |
| 9.3 | A realistic page skeleton | PG. The skeleton every exam answer starts from. Mark it as such. |
| 10.1 | Global attributes | REF + PG for `data-*` styled via `[data-state="open"]`. |
| 10.2 | ARIA in five rules | REF. No ARIA beats bad ARIA. |
| 10.3 | Accessibility checklist | REF. Eight lines. Also feeds `checklist.html`. |
| 11 | Traps and habits | T. The full traps table as callout cards. Emmet tips are exam-useful — keep. |

## Part 2 — CSS Fundamentals → `data/lessons/part-2.js`

| # | Section | Needs |
|---|---|---|
| 1.1 | Getting CSS onto the page | REF. External / internal / inline / `@import` (avoid). Note: exam answers use one CSS file or a `<style>` block. |
| 1.2 | Anatomy of a rule | PG + T. Trap: one invalid selector can kill a whole block. |
| 2.1 | Basic selectors | PG. `*`, type, class, id, `.a.b`, grouping. |
| 2.2 | Combinators | PG. Descendant / child / adjacent / general sibling on one shared markup sample. |
| 2.3 | Attribute selectors | PG. `^=` `$=` `*=` `~=` `\|=` and the `i` flag. |
| 2.4 | Pseudo-classes | PG. Big one. State pseudo-classes plus `:is`/`:where`/`:not`/`:has`. |
| 2.5 | nth-child formulas | PG. Live list where you type the formula and see what highlights. |
| 2.6 | Pseudo-elements | PG. `::before`/`::after` need `content`; `::marker`, `::placeholder`, `::selection`. |
| 3.1 | The cascade, resolution order | REF. Origin → layer → specificity → source order. |
| 3.2 | Calculating specificity | **TOOL** + PG. The specificity calculator: type a selector, see (A,B,C) and why. |
| 3.3 | Inheritance | PG. What inherits vs what does not; `inherit`/`initial`/`unset`/`revert`; `all: unset`. |
| 4.1 | The box model | PG + T. content-box vs border-box side by side with the 244px-vs-200px demo. |
| 4.2 | Margin and the shorthand | PG. One-to-four value shorthand, `margin: 0 auto`. |
| 4.3 | Margin collapsing | PG + T. 30 + 20 = 30, not 50. Then the fixes. High-value: it explains most mystery gaps. |
| 4.4 | Padding, border, outline | PG. Why `outline` is the right tool for focus rings. |
| 5.1 | Units | PG. px/%/em/rem/ch/vw/vh/dvh/fr compared in one live strip. |
| 5.2 | Other value types | REF + T. Unitless `line-height` — trap: a unit crushes nested text. |
| 6.1 | Colour notations | PG. keyword/hex/hex-alpha/rgb/hsl/oklch/currentColor/color-mix, all rendered as swatches. |
| 6.2 | Opacity vs alpha | PG + T. Why overlay text looks washed out. |
| 6.3 | A workable palette method | REF. Hold the hue, move the lightness. Ties to the exam palette strips. |
| 7.1 | Typography core properties | PG. font-family stack, size, weight, line-height, letter-spacing, text-align. |
| 7.2 | The font shorthand | T. It resets everything you omit. |
| 7.3 | Truncation and clamping | PG. Ellipsis and `-webkit-line-clamp: 3`. Used by several prototypes' card text. |
| 7.4 | Web fonts | REF. Google Fonts vs `@font-face`; woff2; `font-display: swap`. Exam note: system fonts are fine, do not waste time. |
| 8.1 | Background properties | PG. The shorthand, `center/cover`, multiple layers (first listed is on top). |
| 8.2 | Gradients | PG. linear/radial/conic/repeating. **Directly needed for prototypes 252-q1 and 252-q2.** |
| 8.3 | Shadows | PG. offset/blur/spread/inset; the stacked-shadow depth recipe; the hard offset shadow used by 251-q1. |
| 9.1 | Overflow and visibility | PG + T. `hidden` vs `auto` vs `clip`; `display:none` vs `visibility` vs `opacity:0`. |
| 9.2 | List styling | PG. `list-style: none` does not remove the indent — you must zero the padding. |
| 9.3 | Table styling essentials | PG. `border-collapse`, zebra rows, sticky header. Needed for 252-q2. |
| 10 | Traps and tricks | T + TIP. Full traps table; `max-width: 65ch`, `aspect-ratio`, `accent-color`, `inset: 0`. |

## Part 3 — CSS Layout Mastery → `data/lessons/part-3.js`

| # | Section | Needs |
|---|---|---|
| 1.1 | Normal flow and display values | PG. block/inline/inline-block/none/contents/flow-root compared live. |
| 1.2 | The inline-block whitespace gap | PG + T. The stray gap, and why flexbox ends the problem. |
| 1.3 | Floats, briefly | PG. Text wrap around an image only. Everything else is flex or grid. |
| 2.1 | Positioning values | PG. static/relative/absolute/fixed/sticky in one scrollable demo. |
| 2.2 | The containing block rule | PG + T. `position: relative` parent + `absolute` badge. **The single most exam-useful positioning idea** — used by 243-q1's overlapping arrows and 253-q2's avatar. |
| 2.3 | position: sticky | PG + T. Needs an offset; an `overflow` ancestor kills it. |
| 2.4 | z-index and stacking contexts | PG + T. Why `z-index: 9999` still loses. |
| 3.1 | Flexbox: the two axes | PG. Switch `flex-direction` and watch justify/align swap meaning. |
| 3.2 | Container properties | **TOOL**. Flexbox visual playground: a button per value of direction, wrap, justify, align, gap. |
| 3.3 | Item properties | PG. grow/shrink/basis, `flex: 1` vs `auto` vs `none`, `align-self`, `order`, `margin-left: auto`. |
| 3.4 | Patterns you will use constantly | PG ×5. Navbar, dead centre, media object, sticky footer, equal-height wrapping cards. **Every one of these appears in the papers.** |
| 3.5 | Flexbox gotchas | T. `min-width: auto` overflow is the number-one cause of a broken flex row. |
| 4.1 | Grid: defining tracks | PG. fr, auto, minmax, repeat, auto-fit vs auto-fill, the RAM pattern. |
| 4.2 | Placing items | **TOOL**. Grid visual playground: line numbers, spans, named areas, editable `grid-template-areas`. |
| 4.3 | Implicit tracks and flow | PG. `grid-auto-rows`, `grid-auto-flow: column`, `dense` and its accessibility cost. |
| 4.4 | Alignment in grid | PG. justify/align, items vs content, `place-items: center`, the `grid-area: 1/1` stacking trick. |
| 4.5 | Subgrid | PG. Card titles and buttons aligning across a row. |
| 4.6 | Flexbox or grid? | REF. The decision table. Then: apply it to three of the actual prototypes. |
| 5.1 | Responsive non-negotiables | REF. viewport meta, `max-width: 100%` on media, mobile-first. |
| 5.2 | Media queries | PG. min-width vs max-width, range syntax, combining, the feature table. |
| 5.3 | Fluid sizing without breakpoints | PG. `clamp()`, and the container line worth memorising: `width: min(100% - 2rem, 68rem)`. |
| 5.4 | Container queries | PG. Same card in a wide slot and a narrow slot, side by side. |
| 5.5 | Aspect ratio and object-fit | PG. cover/contain/fill and `object-position`. Needed for every prototype with a photo. |
| 5.6 | Multi-column text | PG. `columns`, `column-rule`, `break-inside`. |
| 6 | Every way to centre | PG. All nine rows of the table as switchable live demos. |
| 7 | Traps and tricks | T + TIP. Full traps table; `* { outline: 1px solid red }` promoted heavily — it is step 2 of every walkthrough. |

## Part 4 — Advanced CSS → `data/lessons/part-4.js`

| # | Section | Needs |
|---|---|---|
| 1.1 | Custom properties | PG. Define on `:root`, use with `var()`, fallbacks. |
| 1.2 | Component-level theming | PG. One rule body, unlimited variants (`--btn-bg`). The most useful modern-CSS pattern. |
| 1.3 | @property | PG. Registering a type so a variable can animate. |
| 2 | CSS functions | PG. `calc` (spaces are mandatory), `min`/`max`/`clamp`, `color-mix`, `attr`, `env`, `light-dark`. |
| 3.1 | Transitions | PG. property/duration/timing/delay; hover lift. |
| 3.2 | What can and cannot transition | T. Not `display`, not to/from `auto`; the `grid-template-rows: 0fr→1fr` accordion. |
| 3.3 | Timing function guidance | PG. Six curves racing side by side. |
| 4.1 | Transforms | PG. translate/scale/rotate/skew, `transform-origin`, and why order matters. |
| 4.2 | 3D transforms | PG. The card flip: perspective on the parent, `preserve-3d`, `backface-visibility`. |
| 5.1 | Keyframe animations | PG. `@keyframes`, the longhand properties, `fill-mode`. |
| 5.2 | Staggering | PG. `animation-delay: calc(var(--i) * .05s)`. |
| 5.3 | Performance: animate two things | REF + T. transform and opacity only; the substitution table. |
| 5.4 | Respect reduced motion | REF. Ship the block in every project. This site ships it. |
| 6.1 | filter and backdrop-filter | PG. All functions on one image; frosted glass. |
| 6.2 | Blend modes | PG. Duotone and `mix-blend-mode: difference`. |
| 6.3 | clip-path and mask | PG. polygon/circle/inset, gradient mask fade. |
| 7.1 | Nesting | PG. Native `&`; do not go past two levels. |
| 7.2 | :has(), the parent selector | PG. Five live examples — it removes a lot of JavaScript. |
| 7.3 | @layer | PG. Later layers win regardless of specificity. |
| 7.4 | @supports | PG. Progressive enhancement, `selector()` form. |
| 7.5 | Scroll behaviour | PG. `scroll-padding-top` for sticky headers; a snapping carousel. |
| 8 | Recipe library | PG ×11, one each: gradient text, gradient border, glassmorphism, card hover lift, animated underline, skeleton shimmer, CSS-only tooltip, custom checkbox, spinner, counters, scroll progress bar. Each with a copy button. |
| 9 | Traps | T. Full traps table. |

## Part 5 — Professional Practice → `data/lessons/part-5.js`

| # | Section | Needs |
|---|---|---|
| 1.1 | Project structure | REF. Lowercase hyphenated filenames; `index.html`; case-sensitive servers. |
| 1.2 | Order inside a stylesheet | REF. Reset → tokens → base → layout → components → utilities → media. **This is the order the walkthroughs build in.** |
| 1.3 | Naming: BEM | PG. Block/element/modifier; flat specificity. |
| 2 | A modern reset | PG + copy button. The reset in full. Also the source of the exam's four-line mini-reset. |
| 3.1 | DevTools, the parts that matter | REF. Panel table. |
| 3.2 | Debugging techniques | PG. `* { outline: 1px solid red }` live on a broken layout you can fix in place. |
| 3.3 | Bug lookup table | T. Full table as searchable callouts — feeds the cheatsheet. |
| 4.1 | Accessibility rules that carry weight | REF. Nine rules. |
| 4.2 | Two snippets you will reuse | PG. `.sr-only` and the skip link, both live-focusable. |
| 4.3 | Accessibility testing | REF. Unplug the mouse; zoom to 200%; greyscale. |
| 5.1 | Performance metrics | REF. LCP / CLS / INP with targets. |
| 5.2 | What actually helps, in order | REF. Images first, then everything else. |
| 6 | Dark mode and theming | PG. Only the variables change. This site's own toggle demonstrates it. |
| 7 | Styling forms properly | PG. The full form-control block, `:user-invalid`, `accent-color`, floating label with no JS. **Six of the twelve prototypes contain a form.** |
| 8 | Print styles | PG + used for real by `cheatsheet.html` and `checklist.html`. |
| 9 | Metadata and sharing | REF. title/description/canonical/OG/favicon/theme-color. |
| 10 | Browser support and deployment | REF. caniuse, `@supports`, and the GitHub Pages subfolder path problem again. |
| 11 | Pre-launch checklist | REF → also rendered as an interactive checklist with ticks. |
| 12 | How to keep learning | REF. Short. The project ladder. |

## Cheatsheet → `data/cheatsheet.js`

Built from `html-css-reference (1).pdf` (19 pages, supersimple.dev), plus everything the five
documents cover that the PDF does not. One searchable page, grouped by topic, printable.
Every row: **syntax · one-line meaning · "try it"** link that opens it in the playground.

| Group | From the PDF | Rows the PDF lacks — added from the five docs |
|---|---|---|
| HTML basics & syntax | elements, void tags, whitespace collapsing, attributes | boolean attributes, entities, comments |
| Head section | title, Google Fonts links, stylesheet link | charset, viewport, description, favicon, OG tags |
| Filepaths | `styles.css`, `fold1/`, `fold1/fold2/` | `../`, `#anchor`, `mailto:`, `tel:`, root-relative and why it breaks on Pages |
| Text & inline elements | strong, u, span, a | em/i, mark, small, del/ins, code, kbd, sub/sup, abbr, time |
| Images | src, width/height, object-fit, object-position | alt rules, lazy loading, srcset/sizes, `<picture>`, figure |
| Inputs | text, checkbox, placeholder, `::placeholder` | every other input type, labels, validation attributes, select, textarea, datalist |
| Tables | — | full structure, scope, colspan/rowspan, border-collapse |
| CSS delivery | `<style>`, external link, inline style | `@import` and why not |
| Colour values | name, rgb, hex, rgba | hex-alpha, hsl, oklch, currentColor, color-mix, transparent |
| Measurement values | px, %, em, rem | ch, vw/vh/dvh, vmin/vmax, fr, unitless |
| Selectors | class, comma, descendant, `:hover`, `:active` | child/sibling combinators, attribute selectors, the full pseudo-class list, pseudo-elements, nth formulas |
| Specificity | the four rules of thumb | the (A,B,C) calculation, `:is`/`:where`, `!important` |
| Box model | margin, padding, border shorthands, negative margin | `box-sizing: border-box`, margin collapsing, outline, border-radius |
| Text styles | font-family/size/weight/style, text-align, line-height, text-decoration | letter-spacing, text-transform, truncation, clamping, `text-wrap: balance` |
| Display | block, inline-block, inline, `vertical-align` | none, contents, flow-root, the inline-block whitespace gap |
| Nested layouts | vertical-in-horizontal technique | keep verbatim — it is the exam's core structural method |
| Flexbox | display, direction, justify, align, `flex: 1`, `flex-shrink` | wrap, gap, align-content, align-self, order, `margin-left: auto`, the min-width:0 gotcha |
| Grid | display, template-columns, gaps, fr, justify/align | minmax, repeat, auto-fit, template-areas, line placement, `1 / -1` |
| Position | static/fixed/absolute/relative, nesting rules, z-index | sticky, `inset`, stacking contexts, the transform-breaks-fixed trap |
| Transitions & shadows | transition, opacity, box-shadow | transforms, keyframes, filters, reduced motion |
| Responsive | media query ranges, the `.02px` gap convention | viewport meta, mobile-first, `clamp()`, container queries, `aspect-ratio` |
| Inheritance | text properties pass down, set on `body` | the full inherits/does-not table, `inherit`/`initial`/`unset`/`revert` |
| Semantic elements | the list | landmark roles, section-vs-article-vs-div |
| Other | `pointer-events`, `white-space: nowrap` | `overflow-wrap`, `accent-color`, `scrollbar-gutter`, `inset: 0` |

---

## The 12 prototypes → `data/exams/*.js`

Palette source is **annotated** (hex codes printed on the paper — use exactly, they are marks)
or **sampled** (no annotations on that paper; eyedropped from the render, close is fine).

### `243-q1` — UIU Housing Society hero · *Mid Term 243, Q1* · palette: **sampled**

Floating white navbar over a full-bleed hero, split text/photo, teal search band beneath.
- **Structure:** outer vertical stack → header (flex: logo left, nav right, pill CTA) sits over
  a 2-column hero (text | photo bleeding to the right edge) → teal band with a 4-column flex
  search row (3 fields + dark navy button).
- **Teaches:** overlapping a header on a hero, 2-col hero split, `position: absolute` circular
  arrow buttons straddling the column boundary, `<select>` styling, flex search bar.
- **Needs:** eyedropper pass for the teal, the navy, and the heading colours; photo becomes a
  gradient placeholder `<div>`; the two round chevrons are inline SVG or `‹` `›` characters.
- **Time trap:** the arrows and the logo mark are worth almost nothing — do them last.

### `243-q2` — United Kitchen services + about · *Mid Term 243, Q2* · palette: **sampled**

Dark navbar, four white service cards, then a two-column about with a photo collage.
- **Structure:** dark bar (flex, logo + links + full-height orange CTA) → 4-card row → about
  section 2-col: left a 2×2 offset image collage, right eyebrow + heading + two paragraphs +
  two bordered stat blocks + button.
- **Teaches:** equal-height card row, icon-above-title cards, the offset collage (grid with
  deliberate row/column spans), left-border stat blocks, a floating back-to-top square.
- **Needs:** four inline SVG icons (chef, cutlery, cart, headset) or styled characters, with a
  note that in the exam a coloured square or a character is a perfectly good stand-in.
- **Time trap:** the collage is the most fiddly part for the fewest marks. Four equal boxes
  first; offset them only if time remains.

### `251-q1` — UIU Information Desk pricing · *Mid Term 251, Q1* · palette: **annotated**

`#ff4419` logo accent + SIGN UP · card titles `#4358b8` `#075627` `#d84400` `#1372aa`
`#206fb4` · `#1d78f0` all five buttons and the bottom link.
- **Structure:** two stacked header rows (brand + right links/button; then a wide nav row) →
  pale mint band with a centred two-line heading → 5-column pricing card row → white band with
  a centred heading, a paragraph and a link.
- **Teaches:** a 5-column grid, the **hard offset shadow** (`box-shadow: 10px 10px 0 #000`),
  a per-card colour variable driving the title, price typography where the unit is small and
  inline, full-width buttons inside cards.
- **Needs:** five different title colours — the cleanest answer is one `--c` custom property
  per card, which is exactly what Part 4 §1.2 teaches. Make that connection explicit.
- **Time trap:** the five icons. Skip them; the colours and the shadow carry the marks.

### `251-q2` — Sign in, split page · *Mid Term 251, Q2* · palette: **annotated**

`#0976a7` left panel + Start Free Trial · `#e90606` SIGN IN and every red link ·
`#eff1f3` input backgrounds.
- **Structure:** header (logo + title left, nav + CTA right) → 2-column body: fixed-ish blue
  testimonial panel left, centred narrow form column right.
- **Teaches:** the split-screen layout, a constrained centred form column
  (`width: min(100%, 26rem); margin-inline: auto`), full-width vs half-width social buttons,
  the **OR divider** (flex with two `::before`/`::after` rules), a circular avatar with
  `aspect-ratio: 1` + `object-fit: cover`, an input with a "Show" affordance inside it.
- **Needs:** Google/Apple/Facebook marks as inline SVG or characters. Note: in the exam draw a
  grey circle and move on.
- **Time trap:** the OR divider looks hard and takes two lines. The social button icons look
  easy and take ten minutes. Do the divider, skip the icons.

### `251-q1`/`251-q2` shared note

251 is the paper that most rewards **reading the palette strip first**. Eleven annotated
codes across two questions; every one of them is a mark.

### `252-q1` — UIU Learning Hub dashboard · *Mid Term 252, Q1* · palette: **sampled**

Dark blue sidebar, light content area, three gradient course cards, three gradient class cards.
- **Structure:** 2-column grid (fixed sidebar | fluid main) → main: title row with a rounded
  search input → 3-card grid, each card = gradient header block + progress bar + a
  space-between meta row → a white panel containing 3 more gradient cards with pill badges.
- **Teaches:** the app-shell grid, a vertical nav with an active state, **`linear-gradient`
  in anger** — every coloured surface here is a two- or three-stop gradient, progress bars
  built from two nested divs, pill badges.
- **Needs:** sampled gradient endpoints for six cards. Say clearly that gradient angles and
  stops are approximate on an unannotated paper and are not worth perfecting.
- **Time trap:** this whole paper is gradients. Get the *layout grid* right first — the grid
  is worth more than any gradient.

### `252-q2` — Course Registration + Sign Up · *Mid Term 252, Q2* · palette: **sampled**

Thin nav strip, teal→blue gradient sidebar, gradient table, form, gradient footer.
- **Structure:** thin top bar (left links / right links, space-between) → 2-column: left
  sidebar (heading, 3 semester items, a white notice card with a gradient button), right
  stacked panels (a 3-column table, then a labelled form) → full-width gradient footer.
- **Teaches:** **table styling** — the only prototype with a real `<table>`; gradient applied
  across table rows; a stacked label+input form; gradient buttons; a gradient page footer.
- **Needs:** the table is `Course | Code | Credit` with a header row and two data rows. Use
  proper `<thead>`/`<th scope="col">` — it is free marks and it is what Part 1 §7 teaches.
- **Time trap:** the sidebar's vertical gradient bleeding into a plain blue at the bottom. One
  `linear-gradient` with three stops. Do not layer divs to fake it.

### `253-q1` — ProConnect landing + signup · *Mid Term 253, Q1* · palette: **annotated** · **Phase 8 demo**

`#3F46A4` brand indigo (logo, h1, Watch Demo outline, Create Account) · `#ECEFF4` page bg ·
`#EFF6FE` left panel bg · `#50AD50` green squares + Learn More · `#71ADEC` feature link text ·
`#6FB570` green links (Terms of Service, Login Here) · `#FEFEFE` right panel and inputs ·
`#EBEBEB` / `#FEFEFE` panel edges.
- **Structure:** header (logo left, 3 links right) → one large rounded card holding a
  2-column split: left marketing column (h1 over two lines, subtitle, paragraph, three feature
  rows each a small square + link text, two side-by-side buttons — one filled, one outlined),
  right form panel (heading, three label+input pairs, a checkbox row with an inline link,
  a full-width filled button, a centred footer line with a link).
- **Why this one is the Phase 8 demo:** clean two-column split, an annotated palette, a form,
  a filled-vs-outlined button pair, and no photographs — every technique is legible and
  nothing is a distraction.
- **Time trap:** nothing here is a trap, which is the point. It is the honest 15-mark layout.

### `253-q2` — Admin dashboard · *Mid Term 253, Q2* · palette: **annotated**

`#536FFE` avatar circle + completion bar · `#C1CDFF` active nav link, Design chip, its bar ·
`#EBEBEB` grey panel background · `#F93536` rating bar · `#9EFE1E` Plan chip + bar ·
`#FEBD57` Development chip + bar.
- **Structure:** white top nav (title left, five centre links, right user block + circular
  initials avatar) → grey rounded panel: greeting block, then a 3-column stats row where
  column 1 is a profile card containing two labelled progress bars, column 2 is two stacked
  stat cards, column 3 is one tall card → "Recent Projects" heading → 3 equal cards each with
  a title, a coloured pill, a line of text, a progress bar and a percentage.
- **Teaches:** unequal grid columns where one column holds two stacked items
  (`grid-template-rows` inside a column, or nested flex), the **initials avatar**
  (fixed size + `border-radius: 50%` + `display: grid; place-items: center`), reusable
  progress bars and pills driven by one custom property.
- **Time trap:** the middle column's two stacked cards. Recognise it as a nested grid, not as
  a special case, and it costs two lines.

### `slot1-q1` — CORE-TECH admin panel · *Slot 1 Spring 2026, Q1* · palette: **annotated**

`#1975d1` blue stat card · `#378b3b` green · `#f78100` orange · `#781fa0` purple ·
`#1a237e` navy header bar + UPDATE SETTINGS · `#6c757d` RESET + admin label ·
`#d6d8da` page background.
- **Structure:** page background, then one rounded white panel with a navy header bar (brand
  left, four nav links, active one underlined, admin label right) → 4 coloured stat cards in a
  row, each with a small label, a large number and a translucent full-width pill → 2-column
  region: "System Configuration" panel (a 2-column field row — text input + `<select>` — then
  a full-width `<textarea>`) and "Access Permissions" panel (4 bordered checkbox boxes in a
  row, two of them checked, then two buttons).
- **Teaches:** heading with an underline rule (`border-bottom` on the h2, not a separate div),
  a **native `<select>`**, a `<textarea>` with `resize`, checkbox boxes as bordered flex rows,
  `accent-color` for the blue ticks, translucent pills over a coloured card
  (`background: rgb(255 255 255 / .25)`).
- **Time trap:** the four stat cards are one component with one colour variable. Writing four
  near-identical rule blocks is the slow way and looks worse.

### `slot1-q2` — UIU CareerHub job board · *Slot 1 Spring 2026, Q2* · palette: **annotated**

`#205bcb` brand, Post a Job, Apply, Apply Filters · `#9bb7dc` header underline ·
`#e2ebfa` Full-time / Remote chips · `#d6f2e7` Onsite-Dhaka chips · `#fdebc0` Internship chip ·
`#f5f6fb` page background.
- **Structure:** white header (two-tone logo, five nav links, filled button) with a thin
  coloured rule under it → 2-column: left filter sidebar (three bordered panels, each a
  heading + chevron and a checkbox list, then the filled Apply Filters button), right column
  (a heading row with the title left and a count right, then three job cards).
- **Teaches:** the **coloured left border stripe** on a card (`border-left: 4px solid`, a
  different colour per card), a card with a 2-column inner split (details left, salary and
  button right-aligned), chips as a reusable class with a colour variable, checkbox lists,
  a two-tone logo made of two `<span>`s.
- **Time trap:** the chevrons on the filter panels. A rotated `^`, a `▲` character or a
  two-line CSS triangle. Do not build an accordion — it is a static prototype.

### `slot2-q1` — Cloud storage dashboard · *Slot 2 Spring 2026, Q1* · palette: **annotated**

`#0d3e86` sidebar · `#6b63ff` Pictures · `#0db0d7` Documents · `#ea6aa8` Videos ·
`#2c74db` Audio · `#e9eff7` main content · `#cfeef3` outer page · `#c8f2ef` Keynote row ·
`#ddd8ff` Vacation photos row · `#f8d9dd` Project report row.
- **Structure:** tinted page, one large rounded container → 2-column: dark blue sidebar
  (circular avatar, four nav items, then Settings / Log out pushed to the bottom) and main
  column (pill search input, "Categories" + 4 coloured cards, "Files" + 5 white cards where
  the last is a `+` tile, then a 2-column bottom region: a storage card with a progress bar
  and a right-aligned "25% left", and a shared-folders card with three tinted rows and a
  dashed "+ Add more" button).
- **Teaches:** **`margin-top: auto` in a flex column** to pin the sidebar footer — the single
  most useful trick in this prototype; a card row where the last item is an empty "add" tile;
  tinted list rows with a label left and a tag right; a dashed-border button.
- **Time trap:** ten annotated colours. Transcribe them into `:root` custom properties as
  step one, before writing any layout. Then no colour is ever looked up twice.

### `slot2-q2` — UIU Book Share Hub · *Slot 2 Spring 2026, Q2* · palette: **annotated**

`#000000` header and footer bars · `#eb6623` orange frame + CSE Books heading ·
`#c85a32` darker orange frame edge · `#fffbeb` category card background ·
`#f97316` Submit button · `#f4f7fb` outer page background.
- **Structure:** black header (title left, four links right) → an orange full-bleed frame
  containing: a white hero card (h2 + paragraph), then a 2-column region — left white card
  with a two-line heading, a subtitle and a 2×2 grid of cream category cards; right white card
  with a heading, a subtitle, four inputs, a textarea and a full-width orange Submit → black
  footer.
- **Teaches:** the **coloured frame** effect (a section with a background colour and padding,
  white cards inside it — not borders), a 2×2 card grid, a stacked form with placeholder-only
  fields, a full-width submit button, matching black header and footer.
- **Time trap:** the two-line "Book / Categories" heading is a deliberate line break, not
  wrapping. `<br>` is correct here and takes one second.

---

## Cross-prototype patterns worth teaching once and reusing

These recur across the twelve papers. Each gets its own lesson playground **and** a
"you have seen this before" cross-link from every walkthrough that uses it.

| Pattern | Appears in |
|---|---|
| Header: logo left, links right, CTA button far right | all 12 |
| Sidebar + main app shell (`grid-template-columns: 240px 1fr`) | 252-q1, 252-q2, slot1-q2, slot2-q1 |
| Equal card row (`repeat(auto-fit, minmax(…, 1fr))` or `flex: 1`) | 243-q2, 251-q1, 252-q1, 253-q2, slot1-q1, slot2-q1, slot2-q2 |
| Stacked label + input form | 251-q2, 252-q2, 253-q1, slot1-q1, slot2-q2 |
| Progress bar from two nested divs | 252-q1, 253-q2, slot2-q1 |
| Coloured pill / chip driven by one variable | 252-q1, 253-q2, slot1-q1, slot1-q2 |
| Circular avatar (`aspect-ratio: 1`, `border-radius: 50%`) | 251-q2, 253-q2, slot2-q1 |
| Two-column split panel, one tinted | 251-q2, 253-q1, slot2-q2 |
| Coloured left border stripe on a card | 243-q2, slot1-q2 |
| Card with a shadow and a radius | 10 of 12 |
| `linear-gradient` surfaces | 252-q1, 252-q2 (heavily), 243-q1 |
