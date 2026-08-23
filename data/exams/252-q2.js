/* 252-q2.js — Course registration and sign up. Mid Term 252, Summer 2025, Q2.

   No annotated hex codes, and gradients again. Values are sampled. */

(function () {

  var HTML_SKELETON = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>Course Registration</title>',
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
    '  <title>Course Registration</title>',
    '  <link rel="stylesheet" href="style.css">',
    '</head>',
    '<body>',
    '',
    '<header class="topbar">',
    '  <nav class="topbar__left">',
    '    <a href="#">Dashboard</a>',
    '    <a href="#">Courses</a>',
    '    <a href="#">Notices</a>',
    '    <a href="#">Results</a>',
    '  </nav>',
    '  <nav class="topbar__right">',
    '    <a href="#">Login</a>',
    '    <a href="#">Sign Up</a>',
    '  </nav>',
    '</header>',
    '',
    '<div class="page">',
    '',
    '  <aside class="side">',
    '    <h2 class="side__title">Semesters</h2>',
    '    <ul class="terms">',
    '      <li>Spring 2025</li>',
    '      <li>Fall 2024</li>',
    '      <li>Summer 2024</li>',
    '    </ul>',
    '',
    '    <section class="notice">',
    '      <h3>Important Notice</h3>',
    '      <p>Midterm exams will begin on April 10, 2025. Students must bring',
    '        their ID cards and check the schedule posted on the portal.</p>',
    '      <a class="btn-grad" href="#">View Details</a>',
    '    </section>',
    '  </aside>',
    '',
    '  <main class="main">',
    '',
    '    <section class="block">',
    '      <h2>Course Registration</h2>',
    '      <table class="courses">',
    '        <thead>',
    '          <tr><th scope="col">Course</th><th scope="col">Code</th><th scope="col">Credit</th></tr>',
    '        </thead>',
    '        <tbody>',
    '          <tr><td>Web Programming</td><td>CSE201</td><td>3.0</td></tr>',
    '          <tr><td>Data Structures</td><td>CSE202</td><td>3.0</td></tr>',
    '        </tbody>',
    '      </table>',
    '    </section>',
    '',
    '    <section class="block">',
    '      <h2>Sign Up Form</h2>',
    '      <form class="form">',
    '        <label>Full Name',
    '          <input type="text" placeholder="Enter full name">',
    '        </label>',
    '        <label>Student ID',
    '          <input type="text" placeholder="e.g., 011233001">',
    '        </label>',
    '        <label>UIU Email',
    '          <input type="email" placeholder="name@students.uiu.ac.bd">',
    '        </label>',
    '        <label>Password',
    '          <input type="password" placeholder="Enter password">',
    '        </label>',
    '        <button class="btn-grad" type="button">Register</button>',
    '      </form>',
    '    </section>',
    '',
    '  </main>',
    '</div>',
    '',
    '<footer class="foot">',
    '  <p>&copy; 2025 United International University | Web Programming Midterm Makeup</p>',
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
    'ul { list-style: none; }',
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
    '/* 3. NOT annotated. Sampled, and mostly gradients again. */',
    ':root {',
    '  --side:   linear-gradient(180deg, #7ce8d8, #9dc4de 55%, #b3c3e6);',
    '  --row:    linear-gradient(90deg, #e0995e, #cf7440);',
    '  --btn:    linear-gradient(90deg, #3027a4, #c9a83f);',
    '  --foot:   linear-gradient(90deg, #c9691c, #2c730d 45%, #b7beb7);',
    '',
    '  --bar:    #e0e0e0;',
    '  --navy:   #1c3866;',
    '  --page:   #f4f5f7;',
    '  --term:   #b9ece5;',
    '  --ink:    #2b3440;',
    '}',
    '',
    'body { background: var(--page); color: var(--ink); }'
  ].join('\n');

  B.bars = [
    '',
    '/* 4. The thin top bar, and the footer band. */',
    '.topbar {',
    '  display: flex;',
    '  background: var(--bar);',
    '  padding: 6px 14px;',
    '  font-size: 14px;',
    '  font-weight: 700;',
    '  color: var(--navy);',
    '}',
    '.topbar__left  { display: flex; gap: 22px; margin-right: auto; }',
    '.topbar__right { display: flex; gap: 22px; }',
    '',
    '.foot {',
    '  background: var(--foot);',
    '  color: #fff;',
    '  padding: 16px;',
    '  text-align: center;',
    '  font-size: 15px;',
    '}'
  ].join('\n');

  B.page = [
    '',
    '/* 5. Sidebar and main. */',
    '.page {',
    '  display: grid;',
    '  grid-template-columns: 350px 1fr;',
    '  gap: 12px;',
    '  padding: 12px;',
    '  align-items: start;',
    '}',
    '',
    '.side { background: var(--side); padding: 14px; min-height: 520px; }',
    '.main { display: grid; gap: 12px; }',
    '.block { background: #fff; padding: 14px 16px 18px; }',
    '.block h2 { font-size: 19px; color: var(--navy); margin-bottom: 12px; }'
  ].join('\n');

  B.side = [
    '',
    '/* 6. The sidebar contents. */',
    '.side__title { font-size: 24px; color: var(--ink); margin-bottom: 14px; }',
    '',
    '.terms { display: grid; gap: 10px; margin-bottom: 16px; }',
    '.terms li {',
    '  background: var(--term);',
    '  border: 1px solid #93d8cf;',
    '  padding: 10px 12px;',
    '  font-size: 15px;',
    '}',
    '',
    '.notice {',
    '  background: #fff;',
    '  border: 1px solid #cfd8e3;',
    '  padding: 14px;',
    '}',
    '.notice h3 { font-size: 18px; color: var(--navy); margin-bottom: 8px; }',
    '.notice p  { font-size: 14px; line-height: 1.55; margin-bottom: 14px; }'
  ].join('\n');

  B.table = [
    '',
    '/* 7. The only real <table> in the whole set. The gradient goes on the',
    '      CELLS, not the row — a background on <tr> is unreliable. */',
    '.courses { border-collapse: collapse; width: 100%; }',
    '.courses th, .courses td {',
    '  background: var(--row);',
    '  color: #fff;',
    '  border: 1px solid #b96a3a;',
    '  padding: 8px 12px;',
    '  text-align: left;',
    '  font-size: 15px;',
    '}',
    '.courses th { font-weight: 700; }'
  ].join('\n');

  B.form = [
    '',
    '/* 8. A stacked label-and-input form. */',
    '.form { display: grid; gap: 12px; }',
    '.form label {',
    '  display: grid;',
    '  gap: 6px;',
    '  font-size: 15px;',
    '  font-weight: 700;',
    '  color: var(--navy);',
    '}',
    '.form input {',
    '  width: 100%;',
    '  border: 1px solid #c8d0da;',
    '  border-radius: 3px;',
    '  padding: 9px 11px;',
    '  font-weight: 400;',
    '  color: var(--ink);',
    '}',
    '.form input::placeholder { color: #9aa3ae; }',
    '',
    '/* One gradient button, used twice. */',
    '.btn-grad {',
    '  justify-self: start;',
    '  display: inline-block;',
    '  background: var(--btn);',
    '  color: #fff;',
    '  border: 0;',
    '  border-radius: 3px;',
    '  padding: 9px 20px;',
    '  font-size: 14px;',
    '  font-weight: 700;',
    '  cursor: pointer;',
    '}'
  ].join('\n');

  B.details = [
    '',
    '/* 9. Details. */',
    '.topbar a { transition: opacity .15s; }',
    '.topbar a:hover { opacity: .7; }',
    '.btn-grad:hover { filter: brightness(1.08); }',
    '.form input:focus-visible {',
    '  outline: none;',
    '  border-color: var(--navy);',
    '  box-shadow: 0 0 0 3px rgb(28 56 102 / .15);',
    '}'
  ].join('\n');

  function css(parts) { return parts.map(function (k) { return B[k]; }).join('\n'); }

  WP.exam('252-q2', {
    id: '252-q2',
    paper: 'Mid Term 252 · Summer 2025 · Q2',
    title: 'Course registration and sign up',
    marks: 15,
    minutes: 40,
    image: 'assets/img/prototypes/252-q2.jpg',
    paletteSource: 'sampled',
    prev: { id: '252-q1', label: '252 Q1 · Learning Hub' },

    palette: [
      { name: 'side', hex: '#7ce8d8', role: 'Top of the sidebar gradient — teal into pale blue' },
      { name: 'row',  hex: '#cf7440', role: 'The table rows — a horizontal orange gradient' },
      { name: 'btn',  hex: '#3027a4', role: 'Both buttons — indigo into gold' },
      { name: 'foot', hex: '#2c730d', role: 'The footer band — orange, green, grey' },
      { name: 'bar',  hex: '#e0e0e0', role: 'The thin top navigation strip' },
      { name: 'navy', hex: '#1c3866', role: 'Every heading and the nav text' },
      { name: 'term', hex: '#b9ece5', role: 'The three semester rows' }
    ],

    structureIntro:
      'The last of the twelve, and the only one with a real <code>&lt;table&gt;</code>. It is ' +
      'also the plainest layout in the set — a thin bar, two columns, a footer — which is ' +
      'why it is worth doing last: if you have worked through the others, most of this is ' +
      'already familiar.',

    structure: [
      { region: 'A thin grey strip across the top',
        note: 'Four links left, two right. A flex row with <code>margin-right: auto</code> on ' +
              'the left group. Note it is a <em>strip</em>, not a header — very little padding.' },
      { region: 'Sidebar and main, both plain rectangles',
        note: 'No rounded corners anywhere on this page. That is unusual for the set and it is ' +
              'deliberate — do not add radii out of habit.' },
      { region: 'Sidebar: a title, three term rows, a notice card',
        note: 'The sidebar has the teal-to-blue gradient; the notice inside it is a white card ' +
              'with its own border.' },
      { region: 'Main: two stacked white blocks',
        note: 'A table in the first, a form in the second. Both are the same white surface with ' +
              'the same padding.' },
      { region: 'The table',
        note: 'Three columns, a header row and two data rows, all carrying the same horizontal ' +
              'orange gradient. Use a real <code>&lt;table&gt;</code> with ' +
              '<code>&lt;thead&gt;</code> and <code>scope="col"</code> — it is free marks and ' +
              'it is what the question is asking for.' },
      { region: 'The form',
        note: 'Four stacked label-above-input pairs and a gradient button. Each label wraps its ' +
              'own input, so no ids are needed.' },
      { region: 'A gradient footer band',
        note: 'Full width, centred text, three colour stops.' }
    ],

    method:
      'Reset, all the HTML, the sampled palette. Then the two bars top and bottom — five ' +
      'minutes for the two things that frame the page. Then the two-column grid, the sidebar, ' +
      'the table, the form. The table is the distinctive part of this paper, so give it proper ' +
      'markup rather than divs.',

    steps: [
      {
        title: 'The reset',
        minutes: 3,
        why: 'Six lines. <code>ul { list-style: none }</code> for the semester list and ' +
             '<code>font: inherit</code> for the four inputs and two buttons.',
        detail: [
          'By now this should be automatic. If it is not, that is the single highest-value ' +
          'thing to practise before the exam — it is three minutes you will spend on every ' +
          'question you ever sit.',
          '<code>color: inherit</code> on the form controls as well as <code>font</code>: ' +
          'placeholder and value colours otherwise come from the browser.'
        ],
        check: 'A blank white page.',
        html: HTML_SKELETON,
        css: css(['reset'])
      },
      {
        title: 'All of the HTML, with the boxes showing',
        minutes: 9,
        why: 'Four top-level blocks: the strip, the two-column page, and the footer. Inside ' +
             'the page, a sidebar and a main column with two sections.',
        detail: [
          'Write the table properly: <code>&lt;thead&gt;</code> with three ' +
          '<code>&lt;th scope="col"&gt;</code>, then <code>&lt;tbody&gt;</code> with two rows ' +
          'of <code>&lt;td&gt;</code>. This is the only table in the twelve papers and it is ' +
          'being tested on purpose.',
          'Each form field is a <code>&lt;label&gt;</code> containing its text ' +
          '<em>and</em> its input. That is valid, needs no <code>id</code>, and is faster to ' +
          'type than the <code>for</code>/<code>id</code> pairing.',
          'Both buttons share the class <code>.btn-grad</code> even though one is an ' +
          '<code>&lt;a&gt;</code> and one is a <code>&lt;button&gt;</code> — same look, one rule.',
          'The notice is a <code>&lt;section&gt;</code> inside the sidebar, not a sibling of it.'
        ],
        trap: 'Building the table out of divs and flexbox will look almost right and throw away ' +
              'the easiest marks on the paper. It is tabular data; use a table.',
        check: 'Outlines should show four stacked regions, and inside the second one, two ' +
               'columns. The table should already have visible cell boxes.',
        html: HTML_FULL,
        css: css(['reset', 'outline'])
      },
      {
        title: 'The palette',
        minutes: 4,
        why: 'Four gradients and three flat colours, all sampled. Same technique as the other ' +
             '252 question: whole gradients stored in variables.',
        detail: [
          'The two orange-ish gradients — the table rows and the footer — are different, and ' +
          'the footer has three stops rather than two.',
          'The button gradient runs indigo to gold, which is an unusual pairing and therefore ' +
          'worth getting roughly right: it is the most recognisable thing on the page after ' +
          'the table.',
          'Nothing here is annotated. Direction and rough hue is the whole target.'
        ],
        check: 'The page background should turn very pale grey. Nothing else yet.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette'])
      },
      {
        title: 'The top strip and the footer',
        minutes: 5,
        why: 'Five minutes for the two bands that frame the page and make it instantly ' +
             'recognisable.',
        detail: [
          'The top strip has very little vertical padding — about 6px. Getting this too tall ' +
          'is the most common way to make this page look wrong.',
          'Two nav groups in one flex row, with <code>margin-right: auto</code> on the left ' +
          'group pushing the right one over.',
          'The footer is a single centred line on the three-stop gradient.'
        ],
        check: 'A thin grey strip at the top and a coloured band at the bottom, both running ' +
               'the full width.',
        html: HTML_FULL,
        css: css(['reset', 'outline', 'palette', 'bars'])
      },
      {
        title: 'The two-column page',
        minutes: 4,
        why: 'A 350px sidebar and a fluid main column, with a small gap and small padding. ' +
             '<code>align-items: start</code> so the main column does not stretch to match the ' +
             'sidebar.',
        detail: [
          'The sidebar is noticeably wide on this design — around 350px rather than the 240px ' +
          'of the other dashboards. Measure against the target rather than assuming.',
          '<code>min-height</code> on the sidebar so its gradient has room to be visible even ' +
          'when the content is short.',
          'No border radius anywhere. Outlines come off now.'
        ],
        check: 'Two columns with the sidebar clearly wider than a typical nav rail, and the ' +
               'gradient running down it.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'page'])
      },
      {
        title: 'The sidebar contents',
        minutes: 5,
        why: 'A heading, three tinted rows, and a white notice card with a gradient button.',
        detail: [
          'The three semester rows are a grid with a gap, not a list with margins — the same ' +
          'spacing decision made once instead of three times.',
          'The notice is white <em>on</em> the gradient, with its own border. That contrast is ' +
          'what makes it read as a card rather than a section of the sidebar.',
          'The button reuses <code>.btn-grad</code>, which is defined later in step 8 — so it ' +
          'will look unstyled until then. That is expected.'
        ],
        check: 'Three teal rows and a white notice box, all inside the gradient column.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'page', 'side'])
      },
      {
        title: 'The table',
        minutes: 5,
        why: 'The distinctive part of this paper, and nine lines of CSS.',
        detail: [
          '<code>border-collapse: collapse</code> first, always — without it every cell border ' +
          'is doubled and the table looks like a spreadsheet from 1998.',
          'The gradient goes on <code>th, td</code>, <strong>not</strong> on ' +
          '<code>tr</code>. A background on a table row is unreliable across browsers, and ' +
          'putting it on the cells means each cell gets its own copy of the gradient — which ' +
          'is what the prototype actually shows.',
          '<code>text-align: left</code> on the cells, because <code>&lt;th&gt;</code> centres ' +
          'by default and the design does not.',
          '<code>width: 100%</code> so the table fills its block rather than shrinking to its ' +
          'content.'
        ],
        trap: 'If you put the gradient on <code>tr</code> and it does not appear, this is why. ' +
              'Move it to the cells.',
        check: 'Three columns, a header row, two data rows, all orange, with single borders ' +
               'between the cells.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'page', 'side', 'table'])
      },
      {
        title: 'The form and the shared button',
        minutes: 5,
        why: 'Four identical fields and one button rule that also styles the sidebar’s View ' +
             'Details link.',
        detail: [
          'The form is a grid with a gap, so field spacing is declared once rather than as a ' +
          'margin on each label.',
          'Each label is itself a grid with a small gap, which stacks its text above its input ' +
          'without either needing <code>display: block</code>.',
          'The label is bold and the input is not — so the input rule resets ' +
          '<code>font-weight: 400</code>, because it would otherwise inherit the bold.',
          '<code>justify-self: start</code> on the button stops it stretching to the full grid ' +
          'width, which is what a grid child does by default.'
        ],
        check: 'Four labelled fields and a gradient Register button that is only as wide as ' +
               'its text. The View Details button in the sidebar should now match it.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'page', 'side', 'table', 'form'])
      },
      {
        title: 'Details, and compare',
        minutes: 3,
        why: 'Hovers and a focus ring, then the final comparison.',
        detail: [
          'Press <strong>Compare</strong>. Check the top strip is thin, the sidebar is wide, ' +
          'and the table cells are all coloured.',
          'Then check the two buttons match each other — they should, because they share a ' +
          'rule.',
          'Nothing on this page is annotated, so once the structure matches you are done. Go ' +
          'back to the other question.'
        ],
        check: 'The layout should match. If it does, you have finished the last of the twelve.',
        html: HTML_FULL,
        css: css(['reset', 'outlineOff', 'palette', 'bars', 'page', 'side', 'table', 'form', 'details'])
      }
    ],

    marksNote:
      'A real <code>&lt;table&gt;</code> with <code>&lt;thead&gt;</code> and ' +
      '<code>scope</code>, the two-column layout with a wide gradient sidebar, four labelled ' +
      'form fields, and the two framing bands. The table is the thing this paper is testing — ' +
      'everything else is a layout you have already done three times.',

    skipNote:
      'The hovers, the focus ring, the notice card’s border. As with the other 252 question, ' +
      'if the gradients are costing you time, use flat colours sampled from the middle of ' +
      'each. Nothing here is annotated, so nobody can mark the difference.'
  });

}());
