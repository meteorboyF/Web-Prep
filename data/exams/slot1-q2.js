/* slot1-q2.js — UIU CareerHub job board. Slot 1, Spring 2026, Q2. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>UIU CareerHub</title>',
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
    '  <title>UIU CareerHub</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<header class="head">',
    '  <h1 class="brand">UIU <span>CareerHub</span></h1>',
    '  <nav class="nav">',
    '    <a href="#">Home</a>',
    '    <a href="#">Jobs</a>',
    '    <a href="#">Internships</a>',
    '    <a href="#">Companies</a>',
    '    <a href="#">Resources</a>',
    '  </nav>',
    '  <a class="post" href="#">+ Post a Job</a>',
    '</header>',
    '',
    '<main class="page">',
    '',
    '  <aside class="filters">',
    '',
    '    <section class="fbox">',
    '      <h2 class="fbox__title">Filters</h2>',
    '    </section>',
    '',
    '    <section class="fbox">',
    '      <h2 class="fbox__title">Job Type <span class="chev">&#94;</span></h2>',
    '      <label class="opt"><input type="checkbox" checked> Full-time</label>',
    '      <label class="opt"><input type="checkbox"> Part-time</label>',
    '      <label class="opt"><input type="checkbox"> Internship</label>',
    '      <label class="opt"><input type="checkbox"> Remote</label>',
    '    </section>',
    '',
    '    <section class="fbox">',
    '      <h2 class="fbox__title">Department <span class="chev">&#94;</span></h2>',
    '      <label class="opt"><input type="checkbox" checked> Software Engineering</label>',
    '      <label class="opt"><input type="checkbox"> Data Science</label>',
    '      <label class="opt"><input type="checkbox"> UI/UX Design</label>',
    '      <label class="opt"><input type="checkbox"> Networking</label>',
    '    </section>',
    '',
    '    <section class="fbox">',
    '      <h2 class="fbox__title">Experience <span class="chev">&#94;</span></h2>',
    '      <a class="apply-filters" href="#">Apply Filters</a>',
    '    </section>',
    '',
    '  </aside>',
    '',
    '  <section class="jobs">',
    '',
    '    <div class="jobs__head">',
    '      <h2>Available Positions</h2>',
    '      <p>Showing 3 of 23 jobs</p>',
    '    </div>',
    '',
    '    <article class="job" style="--edge: var(--brand)">',
    '      <div class="job__main">',
    '        <h3>Junior Software Engineer</h3>',
    '        <p class="job__co">Kaz Software</p>',
    '        <p class="tags">',
    '          <span class="tag" style="--t: var(--tagBlue)">Full-time</span>',
    '          <span class="tag" style="--t: var(--tagGreen)">Onsite - Dhaka</span>',
    '        </p>',
    '      </div>',
    '      <div class="job__side">',
    '        <p class="job__pay">&#2547; 35,000 - 50,000</p>',
    '        <p class="job__when">Deadline: Dec 30, 2025</p>',
    '        <a class="apply" href="#">Apply</a>',
    '      </div>',
    '    </article>',
    '',
    '    <article class="job" style="--edge: #2f9e5e">',
    '      <div class="job__main">',
    '        <h3>Data Analyst Intern</h3>',
    '        <p class="job__co">bKash Limited</p>',
    '        <p class="tags">',
    '          <span class="tag" style="--t: var(--tagAmber)">Internship</span>',
    '          <span class="tag" style="--t: var(--tagGreen)">Onsite - Dhaka</span>',
    '        </p>',
    '      </div>',
    '      <div class="job__side">',
    '        <p class="job__pay">&#2547; 15,000 / month</p>',
    '        <p class="job__when">Deadline: Jan 15, 2020</p>',
    '        <a class="apply" href="#">Apply</a>',
    '      </div>',
    '    </article>',
    '',
    '    <article class="job" style="--edge: var(--brand)">',
    '      <div class="job__main">',
    '        <h3>Frontend Developer</h3>',
    '        <p class="job__co">Palhau Inc.</p>',
    '        <p class="tags">',
    '          <span class="tag" style="--t: var(--tagBlue)">Full-time</span>',
    '          <span class="tag" style="--t: var(--tagBlue)">Remote</span>',
    '        </p>',
    '      </div>',
    '      <div class="job__side">',
    '        <p class="job__pay">&#2547; 45,000 - 70,000</p>',
    '        <p class="job__when">Deadline: Jan 5, 2025</p>',
    '        <a class="apply" href="#">Apply</a>',
    '      </div>',
    '    </article>',
    '',
    '  </section>',
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
    '/* 3. Six annotated codes. Three of them are tag backgrounds, which is',
    '      why the tag is one rule with a --t. */',
    ':root {',
    '  --brand:    #205bcb;   /* "CareerHub", Post a Job, Apply, Apply Filters */',
    '  --rule:     #9bb7dc;   /* the thin line under the header */',
    '  --tagBlue:  #e2ebfa;   /* Full-time, Remote */',
    '  --tagGreen: #d6f2e7;   /* Onsite - Dhaka */',
    '  --tagAmber: #fdebc0;   /* Internship */',
    '  --page:     #f5f6fb;   /* behind everything */',
    '',
    '  /* Not annotated. */',
    '  --ink:   #1f2937;',
    '  --muted: #6b7280;',
    '  --line:  #e5e7eb;',
    '}',
    '',
    'body { background: var(--page); color: var(--ink); }'
  ].join('\n');

  B.head = [
    '',
    '/* 4. The header, with its thin coloured rule underneath. */',
    '.head {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 26px;',
    '  background: #fff;',
    '  padding: 18px 30px;',
    '  border-bottom: 2px solid var(--rule);',
    '}',
    '.brand { font-size: 23px; margin-right: auto; }',
    '.brand span { color: var(--brand); }',
    '',
    '.nav { display: flex; gap: 28px; font-size: 16px; }',
    '',
    '.post {',
    '  background: var(--brand);',
    '  color: #fff;',
    '  border-radius: 6px;',
    '  padding: 10px 18px;',
    '  font-size: 15px;',
    '}'
  ].join('\n');

  B.page = [
    '',
    '/* 5. Sidebar and main. The classic app shell. */',
    '.page {',
    '  display: grid;',
    '  grid-template-columns: 270px 1fr;',
    '  gap: 26px;',
    '  padding: 26px 30px 40px;',
    '}',
    '',
    '.filters { display: grid; gap: 18px; align-content: start; }',
    '',
    '.fbox {',
    '  background: #fff;',
    '  border: 1px solid var(--line);',
    '  border-radius: 10px;',
    '  padding: 16px 18px;',
    '}',
    '.fbox__title {',
    '  display: flex;',
    '  align-items: center;',
    '  font-size: 19px;',
    '  padding-bottom: 12px;',
    '  border-bottom: 1px solid var(--line);',
    '  margin-bottom: 12px;',
    '}',
    '.chev { margin-left: auto; font-size: 15px; color: var(--muted); }'
  ].join('\n');

  B.opts = [
    '',
    '/* 6. The checkbox rows, and the filter button. */',
    '.opt {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 10px;',
    '  padding: 5px 0;',
    '  font-size: 15px;',
    '}',
    '.opt input { accent-color: var(--brand); width: 16px; height: 16px; }',
    '',
    '.apply-filters {',
    '  display: block;',
    '  background: var(--brand);',
    '  color: #fff;',
    '  border-radius: 6px;',
    '  padding: 11px;',
    '  text-align: center;',
    '  font-size: 15px;',
    '}'
  ].join('\n');

  B.jobs = [
    '',
    '/* 7. The job list: a heading row, then three cards. */',
    '.jobs__head {',
    '  display: flex;',
    '  align-items: baseline;',
    '  margin-bottom: 16px;',
    '}',
    '.jobs__head h2 { font-size: 23px; margin-right: auto; }',
    '.jobs__head p { font-size: 15px; color: var(--muted); }',
    '',
    '/* The coloured stripe is a border on the card, not an extra element. */',
    '.job {',
    '  display: grid;',
    '  grid-template-columns: 1fr auto;',
    '  gap: 20px;',
    '  background: #fff;',
    '  border: 1px solid var(--line);',
    '  border-left: 5px solid var(--edge);',
    '  border-radius: 8px;',
    '  padding: 18px 22px;',
    '  margin-bottom: 16px;',
    '}',
    '.job h3 { font-size: 21px; }',
    '.job__co { color: var(--muted); font-size: 16px; margin: 4px 0 12px; }',
    '',
    '.job__side { text-align: right; }',
    '.job__pay { font-size: 20px; font-weight: 600; }',
    '.job__when { font-size: 15px; color: var(--muted); margin: 4px 0 14px; }',
    '',
    '.apply {',
    '  display: inline-block;',
    '  background: var(--brand);',
    '  color: #fff;',
    '  border-radius: 6px;',
    '  padding: 8px 20px;',
    '  font-size: 15px;',
    '}'
  ].join('\n');

  B.tags = [
    '',
    '/* 8. One tag rule, three colours. */',
    '.tags { display: flex; gap: 10px; }',
    '.tag {',
    '  background: var(--t);',
    '  border-radius: 999px;',
    '  padding: 4px 12px;',
    '  font-size: 14px;',
    '  color: #2b3a4a;',
    '}'
  ].join('\n');

  B.details = [
    '',
    '/* 9. Details. */',
    '.job { transition: box-shadow .2s; }',
    '.job:hover { box-shadow: 0 6px 18px rgb(0 0 0 / .07); }',
    '.opt:has(input:checked) { font-weight: 600; }',
    '.post:hover, .apply:hover, .apply-filters:hover { filter: brightness(1.08); }'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('slot1-q2', {
    id: 'slot1-q2',
    paper: 'Slot 1 · Spring 2026 · Q2',
    title: 'UIU CareerHub — job board',
    marks: 15,
    minutes: 41,
    image: 'assets/img/prototypes/slot1-q2.jpg',
    paletteSource: 'annotated',
    prev: { id: '251-q2', label: '251 Q2 · Sign in' },

    palette: [
      { name: 'brand',    hex: '#205bcb', role: '"CareerHub", Post a Job, all three Apply buttons, Apply Filters' },
      { name: 'rule',     hex: '#9bb7dc', role: 'The thin line under the header' },
      { name: 'tagBlue',  hex: '#e2ebfa', role: 'The Full-time and Remote tags' },
      { name: 'tagGreen', hex: '#d6f2e7', role: 'The Onsite - Dhaka tags' },
      { name: 'tagAmber', hex: '#fdebc0', role: 'The Internship tag' },
      { name: 'page',     hex: '#f5f6fb', role: 'The page behind everything' }
    ],

    structureIntro:
      'A sidebar-and-main app shell, which is the most common shape in this whole set — four ' +
      'of the twelve prototypes are this. Inside it, two components repeated: a filter panel ' +
      'and a job card.',

    structure: [
      { region: 'A white header with a coloured rule under it',
        note: 'Two-tone logo, five links, a filled button. The thin blue line beneath is a ' +
              '<code>border-bottom</code> on the header, not a separate div.' },
      { region: 'Sidebar and main, on a tinted page',
        note: '<code>grid-template-columns: 270px 1fr</code>. Fixed sidebar, fluid main. ' +
              'That one declaration is the layout.' },
      { region: 'Four filter panels, one component',
        note: 'White, rounded, bordered, with a heading that has a rule under it and a chevron ' +
              'pushed right by <code>margin-left: auto</code>. The last one contains the ' +
              'button instead of a list.' },
      { region: 'Three job cards, one component',
        note: 'Each is a two-column grid: details on the left, salary and Apply on the right, ' +
              'right-aligned. The right column is <code>auto</code> so it takes only the width ' +
              'it needs.' },
      { region: 'The coloured stripe is a border',
        note: '<code>border-left: 5px solid var(--edge)</code> on the card. Two cards are blue ' +
              'and one is green. Not a positioned div, not a pseudo-element.' },
      { region: 'Six tags, one rule',
        note: 'Pills with a background from <code>--t</code>. Three annotated colours across ' +
              'six tags, so the blue is used three times and the green twice.' },
      { region: 'The chevrons',
        note: 'A caret character, or a rotated <code>^</code>. This is a static screenshot — ' +
              'there is no accordion to build and nothing to toggle.' }
    ],

    method:
      'Reset, all the HTML, palette. Then the header and the two-column shell — after which the ' +
      'page already reads as the target. Then the filter panel component, then the job card ' +
      'component, then the tags. Components before instances, every time: four panels and three ' +
      'cards written once each is about fifteen minutes; written seven times it is the whole ' +
      'exam.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Four lines plus <code>input { font: inherit }</code> for the eight checkboxes.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 10,
        why: 'The longest markup in this batch, but it is only two shapes repeated. Each job ' +
             'card carries its stripe colour as <code>--edge</code> and each tag its background ' +
             'as <code>--t</code>, which is what makes steps 7 and 8 short. Every checkbox is a ' +
             'label wrapping its input, so no ids are needed.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette',
        minutes: 3,
        why: 'Six codes. Three are tag backgrounds, which is the clue that the tag should be ' +
             'one rule with a variable rather than three rules.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The header',
        minutes: 4,
        why: 'Flex with <code>margin-right: auto</code> on the logo. The two-tone brand is a ' +
             '<code>&lt;span&gt;</code> around one word. The rule underneath is a ' +
             '<code>border-bottom</code> in the annotated blue.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'head'])
      },
      {
        title: 'The two-column shell',
        minutes: 5,
        why: 'One grid declaration and the page is laid out. <code>align-content: start</code> ' +
             'on the sidebar stops the panels stretching to fill the column height, which is ' +
             'what they would otherwise do. Outlines come off.',
        trap: 'Without <code>align-content: start</code> the four filter panels share the full ' +
              'height of the main column and each one grows tall and empty. It looks like a ' +
              'padding bug and it is not.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'head', 'page'])
      },
      {
        title: 'The filter panels',
        minutes: 5,
        why: 'One <code>.fbox</code> rule for all four. The heading is a flex row with a ' +
             '<code>border-bottom</code> and the chevron on <code>margin-left: auto</code> — ' +
             'the same two tricks as almost every other heading in this set.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'head', 'page', 'opts'])
      },
      {
        title: 'The job cards',
        minutes: 7,
        why: 'A two-column grid of <code>1fr auto</code>: the details take the space, the ' +
             'salary block takes what it needs and is right-aligned. The stripe is ' +
             '<code>border-left</code> with the colour coming from the card’s own ' +
             '<code>--edge</code>.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'head', 'page', 'opts', 'jobs'])
      },
      {
        title: 'The tags',
        minutes: 3,
        why: 'Seven lines for all six pills. A flex row with a gap, and a background from ' +
             '<code>--t</code>. Adding a sixth tag needs no CSS.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'head', 'page', 'opts', 'jobs', 'tags'])
      },
      {
        title: 'Details, and compare',
        minutes: 3,
        why: 'A hover shadow on the cards and a bold label on checked filters. ' +
             '<strong>Compare</strong>: check the sidebar panels sit at the top rather than ' +
             'stretching, the middle card’s stripe is green, and the Apply buttons line up on ' +
             'the right edge.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'head', 'page', 'opts', 'jobs', 'tags', 'details'])
      }
    ],

    marksNote:
      'The fixed sidebar and fluid main, four filter panels with underlined headings and ' +
      'checkbox lists, three job cards with coloured left stripes and right-aligned salary ' +
      'blocks, and six tags in the three annotated colours. Plus the two-tone logo and the ' +
      'rule under the header.',

    skipNote:
      'The chevrons, the hover shadow, the checked-label weight. If you are behind, the ' +
      '"Showing 3 of 23 jobs" line and the empty Experience panel are free to lose — but keep ' +
      'all three job cards, because one card repeated is what the paper is testing.'
  });

}());
