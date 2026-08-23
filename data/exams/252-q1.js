/* 252-q1.js — UIU Learning Hub dashboard. Mid Term 252, Summer 2025, Q1.

   No annotated hex codes. Every colour here was sampled from the printed
   prototype, and this paper is almost entirely gradients — so the values are
   approximations of approximations. Say so, and do not chase them. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>UIU Learning Hub</title>',
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
    '  <title>UIU Learning Hub</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<div class="app">',
    '',
    '  <aside class="side">',
    '    <h1 class="side__brand">UIU LEARNING HUB</h1>',
    '    <nav class="side__nav">',
    '      <a class="is-active" href="#">Dashboard</a>',
    '      <a href="#">My Courses</a>',
    '      <a href="#">Assignments</a>',
    '      <a href="#">Exams</a>',
    '      <a href="#">Resources</a>',
    '      <a href="#">Grades &amp; Results</a>',
    '      <a href="#">Calendar</a>',
    '      <a href="#">Discussion Forum</a>',
    '      <a href="#">Settings</a>',
    '    </nav>',
    '  </aside>',
    '',
    '  <main class="main">',
    '',
    '    <div class="topline">',
    '      <h2>Welcome to Your Learning Dashboard</h2>',
    '      <input class="search" type="search" placeholder="Search courses, resources...">',
    '    </div>',
    '',
    '    <section class="courses">',
    '',
    '      <article class="course">',
    '        <div class="course__head" style="--g: var(--g1)">',
    '          <h3>CSE 4165: Web Programming</h3>',
    '          <p>Prof. Rahman</p>',
    '        </div>',
    '        <div class="course__body">',
    '          <div class="meter" style="--w: 75%; --c: var(--m1)"></div>',
    '          <div class="course__meta"><span>Progress: 75%</span><span>Grade: A</span></div>',
    '        </div>',
    '      </article>',
    '',
    '      <article class="course">',
    '        <div class="course__head" style="--g: var(--g2)">',
    '          <h3>CSE 3115: Database Systems</h3>',
    '          <p>Dr. Karim</p>',
    '        </div>',
    '        <div class="course__body">',
    '          <div class="meter" style="--w: 45%; --c: var(--m2)"></div>',
    '          <div class="course__meta"><span>Progress: 45%</span><span>Grade: B+</span></div>',
    '        </div>',
    '      </article>',
    '',
    '      <article class="course">',
    '        <div class="course__head" style="--g: var(--g3)">',
    '          <h3>CSE 3412: Algorithms</h3>',
    '          <p>Prof. Ahmed</p>',
    '        </div>',
    '        <div class="course__body">',
    '          <div class="meter" style="--w: 90%; --c: var(--m3)"></div>',
    '          <div class="course__meta"><span>Progress: 90%</span><span>Grade: A+</span></div>',
    '        </div>',
    '      </article>',
    '',
    '    </section>',
    '',
    '    <section class="panel">',
    '      <h2>Upcoming Classes &amp; Deadlines</h2>',
    '',
    '      <div class="classes">',
    '        <article class="class" style="--g: var(--c1)">',
    '          <p class="class__when">Today, 11:00 AM - 12:30 PM</p>',
    '          <h3>Web Programming</h3>',
    '          <span class="pill">Lecture</span>',
    '        </article>',
    '        <article class="class" style="--g: var(--c2)">',
    '          <p class="class__when">Tomorrow, 9:30 AM</p>',
    '          <h3>Database Quiz</h3>',
    '          <span class="pill">Assessment</span>',
    '        </article>',
    '        <article class="class" style="--g: var(--c3)">',
    '          <p class="class__when">Apr 6, 2:00 PM - 4:00 PM</p>',
    '          <h3>Algorithms Lab</h3>',
    '          <span class="pill">Practical</span>',
    '        </article>',
    '      </div>',
    '    </section>',
    '',
    '  </main>',
    '</div>',
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
    'a { text-decoration: none; color: inherit; }',
    'input { font: inherit; }'
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
    '/* 3. NOT annotated. Sampled, and this paper is nearly all gradients,',
    '      so these are approximations. Getting the DIRECTION and the rough',
    '      hues right is what reads as correct; exact stops do not matter. */',
    ':root {',
    '  --sidebar: linear-gradient(180deg, #33559a, #1e3a72);',
    '  --page:    #f1f2f6;',
    '',
    '  /* the three course card headers */',
    '  --g1: linear-gradient(100deg, #a3322a, #7fd41f 60%, #9bfa15);',
    '  --g2: linear-gradient(100deg, #d3143c, #d99a12);',
    '  --g3: linear-gradient(100deg, #3f5c4a, #4a4085);',
    '',
    '  /* their progress bars */',
    '  --m1: #16b17f;',
    '  --m2: #e0338c;',
    '  --m3: #7b2ff7;',
    '',
    '  /* the three class cards */',
    '  --c1: linear-gradient(120deg, #f4623a, #ff9d8a);',
    '  --c2: linear-gradient(120deg, #2b2fd8, #f1cb0e 50%, #2b2fd8);',
    '  --c3: linear-gradient(120deg, #17c3b2, #35e8d8);',
    '',
    '  --ink:   #2b3440;',
    '  --muted: #7b8794;',
    '}',
    '',
    'body { background: var(--page); color: var(--ink); }'
  ].join('\n');

  B.shell = [
    '',
    '/* 4. The app shell. */',
    '.app {',
    '  display: grid;',
    '  grid-template-columns: 240px 1fr;',
    '  min-height: 660px;',
    '}',
    '.main { padding: 24px 28px 30px; }'
  ].join('\n');

  B.side = [
    '',
    '/* 5. The sidebar. One gradient, top to bottom. */',
    '.side {',
    '  background: var(--sidebar);',
    '  color: #fff;',
    '  padding: 26px 0;',
    '}',
    '.side__brand {',
    '  font-size: 16px;',
    '  letter-spacing: .06em;',
    '  padding: 0 24px 26px;',
    '}',
    '.side__nav { display: grid; }',
    '.side__nav a {',
    '  padding: 13px 24px;',
    '  font-size: 15px;',
    '  color: rgb(255 255 255 / .85);',
    '}',
    '.side__nav .is-active {',
    '  background: rgb(255 255 255 / .14);',
    '  color: #fff;',
    '}'
  ].join('\n');

  B.top = [
    '',
    '/* 6. The heading row. */',
    '.topline {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 20px;',
    '  margin-bottom: 22px;',
    '}',
    '.topline h2 { font-size: 24px; margin-right: auto; }',
    '.search {',
    '  width: 280px;',
    '  background: #fff;',
    '  border: 1px solid #dfe3ea;',
    '  border-radius: 999px;',
    '  padding: 11px 20px;',
    '  font-size: 14px;',
    '}'
  ].join('\n');

  B.courses = [
    '',
    '/* 7. Three course cards. The gradient header and the white body are',
    '      two children; overflow: hidden on the card rounds both. */',
    '.courses {',
    '  display: grid;',
    '  grid-template-columns: repeat(3, 1fr);',
    '  gap: 22px;',
    '  margin-bottom: 26px;',
    '}',
    '.course {',
    '  background: #fff;',
    '  border-radius: 10px;',
    '  overflow: hidden;',
    '  box-shadow: 0 2px 10px rgb(0 0 0 / .06);',
    '}',
    '.course__head {',
    '  background: var(--g);',
    '  color: #fff;',
    '  padding: 18px;',
    '  min-height: 128px;',
    '  display: flex;',
    '  flex-direction: column;',
    '}',
    '.course__head h3 { font-size: 17px; }',
    '.course__head p  { margin-top: auto; font-size: 14px; opacity: .92; }',
    '',
    '.course__body { padding: 18px; }',
    '.course__meta {',
    '  display: flex;',
    '  justify-content: space-between;',
    '  margin-top: 12px;',
    '  font-size: 14px;',
    '  color: var(--muted);',
    '}'
  ].join('\n');

  B.meter = [
    '',
    '/* 8. One progress bar, three colours. */',
    '.meter {',
    '  height: 7px;',
    '  border-radius: 999px;',
    '  background: #e9ecf1;',
    '  overflow: hidden;',
    '}',
    '.meter::before {',
    '  content: "";',
    '  display: block;',
    '  width: var(--w);',
    '  height: 100%;',
    '  background: var(--c);',
    '}'
  ].join('\n');

  B.classes = [
    '',
    '/* 9. The lower panel and its three gradient cards. */',
    '.panel {',
    '  background: #fff;',
    '  border-radius: 10px;',
    '  padding: 22px;',
    '  box-shadow: 0 2px 10px rgb(0 0 0 / .06);',
    '}',
    '.panel h2 { font-size: 19px; margin-bottom: 16px; }',
    '',
    '.classes {',
    '  display: grid;',
    '  grid-template-columns: repeat(3, 1fr);',
    '  gap: 18px;',
    '}',
    '.class {',
    '  background: var(--g);',
    '  color: #fff;',
    '  border-radius: 10px;',
    '  padding: 16px;',
    '  min-height: 112px;',
    '  display: flex;',
    '  flex-direction: column;',
    '  gap: 6px;',
    '}',
    '.class__when { font-size: 13px; opacity: .9; }',
    '.class h3 { font-size: 18px; }',
    '.pill {',
    '  align-self: start;',
    '  margin-top: auto;',
    '  background: rgb(255 255 255 / .3);',
    '  border-radius: 999px;',
    '  padding: 4px 12px;',
    '  font-size: 12px;',
    '}'
  ].join('\n');

  B.details = [
    '',
    '/* 10. Details. */',
    '.side__nav a { transition: background-color .15s; }',
    '.side__nav a:hover { background: rgb(255 255 255 / .10); }',
    '.course, .class { transition: transform .2s; }',
    '.course:hover, .class:hover { transform: translateY(-3px); }',
    '.search:focus-visible {',
    '  outline: none;',
    '  border-color: #33559a;',
    '  box-shadow: 0 0 0 3px rgb(51 85 154 / .16);',
    '}'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('252-q1', {
    id: '252-q1',
    paper: 'Mid Term 252 · Summer 2025 · Q1',
    title: 'UIU Learning Hub — dashboard',
    marks: 15,
    minutes: 43,
    image: 'assets/img/prototypes/252-q1.jpg',
    paletteSource: 'sampled',
    next: { id: '252-q2', label: '252 Q2 · Course registration' },

    palette: [
      { name: 'sidebar', hex: '#33559a', role: 'Top of the sidebar gradient (fades to #1e3a72)' },
      { name: 'page',    hex: '#f1f2f6', role: 'The content area behind the cards' },
      { name: 'g1',      hex: '#7fd41f', role: 'Web Programming header — dark red into bright green' },
      { name: 'g2',      hex: '#d3143c', role: 'Database Systems header — red into amber' },
      { name: 'g3',      hex: '#4a4085', role: 'Algorithms header — dark green into indigo' },
      { name: 'c1',      hex: '#f4623a', role: 'Web Programming class card' },
      { name: 'c2',      hex: '#2b2fd8', role: 'Database Quiz class card (yellow through the middle)' },
      { name: 'c3',      hex: '#17c3b2', role: 'Algorithms Lab class card' }
    ],

    structureIntro:
      'This is the gradient paper. Every coloured surface on it — the sidebar, three course ' +
      'headers, three class cards — is a <code>linear-gradient</code> rather than a flat ' +
      'fill, and none of them is annotated. That combination tells you exactly where to spend ' +
      'your time: <strong>the grid is worth more than any gradient</strong>, because the grid ' +
      'is the thing that can be objectively wrong.',

    structure: [
      { region: 'Sidebar and main',
        note: 'A fixed 240px column and a fluid one. The sidebar has a vertical gradient and ' +
              'a nine-item nav with one highlighted row.' },
      { region: 'A heading row across the top of the main column',
        note: 'Title left, a pill-shaped search field right. One flex row with ' +
              '<code>margin-right: auto</code>.' },
      { region: 'Three course cards',
        note: 'Each is <em>two</em> children: a gradient header block with the course name and ' +
              'the lecturer, and a white body with a progress bar and a two-item meta row. The ' +
              'lecturer name sits at the bottom of the header, which is ' +
              '<code>margin-top: auto</code> in a flex column.' },
      { region: 'A white panel below',
        note: 'Its own heading, then three more gradient cards. The panel is a separate ' +
              'surface from the page — do not skip it, it is what separates the two rows.' },
      { region: 'Three class cards',
        note: 'Time, title, and a translucent pill pinned to the bottom. Same ' +
              '<code>margin-top: auto</code> idea again.' },
      { region: 'Two components, six instances',
        note: 'A progress bar and a pill. Both take their colour from a variable, which is why ' +
              'they are ten lines each rather than thirty.' }
    ],

    method:
      'Reset, all the HTML, and then the palette — where every entry is a whole ' +
      '<code>linear-gradient</code> stored in a variable, not a colour. That is the one ' +
      'genuinely unusual thing about this paper and it is what keeps the card rules readable. ' +
      'Then the shell, the sidebar, the heading row, the course cards, the bar, the lower ' +
      'panel. Gradients last within each step, because the layout underneath them is what is ' +
      'being marked.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Five lines, and the same five as every other paper in this set. If you have done ' +
             'two of these you should now be typing this without reading it.',
        detail: [
          '<code>* { margin: 0; padding: 0; box-sizing: border-box }</code> — the three that ' +
          'prevent the most trouble. <code>border-box</code> in particular, because this page ' +
          'has cards with padding inside grid tracks.',
          '<code>a { text-decoration: none; color: inherit }</code> — there are nine sidebar ' +
          'links and none of them should be browser-blue and underlined.',
          '<code>input { font: inherit }</code> for the search field. Form controls do not ' +
          'inherit fonts.'
        ],
        check: 'The page should be blank and white. If you see anything else, you have typed ' +
               'something into the HTML pane by accident.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 10,
        why: 'The whole structure in one go. This is the longest step and the one where being ' +
             'slow is correct — every later step assumes these boxes are nested properly.',
        detail: [
          'The outer <code>.app</code> holds exactly two children: <code>.side</code> and ' +
          '<code>.main</code>. That is the grid.',
          'Each course card has <strong>two</strong> children — <code>.course__head</code> ' +
          'and <code>.course__body</code>. The gradient goes on the head, not on the card, ' +
          'because the body is white.',
          'Each gradient carrier has <code>style="--g: var(--g1)"</code>. The card rule will ' +
          'say <code>background: var(--g)</code> and never mention a specific gradient.',
          'Each progress bar carries both its width and its colour: ' +
          '<code>style="--w: 75%; --c: var(--m1)"</code>. Changing a percentage later is an ' +
          'HTML edit, not a CSS one.',
          'The lower panel is a <code>&lt;section&gt;</code> wrapping its own heading and the ' +
          'three class cards — it is a surface, not just a grid.'
        ],
        trap: 'It is tempting to put the gradient on <code>.course</code> and let the body sit ' +
              'on top. Do not: you then have to fight the white body over a gradient parent, ' +
              'and the rounded corners stop working.',
        check: 'With the outlines on you should be able to count: two boxes in the shell, ' +
               'three course cards each containing two boxes, one panel containing three ' +
               'cards. If any of those numbers is wrong, fix it now.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette — gradients in variables',
        minutes: 6,
        why: 'Unusual, and worth understanding: a custom property can hold an entire ' +
             '<code>linear-gradient(...)</code>, not just a colour. That is what lets one ' +
             '<code>.course__head</code> rule serve three differently coloured headers.',
        detail: [
          'A custom property is substituted as <em>text</em> before the value is parsed, so ' +
          'anything that is legal in that position can live in one — a gradient, a shadow, ' +
          'even a whole <code>font</code> shorthand.',
          'Nothing on this paper is annotated, so these values are eyedropped. Match the ' +
          '<strong>direction</strong> and the two end hues and it will read as correct.',
          'The three progress-bar colours are flat, not gradients — look closely at the ' +
          'prototype and they are solid teal, pink and purple.',
          'Two minutes of this step is transcription; the other four are resisting the urge ' +
          'to fine-tune the stops.'
        ],
        check: 'Nothing changes on screen yet except the page background turning pale grey. ' +
               'That is correct — the variables are declared but not yet used.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The app shell',
        minutes: 3,
        why: 'One grid declaration. <code>240px 1fr</code> — a fixed sidebar and a main column ' +
             'that takes what is left.',
        detail: [
          '<code>min-height</code> on the shell rather than a height, so the sidebar reaches ' +
          'the bottom of a short page but can still grow.',
          'The main column gets its padding here, not later — every card measurement below ' +
          'depends on the space it actually has.'
        ],
        check: 'The two columns should be visible as outlines, with the right one much wider.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'shell'])
      },
      {
        title: 'The sidebar',
        minutes: 5,
        why: 'The gradient goes on in one line. The nav is a grid of links with generous ' +
             'padding and one highlighted row.',
        detail: [
          'The active row uses <code>rgb(255 255 255 / .14)</code> — a translucent white over ' +
          'the gradient, so it lightens whatever is behind it at that point rather than being ' +
          'a fixed colour that only matches at one height.',
          'The links have horizontal padding rather than the nav having it, so the active ' +
          'row’s background reaches the full width of the column.',
          'The brand sits above the nav with its own padding, not as a nav item.'
        ],
        trap: 'Using a flat colour for the active row instead of translucent white will look ' +
              'right at the top of the sidebar and wrong further down, because the gradient ' +
              'beneath it has moved on.',
        check: 'The sidebar should be dark blue, lighter at the top, with Dashboard visibly ' +
               'highlighted and its highlight running the full column width.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side'])
      },
      {
        title: 'The heading row',
        minutes: 3,
        why: 'Title and search field on one line. <code>border-radius: 999px</code> on the ' +
             'input gives the capsule shape without measuring anything.',
        detail: [
          'Any radius larger than half the element’s height produces a perfect capsule, so ' +
          '<code>999px</code> is the idiom — it never needs adjusting when the padding changes.',
          '<code>margin-right: auto</code> on the heading pushes the search to the far end.'
        ],
        check: 'The title should be hard left and the pill search hard right, on one line.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side', 'top'])
      },
      {
        title: 'The three course cards',
        minutes: 7,
        why: 'One rule for the card, one for the gradient head, one for the white body. Three ' +
             'cards, no repetition.',
        detail: [
          '<code>overflow: hidden</code> on <code>.course</code> is what makes the gradient ' +
          'head respect the card’s rounded corners. Without it you get a square-cornered ' +
          'colour block poking out of a rounded card.',
          'The head is a flex column and the lecturer name takes ' +
          '<code>margin-top: auto</code>, which pins it to the bottom regardless of how long ' +
          'the course title wraps.',
          '<code>min-height</code> on the head rather than a fixed height, so a two-line ' +
          'course name does not get clipped.',
          'The meta row is <code>justify-content: space-between</code> — the single most used ' +
          'declaration across all twelve of these papers.'
        ],
        check: 'Three equal cards, each with a coloured top and a white bottom, and all three ' +
               'lecturer names sitting on the same line as each other.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side', 'top', 'courses'])
      },
      {
        title: 'The progress bar component',
        minutes: 4,
        why: 'Twelve lines that serve three bars, and would serve thirty.',
        detail: [
          'The track is a rounded div with <code>overflow: hidden</code>; the fill is its ' +
          '<code>::before</code> with <code>width: var(--w)</code>.',
          'A pseudo-element needs <code>content: ""</code> or it is never generated — this is ' +
          'the single most common reason a bar renders as an empty track.',
          '<code>overflow: hidden</code> again, for the same reason as the card: the ' +
          'square-ended fill has to be clipped by the rounded track.'
        ],
        check: 'Three bars at visibly different lengths — roughly three-quarters, under half, ' +
               'and nearly full — in three different colours.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side', 'top', 'courses', 'meter'])
      },
      {
        title: 'The lower panel and its class cards',
        minutes: 6,
        why: 'A white surface with its own heading, holding three more gradient cards. The ' +
             'pill at the bottom of each uses the same <code>margin-top: auto</code> as the ' +
             'lecturer name did.',
        detail: [
          '<code>align-self: start</code> on the pill stops it stretching to the card’s full ' +
          'width — a flex column stretches its children across by default, which is rarely ' +
          'what you want for a badge.',
          'The pill background is translucent white again, for the same reason as the sidebar ' +
          'row: it has to sit on three different gradients.',
          'The panel is what separates this row visually from the courses above it. A grid ' +
          'without the white surface behind it reads as one long list.'
        ],
        check: 'Three gradient cards inside a white panel, each with a small translucent pill ' +
               'sitting at the bottom left rather than stretched across.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side', 'top', 'courses', 'meter', 'classes'])
      },
      {
        title: 'Details, and compare',
        minutes: 3,
        why: 'Hovers and a focus ring, then the comparison.',
        detail: [
          'Press <strong>Compare</strong> and check the <em>structure</em> first: three equal ' +
          'course cards, three equal class cards, a white panel around the lower row.',
          'Only then look at the gradients, and only to check the direction and the rough ' +
          'hues. They are not annotated and cannot be marked precisely.',
          'If anything is left, spend it on the sidebar nav spacing rather than the colours.'
        ],
        check: 'The layout should match the target closely even though no gradient does ' +
               'exactly. That is the correct outcome for this paper.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side', 'top', 'courses', 'meter', 'classes', 'details'])
      }
    ],

    marksNote:
      'The 240px sidebar with a highlighted nav row, the heading row with a pill search, three ' +
      'course cards each split into a coloured head and a white body, three working progress ' +
      'bars, and a white panel holding three more coloured cards with pills. Gradients that ' +
      'run in the right direction with roughly the right hues.',

    skipNote:
      'Every hover, the focus ring, and any attempt to match a gradient stop precisely. If you ' +
      'are behind, make the six gradient surfaces <em>flat colours</em> sampled from the ' +
      'middle of each gradient — the layout will still read correctly and you will save five ' +
      'minutes. A flat card in the right place beats a beautiful gradient in the wrong one.'
  });

}());
