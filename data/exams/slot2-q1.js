/* slot2-q1.js — Cloud storage dashboard. Slot 2, Spring 2026, Q1. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>My Cloud</title>',
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
    '  <title>My Cloud</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<div class="app">',
    '',
    '  <aside class="side">',
    '    <span class="avatar">Rahim</span>',
    '    <nav class="side__nav">',
    '      <a href="#">My cloud</a>',
    '      <a href="#">Shared files</a>',
    '      <a href="#">Favorites</a>',
    '      <a href="#">Upload files</a>',
    '    </nav>',
    '    <nav class="side__foot">',
    '      <a href="#">Settings</a>',
    '      <a href="#">Log out</a>',
    '    </nav>',
    '  </aside>',
    '',
    '  <main class="main">',
    '',
    '    <input class="search" type="search" placeholder="Search">',
    '',
    '    <h2 class="h">Categories</h2>',
    '    <div class="cats">',
    '      <article class="cat" style="--c: var(--violet)">',
    '        <h3>Pictures</h3><p>480 files</p>',
    '      </article>',
    '      <article class="cat" style="--c: var(--cyan)">',
    '        <h3>Documents</h3><p>190 files</p>',
    '      </article>',
    '      <article class="cat" style="--c: var(--pink)">',
    '        <h3>Videos</h3><p>90 files</p>',
    '      </article>',
    '      <article class="cat" style="--c: var(--blue)">',
    '        <h3>Audio</h3><p>80 files</p>',
    '      </article>',
    '    </div>',
    '',
    '    <h2 class="h">Files</h2>',
    '    <div class="files">',
    '      <article class="file"><h3>Work</h3><p>820 files</p></article>',
    '      <article class="file"><h3>Personal</h3><p>115 files</p></article>',
    '      <article class="file"><h3>School</h3><p>65 files</p></article>',
    '      <article class="file"><h3>Archive</h3><p>21 files</p></article>',
    '      <a class="file file--add" href="#">+</a>',
    '    </div>',
    '',
    '    <div class="bottom">',
    '',
    '      <section class="card">',
    '        <div class="card__head">',
    '          <h3>Your storage</h3>',
    '          <p class="left">25% left</p>',
    '        </div>',
    '        <p class="used">75 GB of 100 GB are used</p>',
    '        <div class="meter"></div>',
    '      </section>',
    '',
    '      <section class="card">',
    '        <h3>Your shared folders</h3>',
    '        <ul class="shared">',
    '          <li style="--s: var(--mint)"><span>Keynote files</span><span>Team</span></li>',
    '          <li style="--s: var(--lilac)"><span>Vacation photos</span><span>Files</span></li>',
    '          <li style="--s: var(--rose)"><span>Project report</span><span>Docs</span></li>',
    '        </ul>',
    '        <a class="addmore" href="#">+ Add more</a>',
    '      </section>',
    '',
    '    </div>',
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
    'ul { list-style: none; }',
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
    '/* 3. Ten annotated codes — the most of any paper in the set.',
    '      Transcribe them all before writing a single rule. */',
    ':root {',
    '  --sidebar: #0d3e86;   /* the dark blue column */',
    '  --violet:  #6b63ff;   /* Pictures */',
    '  --cyan:    #0db0d7;   /* Documents */',
    '  --pink:    #ea6aa8;   /* Videos */',
    '  --blue:    #2c74db;   /* Audio */',
    '  --main:    #e9eff7;   /* the main content area */',
    '  --page:    #cfeef3;   /* behind the whole app */',
    '  --mint:    #c8f2ef;   /* Keynote files row */',
    '  --lilac:   #ddd8ff;   /* Vacation photos row */',
    '  --rose:    #f8d9dd;   /* Project report row */',
    '',
    '  /* Not annotated. */',
    '  --ink:     #1f3555;',
    '  --muted:   #6b7f9e;',
    '}',
    '',
    'body { background: var(--page); color: var(--ink); padding: 22px; }'
  ].join('\n');

  B.shell = [
    '',
    '/* 4. The app shell: fixed sidebar, fluid main. */',
    '.app {',
    '  display: grid;',
    '  grid-template-columns: 230px 1fr;',
    '  max-width: 1180px;',
    '  min-height: 700px;',
    '  margin: 0 auto;',
    '  border-radius: 14px;',
    '  overflow: hidden;',
    '}',
    '.main { background: var(--main); padding: 22px 26px 30px; }'
  ].join('\n');

  B.side = [
    '',
    '/* 5. The sidebar. The whole trick is margin-top: auto on the footer',
    '      links, which pushes them to the bottom of a flex column. */',
    '.side {',
    '  background: var(--sidebar);',
    '  color: #fff;',
    '  padding: 26px 22px;',
    '  display: flex;',
    '  flex-direction: column;',
    '}',
    '',
    '.avatar {',
    '  width: 64px;',
    '  aspect-ratio: 1;',
    '  border-radius: 50%;',
    '  background: #fff;',
    '  color: var(--sidebar);',
    '  display: grid;',
    '  place-items: center;',
    '  font-size: 13px;',
    '  font-weight: 600;',
    '  margin: 0 auto 34px;',
    '}',
    '',
    '.side__nav, .side__foot { display: grid; gap: 18px; font-size: 15px; }',
    '.side__foot { margin-top: auto; }'
  ].join('\n');

  B.cats = [
    '',
    '/* 6. Search, headings, and the four coloured category cards. */',
    '.search {',
    '  width: 100%;',
    '  background: #fff;',
    '  border: 1px solid #dbe4f0;',
    '  border-radius: 999px;',
    '  padding: 13px 22px;',
    '  margin-bottom: 22px;',
    '}',
    '.h { font-size: 17px; margin-bottom: 12px; }',
    '',
    '.cats {',
    '  display: grid;',
    '  grid-template-columns: repeat(4, 1fr);',
    '  gap: 18px;',
    '  margin-bottom: 24px;',
    '}',
    '.cat {',
    '  background: var(--c);',
    '  color: #fff;',
    '  border-radius: 10px;',
    '  padding: 18px;',
    '  min-height: 96px;',
    '}',
    '.cat h3 { font-size: 16px; }',
    '.cat p  { font-size: 12px; margin-top: 4px; opacity: .9; }'
  ].join('\n');

  B.files = [
    '',
    '/* 7. Five white tiles, the last one an empty "add" tile. */',
    '.files {',
    '  display: grid;',
    '  grid-template-columns: repeat(5, 1fr);',
    '  gap: 14px;',
    '  margin-bottom: 30px;',
    '}',
    '.file {',
    '  background: #fff;',
    '  border-radius: 10px;',
    '  padding: 18px;',
    '  min-height: 96px;',
    '}',
    '.file h3 { font-size: 15px; }',
    '.file p  { font-size: 12px; color: var(--muted); margin-top: 4px; }',
    '',
    '.file--add {',
    '  display: grid;',
    '  place-items: center;',
    '  font-size: 26px;',
    '  color: var(--blue);',
    '}'
  ].join('\n');

  B.bottom = [
    '',
    '/* 8. The two bottom cards. */',
    '.bottom {',
    '  display: grid;',
    '  grid-template-columns: 1fr 1fr;',
    '  gap: 20px;',
    '  align-items: start;',
    '}',
    '.card {',
    '  background: #fff;',
    '  border-radius: 12px;',
    '  padding: 20px;',
    '}',
    '.card h3 { font-size: 16px; }',
    '.card__head { display: flex; align-items: baseline; }',
    '.card__head h3 { margin-right: auto; }',
    '.left { font-size: 13px; color: var(--cyan); }',
    '.used { font-size: 13px; margin: 16px 0 12px; }',
    '',
    '.meter {',
    '  height: 9px;',
    '  border-radius: 999px;',
    '  background: #e6ecf5;',
    '  overflow: hidden;',
    '}',
    '.meter::before {',
    '  content: "";',
    '  display: block;',
    '  width: 75%;',
    '  height: 100%;',
    '  background: var(--blue);',
    '}',
    '',
    '/* Three tinted rows, one rule, colour from --s. */',
    '.shared { display: grid; gap: 10px; margin: 16px 0 14px; }',
    '.shared li {',
    '  display: flex;',
    '  background: var(--s);',
    '  border-radius: 8px;',
    '  padding: 11px 15px;',
    '  font-size: 13px;',
    '}',
    '.shared li span:first-child { margin-right: auto; }',
    '',
    '.addmore {',
    '  display: block;',
    '  border: 1px dashed #b9c6da;',
    '  border-radius: 8px;',
    '  padding: 11px;',
    '  text-align: center;',
    '  font-size: 13px;',
    '  color: var(--muted);',
    '}'
  ].join('\n');

  B.details = [
    '',
    '/* 9. Details. */',
    '.app { box-shadow: 0 12px 40px rgb(13 62 134 / .12); }',
    '.side__nav a, .side__foot a { transition: opacity .15s; }',
    '.side__nav a:hover, .side__foot a:hover { opacity: .72; }',
    '.cat, .file { transition: transform .18s; }',
    '.cat:hover, .file:hover { transform: translateY(-2px); }',
    '.search:focus-visible {',
    '  outline: none;',
    '  border-color: var(--blue);',
    '  box-shadow: 0 0 0 3px rgb(44 116 219 / .16);',
    '}'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('slot2-q1', {
    id: 'slot2-q1',
    paper: 'Slot 2 · Spring 2026 · Q1',
    title: 'Cloud storage dashboard',
    marks: 15,
    minutes: 43,
    image: 'assets/img/prototypes/slot2-q1.jpg',
    paletteSource: 'annotated',
    next: { id: 'slot2-q2', label: 'Slot 2 Q2 · Book Share Hub' },

    palette: [
      { name: 'sidebar', hex: '#0d3e86', role: 'The dark blue column' },
      { name: 'violet',  hex: '#6b63ff', role: 'Pictures' },
      { name: 'cyan',    hex: '#0db0d7', role: 'Documents' },
      { name: 'pink',    hex: '#ea6aa8', role: 'Videos' },
      { name: 'blue',    hex: '#2c74db', role: 'Audio' },
      { name: 'main',    hex: '#e9eff7', role: 'The main content area' },
      { name: 'page',    hex: '#cfeef3', role: 'Behind the whole app' },
      { name: 'mint',    hex: '#c8f2ef', role: 'The Keynote files row' },
      { name: 'lilac',   hex: '#ddd8ff', role: 'The Vacation photos row' },
      { name: 'rose',    hex: '#f8d9dd', role: 'The Project report row' }
    ],

    structureIntro:
      'Ten annotated codes — more than any other paper here. Seven of them are just card and ' +
      'row backgrounds, which tells you before you write anything that there are two ' +
      'components on this page and each takes a colour variable.',

    structure: [
      { region: 'A tinted page, and one rounded app container',
        note: 'The pale blue shows all the way round. The container has a radius and ' +
              '<code>overflow: hidden</code>, which is what lets the dark sidebar reach the ' +
              'rounded corner.' },
      { region: 'Sidebar and main',
        note: '<code>grid-template-columns: 230px 1fr</code>. The sidebar is dark blue, the ' +
              'main area is a different pale blue from the page behind it — two annotated ' +
              'colours doing the separating.' },
      { region: 'The sidebar footer is pinned to the bottom',
        note: 'Settings and Log out sit at the bottom of the column regardless of how much is ' +
              'above them. The sidebar is a flex column and the footer group takes ' +
              '<code>margin-top: auto</code>. This is the single most useful trick in this ' +
              'prototype and it is one declaration.' },
      { region: 'Main: search, then two labelled card rows',
        note: 'A pill-shaped search field, "Categories" with four coloured cards, "Files" with ' +
              'five white tiles.' },
      { region: 'The fifth file tile is empty',
        note: 'It is an "add" tile — same shape, a centred plus, no text. Give it the same ' +
              'class plus a modifier rather than a separate rule.' },
      { region: 'Two bottom cards',
        note: 'Left: a heading row with "25% left" pushed right, a line of text, a progress ' +
              'bar. Right: three tinted rows each with a label left and a tag right, then a ' +
              'dashed "Add more" button.' }
    ],

    method:
      'Reset, all the HTML, and then <strong>the palette — ten codes, five minutes, do not ' +
      'skip it</strong>. Then the shell, then the sidebar (which is where the one clever ' +
      'declaration lives), then the main column top to bottom. Every coloured card and tinted ' +
      'row reads its colour from a variable set in the HTML, so those steps are short.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Five lines. <code>ul { list-style: none }</code> earns its place — the shared ' +
             'folders are a list.',
        detail: [
          'Five lines. <code>ul { list-style: none }</code> earns its place — the shared folders are a real list.',
          '<code>input { font: inherit }</code> for the search field.',
          '<code>a { color: inherit }</code> for the six sidebar links, which are white in the design.'
        ],
        check: 'A blank white page.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 9,
        why: 'Note two decisions: the sidebar’s bottom links are their own ' +
             '<code>&lt;nav&gt;</code> so they can be pushed down as a group, and every ' +
             'coloured card and tinted row carries its colour inline. The add-tile is an ' +
             '<code>&lt;a&gt;</code> with the same <code>.file</code> class plus a modifier.',
        detail: [
          'Two decisions in the markup carry the whole page.',
          'The sidebar\'s bottom links are their own <code>&lt;nav&gt;</code>, so they can be pushed to the bottom as a group rather than one at a time.',
          'Every coloured card and every tinted row carries its colour inline — <code>--c</code> on the category cards, <code>--s</code> on the shared rows.',
          'The add-tile is an <code>&lt;a&gt;</code> with the same <code>.file</code> class plus a modifier, so it inherits the tile shape for free.'
        ],
        check: 'Outlines should show a sidebar and a main column, with four category boxes, five file boxes and two bottom cards.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette — ten codes',
        minutes: 5,
        why: 'The longest transcription of the twelve, and the one where skipping it costs the ' +
             'most: with ten codes you would otherwise be scrolling back to the question paper ' +
             'every ninety seconds. Note that two of the ten are only slightly different ' +
             'blues — <code>#cfeef3</code> behind the app and <code>#e9eff7</code> inside it — ' +
             'so naming them is what stops you swapping them.',
        detail: [
          'Ten codes — the most of any paper in the set, and the one where skipping this step costs the most.',
          'Two of the ten are only slightly different pale blues: <code>#cfeef3</code> behind the app and <code>#e9eff7</code> inside it. Naming them is what stops you swapping them by accident.',
          'Seven of the ten are card or row backgrounds, consumed through <code>--c</code> and <code>--s</code>.',
          'Five minutes here saves ten minutes of scrolling back to the question paper.'
        ],
        check: 'The page should turn pale cyan. Nothing else yet.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The shell',
        minutes: 4,
        why: 'One grid declaration, a max-width, a radius and <code>overflow: hidden</code>. ' +
             'That last one is what makes the dark sidebar corner round instead of square.',
        detail: [
          '<code>grid-template-columns: 230px 1fr</code>, a max-width, and a radius.',
          '<code>overflow: hidden</code> is what lets the dark sidebar reach the rounded corner cleanly.',
          '<code>min-height</code> so the sidebar has real height to distribute in the next step.'
        ],
        check: 'One rounded container on a pale page, split into a dark column and a light one.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'shell'])
      },
      {
        title: 'The sidebar, and margin-top: auto',
        minutes: 5,
        why: 'The sidebar is <code>display: flex; flex-direction: column</code>, and the footer ' +
             'nav takes <code>margin-top: auto</code>. That single declaration absorbs all the ' +
             'leftover height and pins Settings and Log out to the bottom — no positioning, no ' +
             'calculated heights, and it still works when you add a fifth link above.',
        trap: 'Reaching for <code>position: absolute; bottom: 0</code> here is the wrong ' +
              'answer. It works until the content above grows, and then it overlaps. ' +
              '<code>margin-top: auto</code> never does.',
        detail: [
          'The whole trick of this prototype is one declaration: <code>margin-top: auto</code> on the footer nav.',
          'The sidebar is <code>display: flex; flex-direction: column</code>, so <code>margin-top: auto</code> on the last group absorbs every spare pixel and pins it to the bottom.',
          'It keeps working when you add a fifth link above, which <code>position: absolute; bottom: 0</code> does not — that overlaps as soon as the content grows.',
          'The avatar is a white circle with dark text: <code>aspect-ratio: 1</code>, <code>border-radius: 50%</code>, <code>place-items: center</code>.'
        ],
        check: 'Settings and Log out should be at the bottom of the blue column, with a large gap above them.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side'])
      },
      {
        title: 'Search and the four category cards',
        minutes: 5,
        why: 'A pill search field is <code>border-radius: 999px</code> — any number larger ' +
             'than half the height gives a perfect capsule, so nobody measures. Then four ' +
             'equal cards from one rule and four <code>--c</code> values.',
        detail: [
          '<code>border-radius: 999px</code> on the search gives the capsule shape without measuring the height.',
          'Four equal category cards from one rule and four <code>--c</code> values.',
          '<code>min-height</code> on the cards rather than a fixed height, so a longer label cannot clip.',
          'The file count under each title is smaller and slightly transparent — <code>opacity: .9</code> rather than a second colour, because it sits on four different backgrounds.'
        ],
        check: 'A pill search bar and four coloured cards in the order violet, cyan, pink, blue.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side', 'cats'])
      },
      {
        title: 'The five file tiles',
        minutes: 4,
        why: '<code>repeat(5, 1fr)</code> and the same card shape in white. The add tile ' +
             'reuses <code>.file</code> and adds <code>place-items: center</code> for the plus.',
        detail: [
          '<code>repeat(5, 1fr)</code> and the same card shape in white.',
          'The add tile reuses <code>.file</code> and adds <code>place-items: center</code> for the plus — no separate rule for its padding or radius.',
          'Five equal tiles, four with text and one without, is deliberately the same component.'
        ],
        check: 'Five white tiles, the last one empty except for a blue plus.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side', 'cats', 'files'])
      },
      {
        title: 'The two bottom cards',
        minutes: 6,
        why: 'The storage card is a heading row with <code>margin-right: auto</code> and a ' +
             'progress bar built the usual way. The shared folders are three flex rows with ' +
             '<code>margin-right: auto</code> on the first span, tinted from ' +
             '<code>--s</code>. <code>align-items: start</code> on the pair stops the shorter ' +
             'card stretching to match the taller one.',
        detail: [
          'The storage card is a heading row with <code>margin-right: auto</code> pushing the 25% left label over, then a line of text and a bar.',
          'The shared folders are three flex rows with <code>margin-right: auto</code> on the first span, so the tag on the right always sits at the edge.',
          '<code>align-items: start</code> on the pair stops the shorter card stretching to match the taller one.',
          'The Add more button is a dashed border — one declaration, and it reads as an empty slot rather than an action.'
        ],
        check: 'Two cards side by side, not stretched to the same height, with three tinted rows in the right one.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side', 'cats', 'files', 'bottom'])
      },
      {
        title: 'Details, and compare',
        minutes: 3,
        why: 'A shadow under the app, hovers, a focus ring on the search. ' +
             '<strong>Compare</strong>: check Settings and Log out really are at the bottom of ' +
             'the sidebar, the four category colours are in the right order, and the three ' +
             'tinted rows match their annotations.',
        detail: [
          'A shadow under the whole app, hovers on the nav and the cards, a focus ring on the search.',
          'Press Compare and check three things: Settings and Log out really are at the bottom, the four category colours are in the right order, and the three tinted rows match their annotations.',
          'Ten annotated colours is the most countable thing a marker has on this paper — check every one.'
        ],
        check: 'If the sidebar footer is pinned and the ten colours are right, this one is done.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'shell', 'side', 'cats', 'files', 'bottom', 'details'])
      }
    ],

    marksNote:
      'The sidebar-and-main shell with the footer links pinned to the bottom, four coloured ' +
      'category cards, five file tiles with the last one an add tile, a progress bar, and ' +
      'three tinted shared-folder rows. Ten annotated colours on the right elements — that ' +
      'alone is a large share of the paper.',

    skipNote:
      'The shadow, the hovers, the focus ring, and the dashed "Add more" button. If you are ' +
      'badly behind, drop the "25% left" label and the file counts under each tile — but keep ' +
      'the ten colours, because on this paper they are the most countable thing a marker has.'
  });

}());
