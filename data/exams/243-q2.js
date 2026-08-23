/* 243-q2.js — United Kitchen services and about. Mid Term 243, Q2.

   No annotated hex codes on this paper either. Colours below are sampled. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>United Kitchen</title>',
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
    '  <title>United Kitchen</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<header class="bar">',
    '  <h1 class="logo">&#127860; UNITED KITCHEN</h1>',
    '  <nav class="nav">',
    '    <a class="is-active" href="#">HOME</a>',
    '    <a href="#">ABOUT</a>',
    '    <a href="#">SERVICE</a>',
    '    <a href="#">MENU</a>',
    '    <a href="#">PAGES &#9662;</a>',
    '    <a href="#">CONTACT</a>',
    '  </nav>',
    '  <a class="book" href="#">BOOK A TABLE</a>',
    '</header>',
    '',
    '<main class="page">',
    '',
    '  <section class="services">',
    '    <article class="svc">',
    '      <p class="svc__icon">&#128104;</p>',
    '      <h2>Master Chefs</h2>',
    '      <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>',
    '    </article>',
    '    <article class="svc">',
    '      <p class="svc__icon">&#127860;</p>',
    '      <h2>Quality Food</h2>',
    '      <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>',
    '    </article>',
    '    <article class="svc">',
    '      <p class="svc__icon">&#128722;</p>',
    '      <h2>Online Order</h2>',
    '      <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>',
    '    </article>',
    '    <article class="svc">',
    '      <p class="svc__icon">&#127911;</p>',
    '      <h2>24/7 Service</h2>',
    '      <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>',
    '    </article>',
    '  </section>',
    '',
    '  <section class="about">',
    '',
    '    <div class="collage">',
    '      <div class="shot shot--a">restaurant.jpg</div>',
    '      <div class="shot shot--b">bar.jpg</div>',
    '      <div class="shot shot--c">plate.jpg</div>',
    '      <div class="shot shot--d">table.jpg</div>',
    '    </div>',
    '',
    '    <div class="story">',
    '      <p class="eyebrow">About Us <span class="rule"></span></p>',
    '      <h2>Welcome to &#127860; United</h2>',
    '',
    '      <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu',
    '        diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit.</p>',
    '      <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu',
    '        diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet',
    '        lorem sit clita duo justo magna dolore erat amet</p>',
    '',
    '      <div class="stats">',
    '        <div class="stat">',
    '          <span class="stat__n">15</span>',
    '          <span class="stat__t">Years of<br><strong>EXPERIENCE</strong></span>',
    '        </div>',
    '        <div class="stat">',
    '          <span class="stat__n">50</span>',
    '          <span class="stat__t">Popular<br><strong>MASTER CHEFS</strong></span>',
    '        </div>',
    '      </div>',
    '',
    '      <a class="more" href="#">READ MORE</a>',
    '    </div>',
    '',
    '  </section>',
    '</main>',
    '',
    '<a class="totop" href="#">&#8593;</a>',
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
    '/* 3. NOT annotated on this paper. Sampled from the printed prototype. */',
    ':root {',
    '  --orange: #fea116;   /* the whole brand: logo, icons, buttons, numbers */',
    '  --dark:   #0f1629;   /* the top bar, and every heading */',
    '  --ink:    #6b7280;',
    '  --page:   #f7f7f7;',
    '}',
    '',
    'body { color: var(--ink); background: var(--page); }',
    '.page { max-width: 1160px; margin: 0 auto; padding: 0 20px 50px; }'
  ].join('\n');

  B.bar = [
    '',
    '/* 4. The dark bar. The CTA is full height, so no vertical padding',
    '      on it — it stretches instead, which is the default. */',
    '.bar {',
    '  display: flex;',
    '  align-items: stretch;',
    '  background: var(--dark);',
    '  color: #fff;',
    '  padding-left: 30px;',
    '}',
    '.logo {',
    '  display: flex;',
    '  align-items: center;',
    '  margin-right: auto;',
    '  color: var(--orange);',
    '  font-size: 27px;',
    '  letter-spacing: .01em;',
    '}',
    '',
    '.nav { display: flex; align-items: center; gap: 22px; font-size: 13px; font-weight: 700; }',
    '.nav .is-active { color: var(--orange); }',
    '',
    '.book {',
    '  display: grid;',
    '  place-items: center;',
    '  background: var(--orange);',
    '  color: #fff;',
    '  width: 130px;',
    '  margin-left: 26px;',
    '  padding: 20px 10px;',
    '  font-size: 13px;',
    '  font-weight: 700;',
    '  text-align: center;',
    '}'
  ].join('\n');

  B.services = [
    '',
    '/* 5. Four service cards, one rule. */',
    '.services {',
    '  display: grid;',
    '  grid-template-columns: repeat(4, 1fr);',
    '  gap: 26px;',
    '  padding: 34px 0 50px;',
    '}',
    '.svc {',
    '  background: #fff;',
    '  padding: 30px 24px 34px;',
    '  box-shadow: 0 2px 14px rgb(0 0 0 / .07);',
    '}',
    '.svc__icon { font-size: 34px; color: var(--orange); margin-bottom: 18px; }',
    '.svc h2 { font-size: 19px; color: var(--dark); margin-bottom: 12px; }',
    '.svc p { font-size: 15px; line-height: 1.6; }'
  ].join('\n');

  B.about = [
    '',
    '/* 6. The about section: collage left, story right. */',
    '.about {',
    '  display: grid;',
    '  grid-template-columns: 1fr 1fr;',
    '  gap: 46px;',
    '  align-items: center;',
    '}',
    '',
    '.story .eyebrow {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 12px;',
    '  color: var(--orange);',
    '  font-size: 19px;',
    '  font-style: italic;',
    '  margin-bottom: 10px;',
    '}',
    '.rule { width: 46px; height: 2px; background: var(--orange); }',
    '',
    '.story h2 { font-size: 37px; color: var(--dark); margin-bottom: 20px; }',
    '.story p { font-size: 15px; line-height: 1.7; margin-bottom: 16px; }'
  ].join('\n');

  B.collage = [
    '',
    '/* 7. The collage. Four boxes on a 2x2 grid, offset by shifting two',
    '      of them with margins. Do the plain grid first — the offsets are',
    '      the last thing you should reach for. */',
    '.collage {',
    '  display: grid;',
    '  grid-template-columns: 1fr 1fr;',
    '  gap: 14px;',
    '}',
    '.shot {',
    '  aspect-ratio: 4 / 3;',
    '  display: grid;',
    '  place-items: center;',
    '  color: rgb(255 255 255 / .7);',
    '  font-size: 12px;',
    '  background: linear-gradient(150deg, #6b4b34, #2f2622);',
    '}',
    '.shot--b { margin-top: 40px; background: linear-gradient(150deg, #7a5a3a, #3a2f26); }',
    '.shot--c { margin-top: -30px; background: linear-gradient(150deg, #8a6a48, #45372c); }',
    '.shot--d { background: linear-gradient(150deg, #5c4433, #241d19); }'
  ].join('\n');

  B.stats = [
    '',
    '/* 8. Two stat blocks with an orange rule down the left. */',
    '.stats { display: flex; gap: 40px; margin: 26px 0 30px; }',
    '.stat {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 14px;',
    '  border-left: 3px solid var(--orange);',
    '  padding-left: 16px;',
    '}',
    '.stat__n { font-size: 42px; font-weight: 800; color: var(--orange); }',
    '.stat__t { font-size: 14px; line-height: 1.4; }',
    '.stat__t strong { color: var(--dark); }',
    '',
    '.more {',
    '  display: inline-block;',
    '  background: var(--orange);',
    '  color: #fff;',
    '  padding: 16px 40px;',
    '  font-size: 14px;',
    '  font-weight: 700;',
    '}',
    '',
    '.totop {',
    '  position: fixed;',
    '  right: 26px;',
    '  bottom: 26px;',
    '  width: 42px;',
    '  aspect-ratio: 1;',
    '  display: grid;',
    '  place-items: center;',
    '  background: var(--orange);',
    '  color: #fff;',
    '  font-size: 18px;',
    '}'
  ].join('\n');

  B.details = [
    '',
    '/* 9. Details. */',
    '.svc { transition: transform .2s, box-shadow .2s; }',
    '.svc:hover { transform: translateY(-4px); box-shadow: 0 10px 26px rgb(0 0 0 / .12); }',
    '.nav a { transition: color .15s; }',
    '.nav a:hover { color: var(--orange); }',
    '.book:hover, .more:hover, .totop:hover { filter: brightness(1.08); }'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('243-q2', {
    id: '243-q2',
    paper: 'Mid Term 243 · Q2',
    title: 'United Kitchen — services and about',
    marks: 15,
    minutes: 44,
    image: 'assets/img/prototypes/243-q2.jpg',
    paletteSource: 'sampled',
    prev: { id: '243-q1', label: '243 Q1 · Housing Society' },

    palette: [
      { name: 'orange', hex: '#fea116', role: 'Logo, active nav link, BOOK A TABLE, all four icons, the eyebrow and its rule, both numbers, READ MORE, the back-to-top square' },
      { name: 'dark',   hex: '#0f1629', role: 'The top bar, and every heading' },
      { name: 'ink',    hex: '#6b7280', role: 'Body text' },
      { name: 'page',   hex: '#f7f7f7', role: 'The page behind the cards' }
    ],

    structureIntro:
      'Two colours doing all the work, and no printed codes to match. What makes this paper ' +
      'awkward is one thing only — the photo collage — and it is worth the fewest marks on ' +
      'the page. Recognise that early and the rest is a card row and a two-column section.',

    structure: [
      { region: 'A dark bar with a full-height orange button',
        note: 'Logo left, six links, then the CTA. The button runs the <em>full height</em> of ' +
              'the bar rather than sitting inside it with padding — the bar is ' +
              '<code>align-items: stretch</code>, which is the flex default, so the button ' +
              'fills automatically once you stop constraining it.' },
      { region: 'Four service cards',
        note: 'Equal columns, white, with a soft shadow. Icon, heading, paragraph, stacked in ' +
              'normal flow.' },
      { region: 'An about section, two columns',
        note: 'A photo collage on the left, the story on the right, vertically centred against ' +
              'each other with <code>align-items: center</code>.' },
      { region: 'The collage: a 2×2 grid with two boxes nudged',
        note: '<strong>Do the plain 2×2 grid first.</strong> The offsets are two ' +
              '<code>margin-top</code> values — one positive, one negative — added at the end. ' +
              'If you run out of time, four aligned boxes look deliberate; a half-finished ' +
              'attempt at the offsets does not.' },
      { region: 'Two stat blocks with a left rule',
        note: 'Each is a flex row with <code>border-left: 3px solid</code> and padding. Big ' +
              'orange number, two lines of text beside it.' },
      { region: 'A fixed back-to-top square',
        note: '<code>position: fixed</code> in the bottom right. Twelve lines including the ' +
              'arrow character.' }
    ],

    method:
      'Reset, all the HTML, two sampled colours. Then the bar, then the service row — at which ' +
      'point the top half of the page is done and looks right. Then the about section as a ' +
      'plain two-column grid with a plain 2×2 collage, then the story text, then the stats. ' +
      'The collage offsets are the very last thing, deliberately, because they are the only ' +
      'fiddly part and they are worth almost nothing.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Four lines. Nothing unusual on this page — no form controls at all.',
        detail: [
          'Four lines. Nothing unusual — this page has no form controls at all.',
          '<code>a { color: inherit }</code> for the six nav links and the two buttons that are really links.',
          '<code>box-sizing: border-box</code> for the four padded cards in four equal tracks.'
        ],
        check: 'A blank white page.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 9,
        why: 'Four identical service cards, then the about section. The icons are Unicode — a ' +
             'chef, a plate, a trolley, a headset. They are worth nothing and cost seconds, ' +
             'which is exactly the right trade.',
        detail: [
          'Four identical service cards, then a two-column about section.',
          'The icons are Unicode characters — a chef, a plate, a trolley, a headset. Worth no marks, cost seconds, and cannot fail to load.',
          'The collage is four sibling divs inside one <code>.collage</code> wrapper, so it can be a 2x2 grid.',
          'The eyebrow contains an empty <code>&lt;span class="rule"&gt;</code> which will become the short orange line beside it — cheaper and more obvious than a pseudo-element.'
        ],
        check: 'Outlines should show a bar, a four-card row, and a two-column section with four boxes on the left.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'Two colours, sampled',
        minutes: 2,
        why: 'An orange and a near-black navy. No codes are printed on this paper, so these ' +
             'came off the prototype with an eyedropper. Two minutes, and do not look back.',
        detail: [
          'No codes printed on this paper. An orange and a near-black navy, both eyedropped.',
          'The orange is doing an enormous amount of work — logo, active link, CTA, four icons, the eyebrow, its rule, both numbers, READ MORE and the back-to-top square. Nine uses of one variable.',
          'Two minutes, and do not look back.'
        ],
        check: 'The page should turn very pale grey.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The dark bar',
        minutes: 5,
        why: 'A flex row with <code>align-items: stretch</code> — the default — so the orange ' +
             'button fills the bar’s full height on its own. Give it a width and let the ' +
             'stretch do the rest.',
        trap: 'Setting <code>align-items: center</code> on the bar is the instinct, and it is ' +
              'what stops the CTA reaching top and bottom. Centre the logo and nav ' +
              'individually instead, and leave the bar stretching.',
        detail: [
          'A flex row with <code>align-items: stretch</code>, which is the default — so the orange button fills the bar\'s full height on its own.',
          'Give the button a width and let the stretch do the rest. Do not give it a height.',
          'The logo and nav are centred individually with their own <code>align-items: center</code>, because the bar itself must keep stretching.',
          '<code>display: grid; place-items: center</code> on the button centres its two-line label.'
        ],
        check: 'The orange button should touch both the top and the bottom of the dark bar.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'bar'])
      },
      {
        title: 'The four service cards',
        minutes: 5,
        why: '<code>repeat(4, 1fr)</code> and one card rule. Icon size and colour, heading, ' +
             'paragraph. Five minutes for a quarter of the page. Outlines come off.',
        detail: [
          '<code>repeat(4, 1fr)</code> and one card rule. Five minutes for a quarter of the page.',
          'The icon is just a large character with the brand colour — no image, no SVG.',
          'A soft shadow lifts the white cards off the pale page. Without it they disappear.',
          'Outlines come off here.'
        ],
        check: 'Four equal white cards, each with an orange icon above a navy heading.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bar', 'services'])
      },
      {
        title: 'The about section and the story',
        minutes: 6,
        why: 'Two columns, vertically centred. The eyebrow is a flex row with a short ' +
             '<code>&lt;span&gt;</code> acting as the little orange rule beside it — an empty ' +
             'span with a width and a height, which is cheaper than a pseudo-element and reads ' +
             'more obviously.',
        detail: [
          'Two columns with <code>align-items: center</code>, so the story is vertically centred against the collage rather than top-aligned.',
          'The eyebrow is a flex row: italic orange text, then a short span with a width, a height and a background acting as the rule.',
          'The heading is large and navy; the two paragraphs get a generous <code>line-height</code>.'
        ],
        check: 'The story column should be vertically centred beside the collage, not aligned to its top.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bar', 'services', 'about'])
      },
      {
        title: 'The collage — plain first, offset last',
        minutes: 6,
        why: 'A 2×2 grid of four boxes with <code>aspect-ratio: 4 / 3</code>, and then exactly ' +
             'two extra declarations: a positive <code>margin-top</code> on one box and a ' +
             'negative one on another. That is the entire offset effect.',
        trap: 'This is the time sink on this paper. If the four aligned boxes are on screen and ' +
              'you have eight minutes left, <strong>stop here and go and check the other ' +
              'question</strong>. Four tidy boxes look intentional; two nudged boxes and two ' +
              'missing ones do not.',
        detail: [
          'Do the plain 2x2 grid <strong>first</strong>. Four boxes with <code>aspect-ratio: 4 / 3</code> and a gap.',
          'The offsets are then exactly two extra declarations: a positive <code>margin-top</code> on one box and a negative one on another.',
          'Negative margin pulls an element toward its neighbour rather than pushing it away — that is the whole mechanism.',
          'If four aligned boxes are on screen and you have eight minutes left, stop here and go and check the other question.'
        ],
        check: 'Four boxes in two rows. Whether they are offset or not, they should be equal in size.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bar', 'services', 'about', 'collage'])
      },
      {
        title: 'The stats and the buttons',
        minutes: 5,
        why: 'Two flex rows with <code>border-left</code> and padding — the same left-stripe ' +
             'idea as the CareerHub job cards. Then the orange button and the fixed ' +
             'back-to-top square.',
        detail: [
          'Two flex rows with <code>border-left: 3px solid</code> and padding — the same left-stripe idea as the CareerHub job cards.',
          'The number is large, bold and orange; the label is two lines with the second in bold navy.',
          'The back-to-top square is <code>position: fixed</code> in the bottom right, which means it stays put while the page scrolls.'
        ],
        check: 'Two stat blocks with orange rules down their left edges, and an orange square pinned to the bottom right of the window.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bar', 'services', 'about', 'collage', 'stats'])
      },
      {
        title: 'Details, and compare',
        minutes: 3,
        why: 'A lift on the service cards and hovers. <strong>Compare</strong>: the orange ' +
             'button should touch the top and bottom of the dark bar, the four cards should be ' +
             'equal, and the story column should be vertically centred against the collage.',
        detail: [
          'A lift on the service cards and hovers on the links and buttons.',
          'Press Compare: the orange button touches top and bottom of the bar, the four cards are equal, and the story is vertically centred against the collage.',
          'Nothing here is annotated, so once the structure matches you are done.'
        ],
        check: 'The full-height CTA in the dark bar is the detail most people miss. Check it last.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bar', 'services', 'about', 'collage', 'stats', 'details'])
      }
    ],

    marksNote:
      'The dark bar with a full-height orange CTA, four equal service cards with icons, the ' +
      'two-column about section, the two stat blocks with their orange left rules, and the ' +
      'orange used consistently across every accent on the page. The collage counts once, ' +
      'however clever it is.',

    skipNote:
      'The collage offsets, the back-to-top square, the little rule beside the eyebrow, and ' +
      'step 9 entirely. No colours are specified, so shade cannot cost you anything — spend ' +
      'the time on the four cards and the two-column about, which are the bulk of the page.'
  });

}());
