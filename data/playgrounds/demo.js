/* demo.js — the playground component's own examples and test page content.

   Seeds stay between 10 and 25 lines and teach exactly one idea. If a seed
   needs a scrollbar to read, it is teaching two things and should be split.
   See CLAUDE.md. */

WP.playground.define('hello', {
  title: 'A button',
  height: 200,
  tryThis: 'Change <code>background</code> to <code>crimson</code>, then delete the ' +
           '<code>border-radius</code> line entirely and watch the corners snap back.',
  html: `
<button class="btn">Explore UIU</button>
`,
  css: `
.btn {
  background: #21b573;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 15px;
  cursor: pointer;
}
.btn:hover {
  background: #1a9760;
}
`
});

WP.playground.define('box-model', {
  title: 'content-box against border-box',
  height: 260,
  tryThis: 'Both boxes ask for <code>width: 200px</code>. Change the first one to ' +
           '<code>border-box</code> and they line up. This is why every project sets ' +
           'it globally on the first line.',
  html: `
<div class="box content">content-box</div>
<div class="box border">border-box</div>
<p class="ruler">200px</p>
`,
  css: `
.box {
  width: 200px;
  padding: 20px;
  border: 4px solid #0f766e;
  background: #e3f2f0;
  margin-bottom: 12px;
}
.content { box-sizing: content-box; }  /* really 248px wide */
.border  { box-sizing: border-box; }   /* really 200px wide */

.ruler {
  width: 200px;
  border-top: 2px dashed #b4541b;
  color: #b4541b;
  font-size: 12px;
  margin: 0;
}
`
});

WP.playground.define('flex-axes', {
  title: 'The two flexbox axes',
  height: 280,
  tryThis: 'Change <code>flex-direction</code> to <code>column</code>. Nothing else. ' +
           'Notice that <code>justify-content</code> now spaces the items vertically and ' +
           '<code>align-items</code> centres them horizontally — the two swapped meaning.',
  html: `
<div class="row">
  <div class="item">1</div>
  <div class="item tall">2</div>
  <div class="item">3</div>
</div>
`,
  css: `
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  height: 200px;
  padding: 12px;
  background: #eceff3;
}
.item {
  background: #0f766e;
  color: #fff;
  padding: 16px 22px;
  border-radius: 6px;
}
.tall { padding-block: 34px; }
`
});

WP.playground.define('stat-card', {
  title: 'A stat card, the exam way',
  height: 300,
  tryThis: 'The three cards share one rule block and differ only by <code>--c</code>. ' +
           'Add a fourth card with <code>--c: #781fa0</code> and no new CSS at all. ' +
           'This is how you write four coloured cards in four lines instead of forty.',
  html: `
<div class="cards">
  <article class="stat" style="--c: #1975d1">
    <p class="stat__label">Total Users</p>
    <p class="stat__value">12,450</p>
    <p class="stat__pill">UP +12% MONTHLY</p>
  </article>
  <article class="stat" style="--c: #378b3b">
    <p class="stat__label">Revenue</p>
    <p class="stat__value">$84,200</p>
    <p class="stat__pill">UP +5.2% WEEKLY</p>
  </article>
  <article class="stat" style="--c: #f78100">
    <p class="stat__label">Active Tasks</p>
    <p class="stat__value">18</p>
    <p class="stat__pill">4 TASKS PENDING</p>
  </article>
</div>
`,
  css: `
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 14px;
}
.stat {
  background: var(--c);
  color: #fff;
  border-radius: 8px;
  padding: 14px;
}
.stat__label { margin: 0; font-size: 12px; font-weight: 700; }
.stat__value { margin: 6px 0 12px; font-size: 30px; font-weight: 800; }
.stat__pill {
  margin: 0;
  background: rgb(255 255 255 / .25);
  border-radius: 4px;
  padding: 6px;
  font-size: 11px;
  font-weight: 700;
  text-align: center;
}
`
});

/* HTML-only: no CSS pane at all. Proves the single-pane path works, and
   entities are one of the few things genuinely better seen than described. */
WP.playground.define('entities', {
  title: 'Character entities',
  height: 200,
  tryThis: 'Delete the <code>&amp;lt;</code> on the first line and write a literal ' +
           '<code>&lt;</code> instead. The browser will try to read it as a tag and the ' +
           'rest of the line disappears.',
  html: `
<p>Showing code: &lt;p&gt;hello&lt;/p&gt;</p>
<p>Ampersand in a URL: ?a=1&amp;b=2</p>
<p>Non-breaking space: 10&nbsp;kg never splits across lines</p>
<p>Legal line: &copy; 2026 &middot; UIU &trade;</p>
<p>Close button: &times; &nbsp; Arrow: &#8594; &nbsp; Ellipsis: &hellip;</p>
`
});
