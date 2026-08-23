/* slot1-q1.js — CORE-TECH admin panel. Slot 1, Spring 2026, Q1. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>CORE-TECH</title>',
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
    '  <title>CORE-TECH</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<div class="panel">',
    '',
    '  <header class="bar">',
    '    <h1 class="brand">CORE-TECH</h1>',
    '    <nav class="nav">',
    '      <a class="is-active" href="#">OVERVIEW</a>',
    '      <a href="#">ANALYTICS</a>',
    '      <a href="#">REPORTS</a>',
    '      <a href="#">SECURITY</a>',
    '    </nav>',
    '    <p class="admin">Admin: System_Root</p>',
    '  </header>',
    '',
    '  <div class="body">',
    '',
    '    <section class="stats">',
    '      <article class="stat" style="--c: var(--blue)">',
    '        <p class="stat__label">Total Users</p>',
    '        <p class="stat__value">12,450</p>',
    '        <p class="stat__pill">UP +12% MONTHLY</p>',
    '      </article>',
    '      <article class="stat" style="--c: var(--green)">',
    '        <p class="stat__label">Revenue</p>',
    '        <p class="stat__value">$84,200</p>',
    '        <p class="stat__pill">UP +5.2% WEEKLY</p>',
    '      </article>',
    '      <article class="stat" style="--c: var(--orange)">',
    '        <p class="stat__label">Active Tasks</p>',
    '        <p class="stat__value">18</p>',
    '        <p class="stat__pill">4 TASKS PENDING</p>',
    '      </article>',
    '      <article class="stat" style="--c: var(--purple)">',
    '        <p class="stat__label">System Health</p>',
    '        <p class="stat__value">99.9%</p>',
    '        <p class="stat__pill">SYSTEM STABLE</p>',
    '      </article>',
    '    </section>',
    '',
    '    <div class="split">',
    '',
    '      <section class="box">',
    '        <h2>System Configuration</h2>',
    '',
    '        <div class="row">',
    '          <label class="field">',
    '            <span>Server Name</span>',
    '            <input type="text" placeholder="Enter server alias...">',
    '          </label>',
    '          <label class="field">',
    '            <span>Deployment Zone</span>',
    '            <select>',
    '              <option>North America (East)</option>',
    '              <option>Europe (West)</option>',
    '              <option>Asia (South)</option>',
    '            </select>',
    '          </label>',
    '        </div>',
    '',
    '        <label class="field">',
    '          <span>System Description</span>',
    '          <textarea rows="3"></textarea>',
    '        </label>',
    '      </section>',
    '',
    '      <section class="box">',
    '        <h2>Access Permissions</h2>',
    '',
    '        <div class="perms">',
    '          <label class="perm"><input type="checkbox" checked> Read</label>',
    '          <label class="perm"><input type="checkbox"> Write</label>',
    '          <label class="perm"><input type="checkbox"> Delete</label>',
    '          <label class="perm"><input type="checkbox" checked> API</label>',
    '        </div>',
    '',
    '        <div class="actions">',
    '          <button class="btn btn--navy" type="button">UPDATE SETTINGS</button>',
    '          <button class="btn btn--grey" type="button">RESET</button>',
    '        </div>',
    '      </section>',
    '',
    '    </div>',
    '  </div>',
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
    'input, select, textarea, button { font: inherit; color: inherit; }'
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
    '/* 3. Seven annotated codes. */',
    ':root {',
    '  --blue:   #1975d1;   /* Total Users card */',
    '  --green:  #378b3b;   /* Revenue card */',
    '  --orange: #f78100;   /* Active Tasks card */',
    '  --purple: #781fa0;   /* System Health card */',
    '  --navy:   #1a237e;   /* header bar, UPDATE SETTINGS */',
    '  --grey:   #6c757d;   /* RESET, the admin label */',
    '  --page:   #d6d8da;   /* behind the panel */',
    '',
    '  /* Not annotated. */',
    '  --box:    #f8f9fa;',
    '  --line:   #d9dde2;',
    '  --ink:    #333a45;',
    '}',
    '',
    'body {',
    '  background: var(--page);',
    '  color: var(--ink);',
    '  padding: 26px;',
    '}'
  ].join('\n');

  B.panel = [
    '',
    '/* 4. One rounded white panel holds the whole interface. */',
    '.panel {',
    '  max-width: 1120px;',
    '  margin: 0 auto;',
    '  background: #fff;',
    '  border: 2px solid var(--navy);',
    '  border-radius: 12px;',
    '  overflow: hidden;',
    '}',
    '.body { padding: 22px; }'
  ].join('\n');

  B.bar = [
    '',
    '/* 5. The navy header bar. */',
    '.bar {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 30px;',
    '  background: var(--navy);',
    '  color: #fff;',
    '  padding: 18px 24px;',
    '}',
    '.brand { font-size: 23px; letter-spacing: .02em; margin-right: auto; }',
    '',
    '.nav { display: flex; gap: 34px; font-size: 14px; font-weight: 600; }',
    '.nav .is-active {',
    '  color: #8ab4f8;',
    '  border-bottom: 2px solid #8ab4f8;',
    '  padding-bottom: 2px;',
    '}',
    '',
    '.admin { margin-left: auto; font-size: 13px; color: #c9ccd1; }'
  ].join('\n');

  B.stats = [
    '',
    '/* 6. Four cards, one rule block, one variable each. */',
    '.stats {',
    '  display: grid;',
    '  grid-template-columns: repeat(4, 1fr);',
    '  gap: 18px;',
    '  margin-bottom: 20px;',
    '}',
    '.stat {',
    '  background: var(--c);',
    '  color: #fff;',
    '  border-radius: 8px;',
    '  padding: 16px;',
    '}',
    '.stat__label { font-size: 13px; font-weight: 700; }',
    '.stat__value { font-size: 33px; font-weight: 800; margin: 6px 0 16px; }',
    '.stat__pill {',
    '  background: rgb(255 255 255 / .25);',
    '  border-radius: 4px;',
    '  padding: 8px;',
    '  font-size: 12px;',
    '  font-weight: 700;',
    '  text-align: center;',
    '}'
  ].join('\n');

  B.boxes = [
    '',
    '/* 7. The two panels below, and the underlined headings. */',
    '.split {',
    '  display: grid;',
    '  grid-template-columns: 1fr 1fr;',
    '  gap: 18px;',
    '}',
    '.box {',
    '  background: var(--box);',
    '  border: 1px solid var(--line);',
    '  border-radius: 8px;',
    '  padding: 18px;',
    '}',
    '.box h2 {',
    '  font-size: 17px;',
    '  color: var(--navy);',
    '  border-bottom: 1px solid var(--navy);',
    '  padding-bottom: 10px;',
    '  margin-bottom: 16px;',
    '}'
  ].join('\n');

  B.form = [
    '',
    '/* 8. Fields, checkbox boxes, buttons. */',
    '.field { display: block; margin-bottom: 14px; }',
    '.field span { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }',
    '.field input, .field select, .field textarea {',
    '  width: 100%;',
    '  padding: 10px 12px;',
    '  background: #fff;',
    '  border: 1px solid #8a8f97;',
    '  border-radius: 4px;',
    '}',
    '.field textarea { resize: vertical; }',
    '',
    '/* Two fields side by side, then one full width below them. */',
    '.row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }',
    '',
    '.perms { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }',
    '.perm {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  gap: 10px;',
    '  background: #fff;',
    '  border: 1px solid #8a8f97;',
    '  border-radius: 4px;',
    '  padding: 10px;',
    '  font-size: 14px;',
    '  font-weight: 600;',
    '}',
    '.perm input { accent-color: var(--blue); width: 15px; height: 15px; }',
    '',
    '.actions { display: grid; grid-template-columns: 1.5fr 1fr; gap: 14px; margin-top: 20px; }',
    '.btn {',
    '  border: 0;',
    '  border-radius: 4px;',
    '  padding: 15px;',
    '  color: #fff;',
    '  font-size: 15px;',
    '  font-weight: 700;',
    '  letter-spacing: .02em;',
    '  cursor: pointer;',
    '}',
    '.btn--navy { background: var(--navy); }',
    '.btn--grey { background: var(--grey); }'
  ].join('\n');

  B.details = [
    '',
    '/* 9. Details. */',
    '.panel { box-shadow: 0 10px 30px rgb(0 0 0 / .12); }',
    '.field input:focus-visible, .field textarea:focus-visible, .field select:focus-visible {',
    '  outline: none;',
    '  border-color: var(--navy);',
    '  box-shadow: 0 0 0 3px rgb(26 35 126 / .15);',
    '}',
    '.perm:has(input:checked) { border-color: var(--blue); }',
    '.btn { transition: filter .15s; }',
    '.btn:hover { filter: brightness(1.1); }'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('slot1-q1', {
    id: 'slot1-q1',
    paper: 'Slot 1 · Spring 2026 · Q1',
    title: 'CORE-TECH admin panel',
    marks: 15,
    minutes: 44,
    image: 'assets/img/prototypes/slot1-q1.jpg',
    paletteSource: 'annotated',
    prev: { id: '253-q2', label: '253 Q2 · Admin dashboard' },
    next: { id: 'slot2-q2', label: 'Slot 2 Q2 · Book Share Hub' },

    palette: [
      { name: 'blue',   hex: '#1975d1', role: 'The Total Users card' },
      { name: 'green',  hex: '#378b3b', role: 'The Revenue card' },
      { name: 'orange', hex: '#f78100', role: 'The Active Tasks card' },
      { name: 'purple', hex: '#781fa0', role: 'The System Health card' },
      { name: 'navy',   hex: '#1a237e', role: 'The header bar and UPDATE SETTINGS' },
      { name: 'grey',   hex: '#6c757d', role: 'RESET, and the "Admin: System_Root" label' },
      { name: 'page',   hex: '#d6d8da', role: 'The page behind the panel' }
    ],

    structureIntro:
      'Everything sits inside one rounded panel, and inside that it is three stacked regions. ' +
      'The four coloured cards are one component with four values — writing them as four ' +
      'separate rule blocks is the slow way and it looks worse.',

    structure: [
      { region: 'A tinted page, and one rounded panel on it',
        note: 'The whole interface is inside a white panel with a navy border and a radius. ' +
              '<code>overflow: hidden</code> on it is what lets the navy header bar reach the ' +
              'rounded corners cleanly.' },
      { region: 'Navy header bar',
        note: 'Brand left, four uppercase links, admin label right. The active link has a ' +
              'lighter colour <em>and</em> a bottom border — that underline is a ' +
              '<code>border-bottom</code>, not a text decoration, because it needs the gap.' },
      { region: 'Four stat cards in a row',
        note: 'Equal columns. Each is a coloured background, a small bold label, a large ' +
              'number, and a translucent full-width pill. The pill is ' +
              '<code>rgb(255 255 255 / .25)</code> — an alpha background, never ' +
              '<code>opacity</code>, or the text greys out with it.' },
      { region: 'Two panels side by side',
        note: 'Equal halves. Each has a pale background, a thin border, and a heading with a ' +
              'navy rule under it.' },
      { region: 'Left panel: a 2-up field row, then a full-width textarea',
        note: 'The two fields are their own little grid. The <code>&lt;select&gt;</code> is ' +
              'native — do not try to restyle it under a clock.' },
      { region: 'Right panel: four checkbox boxes, then two buttons',
        note: 'The checkboxes are a four-column grid of bordered boxes, each a ' +
              '<code>&lt;label&gt;</code> wrapping its input. The buttons are a two-column ' +
              'grid with the first wider than the second.' }
    ],

    method:
      'Reset, all the HTML, palette, then outside in: the panel, its header bar, the stat row, ' +
      'the two boxes, and only then the form controls inside them. Doing the stat cards as one ' +
      'rule with a <code>--c</code> per card takes about ninety seconds; doing them as four ' +
      'blocks takes five minutes and gives you four places to make a typo.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Note the fifth line: <code>input, select, textarea, button { font: inherit }</code>. ' +
             'This prototype is mostly form controls, so without it half the page will be in ' +
             'the browser’s default face.',
        detail: [
          'The fifth line is the one that matters on this page: <code>input, select, textarea, button { font: inherit; color: inherit }</code>. This prototype is mostly form controls.',
          'Without it, the select and the textarea render in the browser default face and the panel looks like it came from a different website.',
          '<code>box-sizing: border-box</code> so the full-width inputs inside padded panels actually fit.'
        ],
        check: 'A blank white page.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 9,
        why: 'Three regions inside one panel. Each stat card carries its colour as an inline ' +
             '<code>--c</code>, which is the decision that makes step 6 four lines instead of ' +
             'forty. Each checkbox is a label wrapping its input, so no <code>id</code> is ' +
             'needed anywhere.',
        detail: [
          'Three regions inside one panel: the navy bar, the four-card row, and the two-panel split.',
          'Each stat card carries <code>style="--c: var(--blue)"</code>. That single decision is why step 6 is four lines instead of forty.',
          'Each checkbox is a <code>&lt;label&gt;</code> wrapping its <code>&lt;input&gt;</code>, so no ids are needed anywhere on the page.',
          'The two fields that sit side by side are wrapped in a <code>.row</code> div so they can be their own small grid.'
        ],
        check: 'Outlines should show one outer panel containing three stacked regions, and four equal-ish card boxes in the middle one.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette',
        minutes: 3,
        why: 'Seven annotated codes, plus three of your own for the pale panel background, the ' +
             'input borders and the body text. The four card colours are named for what they ' +
             'are rather than which card they are on, because they are used by value.',
        detail: [
          'Seven annotated codes, plus three of your own for the pale panel, the input borders and the body text.',
          'The four card colours are named for what they look like rather than which card they sit on, because they are consumed by value through <code>--c</code>.',
          '<code>--navy</code> appears three times — the bar, the heading rules and the primary button — which is the clearest argument for naming it.'
        ],
        check: 'The page behind the panel should turn grey. Nothing else yet.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The outer panel',
        minutes: 4,
        why: 'A max-width, centred, white, with the navy border and a radius. ' +
             '<code>overflow: hidden</code> so the header bar inside cannot poke square corners ' +
             'through the rounded ones.',
        detail: [
          'A max-width, centred, white, with a navy border and a radius.',
          '<code>overflow: hidden</code> so the navy header bar inside cannot poke square corners through the rounded ones.',
          'The inner padding goes on <code>.body</code>, not on the panel, because the header bar must reach the panel\'s edges.'
        ],
        check: 'One rounded white panel on a grey page, with everything else inside it.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'panel'])
      },
      {
        title: 'The navy header bar',
        minutes: 5,
        why: 'Flex, with <code>margin-right: auto</code> on the brand and ' +
             '<code>margin-left: auto</code> on the admin label. The active link’s underline is ' +
             'a <code>border-bottom</code> with a little <code>padding-bottom</code>, which ' +
             'gives you the gap that <code>text-decoration: underline</code> will not.',
        detail: [
          'Flex, with <code>margin-right: auto</code> on the brand and <code>margin-left: auto</code> on the admin label. The nav ends up in the middle without being centred by anything.',
          'The active link gets a colour <em>and</em> a <code>border-bottom</code> with a little <code>padding-bottom</code>. That padding is what gives the gap between the text and the rule — <code>text-decoration: underline</code> sits too close.',
          'Uppercase nav text comes from the markup, not from <code>text-transform</code>, because the design uses it as a label rather than as styling.'
        ],
        check: 'A navy bar with the brand left, four links, and the admin label hard right. OVERVIEW should be underlined.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'panel', 'bar'])
      },
      {
        title: 'Four stat cards, one rule block',
        minutes: 6,
        why: 'This is the step that decides whether you finish. One <code>.stat</code> rule ' +
             'reads <code>background: var(--c)</code>, and each card sets that variable inline. ' +
             'Adding a fifth card would need no new CSS at all. Outlines come off here.',
        trap: 'The pill must be a translucent <em>background</em>, not <code>opacity</code> on ' +
              'the element. With <code>opacity</code> the white text fades too and the label ' +
              'goes muddy — which is exactly what it looks like when someone has used the ' +
              'wrong one.',
        detail: [
          'This is the step that decides whether you finish. One <code>.stat</code> rule reads <code>background: var(--c)</code> and each card sets that variable inline.',
          'Adding a fifth card would need no new CSS at all — which is the test of whether you have done it right.',
          'The pill is <code>rgb(255 255 255 / .25)</code>: a translucent background layer, so the white text on top stays fully opaque.',
          '<code>text-align: center</code> on the pill and <code>width</code> left alone, so it fills the card and centres its label.'
        ],
        check: 'Four equal coloured cards, each with a small label, a big number and a full-width translucent pill. The pill text should be crisp white, not grey.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'panel', 'bar', 'stats'])
      },
      {
        title: 'The two panels and their headings',
        minutes: 4,
        why: 'A two-column grid, and a heading with a <code>border-bottom</code>. That rule ' +
             'under each title is a border on the <code>&lt;h2&gt;</code>, not a separate ' +
             'element — one declaration rather than a div you then have to space.',
        detail: [
          'A two-column grid for the panels, and a heading with a <code>border-bottom</code>.',
          'That rule under each title is a border on the <code>&lt;h2&gt;</code> itself, not a separate div — one declaration rather than an element you then have to space.',
          '<code>padding-bottom</code> on the heading creates the gap between the text and its rule.'
        ],
        check: 'Two equal panels, each with a navy heading and a navy rule beneath it.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'panel', 'bar', 'stats', 'boxes'])
      },
      {
        title: 'The form controls',
        minutes: 8,
        why: 'One rule covers the input, the select and the textarea together. The two-up field ' +
             'row is its own small grid; the checkbox boxes are a four-column grid of bordered ' +
             'labels; the buttons are a two-column grid with the first wider. ' +
             '<code>accent-color</code> gives you the blue ticks in one line.',
        detail: [
          'One rule covers <code>input</code>, <code>select</code> and <code>textarea</code> together — they are three different elements that should look identical.',
          'The two-up field row is its own small grid inside the panel, so it does not affect the full-width textarea below it.',
          'The checkbox boxes are a four-column grid of bordered labels, each one <code>display: flex</code> with <code>justify-content: center</code> so the tick and the word sit together in the middle.',
          '<code>accent-color</code> gives you the blue ticks in one line — no custom checkbox markup.',
          'The two buttons are a grid of <code>1.5fr 1fr</code>, because UPDATE SETTINGS is visibly wider than RESET in the target.'
        ],
        check: 'A text field beside a select, a full-width textarea below them, four bordered checkbox boxes, and two unequal buttons.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'panel', 'bar', 'stats', 'boxes', 'form'])
      },
      {
        title: 'Details, and compare',
        minutes: 4,
        why: 'A drop shadow under the panel, focus rings on the fields, and a hover on the ' +
             'buttons. Then <strong>Compare</strong>: check the four cards are equal width, ' +
             'the active nav underline is there, and the two buttons are unequal in the right ' +
             'direction.',
        detail: [
          'A drop shadow under the panel, focus rings on the fields, and a hover on the buttons.',
          '<code>.perm:has(input:checked)</code> tints the border of a ticked permission — a parent reacting to its own child, with no JavaScript.',
          'Press Compare: the four cards should be exactly equal, the active nav link underlined, and the two buttons unequal in the right direction.'
        ],
        check: 'Everything should line up. If the cards are unequal, one of them has content forcing it wider — check the pill text.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'panel', 'bar', 'stats', 'boxes', 'form', 'details'])
      }
    ],

    marksNote:
      'The four coloured stat cards with their translucent pills, the navy bar with an active ' +
      'link, the two-panel split, and a form with a real <code>&lt;select&gt;</code>, a ' +
      '<code>&lt;textarea&gt;</code> and four checkboxes. Seven annotated colours on the right ' +
      'elements. That is the paper.',

    skipNote:
      'The panel shadow, the focus rings, the button hover, and the checked-state border on the ' +
      'permission boxes. If you are properly behind, drop the underline on the active nav link ' +
      'and the placeholder text — but not the pills, which are the most distinctive thing on ' +
      'the page.'
  });

}());
