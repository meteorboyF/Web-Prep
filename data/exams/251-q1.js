/* 251-q1.js — UIU Information Desk pricing. Mid Term 251, Spring 2025, Q1. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>UIU Information Desk</title>',
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
    '  <title>UIU Information Desk</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<header class="top">',
    '  <h1 class="brand">UIU <span>Information</span> Desk</h1>',
    '  <nav class="top__nav">',
    '    <a href="#">CONTACT US</a>',
    '    <a href="#">WEBMAIL</a>',
    '    <a href="#">LOG IN</a>',
    '  </nav>',
    '  <a class="signup" href="#">SIGN UP</a>',
    '</header>',
    '',
    '<nav class="menu">',
    '  <a href="#">FREE WEBSITES</a>',
    '  <a href="#">ONLINE STORES</a>',
    '  <a href="#">DOMAIN NAMES</a>',
    '  <a href="#">EMAIL</a>',
    '  <a href="#">TEMPLATES</a>',
    '  <a href="#">PRICING</a>',
    '  <a href="#">RESOURCES &#9662;</a>',
    '</nav>',
    '',
    '<section class="band">',
    '  <p class="band__kicker">Your Online Journey Starts Here:</p>',
    '  <h2 class="band__title">Free Websites, Emails, Domains, Done Right.</h2>',
    '',
    '  <div class="plans">',
    '',
    '    <article class="plan" style="--c: var(--indigo)">',
    '      <p class="plan__name">Free Website Builder <span class="plan__icon">&#9998;</span></p>',
    '      <p class="plan__price">$0 <span>and up</span></p>',
    '      <a class="plan__btn" href="#">&#128722; START FOR FREE</a>',
    '      <p class="plan__foot">No Credit Card Required</p>',
    '    </article>',
    '',
    '    <article class="plan" style="--c: var(--forest)">',
    '      <p class="plan__name">Email@YourDomain <span class="plan__icon">&#9993;</span></p>',
    '      <p class="plan__price">$1 <span>/ Email box</span></p>',
    '      <a class="plan__btn" href="#">&#128722; GET EMAIL</a>',
    '    </article>',
    '',
    '    <article class="plan" style="--c: var(--rust)">',
    '      <p class="plan__name">Domain <span class="plan__icon">&#127760;</span></p>',
    '      <p class="plan__price">$0.01 <span>/ 1st Yr</span></p>',
    '      <a class="plan__btn" href="#">&#128722; BUY DOMAIN</a>',
    '    </article>',
    '',
    '    <article class="plan" style="--c: var(--teal)">',
    '      <p class="plan__name">Online Store <span class="plan__icon">&#127978;</span></p>',
    '      <p class="plan__price">$10 <span>/ month</span></p>',
    '      <a class="plan__btn" href="#">&#128722; SELL PRODUCTS</a>',
    '    </article>',
    '',
    '    <article class="plan" style="--c: var(--steel)">',
    '      <p class="plan__name">Web Design Service <span class="plan__icon">&#9986;</span></p>',
    '      <p class="plan__price">$995 <span>and up</span></p>',
    '      <a class="plan__btn" href="#">DO IT FOR ME &#8594;</a>',
    '    </article>',
    '',
    '  </div>',
    '</section>',
    '',
    '<section class="outro">',
    '  <h2>Website Templates, Made Easy.</h2>',
    '  <p>Explore responsive, stunning customizable website template designs',
    '    tailored to thrive in your industry.</p>',
    '  <a class="outro__link" href="#">Create Your Website Now &#8250;</a>',
    '</section>',
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
    '/* 3. Eleven annotated codes. Five of them are the card titles,',
    '      which is why each card carries its own --c. */',
    ':root {',
    '  --flame:  #ff4419;   /* "Information", and the SIGN UP button */',
    '  --indigo: #4358b8;   /* Free Website Builder */',
    '  --forest: #075627;   /* Email@YourDomain */',
    '  --rust:   #d84400;   /* Domain */',
    '  --teal:   #1372aa;   /* Online Store */',
    '  --steel:  #206fb4;   /* Web Design Service */',
    '  --blue:   #1d78f0;   /* all five buttons, and the bottom link */',
    '',
    '  /* Not annotated. */',
    '  --mint:   #e8f0ee;',
    '  --ink:    #333;',
    '}',
    '',
    'body { color: var(--ink); }'
  ].join('\n');

  B.header = [
    '',
    '/* 4. Two stacked header rows. */',
    '.top {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 26px;',
    '  padding: 16px 30px;',
    '}',
    '.brand { font-size: 22px; font-weight: 700; margin-right: auto; }',
    '.brand span { color: var(--flame); }',
    '',
    '.top__nav { display: flex; gap: 26px; font-size: 12px; letter-spacing: .04em; }',
    '',
    '.signup {',
    '  background: var(--flame);',
    '  color: #fff;',
    '  padding: 9px 22px;',
    '  font-size: 13px;',
    '  font-weight: 700;',
    '  letter-spacing: .04em;',
    '}',
    '',
    '.menu {',
    '  display: flex;',
    '  gap: 30px;',
    '  padding: 0 30px 14px;',
    '  font-size: 12px;',
    '  letter-spacing: .05em;',
    '}'
  ].join('\n');

  B.band = [
    '',
    '/* 5. The mint band and the five-column card row. */',
    '.band {',
    '  background: var(--mint);',
    '  padding: 34px 30px 60px;',
    '  text-align: center;',
    '}',
    '.band__kicker { font-size: 17px; font-weight: 700; }',
    '.band__title {',
    '  font-size: 42px;',
    '  font-weight: 600;',
    '  margin: 12px 0 40px;',
    '}',
    '',
    '.plans {',
    '  display: grid;',
    '  grid-template-columns: repeat(5, 1fr);',
    '  gap: 26px;',
    '  text-align: left;',
    '}'
  ].join('\n');

  B.cards = [
    '',
    '/* 6. One card rule, five --c values, and the shadow that defines',
    '      the whole design: no blur, solid black, down and to the right. */',
    '.plan {',
    '  background: #fff;',
    '  padding: 18px 16px 22px;',
    '  box-shadow: 10px 10px 0 #000;',
    '}',
    '.plan__name {',
    '  display: flex;',
    '  align-items: center;',
    '  color: var(--c);',
    '  font-size: 14px;',
    '  font-weight: 700;',
    '}',
    '.plan__icon { margin-left: auto; font-size: 18px; }',
    '',
    '.plan__price {',
    '  font-size: 38px;',
    '  font-weight: 800;',
    '  margin: 18px 0 22px;',
    '}',
    '.plan__price span { font-size: 14px; font-weight: 400; }',
    '',
    '.plan__btn {',
    '  display: block;',
    '  background: var(--blue);',
    '  color: #fff;',
    '  text-align: center;',
    '  padding: 12px;',
    '  font-size: 12px;',
    '  font-weight: 700;',
    '  letter-spacing: .04em;',
    '}',
    '.plan__foot { margin-top: 10px; font-size: 10px; text-align: center; color: #777; }'
  ].join('\n');

  B.outro = [
    '',
    '/* 7. The closing band. */',
    '.outro {',
    '  padding: 40px 30px 50px;',
    '  text-align: center;',
    '}',
    '.outro h2 { font-size: 38px; font-weight: 600; }',
    '.outro p { margin: 14px 0 22px; font-size: 16px; color: #555; }',
    '.outro__link { color: var(--blue); font-size: 15px; }'
  ].join('\n');

  B.details = [
    '',
    '/* 8. Details. */',
    '.plan { transition: transform .15s; }',
    '.plan:hover { transform: translate(-2px, -2px); }',
    '.plan:hover { box-shadow: 12px 12px 0 #000; }',
    '.plan__btn:hover, .signup:hover { filter: brightness(1.08); }',
    '.menu a:hover, .top__nav a:hover { color: var(--blue); }'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('251-q1', {
    id: '251-q1',
    paper: 'Mid Term 251 · Spring 2025 · Q1',
    title: 'UIU Information Desk — pricing',
    marks: 15,
    minutes: 42,
    image: 'assets/img/prototypes/251-q1.jpg',
    paletteSource: 'annotated',
    next: { id: '251-q2', label: '251 Q2 · Sign in' },

    palette: [
      { name: 'flame',  hex: '#ff4419', role: '"Information" in the logo, and the SIGN UP button' },
      { name: 'indigo', hex: '#4358b8', role: 'Free Website Builder title' },
      { name: 'forest', hex: '#075627', role: 'Email@YourDomain title' },
      { name: 'rust',   hex: '#d84400', role: 'Domain title' },
      { name: 'teal',   hex: '#1372aa', role: 'Online Store title' },
      { name: 'steel',  hex: '#206fb4', role: 'Web Design Service title' },
      { name: 'blue',   hex: '#1d78f0', role: 'All five card buttons, and the bottom link' }
    ],

    structureIntro:
      'Eleven annotated codes across one page — more than any other prototype in the set. ' +
      'Five of them are just the card titles, which tells you immediately that the five cards ' +
      'are one component with a colour variable, not five separate things.',

    structure: [
      { region: 'Two stacked header rows',
        note: 'The first is the logo and the right-hand links with the orange SIGN UP button. ' +
              'The second is the wide nav. They are separate flex rows, not one row that ' +
              'wraps.' },
      { region: 'A pale mint band, centred',
        note: 'Kicker, then a large heading, then the cards. The band has its own background ' +
              'and generous vertical padding — that colour is what separates the pricing from ' +
              'everything else.' },
      { region: 'Five pricing cards in a row',
        note: '<code>repeat(5, 1fr)</code>. Each has a coloured title with an icon pushed ' +
              'right, a large price with a small unit beside it, and a full-width blue button. ' +
              'Only the first has small print underneath.' },
      { region: 'The shadow is the design',
        note: '<code>box-shadow: 10px 10px 0 #000</code> — no blur, solid black, offset down ' +
              'and right. This is the one case where the flat 2004-looking shadow is ' +
              'deliberate, and getting it wrong is very visible.' },
      { region: 'A white closing band',
        note: 'Centred heading, paragraph and a link. Same shape as the mint band without the ' +
              'colour.' },
      { region: 'What to ignore',
        note: 'The dotted underlines under three words of the big heading, and the five icons. ' +
              'Neither is worth a minute of a 42-minute budget.' }
    ],

    method:
      'Reset, all the HTML, palette — the palette step matters more here than anywhere else, ' +
      'because eleven codes looked up individually is ten minutes of scrolling back to the ' +
      'question paper. Then the two header rows, then the band, then the card component, then ' +
      'the closing band. The cards are the marks; do them before you touch anything decorative.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Four lines. <code>a { color: inherit }</code> earns its place here — there are ' +
             'seventeen links on this page and none of them should be browser blue.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 9,
        why: 'Five nearly identical cards. Type the first one properly, then copy it four ' +
             'times and change the text and the <code>--c</code>. The icons are Unicode ' +
             'characters — a pencil, an envelope, a globe — because an icon font is a network ' +
             'request you do not have time for and they are worth no marks either way.',
        trap: 'The two header rows are separate elements. Writing them as one flex row that ' +
              'wraps will look right at exactly one window width and wrong at every other.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette — eleven codes',
        minutes: 5,
        why: 'The longest palette in the set. Naming the five card colours after what they ' +
             'look like rather than which card they are on is deliberate: each card sets ' +
             '<code>--c</code> to one of them, so the card rule never mentions a specific ' +
             'colour at all.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'Both header rows',
        minutes: 5,
        why: 'Two flex rows. <code>margin-right: auto</code> on the logo pushes the links and ' +
             'the SIGN UP button to the right. The orange word in the logo is a ' +
             '<code>&lt;span&gt;</code> — one element, one rule.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'header'])
      },
      {
        title: 'The mint band and the five-column grid',
        minutes: 5,
        why: '<code>text-align: center</code> on the band, then <code>text-align: left</code> ' +
             'back on the card grid — cheaper than centring three things individually. ' +
             '<code>repeat(5, 1fr)</code> gives the row. Outlines come off.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'header', 'band'])
      },
      {
        title: 'The card, and that shadow',
        minutes: 9,
        why: 'The step that earns the marks. One rule for all five. The title is a flex row so ' +
             'the icon takes <code>margin-left: auto</code>; the price is one large number ' +
             'with a small <code>&lt;span&gt;</code> beside it; the button is ' +
             '<code>display: block</code>, which is what makes an <code>&lt;a&gt;</code> go ' +
             'full width.',
        trap: '<code>box-shadow: 10px 10px 0 #000</code> — the fourth value is the blur and it ' +
              'must be <strong>0</strong>. Add blur and the flat graphic style collapses into ' +
              'something that looks like a mistake.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'header', 'band', 'cards'])
      },
      {
        title: 'The closing band',
        minutes: 3,
        why: 'The same centred shape as the mint band, without the background. Three elements.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'header', 'band', 'cards', 'outro'])
      },
      {
        title: 'Details, and compare',
        minutes: 3,
        why: 'A lift on card hover that deepens the offset shadow — which is the only hover ' +
             'worth having on a design like this. Then <strong>Compare</strong>: the five ' +
             'cards should be exactly equal, and every shadow should sit down-and-right with ' +
             'hard edges.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'header', 'band', 'cards', 'outro', 'details'])
      }
    ],

    marksNote:
      'Five equal cards with the hard offset shadow, five different title colours matching the ' +
      'annotations, five blue full-width buttons, the mint band, and the orange logo word and ' +
      'SIGN UP button. Eleven codes on the right elements is most of this paper.',

    skipNote:
      'The icons, the dotted underlines in the big heading, the "No Credit Card Required" line, ' +
      'and all of step 8. If you are very short, the second nav row can go — but never the ' +
      'shadow, which is the single most recognisable thing on the page.'
  });

}());
