/* cheatsheet.js — one searchable, printable reference page.

   Built from the supersimple.dev HTML/CSS reference PDF, plus everything the
   five course notes cover that the PDF does not. Grouped by topic.

   Row shape: [syntax, meaning, tryConfig?]
   A third element makes a "try it" button that mounts a playground inline.
   Only rows where seeing it run genuinely adds something get one — a button
   on every row would be noise, and most of these are pure recall. */

WP.cheatsheet = [

  /* ---------------------------------------------------------- HTML --- */
  {
    id: 'html-syntax',
    group: 'HTML syntax',
    rows: [
      ['&lt;p&gt;text&lt;/p&gt;', 'Most elements come in pairs: an opening and a matching closing tag.'],
      ['&lt;img&gt; &lt;br&gt; &lt;hr&gt; &lt;input&gt; &lt;meta&gt; &lt;link&gt;',
       'Void elements. They never close. The trailing slash in <code>&lt;img /&gt;</code> does nothing.'],
      ['name="value"', 'Attributes go in the opening tag only. Always quote the value.'],
      ['required disabled checked hidden',
       'Boolean attributes have no value. Presence is true; <code>disabled="false"</code> still disables.'],
      ['Extra spaces and newlines', 'Collapse to a single space. Indent freely; it costs nothing visually.'],
      ['&lt;!-- comment --&gt;', 'Ignored by the browser, visible in View Source.'],
      ['&amp;lt; &amp;gt; &amp;amp;', 'Escape the characters that are part of the syntax.'],
      ['&amp;nbsp;', 'A space that never breaks a line. Use in "10&nbsp;kg".'],
      ['&amp;times; &amp;middot; &amp;hellip; &amp;#8594;',
       '× · … → — cheap stand-ins for icons under exam conditions.',
       { html: '<p>Close &times; &nbsp; Next &#8250; &nbsp; Tick &#10003; &nbsp; Arrow &#8594;</p>' }]
    ]
  },

  {
    id: 'html-head',
    group: 'The head section',
    rows: [
      ['&lt;!DOCTYPE html&gt;', 'Standards mode. Without it the box model reverts to 1990s rules.'],
      ['&lt;html lang="en"&gt;', 'Pronunciation rules for screen readers. <code>bn</code> for Bengali.'],
      ['&lt;meta charset="UTF-8"&gt;', 'Must appear in the first 1024 bytes or accented text becomes mojibake.'],
      ['&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;',
       'Without it, every media query is ignored on phones.'],
      ['&lt;title&gt;Page | Site&lt;/title&gt;', 'Tab label and the biggest single on-page SEO signal.'],
      ['&lt;meta name="description" content="…"&gt;', '150–160 characters. Unique per page.'],
      ['&lt;link rel="stylesheet" href="style.css"&gt;', 'Load a CSS file.'],
      ['&lt;link rel="icon" href="icon.svg" type="image/svg+xml"&gt;', 'Favicon.'],
      ['&lt;meta property="og:image" content="https://…"&gt;',
       'Social preview, about 1200×630. Must be an <em>absolute</em> URL.'],
      ['&lt;script src="a.js" defer&gt;', 'Downloads in parallel, runs after parsing, in order. The default you want.']
    ]
  },

  {
    id: 'html-paths',
    group: 'Filepaths',
    rows: [
      ['href="style.css"', 'A file beside the current one.'],
      ['href="css/style.css"', 'Into a folder beside the current file.'],
      ['href="../style.css"', 'One folder up, then the file.'],
      ['href="/style.css"',
       'Root relative — from the <em>domain</em> root. <strong>Breaks under a GitHub Pages ' +
       'subfolder deployment.</strong> Works locally, 404s live.'],
      ['href="#section-id"', 'Jump to an element on this page.'],
      ['href="mailto:me@x.com"', 'Opens the mail client.'],
      ['href="tel:+8801700000000"', 'Dials on mobile.'],
      ['url() in CSS', 'Relative to <em>the CSS file</em>, not the HTML file.']
    ]
  },

  {
    id: 'html-text',
    group: 'Text and inline elements',
    rows: [
      ['&lt;h1&gt; … &lt;h6&gt;', 'A document outline, not font sizes. One h1, never skip a level down.'],
      ['&lt;p&gt;', 'A paragraph. Cannot contain block elements — the parser will close it for you.'],
      ['&lt;br&gt;', 'A line break that is part of the content. Never for vertical space.'],
      ['&lt;strong&gt; / &lt;b&gt;', 'Strong importance / stylistically offset. Both render bold.'],
      ['&lt;em&gt; / &lt;i&gt;', 'Stress emphasis / alternate voice. Both render italic.'],
      ['&lt;mark&gt;', 'Relevance in the current context, such as a search hit.'],
      ['&lt;small&gt;', 'Side comments and legal small print.'],
      ['&lt;del&gt; / &lt;ins&gt;', 'Removed and added content, such as a price change.'],
      ['&lt;code&gt; &lt;kbd&gt; &lt;samp&gt;', 'Code, keyboard input, program output.'],
      ['&lt;sub&gt; / &lt;sup&gt;', 'H<sub>2</sub>O, x<sup>2</sup>.'],
      ['&lt;abbr title="…"&gt;', 'Abbreviation with its expansion.'],
      ['&lt;time datetime="2026-08-23"&gt;', 'A machine-readable date.'],
      ['&lt;span&gt;', 'The generic inline hook with no meaning. A two-tone logo is one span.',
       { html: '<h1 class="logo">UIU <span>CareerHub</span></h1>',
         css: '.logo { font-family: system-ui; font-size: 26px; color: #17202a; }\n.logo span { color: #205bcb; }' }]
    ]
  },

  {
    id: 'html-lists',
    group: 'Lists',
    rows: [
      ['&lt;ul&gt;&lt;li&gt;', 'Unordered. Only <code>&lt;li&gt;</code> may be a direct child.'],
      ['&lt;ol start="3" reversed type="a"&gt;', 'Ordered. <code>type</code> takes 1 a A i I.'],
      ['&lt;dl&gt;&lt;dt&gt;&lt;dd&gt;', 'Name and value pairs.'],
      ['Nested list', 'Goes <em>inside</em> the parent <code>&lt;li&gt;</code>, not between two of them.'],
      ['list-style: none; padding: 0',
       'Both are needed. Clearing the bullets does not clear the indent added for them.',
       { html: '<ul class="nav">\n  <li><a href="#">Home</a></li>\n  <li><a href="#">Jobs</a></li>\n  <li><a href="#">Contact</a></li>\n</ul>',
         css: '.nav {\n  list-style: none;\n  padding: 0;\n  display: flex;\n  gap: 20px;\n  font-family: system-ui;\n}\n.nav a { color: #205bcb; text-decoration: none; }' }]
    ]
  },

  {
    id: 'html-images',
    group: 'Images and media',
    rows: [
      ['&lt;img src="a.jpg" alt="…" width="800" height="600"&gt;',
       'Always set width and height — it reserves space and stops the page jumping.'],
      ['alt=""', 'Empty, not missing. Marks the image as decorative so screen readers skip it.'],
      ['loading="lazy"', 'Defer offscreen images. Never on the hero image.'],
      ['srcset="a-400.jpg 400w, a-800.jpg 800w" sizes="50vw"',
       'Resolution switching: the browser picks the best file.'],
      ['&lt;picture&gt;&lt;source&gt;&lt;img&gt;',
       'Art direction or format fallback. The inner <code>&lt;img&gt;</code> is mandatory.'],
      ['&lt;figure&gt;&lt;figcaption&gt;', 'Caption must be the first or last child.'],
      ['&lt;video controls poster="t.jpg"&gt;', '<code>autoplay</code> is ignored unless also <code>muted</code>.'],
      ['&lt;iframe title="…" loading="lazy"&gt;', 'Always give it a title; it is how a screen reader announces the frame.'],
      ['object-fit: cover',
       'Fill the box and crop. <code>contain</code> fits and letterboxes; <code>fill</code> distorts.'],
      ['aspect-ratio: 16 / 9',
       'Reserve a shape with no height. The right way to make an exam image placeholder.',
       { html: '<div class="ph">hero.jpg</div>',
         css: '.ph {\n  aspect-ratio: 16 / 9;\n  width: 260px;\n  display: grid;\n  place-items: center;\n  border-radius: 8px;\n  color: #fff;\n  font-family: system-ui;\n  background: linear-gradient(135deg, #0f766e, #2dd4bf);\n}' }]
    ]
  },

  {
    id: 'html-tables',
    group: 'Tables',
    rows: [
      ['&lt;caption&gt;', 'The table title. Must be the first child.'],
      ['&lt;thead&gt; &lt;tbody&gt; &lt;tfoot&gt;', 'Row groups. <code>thead</code> repeats on printed pages.'],
      ['&lt;th scope="col"&gt; / scope="row"', 'Tells a screen reader which cells a header governs.'],
      ['colspan="2" rowspan="2"', 'Merge cells across or down.'],
      ['border-collapse: collapse', 'Removes the double borders. Always want this.',
       { html: '<table>\n  <thead><tr><th>Course</th><th>Code</th><th>Credit</th></tr></thead>\n  <tbody>\n    <tr><td>Web Programming</td><td>CSE201</td><td>3.0</td></tr>\n    <tr><td>Data Structures</td><td>CSE202</td><td>3.0</td></tr>\n  </tbody>\n</table>',
         css: 'body { font-family: system-ui; font-size: 13px; }\ntable { border-collapse: collapse; width: 100%; }\nth, td { border: 1px solid #dfe3e8; padding: 8px 12px; text-align: left; }\nthead th { background: #eceff3; }\ntbody tr:nth-child(even) { background: #fafafa; }' }],
      ['overflow-x: auto on a wrapper', 'So a wide table scrolls instead of breaking the page.']
    ]
  },

  {
    id: 'html-forms',
    group: 'Forms and inputs',
    rows: [
      ['&lt;label for="id"&gt;', 'Every input needs one. Clicking the label focuses the field.'],
      ['&lt;label&gt;Text &lt;input&gt;&lt;/label&gt;', 'Wrapping works too, and needs no <code>id</code>. Faster under a clock.'],
      ['name="x"', 'Without it the value is never submitted.'],
      ['type="text | email | password | number | tel | url | search"', 'Choose the right one and get validation and the right mobile keyboard free.'],
      ['type="date | time | month | week"', 'Native pickers.'],
      ['type="checkbox" / "radio"', 'Radios in one group must share a <code>name</code>.'],
      ['type="file" accept="image/*" multiple', 'File picker.'],
      ['type="range" / "color" / "hidden"', 'Slider, colour picker, submitted-but-invisible.'],
      ['required minlength maxlength', 'Native validation with no JavaScript.'],
      ['min max step', 'Numeric and date limits. <code>step=".01"</code> for money.'],
      ['pattern="[0-9]{9}" title="Nine digits"', 'A regex the value must match. The title is shown in the error bubble.'],
      ['autocomplete="email"', 'Correct tokens let password managers fill accurately. An accessibility requirement.'],
      ['&lt;select&gt;&lt;optgroup&gt;&lt;option&gt;', 'Grouped dropdown.'],
      ['&lt;textarea rows="4"&gt;', 'Value goes <em>between</em> the tags, not in an attribute.'],
      ['&lt;fieldset&gt;&lt;legend&gt;', 'The correct way to label a set of radio buttons.'],
      ['&lt;button type="button"&gt;',
       'Inside a form a button defaults to <code>submit</code> and will reload the page.'],
      ['input:user-invalid',
       'Only complains after the user has interacted. Prefer it to <code>:invalid</code>.'],
      ['accent-color: teal', 'Recolours native checkboxes, radios and range sliders in one line.',
       { html: '<label class="o"><input type="checkbox" checked> Read</label>\n<label class="o"><input type="checkbox"> Write</label>',
         css: 'body { font-family: system-ui; font-size: 13px; }\n.o { display: flex; align-items: center; gap: 8px;\n     padding: 8px 12px; margin-bottom: 6px;\n     border: 1px solid #dfe3e8; border-radius: 8px; }\ninput { accent-color: #1a237e; width: 1.05em; height: 1.05em; }\n.o:has(input:checked) { border-color: #1a237e; color: #1a237e; font-weight: 600; }' }],
      ['input, button, textarea, select { font: inherit }',
       'Form controls do not inherit fonts. This is the single most forgotten reset line.']
    ]
  },

  {
    id: 'html-semantic',
    group: 'Semantic elements',
    rows: [
      ['&lt;header&gt;', 'Introductory content. Landmark: banner.'],
      ['&lt;nav&gt;', 'A block of major navigation links. Landmark: navigation.'],
      ['&lt;main&gt;', 'The unique content of this page. Exactly one, never nested in the others.'],
      ['&lt;article&gt;', 'Self-contained: a post, a card, a job listing.'],
      ['&lt;section&gt;', 'A thematic grouping, normally with a heading.'],
      ['&lt;aside&gt;', 'Sidebar, related links, filters.'],
      ['&lt;footer&gt;', 'Closing content. Landmark: contentinfo.'],
      ['&lt;details&gt;&lt;summary&gt;', 'A native accordion. No JavaScript needed.'],
      ['&lt;div&gt;', 'No meaning. Correct when you are only hanging CSS on something.'],
      ['tabindex="0" / "-1"', 'Into the natural tab order / focusable by script only. Never use positive values.'],
      ['aria-label="Close"', 'An accessible name for something with no visible text.'],
      ['aria-hidden="true"', 'Hide decoration from screen readers. Never on anything focusable.'],
      ['data-state="open"', 'Your own attribute, targetable in CSS with <code>[data-state="open"]</code>.']
    ]
  },

  /* ----------------------------------------------------------- CSS --- */
  {
    id: 'css-delivery',
    group: 'Getting CSS onto the page',
    rows: [
      ['&lt;link rel="stylesheet" href="style.css"&gt;', 'External. Cached across pages.'],
      ['&lt;style&gt; … &lt;/style&gt;', 'Internal. A perfectly good exam answer, and no path to mistype.'],
      ['style="color: red"', 'Inline. Beats every selector. Useful for a per-item custom property.'],
      ['@import url("a.css")', 'Avoid — it blocks parallel downloading.'],
      ['/* comment */', 'There is no <code>//</code> line comment in CSS.']
    ]
  },

  {
    id: 'css-selectors',
    group: 'Selectors',
    rows: [
      ['*', 'Everything.'],
      ['p', 'Every <code>&lt;p&gt;</code>. A type selector.'],
      ['.card', 'Every element with that class.'],
      ['#header', 'The element with that id. Very high specificity — avoid styling by id.'],
      ['.card.featured', 'Both classes on the <em>same</em> element. No space.'],
      ['.card .featured', 'A <code>.featured</code> <em>inside</em> a <code>.card</code>. The space changes everything.'],
      ['h1, h2, .lead', 'Grouping. Each is scored and matched separately.'],
      ['.card &gt; p', 'Child: a direct child only.'],
      ['h2 + p', 'Adjacent sibling: the one immediately after.'],
      ['h2 ~ p', 'General sibling: every one after, same parent.'],
      ['[disabled]', 'Has the attribute, whatever its value.'],
      ['[type="email"]', 'Exact value match.'],
      ['[href^="https"]', 'Starts with.'],
      ['[href$=".pdf"]', 'Ends with.'],
      ['[href*="youtube"]', 'Contains anywhere.'],
      ['[data-state="open" i]', 'The <code>i</code> flag makes the match case insensitive.']
    ]
  },

  {
    id: 'css-pseudo',
    group: 'Pseudo-classes and pseudo-elements',
    rows: [
      [':hover :active :focus', 'Pointer over, being pressed, has focus.'],
      [':focus-visible', 'Focused <em>and</em> a ring is warranted. Use this for outlines, not <code>:focus</code>.'],
      [':focus-within', 'The element, or anything inside it, has focus. Great for a whole form row.'],
      [':first-child :last-child :only-child', 'Position among all siblings.'],
      [':nth-child(2n) / (odd) / (3n) / (-n+3)', 'Every second / odd / third / the first three.'],
      [':nth-child counts all siblings', '<code>:nth-of-type</code> counts only siblings of the same tag.'],
      [':not(.a, .b)', 'Anything that does not match. Accepts a list.'],
      [':is(h1, h2, h3)', 'Grouping shorthand. Takes the specificity of its most specific argument.'],
      [':where(h1, h2)', 'Same as <code>:is</code> but scores <strong>zero</strong>. The safe way to write defaults.'],
      [':has(&gt; img)', 'The parent selector: an element that contains a match.',
       { html: '<label class="row"><input type="checkbox"> Full-time</label>\n<label class="row"><input type="checkbox" checked> Internship</label>',
         css: 'body { font-family: system-ui; font-size: 13px; }\n.row { display: flex; align-items: center; gap: 8px;\n       padding: 8px 10px; margin-bottom: 6px;\n       border: 1px solid #dfe3e8; border-radius: 8px; }\ninput { accent-color: #205bcb; }\n.row:has(input:checked) {\n  background: #e2ebfa; border-color: #205bcb; font-weight: 600;\n}' }],
      [':checked :disabled :required', 'Form control states.'],
      [':placeholder-shown', 'The field is still empty. Powers the floating label.'],
      [':root', 'The <code>&lt;html&gt;</code> element. Where custom properties live.'],
      ['::before / ::after',
       'A generated child. <strong>Requires <code>content</code></strong>, even if empty.',
       { html: '<div class="divider"><span>OR</span></div>',
         css: 'body { font-family: system-ui; font-size: 13px; }\n.divider { display: flex; align-items: center; gap: 10px; }\n.divider::before, .divider::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: #dfe3e8;\n}\n.divider span { color: #5b6672; font-size: 12px; }' }],
      ['::marker ::placeholder ::selection', 'The bullet, the placeholder text, the highlighted text.'],
      ['::first-letter', 'Drop caps.']
    ]
  },

  {
    id: 'css-cascade',
    group: 'Cascade and specificity',
    rows: [
      ['Origin → layer → specificity → source order', 'The four steps, in that order. Nothing else counts.'],
      ['(A, B, C)', 'A = ids, B = classes/attributes/pseudo-classes, C = types/pseudo-elements.'],
      ['#nav', '(1,0,0)'],
      ['.card:hover', '(0,2,0)'],
      ['li::before', '(0,0,2) — a pseudo-<em>element</em> is column C, not B.'],
      ['Not decimal', 'Eleven classes never beat one id.'],
      ['Equal specificity', 'The rule written <em>later</em> wins. That is why overrides go at the bottom.'],
      ['style="…"', 'Beats every selector.'],
      ['!important', 'Beats everything, including inline style. Almost always the wrong fix.'],
      ['Inherited', 'color, font-*, line-height, letter-spacing, text-align, visibility, cursor, list-style.'],
      ['Not inherited', 'margin, padding, border, background, width, height, display, position, and all flex/grid properties.'],
      ['inherit / initial / unset / revert', 'Force the parent value / the spec default / whichever applies / the browser default.']
    ]
  },

  {
    id: 'css-box',
    group: 'Box model',
    rows: [
      ['*, *::before, *::after { box-sizing: border-box }',
       'The first line of every project. Width then includes padding and border.',
       { html: '<div class="box content">content-box</div>\n<div class="box border">border-box</div>\n<p class="ruler">200px</p>',
         css: 'body { font-family: system-ui; font-size: 13px; }\n.box { width: 200px; padding: 20px; border: 4px solid #0f766e;\n       background: #e3f2f0; margin-bottom: 10px; }\n.content { box-sizing: content-box; }\n.border  { box-sizing: border-box; }\n.ruler { width: 200px; margin: 0; border-top: 2px dashed #b4541b; color: #b4541b; }' }],
      ['margin: 10px 20px', 'Top/bottom, then left/right.'],
      ['margin: 10px 20px 30px 40px', 'Clockwise from the top: top, right, bottom, left.'],
      ['margin: 0 auto', 'Centres a block that has a width.'],
      ['Margin collapsing',
       'Adjacent vertical margins merge to the larger, not the sum. Never happens in flex or grid.'],
      ['display: flow-root', 'Contains floats and stops margin collapsing, without the side effects of <code>overflow: hidden</code>.'],
      ['border: 1px solid #ccc', '<strong>Without a style the border does not appear at all.</strong>'],
      ['border-radius: 50%', 'A circle from a square.'],
      ['border-left: 4px solid', 'The coloured stripe down the side of a card.'],
      ['outline / outline-offset', 'Drawn outside the border, takes no layout space. The right tool for focus rings.']
    ]
  },

  {
    id: 'css-units',
    group: 'Units and values',
    rows: [
      ['px', 'Borders, small fixed details, shadows.'],
      ['%', 'Of the parent. Padding and margin percentages use the parent <em>width</em>, even vertically.'],
      ['em', 'Of the element’s own font-size. Compounds when nested.'],
      ['rem', 'Of the root font-size, 16px by default. Your default unit.'],
      ['ch', 'Width of the "0" character. <code>max-width: 65ch</code> is the readable measure.'],
      ['vw / vh', '1% of the viewport.'],
      ['dvh', 'Dynamic viewport height. Use instead of <code>100vh</code>, which is wrong on phones.'],
      ['fr', 'A share of the remaining space. Grid tracks only.'],
      ['line-height: 1.5', 'Unitless. A unit is inherited as a fixed value and crushes larger child text.'],
      ['calc(100% - 2rem)', '<strong>Spaces around + and − are mandatory.</strong>'],
      ['min() / max()', '<code>min()</code> caps a value; <code>max()</code> sets a floor.'],
      ['clamp(1.5rem, 1rem + 3vw, 3rem)', 'Fluid sizing with hard limits.'],
      ['width: min(100% - 2rem, 68rem); margin-inline: auto',
       'A centred container with guaranteed gutters. Worth memorising.']
    ]
  },

  {
    id: 'css-colour',
    group: 'Colour',
    rows: [
      ['#0096FF', 'Hex: two digits each for red, green, blue.'],
      ['#09F', 'Short hex. Only when both digits of each pair match.'],
      ['#0096FF80', 'Eight digits — the last pair is alpha.'],
      ['rgb(0 150 255 / 50%)', 'Modern syntax: spaces, and a slash before alpha.'],
      ['hsl(210 100% 50%)', 'Hue, saturation, lightness. Best for building a palette by hand.'],
      ['oklch(70% 0.15 240)', 'Perceptually uniform — equal lightness numbers look equally bright.'],
      ['currentColor', 'The element’s own colour. Set it once and let borders and SVG follow.'],
      ['color-mix(in oklch, blue 30%, white)', 'Blend two colours. Hover shades without a design tool.'],
      ['opacity: .5 vs rgb(0 0 0 / .5)',
       'Opacity fades the element <em>and its text</em>. An alpha background fades only that layer.'],
      [':root { --brand: #0f766e }',
       'Store every colour as a variable. In the exam, transcribe the annotated palette here first.',
       { html: '<div class="sw" style="--c: var(--pictures)">#6b63ff Pictures</div>\n<div class="sw" style="--c: var(--documents)">#0db0d7 Documents</div>\n<div class="sw" style="--c: var(--videos)">#ea6aa8 Videos</div>',
         css: ':root {\n  --pictures:  #6b63ff;\n  --documents: #0db0d7;\n  --videos:    #ea6aa8;\n}\nbody { font-family: system-ui; font-size: 13px; }\n.sw { background: var(--c); color: #fff; padding: 14px;\n      border-radius: 8px; margin-bottom: 8px;\n      font-family: ui-monospace, monospace; }' }]
    ]
  },

  {
    id: 'css-text',
    group: 'Text styles',
    rows: [
      ['font-family: Roboto, Arial, sans-serif', 'A stack. Always end with a generic family.'],
      ['font-weight: 400 / 500 / 600 / 700', 'The weight must exist in the font or the browser fakes it badly.'],
      ['font: italic 700 1.25rem/1.4 Roboto, sans-serif',
       'Shorthand. <strong>Resets every font property you omit.</strong>'],
      ['text-align: left | center | right | justify', ''],
      ['text-transform: uppercase', 'Appearance only — the underlying text stays readable to screen readers.'],
      ['letter-spacing: .1em', 'Positive tracking on uppercase labels; negative on large headings.'],
      ['text-decoration: none', 'Removes the underline.'],
      ['white-space: nowrap', 'Stop wrapping. Useful on chips and buttons.'],
      ['overflow-wrap: anywhere', 'Break long unbroken strings such as URLs.'],
      ['text-wrap: balance', 'Evens out heading lines so you never get one orphan word.'],
      ['white-space: nowrap; overflow: hidden; text-overflow: ellipsis',
       'One-line truncation. All three are required.',
       { html: '<p class="truncate">One line only, with an ellipsis when it runs out of room.</p>\n<p class="clamp">Three lines, then an ellipsis. Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam tempor erat elitr rebum at clita.</p>',
         css: 'body { font-family: system-ui; font-size: 14px; }\np { width: 240px; border: 1px dashed #dfe3e8; padding: 8px; }\n.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.clamp { display: -webkit-box; -webkit-line-clamp: 3;\n         -webkit-box-orient: vertical; overflow: hidden; }' }],
      ['-webkit-line-clamp: 3', 'Multi-line clamp. Needs <code>display: -webkit-box</code> and <code>overflow: hidden</code>.']
    ]
  },

  {
    id: 'css-display',
    group: 'Display and flow',
    rows: [
      ['block', 'New line, full width. Respects every dimension.'],
      ['inline', '<strong>Ignores width and height.</strong> Vertical margins have no layout effect.'],
      ['inline-block', 'Sits inline but respects dimensions. Gets a whitespace gap between elements.'],
      ['none', 'Removed from layout entirely. Not read by screen readers.'],
      ['visibility: hidden', 'Invisible but still occupies its space.'],
      ['opacity: 0', 'Invisible, occupies space, and <em>still clickable</em>. Add <code>pointer-events: none</code>.'],
      ['contents', 'The box disappears, the children remain. Careful with the accessibility tree.'],
      ['overflow: auto | hidden | clip', 'Scroll when needed / clip / clip without becoming scrollable.'],
      ['overflow: hidden on a card', 'Makes a child background respect the parent’s <code>border-radius</code>.'],
      ['float: left', 'Only still correct for wrapping text around an image.']
    ]
  },

  {
    id: 'css-flex',
    group: 'Flexbox',
    rows: [
      ['display: flex', 'Children become flex items along one axis.'],
      ['flex-direction: row | column', 'Sets the main axis. Switching it swaps what justify and align mean.'],
      ['justify-content', 'Along the <em>main</em> axis: flex-start, center, space-between, space-around, space-evenly.'],
      ['align-items', 'Along the <em>cross</em> axis: stretch (default), center, flex-start, flex-end, baseline.'],
      ['flex-wrap: wrap', 'Without it items shrink rather than wrapping.'],
      ['align-content', 'Distributes multiple lines. Only does anything once items wrap.'],
      ['gap: 1rem', 'Space between items. No margin hacks, no trailing space.'],
      ['flex: 1', '<code>1 1 0%</code> — equal share of all space, whatever the content.'],
      ['flex: auto', '<code>1 1 auto</code> — grows from content size, so items end up unequal.'],
      ['flex: none', '<code>0 0 auto</code> — fixed at content size.'],
      ['flex: 1 1 260px', 'Grow, shrink, wrap below 260px. A responsive card row with no media query.',
       { html: '<div class="cards">\n  <article class="card">Master Chefs</article>\n  <article class="card">Quality Food</article>\n  <article class="card">Online Order</article>\n  <article class="card">24/7 Service</article>\n</div>',
         css: 'body { font-family: system-ui; font-size: 13px; }\n.cards { display: flex; flex-wrap: wrap; gap: 14px; }\n.card { flex: 1 1 160px; background: #fff;\n        border: 1px solid #dfe3e8; border-radius: 8px; padding: 16px; }' }],
      ['margin-left: auto', 'Pushes this item and everything after it to the far end. The nav-bar trick.',
       { html: '<nav class="nav">\n  <strong class="logo">UIU CareerHub</strong>\n  <a href="#">Jobs</a>\n  <a href="#">Companies</a>\n  <button class="btn">+ Post a Job</button>\n</nav>',
         css: 'body { font-family: system-ui; font-size: 13px; margin: 0; }\n.nav { display: flex; align-items: center; gap: 1.5rem;\n       padding: 12px 16px; border-bottom: 1px solid #dfe3e8; }\n.logo { margin-right: auto; }\n.nav a { color: #17202a; text-decoration: none; }\n.btn { background: #205bcb; color: #fff; border: 0;\n       border-radius: 6px; padding: 8px 14px; font: inherit; }' }],
      ['align-self', 'Overrides <code>align-items</code> for one item.'],
      ['min-width: 0',
       '<strong>The fix when a flex row overflows.</strong> Flex items default to <code>min-width: auto</code>.']
    ]
  },

  {
    id: 'css-grid',
    group: 'Grid',
    rows: [
      ['display: grid', 'Two dimensions at once.'],
      ['grid-template-columns: 200px 1fr', 'Fixed sidebar, fluid main. Four prototypes are exactly this.',
       { html: '<div class="page">\n  <aside class="side">Sidebar</aside>\n  <main class="main">Main content</main>\n</div>',
         css: 'body { font-family: system-ui; font-size: 13px; margin: 0; }\n.page { display: grid; grid-template-columns: 200px 1fr;\n        gap: 12px; padding: 12px; }\n.side { background: #205bcb; color: #fff; padding: 20px; border-radius: 8px; }\n.main { background: #eceff3; padding: 20px; border-radius: 8px; }' }],
      ['repeat(3, 1fr)', 'Three equal columns.'],
      ['minmax(200px, 1fr)', 'Never smaller than 200px, otherwise share the space.'],
      ['repeat(auto-fit, minmax(200px, 1fr))',
       'As many as fit, stretched to fill. A responsive gallery with no media query.'],
      ['minmax(min(260px, 100%), 1fr)', 'The safe version — stops <code>auto-fit</code> collapsing on a narrow screen.'],
      ['gap: 1rem 2rem', 'Row gap, then column gap.'],
      ['grid-column: 1 / 3', 'By line number. Lines count from 1.'],
      ['grid-column: 1 / -1', 'Full width, whatever the column count. Memorise this one.'],
      ['grid-column: span 2', 'Span from wherever it lands.'],
      ['grid-template-areas: "sidebar main"',
       'Write the layout as words. Every row must have the same number of words or the whole declaration is dropped.'],
      ['grid-area: main', 'Place an item into a named area.'],
      ['grid-auto-rows: minmax(100px, auto)', 'Size of rows the browser creates for you.'],
      ['place-items: center', 'The shortest true centring in CSS.'],
      ['.stack > * { grid-area: 1 / 1 }', 'Overlap elements without positioning, keeping them in flow for sizing.'],
      ['grid-template-rows: subgrid', 'A nested grid adopts the parent’s lines, so card buttons line up.']
    ]
  },

  {
    id: 'css-position',
    group: 'Position and z-index',
    rows: [
      ['static', 'The default. Offsets and <code>z-index</code> are ignored.'],
      ['relative', 'Shifted from its own position; its original space is kept.'],
      ['absolute', 'Positioned against <strong>the nearest positioned ancestor</strong>. Removed from flow.'],
      ['fixed', 'Positioned against the viewport. Stays put while scrolling.'],
      ['sticky', 'Relative until it hits the offset, then fixed within its parent.'],
      ['position: relative parent + absolute child',
       'The badge-in-the-corner pattern. Forget the parent and it flies to the page corner.',
       { html: '<div class="card">\n  <span class="badge">3</span>\n  A card with a positioned parent\n</div>',
         css: 'body { font-family: system-ui; font-size: 13px; padding: 16px; }\n.card { position: relative; background: #fff;\n        border: 1px solid #dfe3e8; border-radius: 8px; padding: 24px 16px; }\n.badge { position: absolute; top: 8px; right: 8px;\n         background: #b4541b; color: #fff;\n         min-width: 22px; height: 22px; border-radius: 50%;\n         display: grid; place-items: center; font-size: 12px; font-weight: 700; }' }],
      ['inset: 0', 'Shorthand for all four offsets at zero.'],
      ['top: 50%; left: 50%; transform: translate(-50%, -50%)', 'Centre something of unknown size.'],
      ['sticky needs an offset', 'Without <code>top</code>, <code>bottom</code>, <code>left</code> or <code>right</code> it does nothing, silently.'],
      ['overflow on an ancestor', 'Breaks <code>position: sticky</code>. The usual reason it "does not work".'],
      ['z-index needs position', 'It has no effect on a static element.'],
      ['Stacking context', 'Created by opacity &lt; 1, transform, filter, will-change, isolation. Children can never escape it.'],
      ['transform on an ancestor', 'Traps <code>position: fixed</code> children so they scroll with the page.']
    ]
  },

  {
    id: 'css-backgrounds',
    group: 'Backgrounds, gradients and shadows',
    rows: [
      ['background: #222 url("a.jpg") center/cover no-repeat', 'Shorthand. Position and size are separated by a slash.'],
      ['background-size: cover | contain', 'Fill and crop / fit and letterbox.'],
      ['Multiple layers, comma separated', 'The <strong>first listed sits on top</strong>.'],
      ['linear-gradient(rgb(0 0 0 / .6), rgb(0 0 0 / .6)), url("hero.jpg")',
       'A flat scrim over a photo. How you get readable white text on any image.'],
      ['linear-gradient(135deg, #00c6ff, #0072ff)', 'Angles run clockwise from "to top". 135deg reads as a natural highlight.',
       { html: '<div class="g linear">135deg</div>\n<div class="g radial">radial</div>\n<div class="g sidebar">three stops</div>',
         css: 'body { font-family: system-ui; font-size: 12px; display: flex; gap: 8px; }\n.g { flex: 1; height: 170px; border-radius: 8px; padding: 8px;\n     color: #fff; font-weight: 600; }\n.linear  { background: linear-gradient(135deg, #00c6ff, #0072ff); }\n.radial  { background: radial-gradient(circle at 30% 30%, #ea6aa8, #6b63ff); }\n.sidebar { background: linear-gradient(180deg, #5ed4c8 0%, #8fb6e8 55%, #b9c9e8 100%); }' }],
      ['radial-gradient / conic-gradient / repeating-linear-gradient', 'From a point / around a point / striped.'],
      ['A gradient is an image', 'It belongs in <code>background-image</code>. In <code>background-color</code> it does nothing.'],
      ['box-shadow: 0 2px 4px rgb(0 0 0 / .1)', 'x, y, blur, colour.'],
      ['box-shadow: 0 2px 4px 2px #0002', 'The fourth length is spread.'],
      ['Stacked shadows', 'Two or three with increasing blur and decreasing opacity, x offset 0. Realistic depth.'],
      ['box-shadow: 10px 10px 0 #000',
       'A deliberate hard offset shadow with no blur. The 251 Q1 pricing cards.'],
      ['background-clip: text', 'Gradient text. Needs <code>-webkit-background-clip</code> too, and a transparent colour.'],
      ['backdrop-filter: blur(12px)', 'Frosted glass. Needs a semi-transparent background to have any effect.']
    ]
  },

  {
    id: 'css-motion',
    group: 'Transitions and animation',
    rows: [
      ['transition: background-color .2s ease', 'Put it on the <em>base</em> rule, not on <code>:hover</code>.'],
      ['transition: a .2s, b .2s', 'Comma separate several.'],
      ['Duration', '.15s–.3s for interface feedback. Slower feels sluggish.'],
      ['ease-out', 'Things entering. Your default.'],
      ['ease-in', 'Things leaving.'],
      ['cubic-bezier(.34,1.56,.64,1)', 'Overshoot and settle.'],
      ['Cannot transition', '<code>display</code>, and anything to or from <code>auto</code>.'],
      ['grid-template-rows: 0fr → 1fr', 'Animate to auto height exactly, with no magic number.'],
      ['transform: translate | scale | rotate', 'Does not affect layout, so neighbours do not move.'],
      ['Order matters', '<code>translate then rotate</code> lands somewhere different from <code>rotate then translate</code>.'],
      ['@keyframes name { from { } to { } }', 'Define the animation.'],
      ['animation: name .4s ease-out both', 'Name, duration, curve, fill-mode.'],
      ['animation-fill-mode: both', '<strong>Without it the element snaps back</strong> when the animation ends.'],
      ['animation-delay: calc(var(--i) * .06s)', 'Stagger with one rule and an index in the HTML.'],
      ['Animate transform and opacity only', 'Everything else forces layout on every frame.'],
      ['@media (prefers-reduced-motion: reduce)', 'Not optional politeness. Ship it in every project.']
    ]
  },

  {
    id: 'css-responsive',
    group: 'Responsive',
    rows: [
      ['@media (min-width: 40rem) { }', 'Mobile first. Use <code>rem</code> so it respects user font settings.'],
      ['@media (max-width: 39.99rem), print { }', 'A comma means OR.'],
      ['@media (40rem &lt;= width &lt; 64rem) { }', 'Range syntax.'],
      ['Common breakpoints', '40rem (640), 48rem (768), 64rem (1024), 80rem (1280). Pick from content, not device names.'],
      ['@media (prefers-color-scheme: dark)', 'Respect the operating system theme.'],
      ['@media (hover: hover)', 'Only apply hover effects on devices that truly hover.'],
      ['container-type: inline-size', 'Turn an element into a query container.'],
      ['@container card (min-width: 26rem)', 'Ask about the parent, not the viewport. Right for reusable components.'],
      ['cqi, cqw, cqmin', 'Container query units.'],
      ['scrollbar-gutter: stable', 'Stops the layout jumping when a scrollbar appears.'],
      ['100vw includes the scrollbar', 'Use <code>100%</code> instead.']
    ]
  },

  {
    id: 'css-modern',
    group: 'Modern CSS',
    rows: [
      ['--brand: #0f766e', 'A custom property. Define on <code>:root</code> for global.'],
      ['var(--brand, #333)', 'Use it, with a fallback after the comma.'],
      ['.btn { --btn-bg: var(--brand) } .btn--ghost { --btn-bg: transparent }',
       '<strong>One rule body, unlimited variants.</strong> The single most time-saving pattern in the exam.'],
      ['Variables cannot be used in media query conditions', '<code>@media (min-width: var(--bp))</code> does not work.'],
      ['@property --angle { syntax: "&lt;angle&gt;" }', 'Register a type so a variable can be animated.'],
      ['& h3 { }', 'Native nesting. Do not go more than two levels deep.'],
      ['@layer reset, base, components, utilities', 'Later layers win regardless of specificity.'],
      ['@supports (backdrop-filter: blur(4px)) { }', 'Progressive enhancement.'],
      ['scroll-behavior: smooth', 'On <code>&lt;html&gt;</code>.'],
      ['scroll-padding-top: 5rem',
       'On the scroll container, for a sticky header. Do <em>not</em> also set ' +
       '<code>scroll-margin-top</code> on targets — they add up and every jump overshoots.'],
      ['scroll-snap-type: x mandatory', 'A snapping carousel. Children need <code>scroll-snap-align</code>.'],
      ['clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%)', 'A diagonal edge. Pairs are x y points.'],
      ['filter: grayscale(1) blur(2px)', 'Filters combine and apply in order.'],
      ['mix-blend-mode: difference', 'Text that inverts against whatever is behind it.']
    ]
  },

  {
    id: 'css-debug',
    group: 'Debugging and gotchas',
    rows: [
      ['* { outline: 1px solid red }', 'Reveals every box instantly. The first thing to try.'],
      ['Element wider than I set', '<code>content-box</code> sizing.'],
      ['Unexplained vertical gap', 'Margin collapsing, default margins, or inline-block whitespace.'],
      ['Style ignored', 'Specificity, a typo, or an invalid value dropped silently.'],
      ['Style ignored even though it is last', 'Missing semicolon on the line above, or an invalid selector killing the block.'],
      ['Horizontal scrollbar from nowhere', 'Something wider than the viewport: <code>100vw</code> plus padding, or a long unbroken string.'],
      ['Flex row overflows', '<code>min-width: auto</code>. Add <code>min-width: 0</code>.'],
      ['Fixed element scrolls', '<code>transform</code> or <code>filter</code> on an ancestor.'],
      ['z-index: 9999 still behind', 'A parent stacking context is capping it.'],
      ['Percentage height does nothing', 'No definite height on the parent chain. Use flex or grid.'],
      ['Gradient does not appear', 'It was put in <code>background-color</code>.'],
      ['Text washed out over an image', '<code>opacity</code> was used instead of an alpha background.'],
      ['Font never loads', 'Wrong path — <code>url()</code> is relative to the CSS file.'],
      ['<strong>Works locally, breaks live</strong>',
       '<strong>A path starting with <code>/</code>, or a capitalisation mismatch. Linux servers are case sensitive.</strong>']
    ]
  },

  {
    id: 'exam',
    group: 'Exam tactics',
    rows: [
      ['Read the whole paper first', 'Both prototypes, and every annotated hex code, before typing anything.'],
      ['Transcribe the palette into :root', 'Two minutes. Then no colour is looked up twice and the codes are marks in the bank.'],
      ['Type the reset from memory',
       '<code>* { margin: 0; padding: 0; box-sizing: border-box }</code>, a body font, ' +
       '<code>img { max-width: 100%; display: block }</code>, ' +
       '<code>a { text-decoration: none; color: inherit }</code>.'],
      ['Structure before styling', 'Write all the HTML, then <code>* { outline: 1px solid red }</code> and check the boxes.'],
      ['Outer layout first', 'Grid for the page shell, flex for each region. Then section by section, top to bottom.'],
      ['Images', 'A coloured <code>&lt;div&gt;</code> with an <code>aspect-ratio</code>, or <code>&lt;img src="a.jpg" alt=""&gt;</code>. Never hunt for assets.'],
      ['Icons', 'A Unicode character or a coloured square. They are worth almost nothing — do them last or not at all.'],
      ['One component, one variable', 'Four coloured cards is one rule block and four <code>--c</code> values.'],
      ['Do not use web fonts', 'A network request that may not resolve. <code>system-ui, Arial, sans-serif</code>.'],
      ['Responsive', 'The prototypes are desktop screenshots. One <code>max-width: 768px</code> query at the end, if there is time.'],
      ['~40 minutes per prototype', 'Leaving 10 for reading and for the thing that goes wrong.']
    ]
  }

];
