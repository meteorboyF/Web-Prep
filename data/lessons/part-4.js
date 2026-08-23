/* part-4.js — Advanced CSS.
   Custom properties, motion, filters, modern selectors and the recipe library. */

WP.lesson('part-4', {
  eyebrow: 'Part 4 of 5',
  title: 'Advanced CSS',
  blurb: 'Custom properties, motion, filters and modern selectors — where CSS stopped ' +
         'needing preprocessors, and where a page starts to feel designed.',
  prev: { label: 'Part 3 · Layout mastery', href: 'lessons/part-3.html' },
  next: { label: 'Part 5 · Professional practice', href: 'lessons/part-5.html' },

  sections: [

    /* ---------------------------------------------------------------- 1 */
    {
      id: 'custom-properties',
      title: 'Custom properties',
      body: [
        { table: {
          head: ['Behaviour', 'Detail'],
          rows: [
            ['Names are case sensitive', '<code>--Brand</code> and <code>--brand</code> are different properties.'],
            ['They inherit',
             'Defining on <code>:root</code> makes them global. Redefining on a component ' +
             'overrides it <em>for that subtree only</em>, which is the entire basis of theming.'],
            ['They are live',
             'Changing one updates every rule that uses it instantly, including inside media ' +
             'queries and pseudo-classes.'],
            ['They are strings until used',
             'The value is substituted, then parsed. An invalid substitution makes the ' +
             'declaration compute to <code>unset</code>, which can look like inheritance from nowhere.'],
            ['JavaScript can read and write them',
             '<code>el.style.setProperty("--x", "10px")</code>.'],
            ['They cannot be used in media query conditions',
             '<code>@media (min-width: var(--bp))</code> does not work. Use plain values for breakpoints.']
          ]
        }},

        'A fallback goes after a comma: <code>var(--accent, #333)</code>. That is worth using ' +
        'anywhere a variable might not be defined, because the failure mode otherwise is ' +
        'silent.'
      ],
      playground: {
        title: 'Defining and using',
        height: 320,
        tryThis: 'Change <code>--brand</code> once at the top and watch four rules follow. ' +
                 'Then misspell it in one place and see the fallback catch it — and what ' +
                 'happens in the place with no fallback.',
        html: `
<button class="btn">Explore UIU</button>
<button class="btn btn--ghost">Watch Demo</button>
<p class="note">A note in the brand colour.</p>
`,
        css: `
:root {
  --brand: #0f766e;
  --radius: 8px;
  --space: 12px;
}

body { font-family: system-ui, sans-serif; }

.btn {
  background: var(--brand);
  color: #fff;
  border: 1px solid var(--brand);
  border-radius: var(--radius);
  padding: calc(var(--space) / 2) var(--space);
  font: inherit;
  cursor: pointer;
}
.btn--ghost { background: transparent; color: var(--brand); }

.note { color: var(--brnd, crimson); }   /* deliberate typo, caught */
`
      }
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: 'component-theming',
      title: 'Component-level theming',
      body: [
        'This is the single most useful pattern in modern CSS, and it is the one that saves ' +
        'the most time in the exam.',

        'Declare the variable <em>on the component</em>, use it in the component’s rules, and ' +
        'then every variant is one line that changes the variable rather than a whole new ' +
        'rule block.',

        { code:
`.btn {
  --btn-bg: var(--brand);
  --btn-fg: white;
  background: var(--btn-bg);
  color: var(--btn-fg);
}
.btn--ghost  { --btn-bg: transparent; --btn-fg: var(--brand); }
.btn--danger { --btn-bg: crimson; }

/* One rule body, unlimited variants. */` },

        'Four coloured stat cards, five differently coloured pricing cards, three chips in ' +
        'different colours — every one of those appears in the past papers, and every one is ' +
        'this pattern. Written the other way it is four near-identical rule blocks that all ' +
        'have to be kept in sync while the clock runs.'
      ],
      playground: {
        title: 'One rule body, four cards',
        height: 340,
        tryThis: 'Add a fifth card with <code>style="--c: #781fa0"</code> and no new CSS at ' +
                 'all. That is the whole point. This is the CORE-TECH stat row from ' +
                 '<em>Slot 1 Q1</em>, and it is 14 lines.',
        html: `
<div class="cards">
  <article class="stat" style="--c: #1975d1">
    <p class="stat__l">Total Users</p><p class="stat__v">12,450</p>
    <p class="stat__p">UP +12% MONTHLY</p>
  </article>
  <article class="stat" style="--c: #378b3b">
    <p class="stat__l">Revenue</p><p class="stat__v">$84,200</p>
    <p class="stat__p">UP +5.2% WEEKLY</p>
  </article>
  <article class="stat" style="--c: #f78100">
    <p class="stat__l">Active Tasks</p><p class="stat__v">18</p>
    <p class="stat__p">4 TASKS PENDING</p>
  </article>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; }
.cards { display: grid;
         grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
         gap: 14px; }
.stat { background: var(--c); color: #fff;
        border-radius: 8px; padding: 14px; }
.stat__l { margin: 0; font-size: 12px; font-weight: 700; }
.stat__v { margin: 6px 0 12px; font-size: 28px; font-weight: 800; }
.stat__p { margin: 0; background: rgb(255 255 255 / .25);
           border-radius: 4px; padding: 6px;
           font-size: 11px; font-weight: 700; text-align: center; }
`
      }
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: 'at-property',
      title: '@property',
      body: [
        'Plain custom properties cannot be transitioned, because the browser sees them as ' +
        'opaque text. Registering one gives it a type, and a typed property can animate.',

        { code:
`@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.spin { background: conic-gradient(from var(--angle), red, blue, red);
        transition: --angle 1s linear; }
.spin:hover { --angle: 360deg; }` },

        'Genuinely useful, rarely essential, and not worth exam time. Included because when ' +
        'you eventually want a gradient to rotate on hover, this is the only way it works.'
      ]
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: 'css-functions',
      title: 'CSS functions',
      body: [
        { table: {
          head: ['Function', 'Purpose'],
          rows: [
            ['<code>calc()</code>',
             'Mix units: <code>calc(100% - 2rem)</code>. <strong>Spaces around + and − are ' +
             'mandatory</strong> — without them it silently fails.'],
            ['<code>min()</code> / <code>max()</code>', '<code>min()</code> caps a value; <code>max()</code> sets a floor.'],
            ['<code>clamp(min, ideal, max)</code>', 'Fluid sizing with hard limits.'],
            ['<code>var()</code>', 'Substitute a custom property, with an optional fallback.'],
            ['<code>color-mix()</code>', 'Blend colours in a chosen colour space. Hover shades without a design tool.'],
            ['<code>attr()</code>', 'Read an HTML attribute. Reliable only inside <code>content</code>.'],
            ['<code>url()</code>',
             'Paths are relative to <strong>the CSS file</strong>, not the HTML file. This ' +
             'trips up everyone exactly once.'],
            ['<code>env()</code>', '<code>env(safe-area-inset-bottom)</code> for phone notches.'],
            ['<code>light-dark()</code>', 'Pick a value based on the active colour scheme in one declaration.']
          ]
        }},

        'Inside <code>calc()</code>, division by a variable is fine but multiplication needs ' +
        'a unitless operand: <code>calc(var(--space) * 2)</code> works, ' +
        '<code>calc(2rem * 2rem)</code> does not, because square rems are meaningless.'
      ],
      playground: {
        title: 'calc and color-mix',
        height: 320,
        tryThis: 'Remove the spaces around the minus in the first <code>calc()</code>. It ' +
                 'stops working entirely and nothing tells you why. Then change ' +
                 '<code>--brand</code> and watch the hover shade recompute itself.',
        html: `
<div class="bar">calc(100% - 4rem)</div>
<button class="btn">Hover for a mixed shade</button>
`,
        css: `
:root { --brand: #0f766e; }
body { font-family: system-ui, sans-serif; }

.bar {
  width: calc(100% - 4rem);
  background: var(--brand);
  color: #fff; padding: 10px;
  border-radius: 6px; margin-bottom: 12px;
}

.btn {
  background: var(--brand); color: #fff;
  border: 0; border-radius: 6px;
  padding: 10px 18px; font: inherit; cursor: pointer;
  transition: background-color .15s;
}
.btn:hover { background: color-mix(in oklch, var(--brand), black 22%); }
`
      }
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: 'transitions',
      title: 'Transitions',
      body: [
        { table: {
          head: ['Property', 'Notes'],
          rows: [
            ['<code>transition-property</code>',
             'Which properties animate. <code>all</code> is convenient and slightly risky — ' +
             'it will animate things you did not intend, including layout properties.'],
            ['<code>transition-duration</code>',
             '.15s to .3s for interface feedback, up to .5s for larger movements. Slower ' +
             'feels sluggish.'],
            ['<code>transition-timing-function</code>', '<code>ease</code>, <code>linear</code>, <code>ease-out</code>, <code>cubic-bezier()</code>, <code>steps()</code>.'],
            ['<code>transition-delay</code>', 'Stagger effects, or delay a tooltip so it does not flash.'],
            ['Shorthand', '<code>transition: property duration timing delay</code>; comma separate several.']
          ]
        }},

        'Put the transition on the <em>base</em> rule, not on <code>:hover</code>. On the ' +
        'base rule it animates in both directions; on the hover rule it animates in and ' +
        'snaps back out.'
      ],
      playground: {
        title: 'Where the transition goes',
        height: 320,
        tryThis: 'Both buttons lift on hover. Move the mouse away from each in turn — the ' +
                 'first eases back, the second snaps, because its transition only exists ' +
                 'while hovered.',
        html: `
<button class="btn good">transition on the base rule</button>
<button class="btn bad">transition on :hover only</button>
`,
        css: `
body { font-family: system-ui, sans-serif; display: grid;
       gap: 14px; place-items: start; }
.btn {
  background: #0f766e; color: #fff; border: 0;
  border-radius: 8px; padding: 12px 20px; font: inherit; cursor: pointer;
}

.good { transition: transform .25s ease, box-shadow .25s ease; }
.good:hover { transform: translateY(-3px);
              box-shadow: 0 8px 20px rgb(0 0 0 / .18); }

.bad:hover { transition: transform .25s ease;
             transform: translateY(-3px); }
`
      }
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: 'transition-limits',
      title: 'What can and cannot transition',
      body: [
        { list: [
          'Anything with a numeric or colour value: <code>opacity</code>, colour, ' +
          '<code>transform</code>, <code>box-shadow</code>, <code>width</code>, ' +
          '<code>filter</code>.',
          '<strong>Not <code>display</code></strong>, and not to or from <code>auto</code> — ' +
          '<code>height: auto</code> has no number to interpolate.',
          'Modern fixes exist: <code>transition-behavior: allow-discrete</code>, ' +
          '<code>@starting-style</code>, and <code>interpolate-size: allow-keywords</code>. ' +
          'Support is recent, so keep a fallback.',
          'The reliable workaround for auto height is <code>grid-template-rows: 0fr</code> ' +
          'to <code>1fr</code>, which is exact rather than a guessed <code>max-height</code>.'
        ]}
      ],
      playground: {
        title: 'Animating to auto height, exactly',
        height: 340,
        tryThis: 'The grid trick animates to the content’s real height with no magic number ' +
                 'anywhere. Change <code>1fr</code> to <code>2fr</code> — nothing happens, ' +
                 'because <code>1fr</code> already means "all of it".',
        html: `
<label class="row"><input type="checkbox"> Show details</label>
<div class="panel">
  <div>
    <p>The wrapper animates from 0fr to 1fr. The inner div has
    overflow: hidden, which is what makes the clipping smooth.</p>
    <p>No max-height guess, and no JavaScript measuring anything.</p>
  </div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }
.row { display: block; margin-bottom: 10px; }
input { accent-color: #0f766e; }

.panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows .3s ease;
  background: #eceff3;
  border-radius: 8px;
}
.panel > div { overflow: hidden; }
.panel p { margin: 0; padding: 8px 12px; }

body:has(input:checked) .panel { grid-template-rows: 1fr; }
`
      }
    },

    /* ---------------------------------------------------------------- 7 */
    {
      id: 'timing-functions',
      title: 'Timing functions',
      body: [
        { table: {
          head: ['Curve', 'Feels like', 'Use for'],
          rows: [
            ['<code>ease-out</code>', 'Fast start, gentle stop', 'Things entering the screen. Your default.'],
            ['<code>ease-in</code>', 'Gentle start, fast exit', 'Things leaving the screen.'],
            ['<code>ease-in-out</code>', 'Symmetrical', 'Movement between two on-screen states.'],
            ['<code>linear</code>', 'Mechanical', 'Spinners, progress bars, colour fades.'],
            ['<code>cubic-bezier(.34,1.56,.64,1)</code>', 'Overshoot and settle', 'A playful pop on buttons and modals.'],
            ['<code>steps(n)</code>', 'Jumps', 'Sprite animation, typewriter effects.']
          ]
        }}
      ],
      playground: {
        title: 'Six curves racing',
        height: 340,
        tryThis: 'Hover the track. Watch where each dot is at the halfway point rather than ' +
                 'where it finishes — that is what the curve actually controls.',
        html: `
<div class="track"><span class="dot" style="--t: ease-out"></span><b>ease-out</b></div>
<div class="track"><span class="dot" style="--t: ease-in"></span><b>ease-in</b></div>
<div class="track"><span class="dot" style="--t: ease-in-out"></span><b>ease-in-out</b></div>
<div class="track"><span class="dot" style="--t: linear"></span><b>linear</b></div>
<div class="track"><span class="dot" style="--t: cubic-bezier(.34,1.56,.64,1)"></span><b>overshoot</b></div>
<div class="track"><span class="dot" style="--t: steps(5, end)"></span><b>steps(5)</b></div>
<p>Hover anywhere in here.</p>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 12px; }
.track {
  position: relative; height: 26px; margin-bottom: 6px;
  background: #eceff3; border-radius: 13px;
}
.track b { position: absolute; right: 10px; top: 6px; color: #5b6672; }
.dot {
  position: absolute; top: 3px; left: 3px;
  width: 20px; height: 20px; border-radius: 50%;
  background: #0f766e;
  transition: transform 1.2s var(--t);
}
body:hover .dot { transform: translateX(180px); }
`
      }
    },

    /* ---------------------------------------------------------------- 8 */
    {
      id: 'transforms',
      title: 'Transforms',
      body: [
        { table: {
          head: ['Function', 'Effect'],
          rows: [
            ['<code>translate(x, y)</code>',
             'Move. Percentages are relative to <strong>the element’s own size</strong>, ' +
             'which is what makes the −50% centring trick work.'],
            ['<code>scale(1.05)</code>', 'Resize from the transform origin. Does not affect layout, so neighbours do not move.'],
            ['<code>rotate(15deg)</code>', 'Rotate. Also accepts <code>turn</code> and <code>rad</code>.'],
            ['<code>skew(10deg, 0)</code>', 'Slant.'],
            ['<code>transform-origin: top left</code>', 'The anchor point. Default is the centre.'],
            ['<code>translate</code> / <code>rotate</code> / <code>scale</code>',
             'Modern separate properties, so you can change one without rewriting the whole string.']
          ]
        }},

        '<strong>Order matters.</strong> <code>translateX(50px) rotate(45deg)</code> moves ' +
        'then rotates. <code>rotate(45deg) translateX(50px)</code> rotates the coordinate ' +
        'system first, so the element travels diagonally. Functions apply right to left in ' +
        'effect.'
      ],
      playground: {
        title: 'Order changes the destination',
        height: 320,
        tryThis: 'Both boxes have the same two functions in opposite orders and end up in ' +
                 'completely different places. Swap them back and forth until it stops ' +
                 'being surprising.',
        html: `
<div class="stage"><div class="b one">translate then rotate</div></div>
<div class="stage"><div class="b two">rotate then translate</div></div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 11px; }
.stage { height: 110px; background: #eceff3;
         margin-bottom: 10px; border-radius: 8px; position: relative; }
.b { position: absolute; top: 10px; left: 10px;
     width: 90px; padding: 10px; border-radius: 6px;
     background: #0f766e; color: #fff; }

.one { transform: translateX(90px) rotate(45deg); }
.two { transform: rotate(45deg) translateX(90px); background: #b4541b; }
`
      }
    },

    /* ---------------------------------------------------------------- 9 */
    {
      id: 'transforms-3d',
      title: '3D transforms',
      body: [
        { list: [
          '<code>perspective</code> goes on the <strong>container</strong>; a smaller value ' +
          'means a more dramatic effect.',
          '<code>transform-style: preserve-3d</code> must be on the rotating element or the ' +
          'children flatten.',
          '<code>backface-visibility: hidden</code> is what makes a card flip look right ' +
          'rather than showing you a mirror image.'
        ]}
      ],
      playground: {
        title: 'The card flip',
        height: 320,
        tryThis: 'Delete <code>backface-visibility: hidden</code> and hover again. You now ' +
                 'see the front’s text mirrored through the back — which is exactly what is ' +
                 'happening the rest of the time, just hidden.',
        html: `
<div class="scene">
  <div class="card">
    <div class="face front">Front</div>
    <div class="face back">Back</div>
  </div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; }
.scene { perspective: 800px; width: 200px; height: 130px; }

.card {
  position: relative; width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform .6s;
}
.scene:hover .card { transform: rotateY(180deg); }

.face {
  position: absolute; inset: 0;
  display: grid; place-items: center;
  border-radius: 10px; color: #fff; font-size: 20px;
  backface-visibility: hidden;
}
.front { background: #0f766e; }
.back  { background: #205bcb; transform: rotateY(180deg); }
`
      }
    },

    /* --------------------------------------------------------------- 10 */
    {
      id: 'keyframes',
      title: 'Keyframe animations',
      body: [
        { table: {
          head: ['Property', 'What it controls'],
          rows: [
            ['<code>animation-iteration-count</code>', 'A number, or <code>infinite</code>.'],
            ['<code>animation-direction: alternate</code>', 'Play forwards then backwards. Perfect for breathing and pulsing.'],
            ['<code>animation-fill-mode: forwards</code>',
             'Keep the final keyframe values after finishing. <strong>Without it the element ' +
             'snaps back.</strong>'],
            ['<code>animation-fill-mode: backwards</code>', 'Apply the first keyframe during the delay, so nothing flashes before it starts.'],
            ['<code>animation-fill-mode: both</code>', 'Both of the above. Usually what you want.'],
            ['<code>animation-play-state: paused</code>', 'Toggle with a class or on hover.']
          ]
        }}
      ],
      playground: {
        title: 'fill-mode is the one that bites',
        height: 320,
        tryThis: 'Both boxes fade up once. The second has no <code>fill-mode</code>, so it ' +
                 'snaps back to invisible the instant it finishes. Press Run to replay.',
        html: `
<div class="b good">fill-mode: both</div>
<div class="b bad">no fill-mode</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
@keyframes fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
.b {
  background: #0f766e; color: #fff;
  padding: 14px; border-radius: 8px; margin-bottom: 10px;
  opacity: 0;
}
.good { animation: fade-up .6s ease-out .2s both; }
.bad  { animation: fade-up .6s ease-out .2s; }
`
      }
    },

    /* --------------------------------------------------------------- 11 */
    {
      id: 'staggering',
      title: 'Staggering',
      body: [
        'Rather than writing a rule per child, set an index in the HTML and multiply it in ' +
        'the delay. One rule, any number of items.',

        { code:
`.item { animation-delay: calc(var(--i) * .06s); }` }
      ],
      playground: {
        title: 'A staggered card row',
        height: 320,
        tryThis: 'Press Run to replay. Change <code>.06s</code> to <code>.2s</code> and the ' +
                 'stagger becomes a queue — which is a good demonstration of why interface ' +
                 'motion should stay under 300ms in total.',
        html: `
<div class="row">
  <div class="i" style="--i: 0">1</div>
  <div class="i" style="--i: 1">2</div>
  <div class="i" style="--i: 2">3</div>
  <div class="i" style="--i: 3">4</div>
  <div class="i" style="--i: 4">5</div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; }
@keyframes pop {
  from { opacity: 0; transform: translateY(16px) scale(.94); }
  to   { opacity: 1; transform: none; }
}
.row { display: flex; gap: 10px; }
.i {
  flex: 1; height: 80px;
  display: grid; place-items: center;
  background: #0f766e; color: #fff; border-radius: 8px;
  animation: pop .45s ease-out both;
  animation-delay: calc(var(--i) * .06s);
}
`
      }
    },

    /* --------------------------------------------------------------- 12 */
    {
      id: 'animation-performance',
      title: 'Animate two things, and only two',
      body: [
        'The browser can animate <code>transform</code> and <code>opacity</code> entirely on ' +
        'the compositor, without recalculating layout or repainting. Animating ' +
        '<code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, ' +
        '<code>margin</code> or <code>padding</code> forces layout on every frame and drops ' +
        'the frame rate — noticeably so on a mid-range phone.',

        { table: {
          head: ['Instead of animating', 'Animate'],
          rows: [
            ['<code>left</code> / <code>top</code>', '<code>transform: translate()</code>'],
            ['<code>width</code> / <code>height</code>', '<code>transform: scale()</code>'],
            ['<code>margin</code>', '<code>transform: translate()</code>'],
            ['<code>display: none</code>', '<code>opacity</code> plus <code>visibility</code>']
          ]
        }},

        '<code>will-change: transform</code> promotes an element to its own layer, but it ' +
        'costs memory. Add it just before the animation and remove it after; never leave it ' +
        'sitting on dozens of elements.'
      ],
      playground: {
        title: 'Same movement, different cost',
        height: 320,
        tryThis: 'Both bars travel the same distance and look identical. Open DevTools, turn ' +
                 'on <em>Paint flashing</em> in the Rendering tab, and only one of them ' +
                 'lights up the screen green on every frame.',
        html: `
<div class="track"><div class="bar left">animating left</div></div>
<div class="track"><div class="bar tx">animating transform</div></div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 12px; }
.track { position: relative; height: 40px; background: #eceff3;
         border-radius: 8px; margin-bottom: 10px; overflow: hidden; }
.bar {
  position: absolute; top: 6px; left: 0;
  padding: 6px 10px; border-radius: 6px;
  background: #0f766e; color: #fff;
}

@keyframes move-left { to { left: 180px; } }
@keyframes move-tx   { to { transform: translateX(180px); } }

.left { animation: move-left 1.6s ease-in-out infinite alternate; }
.tx   { animation: move-tx   1.6s ease-in-out infinite alternate; background: #205bcb; }
`
      }
    },

    /* --------------------------------------------------------------- 13 */
    {
      id: 'reduced-motion',
      title: 'Respect reduced motion',
      body: [
        { code:
`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}` },

        'This block is not optional politeness. Vestibular disorders make large parallax and ' +
        'zoom animations physically unpleasant. Ship it in every project — this site does, ' +
        'in <code>base.css</code>.',

        { callout: { kind: 'note', title: 'Why the demos on this page still move',
          text: 'The previews on this page deliberately do <em>not</em> include that block, ' +
                'because a lesson about animation in which nothing animates teaches nothing. ' +
                'Your own pages should include it. Copy it into the reset, above.' }}
      ]
    },

    /* --------------------------------------------------------------- 14 */
    {
      id: 'filters',
      title: 'Filters and backdrop-filter',
      body: [
        { table: {
          head: ['Function', 'Example'],
          rows: [
            ['<code>blur()</code>', '<code>filter: blur(4px)</code>'],
            ['<code>brightness()</code> / <code>contrast()</code>', '<code>brightness(1.1)</code> on hover for a subtle lift'],
            ['<code>grayscale()</code> / <code>sepia()</code> / <code>invert()</code>', '<code>grayscale(1)</code>, removed on hover, for a logo wall'],
            ['<code>saturate()</code> / <code>hue-rotate()</code>', '<code>saturate(1.2)</code>'],
            ['<code>drop-shadow()</code>', 'Follows the transparent shape of a PNG or SVG, unlike <code>box-shadow</code>'],
            ['<code>backdrop-filter: blur(12px)</code>', 'Blurs what is <em>behind</em> the element. The frosted glass effect.']
          ]
        }},

        'Filters combine in one declaration and apply in order: ' +
        '<code>filter: grayscale(.5) blur(2px) brightness(1.1)</code>.'
      ],
      playground: {
        title: 'Filters, and frosted glass',
        height: 340,
        tryThis: 'Hover the grey tiles. Then remove the semi-transparent background from ' +
                 '<code>.glass</code> — <code>backdrop-filter</code> stops working entirely, ' +
                 'because there is nothing to see through.',
        html: `
<div class="tiles">
  <div class="t">1</div><div class="t">2</div><div class="t">3</div>
</div>
<div class="scene">
  <div class="glass">backdrop-filter: blur(10px)</div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.tiles { display: flex; gap: 8px; margin-bottom: 14px; }
.t {
  flex: 1; height: 60px; border-radius: 8px;
  display: grid; place-items: center; color: #fff;
  background: linear-gradient(135deg, #ea6aa8, #6b63ff);
  filter: grayscale(1);
  transition: filter .25s;
}
.t:hover { filter: grayscale(0) brightness(1.05); }

.scene {
  height: 120px; border-radius: 10px; padding: 30px;
  background: linear-gradient(120deg, #f97316, #6b63ff, #0db0d7);
}
.glass {
  background: rgb(255 255 255 / .18);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid rgb(255 255 255 / .3);
  border-radius: 10px;
  padding: 14px; color: #fff;
}
`
      }
    },

    /* --------------------------------------------------------------- 15 */
    {
      id: 'blend-modes',
      title: 'Blend modes',
      body: [
        { code:
`.duotone { background: url(a.jpg) center/cover, teal;
           background-blend-mode: luminosity; }
.overlay-text { mix-blend-mode: difference; }   /* inverts over any background */` },

        '<code>background-blend-mode</code> blends an element’s own background layers; ' +
        '<code>mix-blend-mode</code> blends the whole element with what is behind it.'
      ],
      playground: {
        title: 'Text that reads on anything',
        height: 300,
        tryThis: 'The label uses <code>mix-blend-mode: difference</code>, so it inverts ' +
                 'against whatever it is over and stays legible across the whole gradient. ' +
                 'Remove the line and watch it disappear into the light end.',
        html: `
<div class="scene"><span class="label">ALWAYS READABLE</span></div>
`,
        css: `
body { font-family: system-ui, sans-serif; }
.scene {
  height: 140px; border-radius: 10px;
  display: grid; place-items: center;
  background: linear-gradient(90deg, #000, #fff);
}
.label {
  color: #fff;
  mix-blend-mode: difference;
  font-size: 26px; font-weight: 800; letter-spacing: .08em;
}
`
      }
    },

    /* --------------------------------------------------------------- 16 */
    {
      id: 'clip-path',
      title: 'clip-path and mask',
      body: [
        { code:
`.diagonal { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
.circle   { clip-path: circle(50%); }
.rounded  { clip-path: inset(10px round 12px); }
.fade-out { mask-image: linear-gradient(to bottom, black 60%, transparent); }` },

        '<code>clip-path</code> is animatable when the point count matches between the two ' +
        'states, which is what makes a shape morph on hover possible.'
      ],
      playground: {
        title: 'Clipping and masking',
        height: 320,
        tryThis: 'Change the last pair of coordinates in the polygon from <code>0 100%</code> ' +
                 'to <code>0 60%</code> and the diagonal steepens. Each pair is an x y point, ' +
                 'clockwise from the top left.',
        html: `
<div class="row">
  <div class="s diagonal">polygon</div>
  <div class="s circle">circle</div>
  <div class="s fade">mask fade</div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 12px; }
.row { display: flex; gap: 10px; }
.s {
  flex: 1; height: 140px;
  display: grid; place-items: center; color: #fff;
  background: linear-gradient(135deg, #0f766e, #2dd4bf);
}
.diagonal { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
.circle   { clip-path: circle(50%); }
.fade     { -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent);
            mask-image: linear-gradient(to bottom, black 55%, transparent); }
`
      }
    },

    /* --------------------------------------------------------------- 17 */
    {
      id: 'nesting',
      title: 'Nesting',
      body: [
        { code:
`.card {
  padding: 1rem;

  & h3 { margin: 0 0 .5rem; }
  &:hover { box-shadow: var(--shadow-1); }
  &.is-active { border-color: var(--brand); }

  @media (min-width: 40rem) { padding: 2rem; }
}` },

        { list: [
          'Native now. No preprocessor needed.',
          'The <code>&amp;</code> is required when the nested selector starts with an element ' +
          'name, and is good practice everywhere.',
          '<strong>Do not nest more than two levels.</strong> Deep nesting produces long ' +
          'selectors and high specificity — which is the exact problem you were trying to ' +
          'avoid.'
        ]}
      ],
      playground: {
        title: 'Nesting, kept shallow',
        height: 320,
        tryThis: 'Everything about the card lives in one block, including its hover state and ' +
                 'its breakpoint. Try nesting a third level deep and check the specificity ' +
                 'of what you have written in the Part 2 calculator.',
        html: `
<article class="card">
  <h3>Junior Software Engineer</h3>
  <p>Kaz Software</p>
  <a href="#">Apply</a>
</article>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }

.card {
  background: #fff;
  border: 1px solid #dfe3e8;
  border-left: 4px solid #205bcb;
  border-radius: 8px;
  padding: 14px;
  transition: box-shadow .2s;

  & h3 { margin: 0 0 4px; font-size: 16px; }
  & p  { margin: 0 0 10px; color: #5b6672; }

  & a {
    display: inline-block;
    background: #205bcb; color: #fff;
    text-decoration: none;
    padding: 6px 14px; border-radius: 6px;
  }

  &:hover { box-shadow: 0 8px 20px rgb(0 0 0 / .1); }
}
`
      }
    },

    /* --------------------------------------------------------------- 18 */
    {
      id: 'has-selector',
      title: ':has(), the parent selector',
      body: [
        { code:
`.card:has(img)           { padding-top: 0; }
label:has(input:checked) { font-weight: 700; }
form:has(:invalid) button[type=submit] { opacity: .5; }
body:has(dialog[open])   { overflow: hidden; }   /* lock scroll, no JS */
.grid:has(> :nth-child(4)) { grid-template-columns: repeat(2, 1fr); }` },

        '<code>:has()</code> selects an element based on its descendants, its siblings or ' +
        'their state, which removes an enormous amount of small JavaScript. Its specificity ' +
        'is that of its most specific argument — the Part 2 calculator handles this correctly ' +
        'if you want to check one.'
      ],
      playground: {
        title: 'A form that responds to itself',
        height: 340,
        tryThis: 'Type something valid into both fields and the submit button comes alive — ' +
                 'no JavaScript anywhere. Then tick a checkbox and watch its whole row change.',
        html: `
<form>
  <label class="row"><input type="checkbox"> Full-time</label>
  <label class="row"><input type="checkbox"> Remote</label>

  <p><input type="email" required placeholder="you@uiu.ac.bd"></p>
  <p><input type="text" required minlength="3" placeholder="Your name"></p>

  <button type="button">Apply</button>
</form>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
input { accent-color: #205bcb; }

.row { display: flex; align-items: center; gap: 8px;
       padding: 8px 10px; margin-bottom: 6px;
       border: 1px solid #dfe3e8; border-radius: 8px; }
.row:has(input:checked) {
  background: #e2ebfa; border-color: #205bcb; font-weight: 600;
}

input[type="email"], input[type="text"] {
  width: 100%; padding: 8px 10px; font: inherit;
  border: 1px solid #7c8794; border-radius: 6px;
}

button {
  background: #205bcb; color: #fff; border: 0;
  border-radius: 6px; padding: 9px 18px; font: inherit;
  opacity: .4; pointer-events: none;
  transition: opacity .2s;
}
form:not(:has(:invalid)) button { opacity: 1; pointer-events: auto; }
`
      }
    },

    /* --------------------------------------------------------------- 19 */
    {
      id: 'layer',
      title: '@layer',
      body: [
        { code:
`@layer reset, base, components, utilities;

@layer components { .btn { padding: .6rem 1rem; } }
@layer utilities  { .p-0 { padding: 0; } }

/* Later layers always beat earlier ones, regardless of specificity.
   Utilities finally win without !important. */` },

        'Worth knowing, rarely needed on a two-file exam answer. It matters the moment you ' +
        'have a stylesheet you did not write and need to override it predictably.'
      ]
    },

    /* --------------------------------------------------------------- 20 */
    {
      id: 'supports',
      title: '@supports',
      body: [
        { code:
`@supports (backdrop-filter: blur(4px)) {
  .glass { backdrop-filter: blur(12px); background: rgb(255 255 255 / .5); }
}
@supports not (aspect-ratio: 1) { /* fallback */ }
@supports selector(:has(a))     { /* only if :has is understood */ }` },

        'Progressive enhancement in one construct: write a working baseline, then improve it ' +
        'inside <code>@supports</code>. The page should never be broken, only plainer.'
      ]
    },

    /* --------------------------------------------------------------- 21 */
    {
      id: 'scroll-behaviour',
      title: 'Scroll behaviour',
      body: [
        { code:
`html { scroll-behavior: smooth; scroll-padding-top: 5rem; }

.carousel {
  display: flex; gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;   /* stop the page bouncing */
  scrollbar-width: thin;
}
.carousel > * { scroll-snap-align: start; flex: none; }` },

        '<code>scroll-padding-top</code> is the fix for anchor links disappearing under a ' +
        'sticky header. Set it on the scroll container, <em>not</em> ' +
        '<code>scroll-margin-top</code> on every target — this site learned that the hard ' +
        'way, because setting both makes every jump overshoot by exactly double.'
      ],
      playground: {
        title: 'A snapping carousel',
        height: 300,
        tryThis: 'Drag the row sideways and let go mid-card — it snaps. Remove ' +
                 '<code>scroll-snap-type</code> and it drifts wherever you left it.',
        html: `
<div class="carousel">
  <div class="c">1</div><div class="c">2</div><div class="c">3</div>
  <div class="c">4</div><div class="c">5</div><div class="c">6</div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; }
.carousel {
  display: flex; gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  padding-bottom: 10px;
}
.c {
  flex: none;
  width: 150px; height: 110px;
  scroll-snap-align: start;
  display: grid; place-items: center;
  background: #0f766e; color: #fff;
  border-radius: 8px; font-size: 22px;
}
`
      }
    },

    /* --------------------------------------------------------------- 22 */
    {
      id: 'recipes-surfaces',
      title: 'Recipe library: surfaces',
      body: [
        'Copy, adapt, understand. Each of these is built only from ideas already covered.',

        { h: 'Gradient text' },
        { playground: {
          title: 'Gradient text',
          height: 240,
          tryThis: 'Both <code>background-clip</code> lines are needed for now — the ' +
                   '<code>-webkit-</code> prefix is one of the three still worth writing.',
          html: `<h1 class="gradient-text">Find A Perfect Flat</h1>`,
          css: `
body { font-family: system-ui, sans-serif; }
.gradient-text {
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 34px;
}
`
        }},

        { h: 'Gradient border' },
        { playground: {
          title: 'Gradient border',
          height: 260,
          tryThis: 'The trick is two backgrounds with different <code>background-clip</code> ' +
                   'boxes. Change the first <code>white</code> pair to match a dark card and ' +
                   'the effect still works.',
          html: `<div class="gradient-border">A border CSS cannot otherwise draw</div>`,
          css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.gradient-border {
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 20px;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #06b6d4, #a855f7) border-box;
}
`
        }},

        { h: 'Glassmorphism panel' },
        { playground: {
          title: 'Glass panel',
          height: 280,
          tryThis: 'Raise the blur to 30px, then drop the background alpha to 0. The effect ' +
                   'collapses — the translucent background is doing half the work.',
          html: `
<div class="scene">
  <div class="glass">
    <strong>Start Your Free Trial</strong>
    <p>Sign up today and get 30 days free access.</p>
  </div>
</div>`,
          css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.scene {
  padding: 30px; border-radius: 12px;
  background: linear-gradient(120deg, #6b63ff, #ea6aa8, #f97316);
}
.glass {
  background: rgb(255 255 255 / .12);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgb(255 255 255 / .25);
  border-radius: 16px;
  padding: 18px;
  color: #fff;
}
.glass p { margin: 6px 0 0; opacity: .9; }
`
        }}
      ]
    },

    /* --------------------------------------------------------------- 23 */
    {
      id: 'recipes-interaction',
      title: 'Recipe library: interaction',
      body: [
        { h: 'Card hover lift' },
        { playground: {
          title: 'Hover lift',
          height: 260,
          tryThis: 'Two properties, both compositor-friendly. Add ' +
                   '<code>margin-top: -4px</code> instead of the transform and watch the ' +
                   'neighbouring card move too — that is why it is a transform.',
          html: `
<div class="row">
  <article class="card">Hover me</article>
  <article class="card">And me</article>
</div>`,
          css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.row { display: flex; gap: 12px; }
.card {
  flex: 1; padding: 24px;
  background: #fff; border: 1px solid #dfe3e8; border-radius: 10px;
  transition: transform .25s ease, box-shadow .25s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgb(0 0 0 / .12);
}
`
        }},

        { h: 'Underline that grows from the left' },
        { playground: {
          title: 'Animated underline',
          height: 240,
          tryThis: 'The width never changes — only <code>scaleX</code>, from a ' +
                   '<code>transform-origin</code> on the left. Set the origin to ' +
                   '<code>right</code> and it grows the other way.',
          html: `<p><a class="link" href="#">Create Your Website Now</a></p>`,
          css: `
body { font-family: system-ui, sans-serif; }
.link {
  position: relative;
  color: #205bcb;
  text-decoration: none;
}
.link::after {
  content: "";
  position: absolute; left: 0; bottom: -2px;
  width: 100%; height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .25s ease;
}
.link:hover::after { transform: scaleX(1); }
`
        }},

        { h: 'Tooltip with no JavaScript' },
        { playground: {
          title: 'CSS-only tooltip',
          height: 260,
          tryThis: 'The text comes from the <code>data-tip</code> attribute via ' +
                   '<code>attr()</code>. Change the attribute, not the CSS. Note the ' +
                   '<code>:focus-visible</code> rule — without it the tooltip is invisible ' +
                   'to keyboard users.',
          html: `
<p>Deadline
  <button class="tip" data-tip="Applications close 30 December 2025">?</button>
</p>`,
          css: `
body { font-family: system-ui, sans-serif; font-size: 13px; padding-top: 50px; }
.tip {
  position: relative;
  width: 20px; height: 20px; border-radius: 50%;
  border: 1px solid #7c8794; background: #fff;
  font: inherit; cursor: help;
}
.tip::after {
  content: attr(data-tip);
  position: absolute; bottom: 130%; left: 50%; translate: -50% 0;
  padding: 6px 10px; border-radius: 6px; white-space: nowrap;
  background: #17202a; color: #fff; font-size: 12px;
  opacity: 0; pointer-events: none; transition: opacity .15s;
}
.tip:hover::after, .tip:focus-visible::after { opacity: 1; }
`
        }},

        { h: 'Custom checkbox' },
        { playground: {
          title: 'accent-color and :checked',
          height: 240,
          tryThis: 'One line recolours the native control, and <code>:has()</code> styles ' +
                   'the label around it. This is the whole answer for the checkbox rows in ' +
                   '<em>CareerHub</em> and <em>CORE-TECH</em>.',
          html: `
<label class="opt"><input type="checkbox" checked> Read</label>
<label class="opt"><input type="checkbox"> Write</label>
<label class="opt"><input type="checkbox"> Delete</label>`,
          css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.opt {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; margin-bottom: 6px;
  border: 1px solid #dfe3e8; border-radius: 8px;
}
input[type="checkbox"] {
  accent-color: #1a237e;
  width: 1.05em; height: 1.05em;
}
.opt:has(input:checked) { border-color: #1a237e; color: #1a237e; font-weight: 600; }
`
        }}
      ]
    },

    /* --------------------------------------------------------------- 24 */
    {
      id: 'recipes-loading',
      title: 'Recipe library: progress and loading',
      body: [
        { h: 'Progress bar' },
        'Not in the original recipe list, but it belongs at the top of it: <strong>three of ' +
        'the twelve prototypes have progress bars</strong> and every one is two nested divs.',

        { playground: {
          title: 'Progress bars',
          height: 280,
          tryThis: 'The width and the colour both come from custom properties set in the ' +
                   'HTML, so one rule block serves every bar. Add a fourth.',
          html: `
<div class="bar" style="--w: 80%; --c: #536ffe"></div>
<div class="bar" style="--w: 50%; --c: #9efe1e"></div>
<div class="bar" style="--w: 60%; --c: #febd57"></div>`,
          css: `
body { font-family: system-ui, sans-serif; }
.bar {
  height: 8px;
  background: #ebebeb;
  border-radius: 999px;
  margin-bottom: 14px;
  overflow: hidden;
}
.bar::before {
  content: "";
  display: block;
  width: var(--w);
  height: 100%;
  background: var(--c);
  border-radius: inherit;
}
`
        }},

        { h: 'Skeleton shimmer' },
        { playground: {
          title: 'Loading shimmer',
          height: 260,
          tryThis: 'The animation moves <code>background-position</code>, not the element. ' +
                   'Widen <code>background-size</code> to <code>800%</code> and the sweep ' +
                   'slows without changing the duration.',
          html: `
<div class="sk" style="width: 60%"></div>
<div class="sk"></div>
<div class="sk" style="width: 80%"></div>`,
          css: `
body { font-family: system-ui, sans-serif; }
.sk {
  height: 14px;
  border-radius: 7px;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #eee 25%, #f7f7f7 37%, #eee 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}
@keyframes shimmer {
  from { background-position: 100% 0; }
  to   { background-position: -100% 0; }
}
`
        }},

        { h: 'Spinner' },
        { playground: {
          title: 'Spinner',
          height: 240,
          tryThis: 'A circle with one differently coloured border side, rotating. Remove ' +
                   '<code>border-top-color</code> and it becomes an invisible spinning ring.',
          html: `<div class="spinner"></div>`,
          css: `
body { font-family: system-ui, sans-serif; display: grid;
       place-items: center; min-height: 140px; }
.spinner {
  width: 34px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid rgb(0 0 0 / .12);
  border-top-color: #0f766e;
  animation: spin .8s linear infinite;
}
@keyframes spin { to { rotate: 360deg; } }
`
        }},

        { h: 'Counters for numbered sections' },
        { playground: {
          title: 'CSS counters',
          height: 260,
          tryThis: 'Delete a figure and the rest renumber themselves. No number is written ' +
                   'anywhere in the HTML.',
          html: `
<article>
  <figure><div class="ph"></div><figcaption>Quarterly sales</figcaption></figure>
  <figure><div class="ph"></div><figcaption>Regional split</figcaption></figure>
  <figure><div class="ph"></div><figcaption>Forecast</figcaption></figure>
</article>`,
          css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
article { counter-reset: fig; }
figure { counter-increment: fig; margin: 0 0 12px; }
.ph { height: 40px; border-radius: 6px;
      background: linear-gradient(135deg, #0f766e, #2dd4bf); }
figcaption { margin-top: 4px; color: #5b6672; }
figcaption::before {
  content: "Figure " counter(fig) ": ";
  font-weight: 700; color: #17202a;
}
`
        }}
      ]
    },

    /* --------------------------------------------------------------- 25 */
    {
      id: 'advanced-traps',
      title: 'Traps',
      body: [
        { table: {
          head: ['Trap', 'Fix'],
          rows: [
            ['Transition does nothing',
             'The property is not animatable, or the start value was never declared — you ' +
             'cannot transition from <code>auto</code> or from an unset value.'],
            ['Animation snaps back at the end', 'Missing <code>animation-fill-mode: forwards</code> or <code>both</code>.'],
            ['Animation flickers on load', 'Add <code>fill-mode: backwards</code> so the first keyframe applies during the delay.'],
            ['Blurry text after a transform', 'A fractional scale or translate. Try <code>translateZ(0)</code>, or round the values.'],
            ['<code>backdrop-filter</code> has no effect',
             'The element needs a semi-transparent background, and the parent must not be opaque over it.'],
            ['Variable in a media query does not work', 'Not supported. Use plain values for breakpoints.'],
            ['<code>transform</code> breaks <code>position: fixed</code> children', 'Expected: a transform creates a containing block.'],
            ['Animation is janky on mobile', 'You are animating layout properties. Move to <code>transform</code> and <code>opacity</code>.']
          ]
        }},

        { callout: { kind: 'tip', title: 'What to carry forward from Part 4',
          text: 'Define your design decisions once as custom properties, animate only ' +
                '<code>transform</code> and <code>opacity</code>, respect ' +
                '<code>prefers-reduced-motion</code>, and use <code>:has()</code> and ' +
                'nesting to keep the CSS itself simple. Motion should confirm what the user ' +
                'did, not perform for them: short, ease-out, under 300ms for anything ' +
                'interactive.' }},

        { callout: { kind: 'note', title: 'And in the exam',
          text: 'Almost none of this earns marks. The prototypes are static screenshots — ' +
                'there is no hover state to reproduce and no animation to see. The two ' +
                'exceptions are <strong>custom properties</strong>, which save real time on ' +
                'every multi-coloured card row, and <strong>gradients</strong> from Part 2. ' +
                'Everything else here is for the work you do afterwards.' }}
      ]
    }

  ]
});
