/* slot2-q2.js — UIU Book Share Hub. Slot 2, Spring 2026, Q2. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>UIU Book Share Hub</title>',
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
    '  <title>UIU Book Share Hub</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<header class="bar">',
    '  <h1 class="brand">UIU Book Share Hub</h1>',
    '  <nav class="nav">',
    '    <a href="#">Home</a>',
    '    <a href="#">Books</a>',
    '    <a href="#">Share</a>',
    '    <a href="#">Contact</a>',
    '  </nav>',
    '</header>',
    '',
    '<main class="frame">',
    '',
    '  <section class="hero">',
    '    <h2>Buy, Sell, and Exchange Academic Books at UIU</h2>',
    '    <p>A hub for UIU students to connect, share course materials, and find',
    '      useful books for each semester. Save time, reduce cost, and support',
    '      fellow students through book sharing.</p>',
    '  </section>',
    '',
    '  <div class="split">',
    '',
    '    <section class="board">',
    '      <h3 class="board__title">Book<br>Categories</h3>',
    '      <p class="board__sub">Browse the available books</p>',
    '',
    '      <div class="cats">',
    '        <article class="cat">',
    '          <h4>CSE Books</h4>',
    '          <p>Programming, algorithms, database, and software engineering books.</p>',
    '        </article>',
    '        <article class="cat">',
    '          <h4>BBA Books</h4>',
    '          <p>Management, accounting, finance, and marketing resources.</p>',
    '        </article>',
    '        <article class="cat">',
    '          <h4>EEE Books</h4>',
    '          <p>Circuits, electronics, power systems, and lab reference books.</p>',
    '        </article>',
    '        <article class="cat">',
    '          <h4>English and GED Books</h4>',
    '          <p>Language, writing, communication, and general education materials.</p>',
    '        </article>',
    '      </div>',
    '    </section>',
    '',
    '    <section class="board">',
    '      <h3>Share a Book</h3>',
    '      <p class="board__sub">Fill out this short form if you want to share a',
    '        book for other students.</p>',
    '',
    '      <form class="form">',
    '        <input type="text" placeholder="Your Name">',
    '        <input type="text" placeholder="Book Title">',
    '        <input type="text" placeholder="Author">',
    '        <input type="text" placeholder="Course Code">',
    '        <textarea rows="3" placeholder="Condition / Note"></textarea>',
    '        <button type="button">Submit</button>',
    '      </form>',
    '    </section>',
    '',
    '  </div>',
    '</main>',
    '',
    '<footer class="foot">',
    '  <p>&copy; 2026 UIU Book Share Hub</p>',
    '</footer>',
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
    'input, textarea, button { font: inherit; color: inherit; }'
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
    '/* 3. Six annotated codes. */',
    ':root {',
    '  --black:  #000000;   /* header bar and footer bar */',
    '  --frame:  #c85a32;   /* the orange band everything sits on */',
    '  --accent: #eb6623;   /* the category headings */',
    '  --cream:  #fffbeb;   /* the category card backgrounds */',
    '  --submit: #f97316;   /* the Submit button */',
    '  --page:   #f4f7fb;   /* the strip either side of the frame */',
    '',
    '  /* Not annotated. */',
    '  --navy:   #16233d;',
    '  --ink:    #4b5563;',
    '  --line:   #e3e7ec;',
    '}',
    '',
    'body { background: var(--page); color: var(--ink); }'
  ].join('\n');

  B.bars = [
    '',
    '/* 4. The two black bars. Both full width, top and bottom. */',
    '.bar {',
    '  display: flex;',
    '  align-items: center;',
    '  background: var(--black);',
    '  color: #fff;',
    '  padding: 20px 30px;',
    '}',
    '.brand { font-size: 22px; margin-right: auto; }',
    '.nav { display: flex; gap: 24px; font-size: 14px; }',
    '',
    '.foot {',
    '  background: var(--black);',
    '  color: #fff;',
    '  padding: 18px;',
    '  text-align: center;',
    '  font-size: 14px;',
    '}'
  ].join('\n');

  B.frame = [
    '',
    '/* 5. The orange frame: a section with a background and padding.',
    '      It is not a border — the white cards sit *inside* the colour. */',
    '.frame {',
    '  background: var(--frame);',
    '  margin-inline: 34px;',
    '  padding: 26px;',
    '}',
    '',
    '.split {',
    '  display: grid;',
    '  grid-template-columns: 1fr 1fr;',
    '  gap: 24px;',
    '  margin-top: 24px;',
    '}',
    '',
    '.hero, .board {',
    '  background: #fff;',
    '  border-radius: 10px;',
    '  padding: 26px 30px;',
    '}'
  ].join('\n');

  B.hero = [
    '',
    '/* 6. The hero card, and the two board headings. */',
    '.hero h2 {',
    '  font-size: 27px;',
    '  color: var(--navy);',
    '  margin-bottom: 12px;',
    '}',
    '.hero p { font-size: 15px; line-height: 1.6; max-width: 80ch; }',
    '',
    '.board h3, .board__title { font-size: 30px; color: var(--navy); }',
    '.board__title { line-height: 1.25; }',
    '.board__sub { font-size: 16px; margin: 10px 0 20px; }'
  ].join('\n');

  B.cats = [
    '',
    '/* 7. Four category cards, two by two. */',
    '.cats {',
    '  display: grid;',
    '  grid-template-columns: 1fr 1fr;',
    '  gap: 18px;',
    '}',
    '.cat {',
    '  background: var(--cream);',
    '  border: 1px solid #f0e2c2;',
    '  border-radius: 8px;',
    '  padding: 16px;',
    '}',
    '.cat h4 { color: var(--accent); font-size: 16px; margin-bottom: 8px; }',
    '.cat p  { font-size: 14px; line-height: 1.5; }'
  ].join('\n');

  B.form = [
    '',
    '/* 8. The form: five identical controls and a full-width button. */',
    '.form { display: grid; gap: 14px; }',
    '.form input, .form textarea {',
    '  width: 100%;',
    '  padding: 13px 15px;',
    '  border: 1px solid var(--line);',
    '  border-radius: 8px;',
    '  background: #fff;',
    '}',
    '.form textarea { resize: vertical; }',
    '.form ::placeholder { color: #9aa3ae; }',
    '',
    '.form button {',
    '  background: var(--submit);',
    '  color: #fff;',
    '  border: 0;',
    '  border-radius: 8px;',
    '  padding: 14px;',
    '  font-size: 15px;',
    '  cursor: pointer;',
    '}'
  ].join('\n');

  B.details = [
    '',
    '/* 9. Details. */',
    '.hero, .board { box-shadow: 0 2px 6px rgb(0 0 0 / .08); }',
    '.nav a { transition: opacity .15s; }',
    '.nav a:hover { opacity: .7; }',
    '.form input:focus-visible, .form textarea:focus-visible {',
    '  outline: none;',
    '  border-color: var(--submit);',
    '  box-shadow: 0 0 0 3px rgb(249 115 22 / .18);',
    '}',
    '.form button:hover { filter: brightness(1.06); }'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('slot2-q2', {
    id: 'slot2-q2',
    paper: 'Slot 2 · Spring 2026 · Q2',
    title: 'UIU Book Share Hub',
    marks: 15,
    minutes: 40,
    image: 'assets/img/prototypes/slot2-q2.jpg',
    paletteSource: 'annotated',
    prev: { id: 'slot1-q1', label: 'Slot 1 Q1 · CORE-TECH' },

    palette: [
      { name: 'black',  hex: '#000000', role: 'The header bar and the footer bar' },
      { name: 'frame',  hex: '#c85a32', role: 'The orange band everything sits on' },
      { name: 'accent', hex: '#eb6623', role: 'The four category headings' },
      { name: 'cream',  hex: '#fffbeb', role: 'The category card backgrounds' },
      { name: 'submit', hex: '#f97316', role: 'The Submit button' },
      { name: 'page',   hex: '#f4f7fb', role: 'The strip either side of the orange frame' }
    ],

    structureIntro:
      'The one thing to get right here is the orange. It is not a border and it is not a ' +
      'wrapper with an outline — it is a section with a background colour and padding, and the ' +
      'white cards sit inside that padding. Once you see it that way the whole page is four ' +
      'stacked blocks.',

    structure: [
      { region: 'A black bar across the full width',
        note: 'Title left, four links right. Flex, <code>margin-right: auto</code> on the title.' },
      { region: 'An orange band with white cards inside it',
        note: 'The band has <code>margin-inline</code> so the pale page colour shows as a thin ' +
              'strip either side, and <code>padding</code> so the white cards float inside the ' +
              'orange rather than touching its edges. This is the whole trick of the design.' },
      { region: 'Inside the band: a hero card, then two columns',
        note: 'The hero is one white card full width. Below it, an equal two-column grid.' },
      { region: 'Left card: heading, subtitle, four category cards',
        note: 'The heading breaks after "Book" deliberately — that is a ' +
              '<code>&lt;br&gt;</code>, not wrapping. The categories are a 2×2 grid of cream ' +
              'cards with orange titles.' },
      { region: 'Right card: heading, subtitle, five controls, a button',
        note: 'Four text inputs and a textarea, all styled by one rule, then a full-width ' +
              'orange button. The labels are placeholders only — that is what the design shows, ' +
              'even though it is not what you would ship.' },
      { region: 'A black bar across the full width again',
        note: 'Centred copyright line. Same colour as the header, so it reads as a frame ' +
              'around the whole page.' }
    ],

    method:
      'Reset, all the HTML, palette, then the two black bars — they are five minutes and they ' +
      'immediately make the page look like the target. Then the orange band and the grid inside ' +
      'it, then the cards, then the form. The band before its contents, always: if you style ' +
      'the cards first you will be guessing at how much room they have.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Including <code>font: inherit</code> on the form controls, because five of them ' +
             'are about to appear.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 8,
        why: 'Four stacked blocks: bar, frame, split, bar. Everything else is inside those. ' +
             'Notice the <code>&lt;br&gt;</code> in the "Book Categories" heading — put it in ' +
             'now rather than trying to force the break with a width later.',
        trap: 'The header and footer are <em>outside</em> the orange frame, not inside it. ' +
              'Look at where the orange stops: there is a pale strip either side of it, but ' +
              'the black bars run the whole way across.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette',
        minutes: 3,
        why: 'Six annotated codes. Note that two of them are oranges that are nearly but not ' +
             'quite the same — <code>#c85a32</code> for the band and <code>#f97316</code> for ' +
             'the button — so naming them by role rather than by colour is what stops you ' +
             'reaching for the wrong one.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The two black bars',
        minutes: 5,
        why: 'Five minutes for the two things that make the page instantly recognisable. Flex ' +
             'row with <code>margin-right: auto</code> on the title for the header; a centred ' +
             'line for the footer.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'bars'])
      },
      {
        title: 'The orange frame and the split',
        minutes: 6,
        why: 'A background, <code>margin-inline</code> for the strips either side, and padding ' +
             'so the cards sit inside the colour. Then a two-column grid below the hero. The ' +
             'white card rule is shared by the hero and both boards — three elements, one rule. ' +
             'Outlines come off.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'frame'])
      },
      {
        title: 'The hero and the headings',
        minutes: 5,
        why: 'Type sizes and the navy heading colour. The two-line heading gets a tighter ' +
             '<code>line-height</code> so the deliberate break does not look like an accident.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'frame', 'hero'])
      },
      {
        title: 'The category cards',
        minutes: 5,
        why: 'A 2×2 grid of cream cards with orange titles. One rule for all four — they differ ' +
             'only in their text.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'frame', 'hero', 'cats'])
      },
      {
        title: 'The form',
        minutes: 6,
        why: 'A grid with a gap rather than margins on each field, so the spacing is declared ' +
             'once. One rule styles the four inputs and the textarea together, then the button ' +
             'is full width because it is a grid child and grid items stretch by default.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'frame', 'hero', 'cats', 'form'])
      },
      {
        title: 'Details, and compare',
        minutes: 3,
        why: 'Card shadows, a nav hover, focus rings. <strong>Compare</strong> and check the ' +
             'pale strip really is visible either side of the orange, and that the black bars ' +
             'are not.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'frame', 'hero', 'cats', 'form', 'details'])
      }
    ],

    marksNote:
      'The orange band with white cards floating inside it, both black bars running full width, ' +
      'the 2×2 cream category grid with orange headings, and a five-control form with a ' +
      'full-width orange button. Six annotated colours in the right places.',

    skipNote:
      'The shadows, the focus rings and the hovers. This is the lightest of the twelve — if ' +
      'you are short of time on this one, you were short of time before you started it, so ' +
      'spend what is left on the other question.'
  });

}());
