/* 251-q2.js — Sign in, split page. Mid Term 251, Spring 2025, Q2. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>Sign in</title>',
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
    '  <title>Sign in</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<header class="head">',
    '  <span class="logo"></span>',
    '  <p class="head__title">CSE 4165 Web Programming</p>',
    '  <nav class="head__nav">',
    '    <a href="#">Blog</a>',
    '    <a href="#">Docs</a>',
    '    <a href="#">Pricing</a>',
    '    <a href="#">Log In</a>',
    '  </nav>',
    '  <a class="trial" href="#">Start Free Trial</a>',
    '</header>',
    '',
    '<main class="split">',
    '',
    '  <section class="quote">',
    '    <blockquote>',
    '      &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
    '      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
    '      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip',
    '      ex ea commodo consequat. Duis aute irure dolor in reprehenderit in',
    '      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur',
    '      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt',
    '      mollit anim id est laborum.&rdquo;',
    '    </blockquote>',
    '',
    '    <figure class="who">',
    '      <span class="who__face"></span>',
    '      <figcaption>',
    '        <strong>Niassoh Dihan</strong>',
    '        <span>Assistant Professor &amp; Program Coordinator, CSE</span>',
    '      </figcaption>',
    '    </figure>',
    '  </section>',
    '',
    '  <section class="form">',
    '    <h1>Sign in to your WEB<br>PROGRAMMING account.</h1>',
    '    <p class="form__sub">Don&rsquo;t have an account? <a href="#">Create one</a>.</p>',
    '',
    '    <a class="social social--wide" href="#"><span class="g">G</span> Sign in with Google</a>',
    '',
    '    <div class="social-row">',
    '      <a class="social" href="#"><span class="k">&#63743;</span> Continue with Apple</a>',
    '      <a class="social" href="#"><span class="f">f</span> Continue with Facebook</a>',
    '    </div>',
    '',
    '    <p class="or"><span>OR</span></p>',
    '',
    '    <input class="input" type="email" placeholder="Enter your email address">',
    '    <p class="forgot"><a href="#">Forgot your password?</a></p>',
    '',
    '    <div class="pw">',
    '      <input class="input" type="password" placeholder="Enter your password">',
    '      <button class="show" type="button">Show</button>',
    '    </div>',
    '',
    '    <button class="signin" type="button">SIGN IN</button>',
    '',
    '    <p class="fine">Need help? Check out our <a href="#">FAQs</a>.</p>',
    '    <p class="fine">Visit nahid.org <a href="#">Connect your social account</a>.</p>',
    '    <p class="fine fine--small">You can unsubscribe from emails at any time. By signing',
    '      up you are agreeing to our <a href="#">Terms of Use</a> and',
    '      <a href="#">Privacy Policy</a>.</p>',
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
    'a { text-decoration: none; color: inherit; }',
    'input, button { font: inherit; color: inherit; }'
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
    '/* 3. Three annotated codes. Only three — but the red one is used by',
    '      six different links, so name it once. */',
    ':root {',
    '  --azure: #0976a7;   /* the left panel, and Start Free Trial */',
    '  --red:   #e90606;   /* SIGN IN, and every red link */',
    '  --field: #eff1f3;   /* the two input backgrounds */',
    '',
    '  /* Not annotated. */',
    '  --ink:   #1f2328;',
    '  --muted: #5b6672;',
    '  --line:  #dfe3e8;',
    '}',
    '',
    'body { color: var(--ink); }'
  ].join('\n');

  B.head = [
    '',
    '/* 4. The header. */',
    '.head {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 16px;',
    '  padding: 16px 26px;',
    '  border-bottom: 1px solid var(--line);',
    '}',
    '.logo {',
    '  width: 34px;',
    '  aspect-ratio: 1;',
    '  background: var(--ink);',
    '  border-radius: 4px;',
    '}',
    '.head__title { font-size: 16px; margin-right: auto; }',
    '.head__nav { display: flex; gap: 28px; font-size: 15px; }',
    '.trial {',
    '  background: var(--azure);',
    '  color: #fff;',
    '  padding: 11px 22px;',
    '  border-radius: 4px;',
    '  font-weight: 600;',
    '}'
  ].join('\n');

  B.split = [
    '',
    '/* 5. The split. Two equal halves, full height. */',
    '.split {',
    '  display: grid;',
    '  grid-template-columns: 1fr 1fr;',
    '  min-height: 640px;',
    '}',
    '',
    '.quote {',
    '  background: var(--azure);',
    '  color: #fff;',
    '  padding: 70px 54px 54px;',
    '  display: flex;',
    '  flex-direction: column;',
    '  justify-content: center;',
    '}',
    '',
    '/* The form column is a narrow centred stack, not a full-width one. */',
    '.form {',
    '  padding: 40px 30px;',
    '  width: min(100%, 430px);',
    '  margin-inline: auto;',
    '}'
  ].join('\n');

  B.quote = [
    '',
    '/* 6. The testimonial. */',
    '.quote blockquote {',
    '  font-size: 21px;',
    '  line-height: 1.55;',
    '  margin-bottom: 40px;',
    '}',
    '.who { display: flex; align-items: center; gap: 16px; }',
    '.who__face {',
    '  width: 62px;',
    '  aspect-ratio: 1;',
    '  border-radius: 50%;',
    '  background: #6d8fa3;',
    '  flex: none;',
    '}',
    '.who figcaption { display: grid; gap: 3px; }',
    '.who strong { font-size: 16px; }',
    '.who span { font-size: 14px; opacity: .85; }'
  ].join('\n');

  B.form = [
    '',
    '/* 7. The form column, top to bottom. */',
    '.form h1 {',
    '  font-family: Georgia, "Times New Roman", serif;',
    '  font-size: 28px;',
    '  line-height: 1.3;',
    '  text-align: center;',
    '}',
    '.form__sub { text-align: center; margin: 14px 0 24px; font-size: 15px; }',
    '.form__sub a { color: var(--red); text-decoration: underline; }',
    '',
    '.social {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  gap: 10px;',
    '  border: 1px solid var(--line);',
    '  border-radius: 4px;',
    '  padding: 13px;',
    '  font-size: 15px;',
    '  color: var(--muted);',
    '}',
    '.social--wide { margin-bottom: 14px; }',
    '.social-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }',
    '.g { color: #4285f4; font-weight: 700; }',
    '.k { color: #000; }',
    '.f { color: #1877f2; font-weight: 700; }',
    '',
    '/* The OR divider: a flex row whose two pseudo-elements are the rules. */',
    '.or {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 12px;',
    '  margin: 22px 0;',
    '}',
    '.or::before, .or::after {',
    '  content: "";',
    '  flex: 1;',
    '  height: 1px;',
    '  background: var(--line);',
    '}',
    '.or span { font-size: 12px; color: var(--muted); }',
    '',
    '.input {',
    '  width: 100%;',
    '  background: var(--field);',
    '  border: 1px solid var(--line);',
    '  border-radius: 4px;',
    '  padding: 15px 16px;',
    '  font-size: 15px;',
    '}',
    '.forgot { text-align: right; margin: 6px 0 10px; font-size: 13px; }',
    '.forgot a { color: var(--red); text-decoration: underline; }',
    '',
    '/* The Show button sits inside the field, so the field is a',
    '   positioned parent and the button is absolute inside it. */',
    '.pw { position: relative; }',
    '.show {',
    '  position: absolute;',
    '  right: 14px;',
    '  top: 50%;',
    '  transform: translateY(-50%);',
    '  border: 0;',
    '  background: none;',
    '  font-size: 13px;',
    '  color: var(--muted);',
    '  cursor: pointer;',
    '}',
    '',
    '.signin {',
    '  width: 100%;',
    '  background: var(--red);',
    '  color: #fff;',
    '  border: 0;',
    '  border-radius: 4px;',
    '  padding: 15px;',
    '  margin-top: 22px;',
    '  font-size: 15px;',
    '  font-weight: 700;',
    '  letter-spacing: .06em;',
    '  cursor: pointer;',
    '}',
    '',
    '.fine { text-align: center; font-size: 13px; margin-top: 18px; color: var(--ink); }',
    '.fine a { color: var(--red); text-decoration: underline; }',
    '.fine--small { font-size: 11px; color: var(--muted); }'
  ].join('\n');

  B.details = [
    '',
    '/* 8. Details. */',
    '.social:hover { border-color: #b9c0c8; }',
    '.signin:hover, .trial:hover { filter: brightness(1.08); }',
    '.input:focus-visible {',
    '  outline: none;',
    '  border-color: var(--azure);',
    '  box-shadow: 0 0 0 3px rgb(9 118 167 / .16);',
    '}'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('251-q2', {
    id: '251-q2',
    paper: 'Mid Term 251 · Spring 2025 · Q2',
    title: 'Sign in — split page',
    marks: 15,
    minutes: 43,
    image: 'assets/img/prototypes/251-q2.jpg',
    paletteSource: 'annotated',
    prev: { id: '251-q1', label: '251 Q1 · Information Desk' },
    next: { id: 'slot1-q2', label: 'Slot 1 Q2 · CareerHub' },

    palette: [
      { name: 'azure', hex: '#0976a7', role: 'The left panel, and the Start Free Trial button' },
      { name: 'red',   hex: '#e90606', role: 'The SIGN IN button, and all six red links' },
      { name: 'field', hex: '#eff1f3', role: 'The two input backgrounds' }
    ],

    structureIntro:
      'Only three annotated colours, which means the marks here are in the <em>layout</em>: a ' +
      'full-height split, a narrow centred form column inside the right half, and three small ' +
      'techniques that each look harder than they are.',

    structure: [
      { region: 'A header across the top',
        note: 'Logo mark, title, four links, and a blue button. One flex row, with the title ' +
              'taking <code>margin-right: auto</code>.' },
      { region: 'Below it, two equal full-height halves',
        note: '<code>grid-template-columns: 1fr 1fr</code> with a <code>min-height</code>. The ' +
              'left is solid blue, the right is white.' },
      { region: 'Left: a quote, vertically centred',
        note: 'The panel is a flex column with <code>justify-content: center</code>, so the ' +
              'quote and the attribution sit in the middle of the height rather than at the ' +
              'top.' },
      { region: 'Right: a narrow column, not a full-width one',
        note: 'This is the thing people miss. The form is roughly 430px wide and centred ' +
              'inside its half — <code>width: min(100%, 430px); margin-inline: auto</code>. ' +
              'Styling it full-width makes the whole page look wrong in a way that is hard to ' +
              'diagnose afterwards.' },
      { region: 'Three techniques worth naming',
        note: 'The <strong>OR divider</strong> is a flex row whose <code>::before</code> and ' +
              '<code>::after</code> are the two rules. The <strong>Show</strong> button is ' +
              'absolutely positioned inside a relative wrapper. The <strong>avatar</strong> is ' +
              'a fixed width with <code>aspect-ratio: 1</code> and a 50% radius.' },
      { region: 'What to fake',
        note: 'The lion logo, the three social brand marks and the photograph. A dark square, ' +
              'three coloured letters and a grey circle. Nobody is marking those.' }
    ],

    method:
      'Reset, all the HTML, palette. Then the header, then the split — and get the narrow ' +
      'centred form column right <em>before</em> styling anything inside it, because every ' +
      'measurement in the form depends on that width. Left panel, then the form contents top ' +
      'to bottom, then details.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Five lines. <code>font: inherit</code> on inputs and buttons matters — there are ' +
             'four buttons and two inputs on this page.',
        detail: [
          'Five lines. <code>font: inherit</code> on inputs and buttons — this page has two inputs and four buttons.',
          '<code>a { color: inherit }</code> because the red links get their colour from a class, not from being links.',
          '<code>box-sizing: border-box</code> for the full-width inputs inside a capped column.'
        ],
        check: 'A blank white page.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 9,
        why: 'Note three decisions in the markup: the password field is wrapped in a ' +
             '<code>.pw</code> div so the Show button has something to position against; the ' +
             'OR line is one paragraph with a span inside it, because the rules will be ' +
             'pseudo-elements; and the two social buttons on the second row are wrapped so ' +
             'they can be their own grid.',
        detail: [
          'Three decisions in the markup that make the CSS short later.',
          'The password field is wrapped in a <code>.pw</code> div, so the Show button has something to position itself against.',
          'The OR line is one paragraph with a <code>&lt;span&gt;</code> inside it — the two rules will be pseudo-elements, so no extra markup is needed.',
          'The two social buttons on the second row are wrapped in a <code>.social-row</code> div so they can be their own two-column grid while the Google button above stays full width.'
        ],
        check: 'Outlines should show a header, then two equal halves, with the right half containing a tall stack of controls.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette',
        minutes: 2,
        why: 'Three codes, which is the shortest palette of the twelve. The red is worth ' +
             'naming even though it is one colour, because six separate links reach for it.',
        detail: [
          'Three codes only — the shortest palette of the twelve.',
          'The red is worth naming even though it is a single colour, because six separate links reach for it.',
          '<code>#eff1f3</code> is the input background, which is what makes the two fields read as filled rather than outlined.'
        ],
        check: 'No visible change yet.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The header',
        minutes: 4,
        why: 'Flex, <code>margin-right: auto</code> on the title. The lion becomes a dark ' +
             'rounded square — thirty seconds, and it holds the space the real logo would.',
        detail: [
          'Flex, with <code>margin-right: auto</code> on the title so the nav and the button go right.',
          'The lion becomes a dark rounded square — thirty seconds, and it holds exactly the space the real logo would.',
          'A <code>border-bottom</code> separates the header from the split below it.'
        ],
        check: 'Logo and title left, four links and a blue button right.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'head'])
      },
      {
        title: 'The split, and the narrow form column',
        minutes: 6,
        why: 'The most important step. Two equal halves with a <code>min-height</code>, the ' +
             'left panel a centred flex column, and the right half containing a column capped ' +
             'at 430px and centred with <code>margin-inline: auto</code>. Everything after ' +
             'this depends on that cap being there.',
        trap: 'Skip the width cap and the form spreads across the full half. It will not look ' +
              'broken — it will just look wrong, and you will spend ten minutes adjusting font ' +
              'sizes trying to work out why.',
        detail: [
          'The most important step on this paper. Two equal halves with a <code>min-height</code> so the blue panel has real height even on a short page.',
          'The left panel is <code>display: flex; flex-direction: column; justify-content: center</code>, which vertically centres the quote and its attribution as a group.',
          'The right half contains a column capped at 430px and centred with <code>margin-inline: auto</code>. Every measurement in the form depends on that cap.',
          '<code>width: min(100%, 430px)</code> rather than a plain <code>max-width</code>, so it also behaves on a narrow screen.'
        ],
        check: 'Two equal halves. The form column should be visibly narrower than its half, with white space either side of it.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'head', 'split'])
      },
      {
        title: 'The testimonial panel',
        minutes: 5,
        why: 'Large quoted text and a flex row for the attribution. The avatar is a circle from ' +
             '<code>aspect-ratio: 1</code> and <code>border-radius: 50%</code>, with ' +
             '<code>flex: none</code> so it never squashes.',
        detail: [
          'Large quoted text with a comfortable <code>line-height</code> — the quote is the visual weight of this half.',
          'The attribution is a flex row: circle, then name and role stacked.',
          'The avatar is <code>aspect-ratio: 1</code> plus <code>border-radius: 50%</code>, with <code>flex: none</code> so it never squashes when the name is long.'
        ],
        check: 'The quote block should sit in the vertical middle of the blue panel, not at the top.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'head', 'split', 'quote'])
      },
      {
        title: 'The form column',
        minutes: 11,
        why: 'The longest step, and three of its parts are worth learning on their own. The OR ' +
             'divider is six lines. The Show button is <code>position: absolute</code> inside a ' +
             '<code>position: relative</code> wrapper with ' +
             '<code>transform: translateY(-50%)</code> to centre it vertically. The social ' +
             'buttons are one shared rule plus a two-column grid for the pair.',
        trap: 'The <code>::before</code> and <code>::after</code> on the OR line need ' +
              '<code>content: ""</code> or they are never generated at all — and the divider ' +
              'silently becomes a lonely "OR".',
        detail: [
          'The longest step, and three of its parts are worth learning on their own.',
          'The <strong>OR divider</strong>: a flex row whose <code>::before</code> and <code>::after</code> are two <code>flex: 1</code> lines with a 1px height. Six lines of CSS.',
          'The <strong>Show button</strong>: <code>position: absolute</code> inside a <code>position: relative</code> wrapper, with <code>top: 50%</code> and <code>translateY(-50%)</code> to centre it vertically without knowing its height.',
          'The <strong>social buttons</strong>: one shared rule, then a two-column grid for the pair. The brand marks are coloured letters — G, an apple glyph, an f.',
          'The heading uses a serif stack, which is the one place on this page where the typeface is doing visible work.'
        ],
        check: 'The OR line should have a rule on each side of it. If you only see the word, the pseudo-elements have no content.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'head', 'split', 'quote', 'form'])
      },
      {
        title: 'Details, and compare',
        minutes: 3,
        why: 'Focus rings and hovers. Then <strong>Compare</strong>: check the two halves are ' +
             'equal, the quote is vertically centred rather than top-aligned, and the form ' +
             'column is narrow and centred rather than filling its half.',
        detail: [
          'Focus rings and hovers.',
          'Press Compare: the two halves equal, the quote vertically centred, and the form column narrow and centred rather than filling its half.',
          'If the form looks too wide, the width cap from step 5 is missing or overridden.'
        ],
        check: 'The narrow centred form column is the thing most people get wrong here. Check it explicitly.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'head', 'split', 'quote', 'form', 'details'])
      }
    ],

    marksNote:
      'The equal full-height split, the blue panel with vertically centred content, the narrow ' +
      'centred form column, the OR divider, the Show button inside the password field, a ' +
      'circular avatar, and the three annotated colours. The layout is the paper here — there ' +
      'are only three colours to get wrong.',

    skipNote:
      'The three brand marks, the lion, the three lines of small print at the bottom, and all ' +
      'of step 8. If you are properly behind, the "Forgot your password?" link and the Show ' +
      'button can go — but keep the OR divider, which is six lines and immediately recognisable.'
  });

}());
