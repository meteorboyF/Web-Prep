/* 253-q1.js — ProConnect landing and signup. Mid Term 253, Fall 2025, Q1.

   The CSS for each step is assembled from the blocks below rather than being
   pasted eight times. Each step still holds the full cumulative stylesheet —
   which is what the renderer diffs — but there is exactly one copy of every
   line, so a step can never drift out of sync with the final answer. */

(function () {

  /* ---- HTML ---------------------------------------------------------- */

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>ProConnect</title>',
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
    '  <title>ProConnect</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<header class="header">',
    '  <a class="logo" href="#">ProConnect</a>',
    '  <nav class="nav">',
    '    <a href="#">Features</a>',
    '    <a href="#">Pricing</a>',
    '    <a href="#">Support</a>',
    '  </nav>',
    '</header>',
    '',
    '<main class="card">',
    '',
    '  <section class="pitch">',
    '    <h1>Launch Your Project,<br>Faster.</h1>',
    '    <p class="sub">The ultimate tool for modern teams.</p>',
    '    <p class="body">Join over 10,000 satisfied users who have streamlined',
    '      their workflow with ProConnect. Sign up today and get 30 days free',
    '      access.</p>',
    '',
    '    <ul class="features">',
    '      <li><span class="dot"></span>Real-time Collaboration</li>',
    '      <li><span class="dot"></span>Advanced Reporting Tools</li>',
    '      <li><span class="dot dot--none"></span>Enterprise-grade Security</li>',
    '    </ul>',
    '',
    '    <div class="actions">',
    '      <a class="btn btn--green" href="#">Learn More</a>',
    '      <a class="btn btn--outline" href="#">Watch Demo</a>',
    '    </div>',
    '  </section>',
    '',
    '  <section class="signup">',
    '    <h2>Start Your Free Trial</h2>',
    '',
    '    <label class="field">',
    '      <span>Full Name</span>',
    '      <input type="text" placeholder="John Doe">',
    '    </label>',
    '    <label class="field">',
    '      <span>Work Email</span>',
    '      <input type="email" placeholder="email@company.com">',
    '    </label>',
    '    <label class="field">',
    '      <span>Choose Password</span>',
    '      <input type="password">',
    '    </label>',
    '',
    '    <label class="agree">',
    '      <input type="checkbox">',
    '      <span>I agree to the <a href="#">Terms of Service</a></span>',
    '    </label>',
    '',
    '    <button class="create" type="button">Create Account</button>',
    '',
    '    <p class="already">Already a user? <a href="#">Login Here</a></p>',
    '  </section>',
    '',
    '</main>',
    '',
    '</body>',
    '</html>'
  ].join('\n');

  /* ---- CSS blocks ------------------------------------------------------ */

  var B = {};

  B.reset = [
    '/* 1. The reset. Type this from memory, before you look at anything. */',
    '* { margin: 0; padding: 0; box-sizing: border-box; }',
    '',
    'body { font-family: system-ui, Arial, sans-serif; }',
    'img { max-width: 100%; display: block; }',
    'a { text-decoration: none; color: inherit; }',
    'ul { list-style: none; }'
  ].join('\n');

  B.outline = [
    '',
    '/* 2. Show me the boxes. This comes off once the structure is right. */',
    '* { outline: 1px solid rgba(180, 84, 27, .5); }'
  ].join('\n');

  B.outlineOff = [
    '',
    '/* 2. Show me the boxes. Commented out, not deleted — you will want it',
    '      again the moment something moves unexpectedly. */',
    '/* * { outline: 1px solid rgba(180, 84, 27, .5); } */'
  ].join('\n');

  B.palette = [
    '',
    '/* 3. Every hex code printed on the paper, transcribed once. */',
    ':root {',
    '  --brand:  #3F46A4;   /* logo, headings, Watch Demo, Create Account */',
    '  --page:   #ECEFF4;   /* the page behind the card */',
    '  --panel:  #EFF6FE;   /* the left half */',
    '  --white:  #FEFEFE;   /* the right half, and the inputs */',
    '  --green:  #50AD50;   /* the squares and Learn More */',
    '  --link:   #71ADEC;   /* the feature list text */',
    '  --leaf:   #6FB570;   /* Terms of Service, Login Here */',
    '',
    '  /* Not annotated anywhere. Any light grey will do. */',
    '  --line:   #e5e7eb;',
    '  --ink:    #4b5563;',
    '}',
    '',
    'body {',
    '  background: var(--page);',
    '  color: var(--ink);',
    '  padding: 24px;',
    '}'
  ].join('\n');

  B.header = [
    '',
    '/* 4. Header: logo left, links right. margin-right: auto does it. */',
    '.header {',
    '  display: flex;',
    '  align-items: center;',
    '  max-width: 1100px;',
    '  margin: 0 auto 18px;',
    '  padding: 4px 8px;',
    '}',
    '.logo {',
    '  margin-right: auto;',
    '  font-size: 26px;',
    '  font-weight: 700;',
    '  color: var(--brand);',
    '}',
    '.nav { display: flex; gap: 34px; }',
    '.nav a { color: #6b7280; font-size: 17px; }'
  ].join('\n');

  B.card = [
    '',
    '/* 5. The card, and the two-column split inside it. */',
    '.card {',
    '  max-width: 1100px;',
    '  margin: 0 auto;',
    '  display: grid;',
    '  grid-template-columns: 1fr 1fr;',
    '  background: var(--white);',
    '  border-radius: 14px;',
    '  overflow: hidden;',
    '}',
    '.pitch  { background: var(--panel); padding: 56px 48px; }',
    '.signup { background: var(--white); padding: 56px 48px; }'
  ].join('\n');

  B.left = [
    '',
    '/* 6. Left column, top to bottom. */',
    '.pitch h1 {',
    '  font-size: 42px;',
    '  line-height: 1.15;',
    '  color: var(--brand);',
    '  margin-bottom: 26px;',
    '}',
    '.sub  { font-size: 24px; margin-bottom: 22px; }',
    '.body { font-size: 16px; line-height: 1.6; margin-bottom: 30px; max-width: 46ch; }',
    '',
    '.features { margin-bottom: 34px; }',
    '.features li {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 12px;',
    '  color: var(--link);',
    '  font-size: 17px;',
    '  margin-bottom: 14px;',
    '}',
    '.dot { width: 16px; height: 16px; background: var(--green); }',
    '.dot--none { background: transparent; }',
    '',
    '.actions { display: flex; gap: 16px; }',
    '.btn { padding: 12px 26px; border-radius: 6px; font-size: 16px; font-weight: 600; }',
    '.btn--green   { background: var(--green); color: #fff; }',
    '.btn--outline { border: 1px solid var(--brand); color: var(--brand); }'
  ].join('\n');

  B.right = [
    '',
    '/* 7. Right column: three identical fields, then the rest. */',
    '.signup h2 { color: var(--brand); font-size: 24px; margin-bottom: 26px; }',
    '',
    '.field { display: block; margin-bottom: 18px; }',
    '.field span { display: block; font-size: 15px; margin-bottom: 7px; }',
    '.field input {',
    '  width: 100%;',
    '  padding: 12px 14px;',
    '  border: 1px solid var(--line);',
    '  border-radius: 6px;',
    '  font: inherit;',
    '  background: var(--white);',
    '}',
    '',
    '.agree {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 10px;',
    '  font-size: 15px;',
    '  margin: 22px 0 20px;',
    '}',
    '.agree input { width: 16px; height: 16px; }',
    '.agree a { color: var(--leaf); }',
    '',
    '.create {',
    '  width: 100%;',
    '  padding: 15px;',
    '  background: var(--brand);',
    '  color: #fff;',
    '  border: 0;',
    '  border-radius: 6px;',
    '  font: inherit;',
    '  font-size: 17px;',
    '  font-weight: 600;',
    '  cursor: pointer;',
    '}',
    '',
    '.already { margin-top: 26px; text-align: center; font-size: 15px; }',
    '.already a { color: var(--leaf); }'
  ].join('\n');

  B.details = [
    '',
    '/* 8. The details that make it look finished. */',
    '.card { box-shadow: 0 1px 2px rgb(0 0 0 / .04), 0 12px 32px rgb(0 0 0 / .06); }',
    '.field input::placeholder { color: #9ca3af; }',
    '.field input:focus-visible {',
    '  outline: none;',
    '  border-color: var(--brand);',
    '  box-shadow: 0 0 0 3px rgb(63 70 164 / .15);',
    '}',
    '.agree input { accent-color: var(--brand); }',
    '.btn, .create { transition: filter .15s; }',
    '.btn:hover, .create:hover { filter: brightness(1.06); }'
  ].join('\n');

  function css(parts) {
    return parts.map(function (k) { return B[k]; }).join('\n');
  }

  /* ---- Registration ---------------------------------------------------- */

  WP.exam('253-q1', {
    id: '253-q1',
    paper: 'Mid Term 253 · Fall 2025 · Q1',
    title: 'ProConnect — landing and signup',
    marks: 15,
    minutes: 44,
    image: 'assets/img/prototypes/253-q1.jpg',
    paletteSource: 'annotated',
    next: { id: '253-q2', label: '253 Q2 · Admin dashboard' },

    palette: [
      { name: 'brand', hex: '#3F46A4', role: 'Logo, both headings, Watch Demo outline, Create Account' },
      { name: 'page',  hex: '#ECEFF4', role: 'The page behind the card' },
      { name: 'panel', hex: '#EFF6FE', role: 'The left half of the card' },
      { name: 'white', hex: '#FEFEFE', role: 'The right half, and the input backgrounds' },
      { name: 'green', hex: '#50AD50', role: 'The two squares and the Learn More button' },
      { name: 'link',  hex: '#71ADEC', role: 'The feature list text' },
      { name: 'leaf',  hex: '#6FB570', role: 'Terms of Service and Login Here' }
    ],

    structureIntro:
      'Before writing anything, name the regions out loud. Almost every mistake in this ' +
      'exam is a structural one made in the first five minutes, and no amount of careful ' +
      'CSS afterwards recovers from it.',

    structure: [
      { region: 'A header, outside the card',
        note: 'Logo on the left, three links on the right. One flex row, and the logo takes ' +
              '<code>margin-right: auto</code>. Note that it sits <em>on the page background</em>, ' +
              'not inside the white card — look at where the grey stops.' },
      { region: 'One rounded card, holding everything else',
        note: 'A single container with a radius and a soft shadow. It has a maximum width and ' +
              'is centred, which is <code>max-width</code> plus <code>margin: 0 auto</code>.' },
      { region: 'Inside the card: two equal columns',
        note: 'A grid of <code>1fr 1fr</code>. The only thing that distinguishes them is their ' +
              'background colour — pale blue on the left, white on the right. Both have the ' +
              'same generous padding.' },
      { region: 'Left column: five stacked things',
        note: 'Heading (deliberately broken over two lines), subtitle, paragraph, a three-item ' +
              'list with small green squares, and a row of two buttons. All normal flow except ' +
              'the button row, which is flex.' },
      { region: 'Right column: a form',
        note: 'Heading, then three identical label-above-input pairs, a checkbox row, a ' +
              'full-width button, and a centred line of text. The three fields are the same ' +
              'component three times — write it once.' },
      { region: 'What is <em>not</em> here',
        note: 'No images, no icons, no shadows on anything but the card, and no hover states ' +
              'you can see in a screenshot. That is unusually clean for these papers, which ' +
              'is why this one is the worked example.' }
    ],

    method:
      'Reset first, because it costs thirty seconds and prevents the box-model surprises that ' +
      'cost twenty minutes. Then <em>all</em> the HTML at once with outlines switched on, so ' +
      'structural mistakes surface while they are still cheap to fix. Then the palette, ' +
      'because every later step reaches for it. Then outside-in: header, card, split, and only ' +
      'then the contents of each column. Details last — they are the first thing to sacrifice ' +
      'if the clock beats you, and everything before them is already worth marks.',

    steps: [
      {
        title: 'The reset, from memory',
        minutes: 3,
        why: 'The document skeleton and four rules. <code>box-sizing: border-box</code> means ' +
             'padding never changes a width; zeroing margins removes the default spacing on ' +
             'headings and paragraphs that you would otherwise spend the next hour fighting.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 7,
        why: 'Write the whole structure before a single line of styling. The outline rule ' +
             'draws every box, so a wrong nesting or a missing wrapper is visible immediately ' +
             'rather than three steps later. Read the region list above as you type it.',
        trap: 'The heading breaks after the comma because the design says so, not because of ' +
              'the container width. That is a <code>&lt;br&gt;</code>, and it takes one second. ' +
              'Trying to force it with a width would take ten minutes and break at other sizes.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette, transcribed once',
        minutes: 4,
        why: 'Seven annotated hex codes go into <code>:root</code> before any of them is used. ' +
             'Four of the seven appear more than once in the finished stylesheet, so this is ' +
             'faster as well as tidier — and a marker can see at a glance that you read the ' +
             'annotations. The page background and body colour go on at the same time.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The header',
        minutes: 4,
        why: 'One flex row. <code>margin-right: auto</code> on the logo pushes everything ' +
             'after it to the far end — no spacer div, no <code>justify-content</code> ' +
             'juggling. The same <code>max-width: 1100px; margin: 0 auto</code> that the card ' +
             'will use, so the two line up.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'header'])
      },
      {
        title: 'The card and the split',
        minutes: 5,
        why: 'The whole layout, in eleven lines. <code>grid-template-columns: 1fr 1fr</code> ' +
             'gives two equal halves; <code>overflow: hidden</code> is what makes the coloured ' +
             'panels respect the card’s rounded corners instead of poking square ones out. ' +
             'The outline rule comes off here — the structure is confirmed.',
        trap: 'Without <code>overflow: hidden</code> on <code>.card</code>, the pale blue ' +
              'panel will sit square-cornered inside the rounded card. It is a small detail ' +
              'that reads as sloppy, and it costs one word.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'header', 'card'])
      },
      {
        title: 'Left column, top to bottom',
        minutes: 8,
        why: 'Nothing here needs a layout system except the feature rows and the button row, ' +
             'and both are one-line flex. The squares are a <code>&lt;span&gt;</code> with a ' +
             'width, a height and a background — not an image and not an icon font. The third ' +
             'feature has no square, so its span just gets a transparent background rather ' +
             'than being removed, which keeps all three rows aligned.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'header', 'card', 'left'])
      },
      {
        title: 'Right column, the form',
        minutes: 8,
        why: 'One <code>.field</code> rule serves all three inputs. The label is a ' +
             '<code>&lt;span&gt;</code> set to <code>display: block</code> inside a ' +
             '<code>&lt;label&gt;</code>, which means the input is wrapped by its own label ' +
             'and needs no <code>id</code> at all — faster to type and still correct.',
        trap: '<code>font: inherit</code> on the input is not optional. Form controls do not ' +
              'inherit fonts, so without it your three fields will be in the browser’s default ' +
              'face while everything around them is not.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'header', 'card', 'left', 'right'])
      },
      {
        title: 'Details, and compare against the target',
        minutes: 5,
        why: 'The card shadow, the placeholder colour, a focus ring, and ' +
             '<code>accent-color</code> on the checkbox. Press <strong>Compare</strong> above ' +
             'and put the two side by side — check the heading break, the gap between the ' +
             'buttons, and that the green squares line up with their text.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'header', 'card', 'left', 'right', 'details'])
      }
    ],

    marksNote:
      'The two-column split, the seven annotated colours used in the right places, the header ' +
      'row, and a form with three labelled fields and a working button. Those four things are ' +
      'the paper. Get them and you have most of the fifteen marks before you have styled a ' +
      'single border.',

    skipNote:
      'The card shadow, the focus ring, the hover brightness and the placeholder colour — all ' +
      'of step 8. Nobody marks a shadow. If you are at 35 minutes with the right column still ' +
      'empty, drop the checkbox row and the "Already a user?" line too, and spend the time ' +
      'making sure the three inputs are there and the colours are right.'
  });

}());
