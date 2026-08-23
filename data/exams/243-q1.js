/* 243-q1.js — UIU Housing Society hero. Mid Term 243, Q1.

   This paper carries NO annotated hex codes. Every colour below was sampled
   from the printed prototype with a pixel eyedropper, and the walkthrough
   says so. Close is fine; exact matching is not worth exam time. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>UIU Housing Society</title>',
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
    '  <title>UIU Housing Society</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<div class="wrap">',
    '',
    '  <header class="bar">',
    '    <h1 class="logo">&#9678; UIU Housing Society</h1>',
    '    <nav class="nav">',
    '      <a class="is-active" href="#">HOME</a>',
    '      <a href="#">ABOUT</a>',
    '      <a href="#">PROPERTY &#9662;</a>',
    '      <a href="#">PAGES &#9662;</a>',
    '      <a href="#">CONTACT</a>',
    '    </nav>',
    '    <a class="cta" href="#">Visit UCAM</a>',
    '  </header>',
    '',
    '  <section class="hero">',
    '    <div class="hero__text">',
    '      <h2>Find A <span>Perfect Flat</span> for<br>Teachers and Students</h2>',
    '      <p>Amazing flats for teachers and students built with care To buy',
    '        these flats, please contact the UIU Housing Office.</p>',
    '      <a class="explore" href="#">Explore UIU</a>',
    '    </div>',
    '',
    '    <div class="hero__photo">house.jpg</div>',
    '',
    '    <button class="arrow arrow--prev" type="button" aria-label="Previous">&#8249;</button>',
    '    <button class="arrow arrow--next" type="button" aria-label="Next">&#8250;</button>',
    '  </section>',
    '',
    '  <section class="search">',
    '    <input type="text" placeholder="Search Keyword">',
    '    <select>',
    '      <option>Property Type</option>',
    '      <option>Flat</option>',
    '      <option>House</option>',
    '    </select>',
    '    <select>',
    '      <option>Location</option>',
    '      <option>Badda</option>',
    '      <option>Bashundhara</option>',
    '    </select>',
    '    <button type="button">Search</button>',
    '  </section>',
    '',
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
    'input, select, button { font: inherit; }'
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
    '/* 3. NOT annotated on this paper. These were eyedropped from the',
    '      printed prototype, so near enough is genuinely near enough. */',
    ':root {',
    '  --teal:  #00b98f;   /* the brand green: nav, buttons, search band */',
    '  --navy:  #0d2e51;   /* the heading, and the Search button */',
    '  --ink:   #5a6472;',
    '  --line:  #e3e7ec;',
    '}',
    '',
    'body { color: var(--ink); background: #fff; }',
    '.wrap { max-width: 1180px; margin: 0 auto; }'
  ].join('\n');

  B.hero = [
    '',
    '/* 4. The hero: text left, photo right, photo bleeding to the edge. */',
    '.hero {',
    '  position: relative;      /* the arrows will be absolute inside this */',
    '  display: grid;',
    '  grid-template-columns: 1fr 1fr;',
    '  min-height: 470px;',
    '}',
    '',
    '.hero__text { padding: 120px 60px 40px 40px; }',
    '',
    '/* The photograph, faked. In the exam this is',
    '   <img src="house.jpg" alt=""> and you move on. */',
    '.hero__photo {',
    '  background: linear-gradient(160deg, #9fb8c9, #6d8a6a 55%, #b9a184);',
    '  display: grid;',
    '  place-items: center;',
    '  color: rgb(255 255 255 / .65);',
    '  font-size: 13px;',
    '}'
  ].join('\n');

  B.bar = [
    '',
    '/* 5. The white bar floats ON the hero, overlapping the photo. */',
    '.bar {',
    '  position: absolute;',
    '  top: 26px;',
    '  left: 40px;',
    '  right: 40px;',
    '  z-index: 2;',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 26px;',
    '  background: #fff;',
    '  padding: 16px 24px;',
    '  box-shadow: 0 4px 18px rgb(0 0 0 / .10);',
    '}',
    '.logo { font-size: 25px; color: var(--teal); margin-right: auto; }',
    '',
    '.nav { display: flex; gap: 24px; font-size: 13px; font-weight: 600; color: var(--navy); }',
    '.nav .is-active { color: var(--teal); }',
    '',
    '.cta {',
    '  background: var(--teal);',
    '  color: #fff;',
    '  padding: 9px 18px;',
    '  font-size: 13px;',
    '}'
  ].join('\n');

  B.text = [
    '',
    '/* 6. The hero copy. */',
    '.hero__text h2 {',
    '  font-size: 43px;',
    '  line-height: 1.2;',
    '  color: var(--navy);',
    '  margin-bottom: 20px;',
    '}',
    '.hero__text h2 span { color: var(--teal); }',
    '',
    '.hero__text p {',
    '  font-size: 15px;',
    '  line-height: 1.6;',
    '  max-width: 46ch;',
    '  margin-bottom: 30px;',
    '}',
    '',
    '.explore {',
    '  display: inline-block;',
    '  background: var(--teal);',
    '  color: #fff;',
    '  padding: 15px 34px;',
    '  font-size: 15px;',
    '}'
  ].join('\n');

  B.arrows = [
    '',
    '/* 7. The two circular arrows, straddling the column boundary.',
    '      They are absolute inside the hero, which is why the hero',
    '      needed position: relative back in step 4. */',
    '.arrow {',
    '  position: absolute;',
    '  left: 50%;',
    '  transform: translateX(-50%);',
    '  width: 46px;',
    '  aspect-ratio: 1;',
    '  border: 0;',
    '  border-radius: 50%;',
    '  background: var(--teal);',
    '  color: #fff;',
    '  font-size: 22px;',
    '  line-height: 1;',
    '  cursor: pointer;',
    '  z-index: 2;',
    '}',
    '.arrow--prev { top: 46%; }',
    '.arrow--next { top: 60%; }'
  ].join('\n');

  B.search = [
    '',
    '/* 8. The teal search band. Four items in one flex row. */',
    '.search {',
    '  display: flex;',
    '  gap: 16px;',
    '  background: var(--teal);',
    '  padding: 26px 40px;',
    '}',
    '.search input, .search select {',
    '  flex: 1;',
    '  min-width: 0;',
    '  background: #fff;',
    '  border: 1px solid var(--line);',
    '  border-radius: 3px;',
    '  padding: 14px 16px;',
    '  font-size: 15px;',
    '  color: var(--ink);',
    '}',
    '.search button {',
    '  flex: 0 0 210px;',
    '  background: var(--navy);',
    '  color: #fff;',
    '  border: 0;',
    '  border-radius: 3px;',
    '  font-size: 15px;',
    '  cursor: pointer;',
    '}'
  ].join('\n');

  B.details = [
    '',
    '/* 9. Details. */',
    '.cta:hover, .explore:hover, .search button:hover { filter: brightness(1.08); }',
    '.nav a { transition: color .15s; }',
    '.nav a:hover { color: var(--teal); }',
    '.arrow:hover { filter: brightness(1.1); }',
    '.search input:focus-visible, .search select:focus-visible {',
    '  outline: none;',
    '  box-shadow: 0 0 0 3px rgb(13 46 81 / .25);',
    '}'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('243-q1', {
    id: '243-q1',
    paper: 'Mid Term 243 · Q1',
    title: 'UIU Housing Society — hero',
    marks: 15,
    minutes: 42,
    image: 'assets/img/prototypes/243-q1.jpg',
    paletteSource: 'sampled',
    next: { id: '243-q2', label: '243 Q2 · United Kitchen' },

    palette: [
      { name: 'teal', hex: '#00b98f', role: 'Logo, active nav link, Visit UCAM, Explore UIU, the search band, the two arrows' },
      { name: 'navy', hex: '#0d2e51', role: 'The heading, the nav links, the Search button' },
      { name: 'ink',  hex: '#5a6472', role: 'Body text' },
      { name: 'line', hex: '#e3e7ec', role: 'Input borders' }
    ],

    structureIntro:
      'The first of the two papers with <strong>no printed hex codes</strong>. That changes ' +
      'what you optimise for: nobody can mark you against a value that was never given, so ' +
      'get the two colours roughly right in thirty seconds and spend the time on the layout, ' +
      'which is where every mark on this paper lives.',

    structure: [
      { region: 'A hero, split down the middle',
        note: 'Text on the left, a photograph on the right that runs to the edge. Two equal ' +
              'grid columns.' },
      { region: 'A white bar floating on top of it',
        note: 'This is the part to get right. The navigation is <em>not</em> above the hero — ' +
              'it overlaps it, sitting on the photograph. That means ' +
              '<code>position: absolute</code> with left and right offsets, inside a hero that ' +
              'is <code>position: relative</code>.' },
      { region: 'Two circular arrows on the seam',
        note: 'They sit centred on the boundary between the two columns, one above the other. ' +
              'Absolutely positioned at <code>left: 50%</code> with ' +
              '<code>translateX(-50%)</code> — the same containing block as the bar.' },
      { region: 'A teal band across the bottom',
        note: 'Four things in one flex row: three fields that share the space and a fixed-width ' +
              'dark button.' },
      { region: 'The photograph',
        note: 'A gradient placeholder. In the exam: <code>&lt;img src="house.jpg" alt=""&gt;</code> ' +
              'and move on. Never hunt for an image.' }
    ],

    method:
      'Reset, all the HTML, a two-colour palette — thirty seconds, because nothing is ' +
      'specified. Then the hero grid <em>before</em> the header, because the header is ' +
      'positioned against the hero and cannot be placed until the hero exists. Then the bar, ' +
      'the copy, the arrows, the search band.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Five lines, including <code>font: inherit</code> for the two selects and two ' +
             'buttons.',
        detail: [
          'Five lines, including <code>font: inherit</code> for the two selects and two buttons in the search band.',
          '<code>a { color: inherit }</code> for the five nav links.',
          'No <code>img</code> rule needed — there are no real images on this page, only a placeholder div.'
        ],
        check: 'A blank white page.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 8,
        why: 'Three blocks: a header, a hero with two children and two buttons, and a search ' +
             'row. The header is written <em>inside</em> the wrapper but before the hero, and ' +
             'will be lifted on top of it with positioning rather than moved in the markup.',
        detail: [
          'Three blocks: a header, a hero with two children plus two buttons, and a search row.',
          'The header is written <em>before</em> the hero in the markup and will be lifted on top of it with positioning, not moved.',
          'The two arrow buttons are children of the hero, not of either column — they straddle the boundary, so they belong to the parent.',
          'The photo is a plain div. In the exam this is <code>&lt;img src="house.jpg" alt=""&gt;</code> and you move on.'
        ],
        check: 'Outlines should show the header overlapping nothing yet — it will still be stacked above the hero at this point.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'Two colours, sampled',
        minutes: 2,
        why: 'A teal and a navy. This paper prints no codes, so these came off the printed ' +
             'prototype with an eyedropper. Anything in the same neighbourhood will read as ' +
             'correct — do not spend a third minute here.',
        detail: [
          'This paper prints no hex codes at all, so these two came off the prototype with a pixel eyedropper.',
          'A teal and a navy is genuinely all this design uses. Anything in the same neighbourhood will read as correct.',
          'Do not spend a third minute here. Nobody can mark you against a value that was never given.'
        ],
        check: 'No visible change yet.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The hero split',
        minutes: 5,
        why: 'Two equal columns and a minimum height. <code>position: relative</code> goes on ' +
             'now, before anything needs it, because both the bar and the arrows will measure ' +
             'themselves against this box.',
        trap: 'Forget <code>position: relative</code> here and the floating header will ' +
              'position itself against the whole page instead. It will look almost right at ' +
              'one window size and wrong everywhere else — and the cause is nowhere near the ' +
              'symptom.',
        detail: [
          'Two equal columns and a <code>min-height</code>, so the hero has real height before anything is inside it.',
          '<code>position: relative</code> goes on now, before anything needs it. Both the header and the arrows will measure themselves against this box.',
          'The left column gets large top padding, which is what will push the text clear of the floating header.',
          'The photo placeholder is a gradient — a stand-in that costs one declaration and holds the right space.'
        ],
        check: 'Two halves, the right one coloured. The header is still sitting above them in normal flow.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'hero'])
      },
      {
        title: 'The floating white bar',
        minutes: 6,
        why: 'Absolute, with <code>left</code> and <code>right</code> offsets rather than a ' +
             'width — set both and the element stretches between them, which is what keeps ' +
             'the inset even. <code>z-index: 2</code> puts it above the photo. Outlines off.',
        detail: [
          '<code>position: absolute</code> with <code>left</code> and <code>right</code> offsets rather than a width. Setting both makes the element stretch between them, which keeps the inset even at any window size.',
          '<code>z-index: 2</code> lifts it above the photo.',
          'A soft shadow under the bar is what sells the floating effect — without it the bar reads as a hole cut in the photo.',
          'Outlines come off here.'
        ],
        check: 'The white bar should now be sitting on top of the photograph, inset from both edges.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'hero', 'bar'])
      },
      {
        title: 'The hero copy',
        minutes: 5,
        why: 'A large heading with one green <code>&lt;span&gt;</code> and a deliberate ' +
             '<code>&lt;br&gt;</code>, a paragraph capped with <code>max-width</code>, and a ' +
             'solid button. The top padding is what pushes the text below the floating bar.',
        detail: [
          'A large heading with one green <code>&lt;span&gt;</code> and a deliberate <code>&lt;br&gt;</code>.',
          '<code>max-width: 46ch</code> on the paragraph caps the line length without a pixel width.',
          'The button is an <code>&lt;a&gt;</code> set to <code>display: inline-block</code> so it takes padding — an inline anchor ignores vertical padding for layout.'
        ],
        check: 'Perfect Flat should be green, the heading should break before Teachers, and none of it should be hidden behind the bar.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'hero', 'bar', 'text'])
      },
      {
        title: 'The two circular arrows',
        minutes: 4,
        why: '<code>left: 50%</code> puts their left edge at the seam; ' +
             '<code>translateX(-50%)</code> pulls them back by half their own width, which is ' +
             'the only way to centre something whose width you have not hard-coded. Circles ' +
             'from <code>aspect-ratio: 1</code> and a 50% radius.',
        detail: [
          '<code>left: 50%</code> puts the button\'s left edge on the seam; <code>translateX(-50%)</code> pulls it back by half its own width.',
          'That pairing is the only way to centre something whose width you have not hard-coded — and it works because percentage translates are relative to the element\'s own size.',
          'Circles from <code>aspect-ratio: 1</code> and <code>border-radius: 50%</code>.',
          'The two buttons sit at different <code>top</code> percentages, one above the other.'
        ],
        check: 'Both circles should straddle the boundary between the text and the photo.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'hero', 'bar', 'text', 'arrows'])
      },
      {
        title: 'The search band',
        minutes: 6,
        why: 'One flex row. The three fields take <code>flex: 1</code> so they share the space ' +
             'equally; the button takes <code>flex: 0 0 210px</code> so it does not. ' +
             '<code>min-width: 0</code> on the fields stops the select’s content forcing the ' +
             'row wider than its container.',
        trap: 'Without <code>min-width: 0</code> the row can overflow, because flex items ' +
              'refuse to shrink below their content by default. A <code>&lt;select&gt;</code> ' +
              'with long option text is exactly the case where you notice.',
        detail: [
          'One flex row with four children.',
          'The three fields take <code>flex: 1</code> so they share the space equally; the button takes <code>flex: 0 0 210px</code> so it does not.',
          '<code>min-width: 0</code> on the fields is essential: flex items refuse to shrink below their content by default, and a select with long option text is exactly where you notice.',
          'The band\'s teal background is what makes the white fields read as a search bar rather than three loose inputs.'
        ],
        check: 'Three equal fields and one wider dark button, all on one teal band, with no horizontal overflow.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'hero', 'bar', 'text', 'arrows', 'search'])
      },
      {
        title: 'Details, and compare',
        minutes: 3,
        why: 'Hovers and a focus ring. <strong>Compare</strong>: the white bar should overlap ' +
             'the photograph, the arrows should sit on the seam between the columns, and the ' +
             'Search button should be visibly wider than one field and darker than the band.',
        detail: [
          'Hovers and a focus ring.',
          'Press Compare and check three things: the white bar overlaps the photograph, the arrows sit on the seam, and the Search button is both wider than a field and darker than the band.',
          'Because nothing is annotated, once the structure matches you are finished — do not fiddle with the teal.'
        ],
        check: 'The overlapping header is what this question is testing. If that reads correctly, you have the marks.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'hero', 'bar', 'text', 'arrows', 'search', 'details'])
      }
    ],

    marksNote:
      'The overlapping white header — that is the distinctive thing on this page and the ' +
      'reason it was set. Then the two-column hero with the photo running to the edge, the ' +
      'green heading span, the teal search band with three fields and one wider dark button, ' +
      'and the two circular arrows on the seam.',

    skipNote:
      'The arrows, the logo mark, the dropdown carets and all of step 9. Because no colours ' +
      'are specified you also cannot lose marks on shade — so if you are behind, approximate ' +
      'the teal and spend everything you have on the overlapping header, which is what the ' +
      'question is actually testing.'
  });

}());
