/* part-5.js — Professional Practice.
   Architecture, debugging, accessibility, performance and shipping. */

WP.lesson('part-5', {
  eyebrow: 'Part 5 of 5',
  title: 'Professional Practice',
  blurb: 'Parts 1 to 4 covered the language. This covers the craft — how to organise CSS so ' +
         'it survives a second month, and how to find a bug in two minutes rather than two ' +
         'hours.',
  prev: { label: 'Part 4 · Advanced CSS', href: 'lessons/part-4.html' },
  next: { label: 'Cheatsheet', href: 'cheatsheet.html' },

  sections: [

    /* ---------------------------------------------------------------- 1 */
    {
      id: 'project-structure',
      title: 'Project structure',
      body: [
        { code:
`project/
  index.html
  about.html
  css/
    style.css
  js/
    main.js
  img/
  fonts/` },

        { list: [
          'Lowercase filenames, hyphens not spaces. <code>contact-us.html</code>, never ' +
          '<code>Contact Us.html</code>. Servers are case sensitive; your laptop is not, ' +
          'which is how a page works locally and 404s live.',
          '<code>index.html</code> is what a server serves for a bare folder URL. Always ' +
          'name your home page that.',
          'Keep one CSS entry point. Several <code>&lt;link&gt;</code> tags are fine; ' +
          '<code>@import</code> is not.',
          'Add a <code>.gitignore</code> on day one.'
        ]}
      ]
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: 'stylesheet-order',
      title: 'Order inside a stylesheet',
      body: [
        { list: [
          'Reset or normalise',
          'Custom properties on <code>:root</code>',
          'Base element styles — <code>body</code>, headings, links, form controls',
          'Layout containers',
          'Components',
          'Utilities',
          'Media queries, if not colocated with each component'
        ], ordered: true },

        'This is not arbitrary tidiness. Because the cascade breaks ties by source order, ' +
        'writing in this sequence means later, more specific things naturally win, and you ' +
        'almost never need to raise specificity to fix an override.',

        { callout: { kind: 'tip', title: 'It is also the exam order',
          text: 'Reset, then variables from the annotated palette, then the outermost ' +
                'container, then each section top to bottom. Every walkthrough on this site ' +
                'builds in this order, and a half-finished answer written this way still ' +
                'looks deliberate rather than broken.' }}
      ]
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: 'bem',
      title: 'Naming: BEM',
      body: [
        { code:
`.card           { }   /* Block:    the component */
.card__title    { }   /* Element:  a part of it */
.card--featured { }   /* Modifier: a variant */

<article class="card card--featured">
  <h3 class="card__title">Title</h3>
</article>` },

        { list: [
          'BEM keeps specificity flat: every selector is one class, so nothing ever needs ' +
          '<code>!important</code>.',
          'The alternative extreme is utility-first, many tiny classes in the HTML. Both ' +
          'work. What fails is the middle ground of deep descendant selectors like ' +
          '<code>.page .content .sidebar ul li a</code>.',
          'Name by <strong>role, not appearance</strong>. <code>.btn--primary</code>, not ' +
          '<code>.btn--blue</code>. Themes change; roles do not.',
          'Keep state in data attributes and style them: <code>[data-state="open"]</code>. ' +
          'Self-documenting, and trivial for JavaScript to toggle.'
        ]}
      ],
      playground: {
        title: 'BEM and a modifier',
        height: 320,
        tryThis: 'Every selector here is a single class, so the modifier wins purely by being ' +
                 'written later. Check <code>.card</code> against <code>.card--featured</code> ' +
                 'in the Part 2 specificity calculator — they tie, and source order decides.',
        html: `
<article class="card">
  <h3 class="card__title">Free Website Builder</h3>
  <p class="card__price">$0</p>
</article>

<article class="card card--featured">
  <h3 class="card__title">Web Design Service</h3>
  <p class="card__price">$995</p>
</article>
`,
        css: `
body { font-family: system-ui, sans-serif; display: flex; gap: 12px; }

.card {
  flex: 1;
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 10px;
  padding: 16px;
}
.card__title { margin: 0 0 8px; font-size: 15px; color: #4358b8; }
.card__price { margin: 0; font-size: 30px; font-weight: 800; }

.card--featured { border-color: #1d78f0; box-shadow: 8px 8px 0 #000; }
`
      }
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: 'modern-reset',
      title: 'A modern reset',
      body: [
        'Browser defaults differ and most of them get in your way. Paste this at the top of ' +
        'every project.',

        { code:
`*, *::before, *::after { box-sizing: border-box; }

* { margin: 0; }

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}

body {
  min-height: 100dvh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-body, system-ui, sans-serif);
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
  height: auto;
}

input, button, textarea, select { font: inherit; color: inherit; }

p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }
h1, h2, h3, h4 { line-height: 1.15; text-wrap: balance; }
p { text-wrap: pretty; max-width: 70ch; }

ul[class], ol[class] { list-style: none; padding: 0; }

:focus-visible { outline: 3px solid var(--brand, #06c); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}`,
          label: 'The full reset. This site uses it verbatim in ' +
                 '<code>assets/css/base.css</code>.' },

        'The line most people forget is ' +
        '<code>input, button, textarea, select { font: inherit; }</code>. Form controls do ' +
        'not inherit fonts by default, which is why an unstyled form always looks like it ' +
        'came from a different website.',

        { callout: { kind: 'tip', title: 'The four-line exam version',
          text: 'You will not type all of that under a clock. The version that earns the ' +
                'marks is <code>* { margin: 0; padding: 0; box-sizing: border-box; }</code>, ' +
                'a <code>font-family</code> on <code>body</code>, ' +
                '<code>img { max-width: 100%; display: block; }</code>, and ' +
                '<code>a { text-decoration: none; color: inherit; }</code>. Four lines, ' +
                'thirty seconds, and it prevents most of what would otherwise go wrong.' }}
      ]
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: 'devtools',
      title: 'DevTools, the parts that matter',
      body: [
        { table: {
          head: ['Panel', 'What it answers'],
          rows: [
            ['Elements + Styles',
             'Which rules apply, in priority order. Struck-through declarations were ' +
             'overridden. The <code>element.style</code> block at the top is inline CSS.'],
            ['Computed',
             'The final value of every property, and which rule produced it. Where to look ' +
             'when the Styles panel is confusing.'],
            ['Layout', 'Toggle grid and flexbox overlays with line numbers, track sizes and gap shading.'],
            ['Box model diagram', 'Hover any part for exact margin, border, padding and content sizes. Editable in place.'],
            ['Accessibility tree', 'The page as a screen reader sees it: names, roles and computed contrast.'],
            ['Device toolbar', 'Responsive testing, throttling and touch simulation. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>.'],
            ['Network', 'What is slow, how large it is, and whether it was cached.'],
            ['Coverage', 'How much of your CSS and JS is unused on this page.'],
            ['Lighthouse', 'Automated audit of performance, accessibility, SEO and best practices.'],
            ['Rendering', 'Paint flashing and layout shift regions, for finding jank.']
          ]
        }},

        'The <em>:hov</em> button in the Styles panel forces a state, so hover and focus ' +
        'styles stay visible while you edit them. That one alone saves an enormous amount of ' +
        'guessing.'
      ]
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: 'debugging-techniques',
      title: 'Debugging techniques',
      body: [
        { list: [
          '<code>* { outline: 1px solid red }</code> reveals every box instantly. A version ' +
          'with a different colour per depth is even clearer.',
          'Change a suspect element’s background to a violent colour to confirm you are ' +
          'editing what you think you are editing.',
          'Binary search a broken stylesheet: comment out half, test, repeat. Faster than reading.',
          'When a change has <em>no effect at all</em>: check you saved, hard reload with ' +
          '<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>, check the ' +
          '<code>&lt;link&gt;</code> path, and check for a typo in the selector. In that ' +
          'order — the first two are far more common than the last two.'
        ]}
      ],
      playground: {
        title: 'Find the broken box',
        height: 340,
        tryThis: 'This layout is subtly wrong and it is not obvious why. Uncomment the ' +
                 'outline rule on the first line. The culprit becomes visible in about a ' +
                 'second, and the fix is one property.',
        html: `
<div class="wrap">
  <header class="head">Header</header>
  <div class="body">
    <aside class="side">Sidebar</aside>
    <main class="main">Main content</main>
  </div>
</div>
`,
        css: `
/* * { outline: 1px solid red; } */

body { font-family: system-ui, sans-serif; font-size: 13px; margin: 0; }
.wrap { width: 320px; border: 2px solid #205bcb; }
.head { background: #205bcb; color: #fff; padding: 10px; }

.body { display: flex; gap: 10px; padding: 10px; }
.side { width: 120px; padding: 20px; background: #e2ebfa; }
.main { flex: 1; padding: 20px; background: #eceff3; }

/* The sidebar is 120px wide and then adds 40px of padding on top,
   because box-sizing was never set. Add it and the row fits. */
`
      }
    },

    /* ---------------------------------------------------------------- 7 */
    {
      id: 'bug-lookup',
      title: 'The bug lookup table',
      body: [
        'Every symptom here looks nothing like its cause. This table is the fastest route ' +
        'from one to the other.',

        { table: {
          head: ['Symptom', 'Most likely cause'],
          rows: [
            ['Style ignored', 'Specificity, a typo, or an invalid value dropped silently.'],
            ['Horizontal scrollbar',
             'An element wider than the viewport: <code>100vw</code> plus padding, a long ' +
             'unbroken string, or a negative margin.'],
            ['Element wider than set', '<code>content-box</code> sizing.'],
            ['Unexplained gap', 'Margin collapse, default margins, or inline-block whitespace.'],
            ['Fixed element scrolls', '<code>transform</code> or <code>filter</code> on an ancestor.'],
            ['<code>z-index</code> has no effect', 'The element is static, or trapped in a stacking context.'],
            ['Sticky not sticking', 'No offset, or <code>overflow</code> on an ancestor.'],
            ['Flex item overflows', '<code>min-width: auto</code>.'],
            ['<strong>Works locally, breaks live</strong>',
             '<strong>Case-sensitive paths, or root-relative paths under a subfolder ' +
             'deployment.</strong>'],
            ['Font not applied', 'Wrong path (<code>url()</code> is relative to the CSS file), missing format, or the weight does not exist.'],
            ['Layout differs in Safari', 'Check caniuse.com; wrap in <code>@supports</code> and provide a fallback.']
          ]
        }}
      ]
    },

    /* ---------------------------------------------------------------- 8 */
    {
      id: 'a11y-rules',
      title: 'Accessibility: the rules that carry the weight',
      body: [
        'Around 80% of accessibility comes free from writing the HTML correctly, which Part 1 ' +
        'covered. The rest is this list.',

        { list: [
          '<strong>Use the right element.</strong> <code>&lt;button&gt;</code> for actions, ' +
          '<code>&lt;a href&gt;</code> for navigation. A <code>&lt;div&gt;</code> with a ' +
          'click handler is invisible to keyboards and screen readers.',
          '<strong>Never remove the focus outline without replacing it.</strong> ' +
          '<code>outline: none</code> alone makes a site unusable by keyboard. Use ' +
          '<code>:focus-visible</code> with a clear, high-contrast ring.',
          '<strong>Contrast:</strong> 4.5:1 for normal text, 3:1 for text above 24px or bold ' +
          'above 19px, and 3:1 for interface component boundaries.',
          '<strong>Never use colour alone</strong> to convey meaning. Add an icon, a label or ' +
          'a pattern.',
          '<strong>Label every form control.</strong> A placeholder is not a label.',
          '<strong>Keep a logical DOM order.</strong> <code>order</code> in flexbox and ' +
          '<code>dense</code> in grid change the visual order but not the tab order, which ' +
          'strands keyboard users.',
          '<strong>Touch targets at least 44 by 44 pixels</strong>, with spacing between them.',
          'Respect <code>prefers-reduced-motion</code>.',
          'Give the page a <code>lang</code>, a unique <code>&lt;title&gt;</code>, and one ' +
          '<code>&lt;h1&gt;</code>.'
        ]}
      ]
    },

    /* ---------------------------------------------------------------- 9 */
    {
      id: 'a11y-snippets',
      title: 'Two snippets you will reuse',
      body: [
        'The visually-hidden class and the skip link. Both appear on every page of this site.'
      ],
      playground: {
        title: 'sr-only and the skip link',
        height: 320,
        tryThis: 'Press <kbd>Tab</kbd> in the preview. The skip link appears from nowhere as ' +
                 'the first stop, then disappears again. The star rating reads as "Rating: 3 ' +
                 'out of 5" to a screen reader and as five stars to everyone else.',
        html: `
<a class="skip-link" href="#main">Skip to content</a>

<p>
  <span class="sr-only">Rating:</span>
  <span aria-hidden="true">&#9733;&#9733;&#9733;&#9734;&#9734;</span>
  <span class="sr-only">3 out of 5</span>
</p>

<main id="main"><p>Main content.</p></main>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.skip-link {
  position: absolute; left: 8px; top: -3rem;
  background: #17202a; color: #fff;
  padding: .6rem 1rem; border-radius: 0 0 6px 6px;
  transition: top .15s;
}
.skip-link:focus { top: 0; }

:focus-visible { outline: 3px solid #0f766e; outline-offset: 2px; }
`
      }
    },

    /* --------------------------------------------------------------- 10 */
    {
      id: 'a11y-testing',
      title: 'Testing accessibility',
      body: [
        { list: [
          '<strong>Unplug the mouse.</strong> Tab through the whole page. Can you reach and ' +
          'operate everything, and can you always see where you are?',
          '<strong>Zoom to 200% and 400%.</strong> Nothing should be cut off or overlap.',
          'Run Lighthouse and the axe DevTools extension. They catch roughly a third of ' +
          'issues — a good start, not a pass mark.',
          'Try a screen reader once. NVDA on Windows is free; VoiceOver on Mac is ' +
          '<kbd>Cmd</kbd>+<kbd>F5</kbd>. Fifteen minutes will change how you write HTML ' +
          'permanently.',
          'View the page in greyscale to check you are not relying on colour.'
        ]}
      ]
    },

    /* --------------------------------------------------------------- 11 */
    {
      id: 'performance-metrics',
      title: 'The metrics that are measured',
      body: [
        { table: {
          head: ['Metric', 'Means', 'Target'],
          rows: [
            ['LCP — Largest Contentful Paint', 'When the main image or heading finishes rendering.', 'Under 2.5s'],
            ['CLS — Cumulative Layout Shift', 'How much the page jumps around while loading.', 'Under 0.1'],
            ['INP — Interaction to Next Paint', 'How quickly the page responds to input.', 'Under 200ms']
          ]
        }},

        'CLS is the one you control most directly from the HTML: set <code>width</code> and ' +
        '<code>height</code> on every image and most of it goes away.'
      ]
    },

    /* --------------------------------------------------------------- 12 */
    {
      id: 'performance-priorities',
      title: 'What actually helps, in order',
      body: [
        { list: [
          '<strong>Optimise images.</strong> They are almost always the largest thing on the ' +
          'page. Serve WebP or AVIF, size them to their display size, use ' +
          '<code>srcset</code>, and lazy-load everything below the fold.',
          'Set <code>width</code> and <code>height</code> on images to eliminate layout shift.',
          'Preload the hero image and the main font.',
          '<strong>Limit fonts.</strong> Two families, three weights maximum. woff2, ' +
          '<code>font-display: swap</code>, self-hosted if you can.',
          'Inline critical CSS for the first screen, if you are chasing a score.',
          'Defer JavaScript. <code>defer</code> on every script not required for first paint.',
          'Avoid <code>@import</code> in CSS: it serialises downloads.',
          'Animate only <code>transform</code> and <code>opacity</code>.',
          '<code>content-visibility: auto</code> on long offscreen sections skips their ' +
          'rendering work.'
        ], ordered: true },

        '<strong>Measure before optimising.</strong> Open the Network panel with throttling ' +
        'set to Fast 3G and look at what is actually large. Most sites are slow for one ' +
        'obvious reason, not a hundred subtle ones.'
      ]
    },

    /* --------------------------------------------------------------- 13 */
    {
      id: 'dark-mode',
      title: 'Dark mode and theming',
      body: [
        { code:
`:root {
  color-scheme: light dark;      /* native controls and scrollbars follow */
  --bg: #ffffff;  --surface: #f6f7f9;
  --text: #17202a; --muted: #5b6672;
  --border: #dfe3e8; --brand: #0f766e;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #10151b;  --surface: #171e26;
    --text: #e8edf2; --muted: #9aa7b4;
    --border: #26303b; --brand: #2dd4bf;
  }
}

/* A manual override that beats the media query */
[data-theme="dark"] { --bg: #10151b; --text: #e8edf2; }

body { background: var(--bg); color: var(--text); }` },

        { list: [
          '<strong>Only the variables change.</strong> Not one component rule is duplicated. ' +
          'This is why every colour has to be a variable from day one.',
          'Dark mode is not inverted light mode. Reduce saturation, avoid pure black ' +
          'backgrounds and pure white text, and lift surfaces with lighter greys rather than ' +
          'shadows.',
          '<code>color-scheme</code> is the one line that makes native scrollbars, date ' +
          'pickers and form controls match your theme.',
          'Store the manual choice in <code>localStorage</code> and set the attribute on ' +
          '<code>&lt;html&gt;</code> <em>before the page paints</em>, to avoid a flash of ' +
          'the wrong theme.'
        ]},

        { callout: { kind: 'tip', title: 'Look at this page',
          text: 'The theme toggle in the header does exactly this. The whole implementation ' +
                'is nine variables in <code>tokens.css</code> and a four-line inline script ' +
                'in each page’s <code>&lt;head&gt;</code> that applies the stored choice ' +
                'before first paint.' }}
      ],
      playground: {
        title: 'Themed by variables alone',
        height: 340,
        tryThis: 'Tick the box to switch themes. Every rule below the variables is written ' +
                 'once and never mentions a colour directly. Add a new component and it ' +
                 'themes itself.',
        html: `
<label class="row"><input type="checkbox"> Dark</label>

<div class="panel">
  <h3>Access Permissions</h3>
  <p>Not one rule below is duplicated for the dark theme.</p>
  <button class="btn">Update settings</button>
</div>
`,
        css: `
:root {
  --bg: #ffffff; --surface: #f6f7f9; --text: #17202a;
  --muted: #5b6672; --border: #dfe3e8; --brand: #1a237e;
}
body:has(input:checked) {
  --bg: #10151b; --surface: #171e26; --text: #e8edf2;
  --muted: #9aa7b4; --border: #26303b; --brand: #7c8cff;
}

body { background: var(--bg); color: var(--text);
       font-family: system-ui, sans-serif; font-size: 13px;
       padding: 12px; transition: background .2s, color .2s; }
.row { display: block; margin-bottom: 12px; }

.panel { background: var(--surface); border: 1px solid var(--border);
         border-radius: 10px; padding: 14px; }
.panel h3 { margin: 0 0 4px; color: var(--brand); }
.panel p  { margin: 0 0 12px; color: var(--muted); }

.btn { background: var(--brand); color: var(--bg); border: 0;
       border-radius: 6px; padding: 8px 16px; font: inherit; cursor: pointer; }
`
      }
    },

    /* --------------------------------------------------------------- 14 */
    {
      id: 'form-styling',
      title: 'Styling forms properly',
      body: [
        '<strong>Six of the twelve prototypes contain a form</strong>, so this is the section ' +
        'of Part 5 with the most direct exam value.',

        { code:
`input, select, textarea {
  width: 100%;
  padding: .6rem .75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  transition: border-color .15s, box-shadow .15s;
}
input:focus-visible {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--brand), transparent 75%);
}

/* Only complain AFTER the user has interacted */
input:user-invalid { border-color: crimson; }

/* Native control colours in one line */
input[type="checkbox"], input[type="radio"], progress {
  accent-color: var(--brand);
}` },

        'Replacing the focus outline with a border colour <em>plus a ring</em> is the correct ' +
        'move. Removing the outline and adding only a border colour fails contrast for anyone ' +
        'who cannot see that particular hue.'
      ],
      playground: {
        title: 'A form that looks designed',
        height: 380,
        tryThis: 'Click into each field. Then type one character into the email box and move ' +
                 'away — <code>:user-invalid</code> fires only now, not on load. Delete the ' +
                 '<code>box-shadow</code> from the focus rule and see how much weaker the ' +
                 'focus state becomes.',
        html: `
<form class="form">
  <p class="field">
    <label for="n">Full Name</label>
    <input type="text" id="n" placeholder="John Doe">
  </p>
  <p class="field">
    <label for="e">Work Email</label>
    <input type="email" id="e" required placeholder="email@company.com">
  </p>
  <p class="field">
    <label for="p">Choose Password</label>
    <input type="password" id="p" required minlength="8">
  </p>
  <label class="check"><input type="checkbox"> I agree to the
    <a href="#">Terms of Service</a></label>
  <button class="btn">Create Account</button>
</form>
`,
        css: `
:root { --brand: #3f46a4; --border: #d8dce8; --text: #17202a; }
body { font-family: system-ui, sans-serif; font-size: 13px; }

.form { background: #fefefe; padding: 16px; border-radius: 10px; }
.field { margin: 0 0 12px; }
label { display: block; margin-bottom: 4px; color: #5b6672; }

input[type="text"], input[type="email"], input[type="password"] {
  width: 100%;
  padding: .6rem .75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  font: inherit;
  transition: border-color .15s, box-shadow .15s;
}
input:focus-visible {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--brand), transparent 78%);
}
input:user-invalid { border-color: #c0392b; }

.check { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.check a { color: #6fb570; }
input[type="checkbox"] { accent-color: var(--brand); width: auto; }

.btn { width: 100%; background: var(--brand); color: #fff;
       border: 0; border-radius: 8px; padding: 11px;
       font: inherit; font-weight: 600; cursor: pointer; }
`
      }
    },

    /* --------------------------------------------------------------- 15 */
    {
      id: 'print-styles',
      title: 'Print styles',
      body: [
        { code:
`@media print {
  nav, footer, .no-print { display: none; }
  body { color: #000; background: #fff; font-size: 12pt; }
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 10pt; }
  h2, h3 { break-after: avoid; }
  table, figure, .card { break-inside: avoid; }
  @page { margin: 2cm; }
}` },

        'The <code>attr(href)</code> trick is the one worth remembering: a printed page loses ' +
        'every link, and that one rule puts the URLs back.',

        { callout: { kind: 'note', title: 'You cannot demo this in a playground',
          text: 'Print styles only apply to a print preview, which a sandboxed iframe cannot ' +
                'open. The cheatsheet and the exam checklist on this site both carry a real ' +
                'print stylesheet — open either and press <kbd>Ctrl</kbd>+<kbd>P</kbd> to see ' +
                'the navigation, sidebar and interactive controls disappear.' }}
      ]
    },

    /* --------------------------------------------------------------- 16 */
    {
      id: 'metadata',
      title: 'Metadata and sharing',
      body: [
        { code:
`<title>Page name | Site name</title>
<meta name="description" content="150-160 characters that summarise the page.">
<link rel="canonical" href="https://example.com/page">

<meta property="og:title" content="Page name">
<meta property="og:description" content="Short summary.">
<meta property="og:image" content="https://example.com/share.png">
<meta property="og:url" content="https://example.com/page">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="icon.svg" type="image/svg+xml">
<meta name="theme-color" content="#0f766e">` },

        { list: [
          'The <code>og:image</code> should be around 1200 × 630 and <strong>must be an ' +
          'absolute URL</strong> — this is the one that catches people, because a relative ' +
          'path silently produces no preview at all.',
          'A unique <code>&lt;title&gt;</code> and description per page. Duplicates are a ' +
          'real SEO penalty.',
          'Semantic HTML from Part 1 is most of your technical SEO already done.'
        ]}
      ]
    },

    /* --------------------------------------------------------------- 17 */
    {
      id: 'browser-support',
      title: 'Browser support and deployment',
      body: [
        { list: [
          'Check caniuse.com before using anything new. "Baseline" on MDN tells you whether ' +
          'a feature is safe across all current browsers.',
          '<strong>Progressive enhancement:</strong> write a working baseline, then improve ' +
          'it inside <code>@supports</code>. The page should never be broken, only plainer.',
          'Vendor prefixes are mostly historical. The three still worth writing are ' +
          '<code>-webkit-backdrop-filter</code>, <code>-webkit-line-clamp</code> and ' +
          '<code>-webkit-background-clip</code>.',
          'Test in Chrome, Firefox and Safari. Safari is the one that will surprise you, and ' +
          'it is what every iPhone user has.'
        ]},

        { callout: { kind: 'trap', title: 'The GitHub Pages subfolder problem, one last time',
          text: 'A project site is served from <code>user.github.io/repo-name/</code>. Every ' +
                'root-relative path — anything starting with a single <code>/</code> — ' +
                'resolves against <code>user.github.io/</code> instead and 404s. It works ' +
                'perfectly on your laptop right up until it is live. This site is built ' +
                'entirely with <code>./</code> and <code>../</code>, and the home page ' +
                'carries a panel that reports which paths actually resolved, on whatever ' +
                'host you are reading it from.' }}
      ]
    },

    /* --------------------------------------------------------------- 18 */
    {
      id: 'prelaunch-checklist',
      title: 'The pre-launch checklist',
      body: [
        { table: {
          head: ['Area', 'Check'],
          rows: [
            ['HTML', 'Passes the W3C validator. One <code>h1</code>. Correct heading order. <code>lang</code> set. Unique title and description.'],
            ['Images', 'All have <code>alt</code>. Sized correctly. WebP or AVIF. <code>width</code> and <code>height</code> set. Below-fold images lazy.'],
            ['CSS', '<code>box-sizing</code> set globally. No <code>!important</code> fights. No unused rules.'],
            ['Layout', 'Works at 320px, at 200% zoom, and at 1920px. No horizontal scrollbar at any width.'],
            ['Forms', 'Every field labelled. Correct input types and autocomplete tokens. Errors described in text, not colour alone.'],
            ['Keyboard', 'Everything reachable and operable. Focus always visible. Skip link present.'],
            ['Contrast', '4.5:1 body text, 3:1 large text and interface borders.'],
            ['Motion', '<code>prefers-reduced-motion</code> block included.'],
            ['Performance', 'Lighthouse run. LCP under 2.5s. No layout shift while loading.'],
            ['Links', 'No broken links. External <code>target="_blank"</code> links have <code>rel="noopener"</code>.'],
            ['Meta', 'Favicon, Open Graph image, theme-color, canonical URL.'],
            ['Cross-browser', 'Chrome, Firefox, Safari, and a real phone.']
          ]
        }},

        'A printable version of this, alongside the exam-specific checklist, arrives with ' +
        'the exam mode page.'
      ]
    },

    /* --------------------------------------------------------------- 19 */
    {
      id: 'keep-learning',
      title: 'How to keep learning',
      body: [
        { list: [
          '<strong>Build, do not watch.</strong> Rebuild the same layout — a card, a navbar, ' +
          'a pricing table — three different ways. You will understand the trade-offs ' +
          'permanently.',
          '<strong>Clone real interfaces from screenshots without looking at their code.</strong> ' +
          'Then inspect the original and compare. This is exactly what the exam asks of you, ' +
          'and exactly what the walkthroughs on this site practise.',
          'Read the spec-adjacent sources: MDN for reference, web.dev for practice, caniuse ' +
          'for support. Avoid tutorials that pre-date grid.',
          'Fix one accessibility issue in something you have already built.',
          'Keep a personal snippets file. Every time you solve something awkward, save the ' +
          'eight lines that fixed it.'
        ]},

        { h: 'The project ladder' },

        { list: [
          'A static profile page: semantic HTML, one column, real typography.',
          'A responsive landing page: hero, feature grid, sticky nav, footer. No frameworks.',
          'A component library page: buttons, cards, forms, modal, tabs, all themed with ' +
          'custom properties, plus dark mode.',
          'Clone a real product page closely, then run Lighthouse and get every category ' +
          'above 95.',
          'Then, and only then, pick up a framework. You will understand what it is doing ' +
          'for you.'
        ], ordered: true },

        { callout: { kind: 'tip', title: 'What to remember from the whole series',
          text: 'Write HTML that describes meaning. Keep CSS specificity flat and store every ' +
                'design decision as a custom property. Grid for the page, flexbox for its ' +
                'parts, <code>gap</code> instead of margins. Animate <code>transform</code> ' +
                'and <code>opacity</code> only. Make it work with a keyboard. Everything else ' +
                'is detail you can look up — and you now have the vocabulary to look it up ' +
                'with.' }}
      ]
    }

  ]
});
