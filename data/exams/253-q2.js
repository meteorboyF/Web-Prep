/* 253-q2.js — Admin dashboard. Mid Term 253, Fall 2025, Q2. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>Dashboard</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '</body>',
    '</html>'
  ].join('\n');

  var HTML_FULL = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>Dashboard</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<header class="topbar">',
    '  <h1 class="brand">Dashboard</h1>',
    '  <nav class="nav">',
    '    <a class="is-active" href="#">Home</a>',
    '    <a href="#">Projects</a>',
    '    <a href="#">Tasks</a>',
    '    <a href="#">Reports</a>',
    '    <a href="#">Settings</a>',
    '  </nav>',
    '  <div class="user">',
    '    <p class="user__name">John Smith</p>',
    '    <p class="user__role">Admin</p>',
    '  </div>',
    '  <span class="avatar avatar--sm">JS</span>',
    '</header>',
    '',
    '<main class="panel">',
    '',
    '  <h2 class="greet">Hi John</h2>',
    '  <p class="greet__sub">Welcome to your dashboard!</p>',
    '',
    '  <section class="stats">',
    '',
    '    <article class="card profile">',
    '      <span class="avatar">JS</span>',
    '      <div class="profile__who">',
    '        <h3>John Smith</h3>',
    '        <p>Web &amp; Graphic designer</p>',
    '      </div>',
    '      <div class="profile__bars">',
    '        <p class="meter__label">Project Completion</p>',
    '        <div class="meter" style="--w: 80%; --c: var(--blue)"></div>',
    '        <p class="meter__value">80%</p>',
    '',
    '        <p class="meter__label">Overall Rating</p>',
    '        <div class="meter" style="--w: 70%; --c: var(--red)"></div>',
    '        <p class="meter__value">7/10</p>',
    '      </div>',
    '    </article>',
    '',
    '    <div class="stack">',
    '      <article class="card stat">',
    '        <p class="stat__label">Tasks Completed</p>',
    '        <p class="stat__value">17</p>',
    '      </article>',
    '      <article class="card stat">',
    '        <p class="stat__label">Tasks In Progress</p>',
    '        <p class="stat__value">24</p>',
    '      </article>',
    '    </div>',
    '',
    '    <article class="card stat stat--tall">',
    '      <p class="stat__label">Revenue</p>',
    '      <p class="stat__value">30,000/-</p>',
    '      <p class="stat__foot">Last Week</p>',
    '    </article>',
    '',
    '  </section>',
    '',
    '  <h2 class="section-title">Recent Projects</h2>',
    '',
    '  <section class="projects">',
    '',
    '    <article class="card project">',
    '      <h3>UIU Canteen</h3>',
    '      <span class="chip" style="--c: var(--lilac)">Design</span>',
    '      <p>Update the website logo...</p>',
    '      <div class="meter" style="--w: 90%; --c: var(--lilac)"></div>',
    '      <p class="meter__value">90%</p>',
    '    </article>',
    '',
    '    <article class="card project">',
    '      <h3>Valorant Knockoff</h3>',
    '      <span class="chip" style="--c: var(--lime)">Plan</span>',
    '      <p>Plan better ranking system...</p>',
    '      <div class="meter" style="--w: 50%; --c: var(--lime)"></div>',
    '      <p class="meter__value">50%</p>',
    '    </article>',
    '',
    '    <article class="card project">',
    '      <h3>Prompt Engineering</h3>',
    '      <span class="chip" style="--c: var(--amber)">Development</span>',
    '      <p>Communicate with the team...</p>',
    '      <div class="meter" style="--w: 60%; --c: var(--amber)"></div>',
    '      <p class="meter__value">60%</p>',
    '    </article>',
    '',
    '  </section>',
    '',
    '</main>',
    '',
    '</body>',
    '</html>'
  ].join('\n');

  var B = {};

  B.reset = [
    '/* 1. The reset. */',
    '* { margin: 0; padding: 0; box-sizing: border-box; }',
    '',
    'body { font-family: system-ui, Arial, sans-serif; }',
    'a { text-decoration: none; color: inherit; }'
  ].join('\n');

  B.outline = [
    '',
    '/* 2. Show me the boxes. */',
    '* { outline: 1px solid rgba(180, 84, 27, .5); }'
  ].join('\n');

  B.outlineOff = [
    '',
    '/* 2. Boxes confirmed. Commented, not deleted. */',
    '/* * { outline: 1px solid rgba(180, 84, 27, .5); } */'
  ].join('\n');

  B.palette = [
    '',
    '/* 3. The six annotated codes, transcribed once. */',
    ':root {',
    '  --blue:  #536FFE;   /* avatars, the completion bar */',
    '  --lilac: #C1CDFF;   /* active nav link, Design chip and its bar */',
    '  --grey:  #EBEBEB;   /* the panel behind everything */',
    '  --red:   #F93536;   /* the rating bar */',
    '  --lime:  #9EFE1E;   /* Plan chip and its bar */',
    '  --amber: #FEBD57;   /* Development chip and its bar */',
    '',
    '  /* Not annotated. Any near-white and any mid grey will do. */',
    '  --card:  #ffffff;',
    '  --ink:   #6b7280;',
    '  --track: #e6e6e6;',
    '}',
    '',
    'body { background: var(--card); color: #111827; padding: 20px; }'
  ].join('\n');

  B.topbar = [
    '',
    '/* 4. Top bar: title left, links centred, user block right. */',
    '.topbar {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 18px;',
    '  padding: 16px 22px;',
    '}',
    '.brand { font-size: 24px; margin-right: auto; }',
    '',
    '.nav { display: flex; gap: 30px; font-size: 17px; font-weight: 600; }',
    '.nav .is-active { color: var(--lilac); }',
    '',
    '.user { margin-left: auto; text-align: right; }',
    '.user__name { font-size: 15px; }',
    '.user__role { font-size: 14px; color: #9ca3af; }',
    '',
    '.avatar {',
    '  width: 58px;',
    '  aspect-ratio: 1;',
    '  border-radius: 50%;',
    '  background: var(--blue);',
    '  color: #fff;',
    '  display: grid;',
    '  place-items: center;',
    '  font-weight: 700;',
    '  font-size: 19px;',
    '}',
    '.avatar--sm { width: 46px; font-size: 16px; }'
  ].join('\n');

  B.panel = [
    '',
    '/* 5. The grey panel, and the two card grids inside it. */',
    '.panel {',
    '  background: var(--grey);',
    '  border-radius: 10px;',
    '  padding: 26px;',
    '}',
    '.greet { font-size: 25px; }',
    '.greet__sub { color: var(--ink); margin-bottom: 22px; }',
    '.section-title { font-size: 20px; margin: 26px 0 16px; }',
    '',
    '/* The first row is three columns, and the middle one holds two',
    '   stacked cards. That is a nested grid, not a special case. */',
    '.stats {',
    '  display: grid;',
    '  grid-template-columns: 1.75fr 1fr 1fr;',
    '  gap: 20px;',
    '  align-items: stretch;',
    '}',
    '.stack { display: grid; gap: 20px; }',
    '',
    '.projects {',
    '  display: grid;',
    '  grid-template-columns: repeat(3, 1fr);',
    '  gap: 20px;',
    '}',
    '',
    '.card {',
    '  background: var(--card);',
    '  border-radius: 10px;',
    '  padding: 20px;',
    '}'
  ].join('\n');

  B.meter = [
    '',
    '/* 6. One progress bar component, used five times. */',
    '.meter {',
    '  height: 9px;',
    '  border-radius: 999px;',
    '  background: var(--track);',
    '  overflow: hidden;',
    '}',
    '.meter::before {',
    '  content: "";',
    '  display: block;',
    '  width: var(--w);',
    '  height: 100%;',
    '  background: var(--c);',
    '}',
    '.meter__label {',
    '  font-size: 14px;',
    '  letter-spacing: .04em;',
    '  text-transform: uppercase;',
    '  color: var(--ink);',
    '  margin-bottom: 8px;',
    '}',
    '.meter__value { font-size: 14px; color: var(--ink); margin-top: 8px; }',
    '',
    '/* And one chip, used three times. */',
    '.chip {',
    '  display: inline-block;',
    '  background: var(--c);',
    '  border-radius: 999px;',
    '  padding: 5px 16px;',
    '  font-size: 13px;',
    '  color: #333;',
    '}'
  ].join('\n');

  B.cards = [
    '',
    '/* 7. The cards themselves. */',
    '.profile { display: flex; align-items: center; gap: 22px; }',
    '.profile__who h3 { font-size: 19px; }',
    '.profile__who p  { font-size: 15px; color: var(--ink); max-width: 12ch; }',
    '.profile__bars   { flex: 1; min-width: 0; }',
    '/* The label that follows a value, i.e. the second bar. Written as a',
    '   sibling rule rather than :nth-of-type, which counts <p> elements',
    '   and would land on the percentage. */',
    '.profile__bars .meter__value + .meter__label { margin-top: 22px; }',
    '',
    '.stat { display: flex; flex-direction: column; }',
    '.stat__label { font-size: 15px; color: var(--ink); }',
    '.stat__value { font-size: 30px; font-weight: 700; margin-top: 6px; }',
    '.stat--tall .stat__foot { margin-top: auto; font-size: 15px; color: var(--ink); }',
    '',
    '.project h3 { font-size: 18px; margin-bottom: 12px; }',
    '.project p  { font-size: 15px; color: var(--ink); margin: 16px 0 12px; }'
  ].join('\n');

  B.details = [
    '',
    '/* 8. Details. */',
    '.card { box-shadow: 0 1px 3px rgb(0 0 0 / .06); }',
    '.nav a { transition: color .15s; }',
    '.nav a:hover { color: var(--blue); }',
    '.meter::before { transition: width .3s ease; }'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('253-q2', {
    id: '253-q2',
    paper: 'Mid Term 253 · Fall 2025 · Q2',
    title: 'Admin dashboard',
    marks: 15,
    minutes: 43,
    image: 'assets/img/prototypes/253-q2.jpg',
    paletteSource: 'annotated',
    prev: { id: '253-q1', label: '253 Q1 · ProConnect' },
    next: { id: 'slot1-q1', label: 'Slot 1 Q1 · CORE-TECH' },

    palette: [
      { name: 'blue',  hex: '#536FFE', role: 'Both avatar circles, and the completion bar' },
      { name: 'lilac', hex: '#C1CDFF', role: 'The active Home link, the Design chip and its bar' },
      { name: 'grey',  hex: '#EBEBEB', role: 'The panel behind everything below the top bar' },
      { name: 'red',   hex: '#F93536', role: 'The overall rating bar' },
      { name: 'lime',  hex: '#9EFE1E', role: 'The Plan chip and its bar' },
      { name: 'amber', hex: '#FEBD57', role: 'The Development chip and its bar' }
    ],

    structureIntro:
      'This one looks busy and is not. Almost everything on the page is one of two components ' +
      'repeated — a progress bar and a pill — and the layout is two grids. Find those and the ' +
      'work halves.',

    structure: [
      { region: 'A white top bar, outside the grey',
        note: 'Title on the left, five links in the middle, a name-and-role block and a ' +
              'circular avatar on the right. One flex row with <code>margin-right: auto</code> ' +
              'on the title and <code>margin-left: auto</code> on the user block, which pins ' +
              'the nav in the centre without any positioning.' },
      { region: 'One grey rounded panel holding the rest',
        note: 'Everything below the top bar sits on <code>#EBEBEB</code> with a radius and ' +
              'generous padding. Draw this box first — it is the thing that makes the page ' +
              'read as a dashboard.' },
      { region: 'Stats row: three columns, but the middle is two cards',
        note: 'A grid of roughly <code>1.75fr 1fr 1fr</code>. The middle column holds two ' +
              'stacked cards, which is a nested grid with a gap — not a special case, and not ' +
              'a reason to reach for anything cleverer.' },
      { region: 'The profile card is a flex row of three parts',
        note: 'Avatar, then name and role, then the bars taking the remaining width with ' +
              '<code>flex: 1</code>.' },
      { region: 'Five progress bars, one component',
        note: 'Two in the profile card, three in the project cards. Each is a track div whose ' +
              '<code>::before</code> is the fill, with the width and colour coming from custom ' +
              'properties set in the HTML. Write it once.' },
      { region: 'Three project cards, one component',
        note: 'Title, coloured pill, one line of text, a bar, a percentage. Identical except ' +
              'for a single <code>--c</code>.' }
    ],

    method:
      'Reset, all the HTML, palette. Then the top bar, then the grey panel and the two grids ' +
      'inside it — the skeleton — before any card contents. Then build the <em>components</em> ' +
      '(bar and chip) before the cards that use them, because five bars written once is the ' +
      'difference between finishing and not. Cards last, details after that.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Four lines. <code>a { color: inherit }</code> matters here because the nav links ' +
             'are not blue in the design and you do not want to override the browser twice.',
        detail: [
          'The usual four lines. <code>a { color: inherit }</code> matters here because the five nav links are dark in the design, not blue.',
          'No <code>font: inherit</code> needed — this page has no form controls at all, which is unusual for the set.',
          '<code>box-sizing: border-box</code> is doing the heaviest lifting: every card on this page has padding inside a grid track.'
        ],
        check: 'A blank white page.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 9,
        why: 'The longest single step, and worth it. Note the two things that make the rest ' +
             'easy: the middle stats column is wrapped in a <code>.stack</code> div, and every ' +
             'bar and chip carries its width and colour as an inline custom property. Those ' +
             'two decisions are made here, in the markup, not later in the CSS.',
        trap: 'The middle column is <em>two</em> cards, not one card split in half. If you do ' +
              'not wrap them now you will end up fighting <code>grid-row</code> later for no ' +
              'reason.',
        detail: [
          'The longest step, and worth going slowly. Two decisions made here save the whole of steps 6 and 7.',
          'The middle stats column is wrapped in a <code>&lt;div class="stack"&gt;</code>. Without that wrapper you will be fighting <code>grid-row</code> later for no reason.',
          'Every bar carries <code>style="--w: 80%; --c: var(--blue)"</code> and every chip carries <code>style="--c: …"</code>. The CSS will then never mention a specific colour or width.',
          'The avatar appears twice at two sizes — same class, plus a <code>--sm</code> modifier for the header one.'
        ],
        check: 'Count the boxes: three columns in the stats row, and the middle one containing two cards. Then three project cards below.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette',
        minutes: 3,
        why: 'Six annotated codes plus three of your own for the card white, the muted text ' +
             'and the empty part of a bar. Naming them now is what lets the bar and chip rules ' +
             'read as <code>var(--c)</code> rather than a hex you have to look up six times.',
        detail: [
          'Six annotated codes, plus three of your own for the card white, the muted text and the empty part of a bar.',
          'Naming them lets the bar and chip rules read as <code>var(--c)</code> rather than a hex repeated in six places.',
          '<code>--track</code> is the unfilled part of a progress bar. It is not annotated; any light grey reads correctly.'
        ],
        check: 'No visible change beyond the body colour. The variables exist but nothing uses them yet.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The top bar',
        minutes: 5,
        why: 'One flex row. The title takes <code>margin-right: auto</code> and the user block ' +
             'takes <code>margin-left: auto</code>, which pushes the nav into the middle with ' +
             'no <code>justify-content</code> and no spacer elements. The avatar is a fixed ' +
             'width with <code>aspect-ratio: 1</code>, <code>border-radius: 50%</code> and ' +
             '<code>place-items: center</code> — three lines for a circle with centred initials.',
        detail: [
          'The nav appears centred, but nothing here centres it. <code>margin-right: auto</code> on the title and <code>margin-left: auto</code> on the user block push it into the middle from both sides.',
          'That is more robust than <code>justify-content: center</code>, which would move as soon as the title or the user block changed length.',
          'The avatar is a circle in three declarations: a width, <code>aspect-ratio: 1</code> and <code>border-radius: 50%</code>. <code>place-items: center</code> centres the initials without any line-height arithmetic.'
        ],
        check: 'Title left, links visually centred, name and avatar hard right, all on one line.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'topbar'])
      },
      {
        title: 'The grey panel and both grids',
        minutes: 6,
        why: 'The whole page skeleton. <code>1.75fr 1fr 1fr</code> for the stats row and ' +
             '<code>repeat(3, 1fr)</code> for the projects. The nested <code>.stack</code> ' +
             'grid gives the middle column its two cards. Outlines come off — the structure is ' +
             'right.',
        detail: [
          '<code>1.75fr 1fr 1fr</code> for the stats row — the profile card is visibly wider than the two beside it. Measure against the target rather than assuming equal thirds.',
          '<code>.stack</code> is a nested grid with the same gap as its parent, so the two small cards line up with the top and bottom of the profile card.',
          '<code>repeat(3, 1fr)</code> for the projects row — that one really is equal.',
          'One <code>.card</code> rule gives every card its white background, radius and padding. Six cards, one rule.'
        ],
        check: 'The profile card should be wider than the others, and the two stacked cards should share their column.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'topbar', 'panel'])
      },
      {
        title: 'The two components: bar and chip',
        minutes: 7,
        why: 'Twenty lines that serve eight elements. The bar is a rounded track with ' +
             '<code>overflow: hidden</code>, and the fill is its <code>::before</code> with ' +
             '<code>width: var(--w)</code>. Changing a percentage is now an HTML edit, not a ' +
             'CSS one.',
        trap: 'The track needs <code>overflow: hidden</code> or the square-cornered fill will ' +
              'poke out of the rounded ends. It is the same rule as a coloured header inside a ' +
              'rounded card.',
        detail: [
          'Twenty lines that serve eight elements — five bars and three chips.',
          'The bar is a rounded track with <code>overflow: hidden</code>; the fill is a <code>::before</code> with <code>width: var(--w)</code>.',
          'A pseudo-element with no <code>content</code> is never generated. If a bar renders as an empty track, that is why.',
          'The chip is a pill: <code>border-radius: 999px</code> and a background from <code>var(--c)</code>. Any radius above half the height gives a perfect capsule.'
        ],
        check: 'Five bars at five different lengths and three coloured pills. Each bar should match its chip.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'topbar', 'panel', 'meter'])
      },
      {
        title: 'The cards',
        minutes: 6,
        why: 'The profile card is a flex row with the bars on <code>flex: 1</code>. The tall ' +
             'revenue card uses <code>margin-top: auto</code> on its "Last Week" line to push ' +
             'it to the bottom — the same trick as a sticky footer, at card scale.',
        detail: [
          'The profile card is a flex row of three parts, with the bars taking <code>flex: 1</code> so they fill whatever is left.',
          '<code>min-width: 0</code> on the bars stops the flex item refusing to shrink — the single most common cause of a flex row overflowing.',
          'The tall revenue card uses <code>margin-top: auto</code> on its Last Week line to push it to the bottom. Same trick as a sticky page footer, at card scale.',
          'The second bar label needs spacing above it. That is a sibling selector on the value that precedes it, not <code>:nth-of-type</code>, which counts paragraphs and would land on a percentage.'
        ],
        check: 'Last Week should sit at the bottom of the revenue card, not directly under the number.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'topbar', 'panel', 'meter', 'cards'])
      },
      {
        title: 'Details, and compare',
        minutes: 4,
        why: 'A faint card shadow and a hover on the nav. Then <strong>Compare</strong> and ' +
             'check three things: the nav really is centred, the two middle cards line up with ' +
             'the top and bottom of the profile card, and every bar fill is the same colour as ' +
             'its chip.',
        detail: [
          'A faint shadow on every card, a hover on the nav, and a width transition on the bars.',
          'Press Compare and check three things: the nav really is centred, the two middle cards align with the top and bottom of the profile card, and every bar fill matches its chip colour.',
          'If anything is left over, spend it on the spacing inside the profile card rather than on more effects.'
        ],
        check: 'The grey panel should be the thing that makes this read as a dashboard. If it does, you are done.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'topbar', 'panel', 'meter', 'cards', 'details'])
      }
    ],

    marksNote:
      'The three-column stats row with a stacked middle column, the three project cards, six ' +
      'working progress bars, the circular avatars, and the six annotated colours on the right ' +
      'elements. The grey panel is what makes it read as a dashboard — do not skip it.',

    skipNote:
      'The card shadows, the nav hover and the bar transition. If you are badly behind, the ' +
      '"Last Week" line and the name-and-role block beside the avatar are the cheapest things ' +
      'to lose — but keep every bar and every chip, because those are the visible substance of ' +
      'the design.'
  });

}());
