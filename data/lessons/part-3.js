/* part-3.js — CSS Layout Mastery.
   Sections 1 to 12: normal flow, positioning, and complete flexbox, with the
   flexbox visual playground. Grid, responsive design and centring follow in 5b. */

WP.lesson('part-3', {
  eyebrow: 'Part 3 of 5',
  title: 'CSS Layout Mastery',
  blurb: 'Flow, positioning and flexbox. This is the part that decides whether you can ' +
         'reproduce a prototype at all.',
  prev: { label: 'Part 2 · CSS fundamentals', href: 'lessons/part-2.html' },
  next: { label: 'Part 4 · Advanced CSS', href: 'lessons/part-4.html' },

  sections: [

    /* ---------------------------------------------------------------- 1 */
    {
      id: 'normal-flow',
      title: 'Normal flow and display values',
      body: [
        'Before any layout system is applied, the browser lays elements out in normal flow: ' +
        'block boxes stack vertically and fill their container’s width, inline boxes sit side ' +
        'by side within a line and wrap at the edge. Every layout system you will learn is a ' +
        'modification of that default.',

        { table: {
          head: ['display', 'Behaviour'],
          rows: [
            ['<code>block</code>',
             'Starts on a new line, takes the full available width. Respects width, height, ' +
             'all margins and padding.'],
            ['<code>inline</code>',
             '<strong>Ignores width and height</strong>, and vertical margins have no layout ' +
             'effect. Horizontal padding and margin do apply.'],
            ['<code>inline-block</code>', 'Sits inline like a word but respects width, height and vertical spacing.'],
            ['<code>flex</code> / <code>inline-flex</code>', 'Children become flex items.'],
            ['<code>grid</code> / <code>inline-grid</code>', 'Children become grid items.'],
            ['<code>none</code>', 'Removed from layout completely.'],
            ['<code>contents</code>',
             'The box disappears but the children remain, becoming direct items of the ' +
             'grandparent. Careful: it removes the element from the accessibility tree in ' +
             'some browsers.'],
            ['<code>flow-root</code>',
             'A block box that contains its floats and blocks margin collapsing, without the ' +
             'side effects of <code>overflow: hidden</code>.']
          ]
        }}
      ],
      playground: {
        title: 'Display values',
        height: 340,
        tryThis: 'Set a <code>width</code> and a vertical <code>margin</code> on the inline ' +
                 'span. Neither does anything. Change it to <code>inline-block</code> and ' +
                 'both suddenly apply — that is the entire distinction.',
        html: `
<div class="b">block: fills the line</div>
<span class="i">inline</span>
<span class="i">inline</span>
<span class="ib">inline-block</span>
<span class="ib">inline-block</span>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }

.b  { display: block; background: #e3f2f0; padding: 8px; }

.i  { display: inline; background: #fdebc0; padding: 8px;
      /* try adding: width: 120px; margin: 20px 0; */ }

.ib { display: inline-block; background: #e2ebfa; padding: 8px;
      width: 120px; }
`
      }
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: 'inline-block-gap',
      title: 'The inline-block whitespace gap',
      body: [
        'Two <code>inline-block</code> elements separated by a newline in your HTML get a ' +
        'real space between them, because whitespace in the source <em>is</em> content. You ' +
        'did not ask for that 4px gap and you cannot remove it with margin without ' +
        'guessing.',

        'This single behaviour is a good enough reason to use flexbox for horizontal layout ' +
        'and never think about it again.'
      ],
      playground: {
        title: 'The gap you did not ask for',
        height: 320,
        tryThis: 'The first row has gaps; the second does not, and the only difference is ' +
                 'that its tags touch with no newline between them. The third row is the ' +
                 'answer you should actually use.',
        html: `
<p>inline-block, tags on separate lines:</p>
<div class="row">
  <span class="c">A</span>
  <span class="c">B</span>
  <span class="c">C</span>
</div>

<p>inline-block, no whitespace between tags:</p>
<div class="row"><span class="c">A</span><span class="c">B</span><span class="c">C</span></div>

<p>flexbox, whitespace irrelevant:</p>
<div class="row flex">
  <span class="c">A</span>
  <span class="c">B</span>
  <span class="c">C</span>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
p { margin: 12px 0 4px; color: #5b6672; }

.c { display: inline-block; background: #0f766e; color: #fff;
     padding: 10px 16px; }

.flex { display: flex; }
`
      },
      trap: 'A stray few pixels between boxes that nothing in your CSS explains is almost ' +
            'always this. Look at the source, not the stylesheet.'
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: 'floats',
      title: 'Floats, briefly',
      body: [
        '<code>float: left</code> pulls an element out of normal flow so text wraps around ' +
        'it. It was the standard layout method for a decade, which is why clearfix exists and ' +
        'why half the tutorials online still teach it.',

        'Today it has exactly one legitimate use: <strong>wrapping text around an image</strong>. ' +
        'For anything else, use flexbox or grid. If a search result tells you to float a ' +
        'column, the result predates 2017 and you should close it.'
      ],
      playground: {
        title: 'The one remaining use',
        height: 300,
        tryThis: 'Remove the float and the block drops onto its own line, with the text ' +
                 'below rather than around it. Then add <code>display: flow-root</code> to ' +
                 '<code>.article</code> and watch the container grow to contain the float ' +
                 'again — that is what clearfix used to do in six lines.',
        html: `
<div class="article">
  <div class="thumb">image</div>
  <p>Amazing flats for teachers and students built with care. To buy
  these flats, please contact the UIU Housing Office. Text flows around
  the floated block, which is the one thing float is still for.</p>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.article { border: 1px solid #dfe3e8; padding: 10px; }

.thumb {
  float: left;
  width: 90px; aspect-ratio: 1;
  margin: 0 12px 8px 0;
  background: linear-gradient(135deg, #0f766e, #2dd4bf);
  color: #fff;
  display: grid; place-items: center;
}
`
      }
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: 'positioning',
      title: 'Positioning',
      body: [
        { table: {
          head: ['position', 'Positioned relative to', 'In flow?'],
          rows: [
            ['<code>static</code>', 'Nothing. The default. Offsets and <code>z-index</code> are ignored.', 'Yes'],
            ['<code>relative</code>', 'Its own original position. Offsets shift it visually without moving anything else.', 'Yes — its original space is kept'],
            ['<code>absolute</code>', 'The nearest ancestor whose position is not static.', 'No, removed'],
            ['<code>fixed</code>', 'The viewport. Stays put while the page scrolls.', 'No, removed'],
            ['<code>sticky</code>', 'Relative until it hits the given offset while scrolling, then fixed within its parent.', 'Yes']
          ]
        }},

        'Positioning is for overlays and badges, not for building layouts. If you find ' +
        'yourself positioning three columns absolutely, you want grid.'
      ],
      playground: {
        title: 'The five values',
        height: 340,
        tryThis: 'Scroll inside the preview. The fixed box stays glued to the frame, the ' +
                 'relative box has left a gap where it used to be, and the absolute box has ' +
                 'left no gap at all. That last difference is the one that matters.',
        html: `
<div class="scroller">
  <div class="b static">static</div>
  <div class="b relative">relative, top 20 left 30</div>
  <div class="b absolute">absolute, top 10 right 10</div>
  <div class="b fixed">fixed</div>
  <p>Scroll me.</p>
  <div style="height:300px"></div>
  <p>Bottom.</p>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 12px; margin: 0; }

.scroller {
  position: relative;      /* the containing block for .absolute */
  height: 260px;
  overflow: auto;
  border: 1px solid #dfe3e8;
  padding: 10px;
}
.b { background: #0f766e; color: #fff; padding: 8px; margin-bottom: 8px;
     width: 200px; }

.relative { position: relative; top: 20px; left: 30px; background: #205bcb; }
.absolute { position: absolute; top: 10px; right: 10px;
            width: auto; background: #b4541b; }
.fixed    { position: fixed; bottom: 10px; left: 10px;
            width: auto; background: #781fa0; }
`
      }
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: 'containing-block',
      title: 'The containing block rule',
      body: [
        'This is the single most important idea in positioning: an absolutely positioned ' +
        'element measures its offsets from <strong>the nearest positioned ancestor</strong>. ' +
        'So the standard pattern is a <code>position: relative</code> parent with a ' +
        '<code>position: absolute</code> child.',

        'Forget the <code>relative</code> on the parent and your badge flies to the corner of ' +
        'the <em>page</em> instead of the corner of the card. That is not a bug in your ' +
        'offsets; it is a missing line on the parent.',

        { code:
`.card { position: relative; }
.card .badge { position: absolute; top: 8px; right: 8px; }

/* inset is shorthand for all four offsets */
.overlay { position: absolute; inset: 0; }

/* Perfect centring without knowing the size */
.centre {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}` },

        { callout: { kind: 'trap', title: 'What else creates a containing block',
          text: '<code>transform</code>, <code>filter</code>, <code>perspective</code>, ' +
                '<code>will-change</code> and <code>contain</code> on an ancestor also ' +
                'create one — and will trap a <code>position: fixed</code> child so that it ' +
                'scrolls with the page. This is the classic "my fixed header stopped being ' +
                'fixed" bug, and the cause is never anywhere near the header.' }}
      ],
      playground: {
        title: 'Badges and overlays',
        height: 340,
        tryThis: 'Delete <code>position: relative</code> from the first card. Its badge jumps ' +
                 'to the corner of the whole page. Put it back, then try <code>inset: 0</code> ' +
                 'on the badge to see it stretch to fill instead.',
        html: `
<div class="card">
  <span class="badge">3</span>
  Card with a positioned parent
</div>

<div class="card no-rel">
  <span class="badge">3</span>
  Card without one
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; padding: 20px; }

.card {
  position: relative;
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  padding: 24px 16px;
  margin-bottom: 16px;
}
.no-rel { position: static; }

.badge {
  position: absolute;
  top: 8px; right: 8px;
  background: #b4541b; color: #fff;
  min-width: 22px; height: 22px;
  border-radius: 50%;
  display: grid; place-items: center;
  font-size: 12px; font-weight: 700;
}
`
      }
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: 'sticky',
      title: 'position: sticky',
      body: [
        { code:
`.toc      { position: sticky; top: 1rem; }
thead th  { position: sticky; top: 0; background: #fff; }` },

        { list: [
          'It needs <strong>at least one offset</strong> — <code>top</code>, ' +
          '<code>bottom</code>, <code>left</code> or <code>right</code> — or it does nothing ' +
          'at all, silently.',
          'It sticks only <em>within its parent</em>. Once the parent scrolls away, the ' +
          'sticky element leaves with it.',
          'An ancestor with <code>overflow: hidden</code> or <code>overflow: auto</code> ' +
          'breaks stickiness. This is the usual reason it "does not work".',
          'A sticky table header needs a background, or the rows scroll visibly underneath it.'
        ]},

        'The sidebar on this site is sticky, and so is its header. Both needed exactly one ' +
        'offset and nothing else.'
      ],
      playground: {
        title: 'Sticky headings',
        height: 340,
        tryThis: 'Scroll the preview and watch each heading pin, then get pushed off by the ' +
                 'next. Now delete <code>top: 0</code> and scroll again: nothing sticks, and ' +
                 'nothing warns you.',
        html: `
<div class="scroller">
  <section><h3>Filters</h3><p>Full-time</p><p>Part-time</p><p>Internship</p><p>Remote</p></section>
  <section><h3>Department</h3><p>Software</p><p>Data Science</p><p>UI/UX</p><p>Networking</p></section>
  <section><h3>Experience</h3><p>Entry</p><p>Mid</p><p>Senior</p><p>Lead</p></section>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; margin: 0; }

.scroller { height: 280px; overflow: auto; border: 1px solid #dfe3e8; }

h3 {
  position: sticky;
  top: 0;
  margin: 0;
  padding: 8px 12px;
  background: #205bcb;     /* a background is not optional here */
  color: #fff;
}
p { margin: 0; padding: 10px 12px; border-bottom: 1px solid #eceff3; }
`
      }
    },

    /* ---------------------------------------------------------------- 7 */
    {
      id: 'z-index',
      title: 'z-index and stacking contexts',
      body: [
        { list: [
          '<code>z-index</code> only applies to <strong>positioned</strong> elements, and to ' +
          'flex and grid items.',
          'Higher paints in front. Equal values fall back to source order: later wins.',
          'A <strong>stacking context</strong> is a self-contained layer. Children can never ' +
          'escape their parent’s position in the stack, however high their ' +
          '<code>z-index</code>. A <code>z-index: 9999</code> child inside a ' +
          '<code>z-index: 1</code> parent still sits below a <code>z-index: 2</code> sibling ' +
          'of that parent.',
          'New stacking contexts are created by: position plus a <code>z-index</code> other ' +
          'than auto, <code>opacity</code> below 1, <code>transform</code>, ' +
          '<code>filter</code>, <code>will-change</code>, <code>isolation: isolate</code>, ' +
          '<code>mix-blend-mode</code>.',
          '<code>isolation: isolate</code> is the clean way to create one deliberately.'
        ]},

        'The fix for "my z-index does nothing" is almost never a bigger number. It is either ' +
        'a missing <code>position</code>, or a parent that has trapped the element in its own ' +
        'layer.'
      ],
      playground: {
        title: 'Trapped in a stacking context',
        height: 340,
        tryThis: 'The red box asks for <code>z-index: 9999</code> and still loses, because ' +
                 'its parent has <code>opacity: .99</code> — enough to create a stacking ' +
                 'context and nothing else. Change that to <code>1</code> and the box leaps ' +
                 'to the front.',
        html: `
<div class="parent">
  parent, z-index 1, opacity .99
  <div class="child">child, z-index 9999</div>
</div>
<div class="sibling">sibling, z-index 2</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 12px; padding: 20px; }

.parent {
  position: relative;
  z-index: 1;
  opacity: .99;              /* creates a stacking context. Try 1. */
  background: #e2ebfa;
  padding: 16px;
  width: 220px;
}
.child {
  position: absolute;
  z-index: 9999;
  top: 40px; left: 40px;
  background: #c0392b; color: #fff; padding: 12px;
}
.sibling {
  position: relative;
  z-index: 2;
  background: #0f766e; color: #fff;
  padding: 12px;
  margin-top: -30px; margin-left: 90px;
  width: 220px;
}
`
      }
    },

    /* ---------------------------------------------------------------- 8 */
    {
      id: 'flex-axes',
      title: 'Flexbox: the two axes',
      body: [
        'Flexbox lays out items along one axis and distributes space between them. Reach for ' +
        'it whenever you have a row or a column of things: a navbar, a button group, a card ' +
        'footer, a form row, a centred hero.',

        'The <strong>main axis</strong> is set by <code>flex-direction</code>. The ' +
        '<strong>cross axis</strong> is perpendicular to it. <code>justify-content</code> ' +
        'always works along the main axis; <code>align-items</code> always along the cross ' +
        'axis. Switch to <code>column</code> and the two swap meaning — and that is the ' +
        'source of most flexbox confusion.',

        'Reading that sentence does very little. The playground below makes it physical.'
      ],
      playground: {
        title: 'Watch the axes swap',
        height: 320,
        tryThis: 'Change <code>flex-direction</code> from <code>row</code> to ' +
                 '<code>column</code> and change nothing else. <code>justify-content</code> ' +
                 'now spaces the items vertically and <code>align-items</code> centres them ' +
                 'horizontally. The words did not change; the axes did.',
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

  height: 220px;
  padding: 12px;
  background: #eceff3;
}
.item {
  background: #0f766e; color: #fff;
  padding: 16px 22px; border-radius: 6px;
  font-family: system-ui, sans-serif;
}
.tall { padding-block: 34px; }
`
      }
    },

    /* ---------------------------------------------------------------- 9 */
    {
      id: 'flex-container',
      title: 'Container properties',
      body: [
        { table: {
          head: ['Property', 'Values and effect'],
          rows: [
            ['<code>flex-direction</code>',
             '<code>row</code> (default), <code>row-reverse</code>, <code>column</code>, ' +
             '<code>column-reverse</code>. The reverse values change visual order only, not ' +
             'tab order, which strands keyboard users if overused.'],
            ['<code>flex-wrap</code>',
             '<code>nowrap</code> (default: items shrink rather than wrap), ' +
             '<code>wrap</code>, <code>wrap-reverse</code>.'],
            ['<code>flex-flow</code>', 'Shorthand: <code>flex-flow: row wrap</code>.'],
            ['<code>justify-content</code>',
             '<code>flex-start</code>, <code>flex-end</code>, <code>center</code>, ' +
             '<code>space-between</code>, <code>space-around</code>, ' +
             '<code>space-evenly</code>. Main axis.'],
            ['<code>align-items</code>',
             '<code>stretch</code> (default), <code>flex-start</code>, ' +
             '<code>flex-end</code>, <code>center</code>, <code>baseline</code>. Cross axis.'],
            ['<code>align-content</code>',
             'Distributes <strong>multiple lines</strong> along the cross axis. Only has any ' +
             'effect once items wrap.'],
            ['<code>gap</code>', 'Space between items, with no margin hacks and no trailing space. Use this always.']
          ]
        }},

        'Every value, on real boxes. Change one thing at a time and read the CSS underneath ' +
        'as it updates.',

        { tool: 'flexbox' },

        { callout: { kind: 'tip', title: 'The one to internalise',
          text: '<code>justify-content: space-between</code> on a flex row is the single most ' +
                'used declaration in these past papers. It is the header with a logo on the ' +
                'left and links on the right, the card footer with a label and a value, the ' +
                'stat row with a title and a number. Learn it first.' }}
      ]
    },

    /* --------------------------------------------------------------- 10 */
    {
      id: 'flex-items',
      title: 'Item properties',
      body: [
        { table: {
          head: ['Property', 'Effect'],
          rows: [
            ['<code>flex-grow: 1</code>', 'Share of the <em>leftover</em> space this item takes. 0 means do not grow.'],
            ['<code>flex-shrink: 1</code>', 'How readily it shrinks when space is tight. 0 means never shrink.'],
            ['<code>flex-basis: 200px</code>', 'The starting size along the main axis before growing or shrinking.'],
            ['<code>flex: 1</code>',
             'Shorthand for <code>1 1 0%</code>. The item takes an <strong>equal share of all ' +
             'space</strong>. This is what you usually want.'],
            ['<code>flex: auto</code>',
             '<code>1 1 auto</code>. Grows, but starts from its content size, so items end ' +
             'up unequal.'],
            ['<code>flex: none</code>', '<code>0 0 auto</code>. Fixed at its content size.'],
            ['<code>align-self</code>', 'Overrides <code>align-items</code> for one item.'],
            ['<code>order: -1</code>', 'Moves an item visually without changing the DOM. Same keyboard warning as reverse.'],
            ['<code>margin-left: auto</code>',
             'Pushes this item and everything after it to the far end. The cleanest way to ' +
             'right-align one nav item.']
          ]
        }},

        'The difference between <code>flex: 1</code> and <code>flex: auto</code> catches ' +
        'everyone once: with <code>1</code> the basis is zero, so items end up equal ' +
        'regardless of content; with <code>auto</code> the basis is the content, so longer ' +
        'items stay longer.'
      ],
      playground: {
        title: 'flex: 1 against flex: auto',
        height: 340,
        tryThis: 'Both rows contain the same three items. Swap the second row to ' +
                 '<code>flex: 1</code> and the widths equalise instantly. Then find the ' +
                 '<code>margin-left: auto</code> in the third row and delete it.',
        html: `
<p>flex: 1 &mdash; equal, whatever the content</p>
<div class="row a">
  <div class="i">Short</div>
  <div class="i">A much longer label here</div>
  <div class="i">Mid</div>
</div>

<p>flex: auto &mdash; sized from content, then grown</p>
<div class="row b">
  <div class="i">Short</div>
  <div class="i">A much longer label here</div>
  <div class="i">Mid</div>
</div>

<p>margin-left: auto on one item</p>
<div class="row c">
  <div class="i">Logo</div>
  <div class="i push">Home</div>
  <div class="i">Contact</div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 12px; }
p { margin: 12px 0 4px; color: #5b6672; }
.row { display: flex; gap: 6px; background: #eceff3; padding: 6px; }
.i { background: #0f766e; color: #fff; padding: 10px; text-align: center; }

.a .i { flex: 1; }
.b .i { flex: auto; }
.c .push { margin-left: auto; }
`
      }
    },

    /* --------------------------------------------------------------- 11 */
    {
      id: 'flex-patterns',
      title: 'Patterns you will use constantly',
      body: [
        'Five layouts that between them cover most of what the past papers ask for. Every one ' +
        'is three lines or fewer.',

        { code:
`/* Navbar: logo left, links right */
.nav { display: flex; align-items: center; gap: 1.5rem; }
.nav .logo { margin-right: auto; }

/* Dead centre, both axes */
.hero { display: flex; justify-content: center;
        align-items: center; min-height: 100dvh; }

/* Media object: fixed image, fluid text */
.media { display: flex; gap: 1rem; }
.media img { flex: none; width: 80px; }
.media .body { flex: 1; }

/* Sticky footer on short pages */
body { display: flex; flex-direction: column; min-height: 100dvh; }
main { flex: 1; }

/* Equal-height cards that wrap */
.cards { display: flex; flex-wrap: wrap; gap: 1rem; }
.card  { flex: 1 1 260px; }   /* grow, shrink, 260px before wrapping */` },

        'The last one is worth dwelling on. <code>flex: 1 1 260px</code> gives you a card row ' +
        'that fits as many as it can, wraps when it must, and stretches the survivors to fill ' +
        'the line — with no media queries at all. Seven of the twelve prototypes have a card ' +
        'row like this.'
      ],
      playground: {
        title: 'The navbar and the card row',
        height: 360,
        tryThis: 'Drag the preview divider narrower and watch the cards wrap by themselves. ' +
                 'Then change <code>260px</code> to <code>160px</code> and see how many more ' +
                 'fit per line before wrapping.',
        html: `
<nav class="nav">
  <strong class="logo">UIU <span>CareerHub</span></strong>
  <a href="#">Jobs</a>
  <a href="#">Companies</a>
  <button class="btn">+ Post a Job</button>
</nav>

<div class="cards">
  <article class="card"><h4>Master Chefs</h4><p>Diam elitr kasd sed at elitr sed ipsum justo.</p></article>
  <article class="card"><h4>Quality Food</h4><p>Diam elitr kasd sed at elitr sed ipsum justo.</p></article>
  <article class="card"><h4>Online Order</h4><p>Diam elitr kasd sed at elitr sed ipsum justo.</p></article>
  <article class="card"><h4>24/7 Service</h4><p>Diam elitr kasd sed at elitr sed ipsum justo.</p></article>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; margin: 0; }

.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #dfe3e8;
}
.logo { margin-right: auto; }
.logo span { color: #205bcb; }
.nav a { color: #17202a; text-decoration: none; }
.btn { background: #205bcb; color: #fff; border: 0;
       border-radius: 6px; padding: 8px 14px; font: inherit; }

.cards { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px; }
.card {
  flex: 1 1 260px;
  background: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  padding: 14px;
}
.card h4 { margin: 0 0 6px; }
.card p { margin: 0; color: #5b6672; }
`
      }
    },

    /* --------------------------------------------------------------- 12 */
    {
      id: 'flex-gotchas',
      title: 'Flexbox gotchas',
      body: [
        { list: [
          '<strong>Items refuse to shrink below their content.</strong> Flex items have ' +
          '<code>min-width: auto</code> by default. Fix it with <code>min-width: 0</code> on ' +
          'the item. This is the number one cause of a flex row overflowing its container, ' +
          'and it is completely invisible until it happens.',
          '<strong>Images stretch oddly</strong> because <code>align-items: stretch</code> is ' +
          'the default. Set <code>align-self: flex-start</code> or give the image a width.',
          '<code>flex: 1</code> on items of different content lengths still makes them equal, ' +
          'because the basis is 0. <code>flex: auto</code> does not.',
          '<code>justify-content: space-between</code> with a <em>single</em> item pushes it ' +
          'to the start, not the centre.',
          'Nested flex containers are normal and fine. Most real layouts are flex inside flex ' +
          'inside grid.'
        ]}
      ],
      playground: {
        title: 'min-width: auto, the invisible one',
        height: 320,
        tryThis: 'The first row overflows its container because the long unbroken string ' +
                 'refuses to shrink. Add <code>min-width: 0</code> to <code>.a .text</code> ' +
                 'and it behaves. The second row already has it.',
        html: `
<div class="row a">
  <div class="tag">Tag</div>
  <div class="text">supercalifragilisticexpialidocious-file-name-2026.pdf</div>
</div>

<div class="row b">
  <div class="tag">Tag</div>
  <div class="text">supercalifragilisticexpialidocious-file-name-2026.pdf</div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.row {
  display: flex; gap: 8px;
  width: 300px;
  border: 2px solid #b4541b;
  padding: 6px; margin-bottom: 16px;
}
.tag { flex: none; background: #0f766e; color: #fff; padding: 6px 10px; }
.text {
  flex: 1;
  background: #eceff3;
  padding: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.b .text { min-width: 0; }
`
      },
      trap: 'If a flex row overflows and you cannot see why, add <code>min-width: 0</code> to ' +
            'the flexible item before you try anything else. It is right far more often than ' +
            'it has any business being.'
    },

    /* --------------------------------------------------------------- 13 */
    {
      id: 'grid-tracks',
      title: 'Grid: defining the tracks',
      body: [
        'Grid lays out in two dimensions at once. Use it for page-level structure, card ' +
        'galleries, dashboards and anything where you care about rows and columns aligning ' +
        'together. Flexbox distributes content within a line; <strong>grid defines the lines ' +
        'first and then places content into them</strong>.',

        { table: {
          head: ['Track value', 'Meaning'],
          rows: [
            ['<code>200px</code> / <code>20%</code>', 'A fixed or relative size.'],
            ['<code>1fr</code>', 'One share of the <em>remaining</em> free space, after the fixed tracks are laid out.'],
            ['<code>auto</code>', 'As big as the content needs.'],
            ['<code>min-content</code> / <code>max-content</code>',
             'The smallest possible width without overflow / the width the content wants with no wrapping.'],
            ['<code>minmax(200px, 1fr)</code>', 'Never smaller than 200px, otherwise share the space.'],
            ['<code>repeat(3, 1fr)</code>', 'Three equal columns.'],
            ['<code>repeat(auto-fill, 200px)</code>', 'As many 200px columns as fit; empty tracks are kept.'],
            ['<code>repeat(auto-fit, minmax(200px, 1fr))</code>',
             'As many as fit, and the ones that exist stretch to fill. The famous responsive ' +
             'grid with no media queries.']
          ]
        }},

        'That last one has a name worth remembering — <strong>RAM: Repeat, Auto, Minmax</strong> ' +
        '— and it is a responsive card gallery in three lines.',

        { tool: 'grid' },

        { callout: { kind: 'trap', title: 'auto-fit collapsing',
          text: 'If the container is narrower than your <code>minmax</code> minimum, ' +
                '<code>auto-fit</code> gives you one huge column that overflows. Write ' +
                '<code>minmax(min(260px, 100%), 1fr)</code> instead and it degrades ' +
                'gracefully on a phone.' }}
      ]
    },

    /* --------------------------------------------------------------- 14 */
    {
      id: 'grid-areas',
      title: 'Placing items, and named areas',
      body: [
        { code:
`/* By line number. Lines count from 1; -1 is the last line. */
.item { grid-column: 1 / 3; grid-row: 2 / 4; }
.item { grid-column: 1 / -1; }        /* full width, any column count */
.item { grid-column: span 2; }        /* span from wherever it lands */` },

        '<code>grid-column: 1 / -1</code> is the one to memorise. It makes an item span the ' +
        'full width whatever the column count, so a section heading inside a card grid needs ' +
        'no arithmetic and keeps working when the grid changes.',

        { h: 'Named areas: the readable option' },

        'Write the layout as words and the CSS becomes a picture of the page. Type into the ' +
        'box below — one row per line, one word per cell, repeat a word to make an area span.',

        { tool: 'gridAreas' },

        'Rearranging a whole page for mobile then becomes a single redefinition of ' +
        '<code>grid-template-areas</code> inside a media query. No item needs touching, ' +
        'because each one only says which area it belongs to.',

        { callout: { kind: 'tip', title: 'Where this earns marks',
          text: 'Four of the twelve prototypes are a sidebar-plus-main app shell: ' +
                '<em>Learning Hub</em>, <em>Course Registration</em>, <em>CareerHub</em> and ' +
                '<em>Cloud Storage</em>. All four are ' +
                '<code>grid-template-columns: 240px 1fr</code> and nothing more clever than ' +
                'that. Recognising the shape is most of the work.' }}
      ]
    },

    /* --------------------------------------------------------------- 15 */
    {
      id: 'grid-implicit',
      title: 'Implicit tracks and flow',
      body: [
        'You define the explicit grid. Anything that does not fit goes into tracks the ' +
        'browser creates for you, and these properties control those.',

        { table: {
          head: ['Property', 'Effect'],
          rows: [
            ['<code>grid-auto-rows: minmax(100px, auto)</code>',
             'The size of rows created automatically for content beyond your explicit rows.'],
            ['<code>grid-auto-columns</code>', 'The same for columns.'],
            ['<code>grid-auto-flow: row</code>', 'Default: fill row by row.'],
            ['<code>grid-auto-flow: column</code>', 'Fill column by column.'],
            ['<code>grid-auto-flow: dense</code>',
             'Backfill the holes left by spanning items. <strong>Warning:</strong> it makes ' +
             'visual order differ from DOM order, which strands keyboard users.']
          ]
        }},

        'If you only ever declare <code>grid-template-columns</code> and let the rows create ' +
        'themselves, you are already using the implicit grid — and for a card gallery that is ' +
        'exactly right.'
      ],
      playground: {
        title: 'Implicit rows and dense packing',
        height: 340,
        tryThis: 'Item 1 spans two columns, leaving a hole. Add ' +
                 '<code>grid-auto-flow: dense</code> to <code>.grid</code> and a later item ' +
                 'jumps backward to fill it — which looks tidier and quietly breaks the ' +
                 'reading order.',
        html: `
<div class="grid">
  <div class="i wide">1 (span 2)</div>
  <div class="i">2</div><div class="i">3</div>
  <div class="i">4</div><div class="i">5</div>
  <div class="i">6</div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(60px, auto);
  gap: 8px;
}
.i { background: #0f766e; color: #fff;
     display: grid; place-items: center; border-radius: 6px; }
.wide { grid-column: span 2; background: #205bcb; }
`
      }
    },

    /* --------------------------------------------------------------- 16 */
    {
      id: 'grid-alignment',
      title: 'Alignment in grid',
      body: [
        { table: {
          head: ['Property', 'Axis', 'Applies to'],
          rows: [
            ['<code>justify-items</code> / <code>justify-self</code>', 'Inline (horizontal)', 'Items within their cell'],
            ['<code>align-items</code> / <code>align-self</code>', 'Block (vertical)', 'Items within their cell'],
            ['<code>justify-content</code>', 'Inline', 'The whole grid within the container, when the tracks are smaller than it'],
            ['<code>align-content</code>', 'Block', 'The whole grid within the container'],
            ['<code>place-items: center</code>', 'Both', 'Shorthand — the two-line centring solution']
          ]
        }},

        { code:
`/* The shortest true centring in CSS */
.centre { display: grid; place-items: center; min-height: 100dvh; }

/* Overlapping elements without any positioning */
.stack { display: grid; }
.stack > * { grid-area: 1 / 1; }` },

        'That stacking trick is worth knowing: it layers elements without taking them out of ' +
        'flow, so the container still sizes itself to the largest one. It is how you put ' +
        'text over an image without <code>position: absolute</code> and a guessed height.'
      ],
      playground: {
        title: 'place-items and the stacking trick',
        height: 340,
        tryThis: 'Both boxes below are the same two children. One stacks them with ' +
                 '<code>grid-area: 1 / 1</code>; the other does not. Notice the stacked ' +
                 'container is still exactly as tall as its tallest child — no height was ' +
                 'guessed anywhere.',
        html: `
<div class="stack">
  <div class="photo">a photo</div>
  <div class="caption">Text over the top</div>
</div>

<div class="centre">place-items: center</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }

.stack { display: grid; margin-bottom: 12px; }
.stack > * { grid-area: 1 / 1; }
.photo {
  min-height: 130px;
  background: linear-gradient(135deg, #0f766e, #2dd4bf);
  display: grid; place-items: center; color: #fff;
}
.caption {
  align-self: end;
  padding: 10px;
  background: rgb(0 0 0 / .45);
  color: #fff;
}

.centre {
  display: grid;
  place-items: center;
  height: 90px;
  background: #eceff3;
}
`
      },
      trap: 'A grid item ignoring <code>align-self</code> usually has a fixed height, so ' +
            'there is nothing left to align it within.'
    },

    /* --------------------------------------------------------------- 17 */
    {
      id: 'subgrid',
      title: 'Subgrid',
      body: [
        '<code>grid-template-columns: subgrid</code> lets a nested grid adopt its parent’s ' +
        'track lines. The practical use is aligning parts of separate cards: making every ' +
        'card’s title, body and button line up across a row even when the text lengths ' +
        'differ.',

        { code:
`.cards { display: grid; grid-template-columns: repeat(3, 1fr); }
.card  { display: grid; grid-row: span 3; grid-template-rows: subgrid; }` }
      ],
      playground: {
        title: 'Buttons that line up',
        height: 360,
        tryThis: 'The top row uses subgrid, so every button sits on the same line despite ' +
                 'different amounts of text. The bottom row does not. Delete ' +
                 '<code>grid-template-rows: subgrid</code> from the first and watch them ' +
                 'drift apart.',
        html: `
<div class="cards sub">
  <article class="card"><h4>Short</h4><p>One line.</p><button>Apply</button></article>
  <article class="card"><h4>Longer title here</h4><p>Rather more text than the others, spilling onto several lines.</p><button>Apply</button></article>
  <article class="card"><h4>Mid</h4><p>Two lines of text here.</p><button>Apply</button></article>
</div>

<div class="cards plain">
  <article class="card"><h4>Short</h4><p>One line.</p><button>Apply</button></article>
  <article class="card"><h4>Longer title here</h4><p>Rather more text than the others, spilling onto several lines.</p><button>Apply</button></article>
  <article class="card"><h4>Mid</h4><p>Two lines of text here.</p><button>Apply</button></article>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 12px; }
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto;
  gap: 10px;
  margin-bottom: 16px;
}
.card {
  background: #fff; border: 1px solid #dfe3e8;
  border-radius: 8px; padding: 10px;
}
.sub .card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  gap: 6px;
}
.plain .card { display: block; }
h4, p { margin: 0 0 6px; }
button { background: #205bcb; color: #fff; border: 0;
         border-radius: 6px; padding: 6px 12px; align-self: end; }
`
      }
    },

    /* --------------------------------------------------------------- 18 */
    {
      id: 'flex-or-grid',
      title: 'Flexbox or grid?',
      body: [
        { table: {
          head: ['Choose flexbox when', 'Choose grid when'],
          rows: [
            ['Content size should dictate layout', 'The layout should dictate content size'],
            ['You have one row or one column', 'You need rows and columns to align together'],
            ['Items should wrap naturally as a group', 'You want explicit control over where things sit'],
            ['Navbars, toolbars, button rows, form rows, chips', 'Page shells, galleries, dashboards, complex forms']
          ]
        }},

        { h: 'Applied to three of the actual prototypes' },

        { list: [
          '<strong>CORE-TECH admin panel.</strong> The outer panel is a grid — header, then a ' +
          'four-card row, then a two-column region. Inside the header, logo and links are ' +
          'flex. Inside each stat card, the label/number/pill stack is normal flow. Grid ' +
          'outside, flex inside.',
          '<strong>UIU CareerHub.</strong> Grid for the sidebar-plus-main split. Flex for the ' +
          'header, for each filter row, and for the job card’s details-left, salary-right ' +
          'split.',
          '<strong>United Kitchen services row.</strong> Four equal cards that must wrap on a ' +
          'phone — this one is genuinely either, and <code>flex: 1 1 260px</code> is fewer ' +
          'characters than the grid equivalent.'
        ]},

        'The general answer: <strong>grid for the page skeleton, flexbox for the contents of ' +
        'each region</strong>. Most real layouts are flex inside flex inside grid, and that ' +
        'is not a compromise — it is the intended way to use both.'
      ]
    },

    /* --------------------------------------------------------------- 19 */
    {
      id: 'responsive-basics',
      title: 'The three responsive non-negotiables',
      body: [
        { list: [
          '<code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> ' +
          'in the head. Without it every media query you write is ignored on phones.',
          '<code>img, video { max-width: 100%; height: auto; display: block; }</code> so media ' +
          'never overflows.',
          'Write <strong>mobile styles first</strong>, then add <code>min-width</code> media ' +
          'queries. The mobile layout is usually a single column, which is the natural ' +
          'default, so this means less code overall.'
        ], ordered: true },

        'Pick breakpoints from your content, not from device names. Widen the browser until ' +
        'the layout looks bad; that is your breakpoint. Common starting values: 40rem (640px), ' +
        '48rem (768px), 64rem (1024px), 80rem (1280px).'
      ]
    },

    /* --------------------------------------------------------------- 20 */
    {
      id: 'media-queries',
      title: 'Media queries',
      body: [
        { code:
`/* Mobile first: the base styles apply everywhere */
.grid { display: grid; gap: 1rem; }

@media (min-width: 40rem) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 64rem) { .grid { grid-template-columns: repeat(4, 1fr); } }

/* Range syntax, now widely supported */
@media (40rem <= width < 64rem) { }

@media (min-width: 40rem) and (orientation: landscape) { }
@media (max-width: 39.99rem), print { }   /* comma means OR */` },

        { table: {
          head: ['Feature', 'Use'],
          rows: [
            ['<code>min-width</code> / <code>max-width</code>', 'The workhorse. Use <code>rem</code> so it respects user font settings.'],
            ['<code>prefers-color-scheme: dark</code>', 'Respect the operating system theme.'],
            ['<code>prefers-reduced-motion: reduce</code>', 'Switch off animation for users who get motion sickness. An accessibility requirement.'],
            ['<code>hover: hover</code>', 'Only apply hover effects on devices that truly hover.'],
            ['<code>pointer: coarse</code>', 'Enlarge touch targets. Aim for 44px minimum.'],
            ['<code>print</code>', 'Print stylesheet. Part 5.']
          ]
        }},

        { callout: { kind: 'tip', title: 'In the exam',
          text: 'The prototypes are desktop screenshots and you are marked on reproducing ' +
                'them. Write the desktop layout, and add <em>one</em> ' +
                '<code>max-width: 768px</code> query at the end that stacks the columns, if ' +
                'you have five minutes spare. Do not build mobile-first under exam ' +
                'conditions — you will spend the time on the layout nobody is looking at.' }}
      ],
      playground: {
        title: 'A breakpoint you can watch',
        height: 340,
        tryThis: 'Use the <strong>Preview only</strong> button, then drag the window narrower. ' +
                 'The layout switches at 34rem. Change that number and find where <em>this ' +
                 'content</em> actually starts to look wrong — that is how a breakpoint ' +
                 'should be chosen.',
        html: `
<div class="page">
  <aside class="side">sidebar</aside>
  <main class="main">main content</main>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; margin: 0; }

/* Mobile first: one column, no query needed */
.page { display: grid; gap: 10px; padding: 10px; }
.side { background: #205bcb; color: #fff; padding: 20px; border-radius: 8px; }
.main { background: #eceff3; padding: 20px; border-radius: 8px; }

@media (min-width: 34rem) {
  .page { grid-template-columns: 200px 1fr; }
}
`
      }
    },

    /* --------------------------------------------------------------- 21 */
    {
      id: 'fluid-sizing',
      title: 'Fluid sizing without breakpoints',
      body: [
        { code:
`/* clamp(minimum, preferred, maximum) */
h1        { font-size: clamp(1.75rem, 1.2rem + 3vw, 3.5rem); }
.section  { padding-block: clamp(2rem, 6vw, 6rem); }
.container{ width: min(100% - 2rem, 68rem); margin-inline: auto; }` },

        'That last line is worth memorising. It gives a centred container with a fluid ' +
        'maximum width <em>and</em> guaranteed side gutters, replacing four separate ' +
        'declarations and a media query. This site uses it for every content column.',

        '<code>min()</code> and <code>max()</code> read backwards at first: ' +
        '<code>min()</code> caps the maximum, <code>max()</code> sets a floor.'
      ],
      playground: {
        title: 'clamp and the container line',
        height: 320,
        tryThis: 'Switch to <strong>Preview only</strong> and resize. The heading grows and ' +
                 'shrinks smoothly between two hard limits, with no breakpoint anywhere, and ' +
                 'the container never touches the edges.',
        html: `
<div class="container">
  <h1>Launch Your Project, Faster.</h1>
  <p>The container keeps a gutter at every width, and the heading
  scales between 1.5rem and 3rem without a single media query.</p>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; margin: 0;
       background: #eceff3; padding-block: 20px; }

.container {
  width: min(100% - 2rem, 40rem);
  margin-inline: auto;
  background: #fff;
  padding: clamp(1rem, 4vw, 2.5rem);
  border-radius: 10px;
}
h1 {
  font-size: clamp(1.5rem, 1rem + 3vw, 3rem);
  line-height: 1.15;
  margin: 0 0 .5em;
}
p { margin: 0; color: #5b6672; }
`
      }
    },

    /* --------------------------------------------------------------- 22 */
    {
      id: 'container-queries',
      title: 'Container queries',
      body: [
        'Media queries ask about the viewport. Container queries ask about the ' +
        '<em>parent element</em>, which is what you actually want for a reusable component: ' +
        'a card should stack when it is narrow, whether it is narrow because the screen is ' +
        'small or because it sits in a sidebar.',

        { code:
`.card-wrap {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 26rem) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}

/* Container query units: cqw, cqh, cqi, cqb, cqmin, cqmax */
.card h3 { font-size: clamp(1rem, 5cqi, 1.5rem); }` }
      ],
      playground: {
        title: 'The same card, two widths',
        height: 340,
        tryThis: 'Two identical cards, same markup and same classes, in containers of ' +
                 'different widths. One is side by side and one is stacked, and the viewport ' +
                 'never came into it.',
        html: `
<div class="wrap wide">
  <article class="card">
    <div class="thumb"></div>
    <div><h3>Junior Software Engineer</h3><p>Kaz Software</p></div>
  </article>
</div>

<div class="wrap narrow">
  <article class="card">
    <div class="thumb"></div>
    <div><h3>Junior Software Engineer</h3><p>Kaz Software</p></div>
  </article>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }

.wrap { container-type: inline-size; container-name: card;
        margin-bottom: 14px; }
.wide   { width: 100%; }
.narrow { width: 220px; }

.card { display: grid; gap: 10px;
        background: #fff; border: 1px solid #dfe3e8;
        border-radius: 8px; padding: 10px; }
.thumb { height: 70px; border-radius: 6px;
         background: linear-gradient(135deg, #205bcb, #6b63ff); }
h3 { margin: 0 0 4px; font-size: 15px; }
p { margin: 0; color: #5b6672; }

@container card (min-width: 26rem) {
  .card { grid-template-columns: 120px 1fr; align-items: center; }
  .thumb { height: 100%; min-height: 70px; }
}
`
      }
    },

    /* --------------------------------------------------------------- 23 */
    {
      id: 'aspect-ratio',
      title: 'Aspect ratio and object-fit',
      body: [
        { code:
`.video  { aspect-ratio: 16 / 9; }
.avatar { aspect-ratio: 1; object-fit: cover; border-radius: 50%; }

/* object-fit controls how an image fills its box:
   cover   = fill and crop (usually right)
   contain = fit the whole image, leaves gaps
   fill    = stretch, distorts
   object-position: center top;  moves the crop focus */` },

        '<code>aspect-ratio</code> replaces the old padding-top percentage hack entirely, and ' +
        'it is the right way to make an image placeholder in the exam: a div with a ratio and ' +
        'a background costs one rule and reserves exactly the right space.'
      ],
      playground: {
        title: 'Ratios and crops',
        height: 340,
        tryThis: 'The three boxes all have <code>aspect-ratio</code> set and no height. ' +
                 'Change <code>16 / 9</code> to <code>1</code> or <code>3 / 4</code> and ' +
                 'watch the box reshape while the width stays put.',
        html: `
<div class="row">
  <div class="ph wide">16 / 9</div>
  <div class="ph square">1 / 1</div>
  <div class="ph tall">3 / 4</div>
</div>
<div class="avatar">JS</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 12px; }
.row { display: flex; gap: 10px; align-items: start; }

.ph {
  flex: 1;
  display: grid; place-items: center;
  border-radius: 8px; color: #fff;
  background: linear-gradient(135deg, #0f766e, #2dd4bf);
}
.wide   { aspect-ratio: 16 / 9; }
.square { aspect-ratio: 1; }
.tall   { aspect-ratio: 3 / 4; }

.avatar {
  margin-top: 12px;
  width: 56px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #536ffe; color: #fff;
  display: grid; place-items: center;
  font-weight: 700;
}
`
      }
    },

    /* --------------------------------------------------------------- 24 */
    {
      id: 'multi-column',
      title: 'Multi-column text',
      body: [
        { code:
`.article {
  columns: 22rem 3;        /* minimum width, maximum count */
  column-gap: 2rem;
  column-rule: 1px solid #ddd;
}
.article h2 { column-span: all; break-after: avoid; }
.card { break-inside: avoid; }` },

        'Rarely what you want on the web — long columns mean scrolling up to read the next ' +
        'one — but exactly right for print stylesheets, which is where Part 5 uses it.'
      ]
    },

    /* --------------------------------------------------------------- 25 */
    {
      id: 'centring',
      title: 'Every way to centre something',
      body: [
        { table: {
          head: ['Situation', 'Solution'],
          rows: [
            ['Inline text within a block', '<code>text-align: center</code>'],
            ['A block with a width, horizontally', '<code>margin-inline: auto</code>'],
            ['Anything, both axes, modern', '<code>display: grid; place-items: center</code>'],
            ['Anything, both axes, flex', '<code>display: flex; justify-content: center; align-items: center</code>'],
            ['One flex item only', '<code>margin: auto</code> on that item'],
            ['Absolutely positioned, unknown size', '<code>top: 50%; left: 50%; transform: translate(-50%, -50%)</code>'],
            ['Absolutely positioned, known size', '<code>inset: 0; margin: auto</code>'],
            ['Vertically in a single-line box', '<code>line-height</code> equal to the box height'],
            ['An icon beside text', '<code>display: inline-flex; align-items: center; gap: .5em</code>']
          ]
        }},

        'Two of those cover almost everything. <code>place-items: center</code> for a box, ' +
        'and <code>inline-flex</code> with a <code>gap</code> for an icon next to a word — ' +
        'which is the fix for icons sitting mysteriously above or below their label.'
      ],
      playground: {
        title: 'The ones you will actually use',
        height: 340,
        tryThis: 'The last row is the icon-beside-text fix. Change it to ' +
                 '<code>display: inline-block</code> and watch the tick drift off the ' +
                 'baseline — that misalignment is what <code>inline-flex</code> solves.',
        html: `
<div class="demo grid-centre">grid, place-items: center</div>
<div class="demo flex-centre">flex, justify + align</div>
<div class="demo"><span class="chip">&#10003; Full-time</span></div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.demo {
  height: 70px;
  background: #eceff3;
  margin-bottom: 10px;
  border-radius: 8px;
}
.grid-centre { display: grid; place-items: center; }
.flex-centre { display: flex; justify-content: center; align-items: center; }

.chip {
  display: inline-flex;
  align-items: center;
  gap: .5em;
  margin: 20px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #e2ebfa; color: #205bcb;
}
`
      }
    },

    /* --------------------------------------------------------------- 26 */
    {
      id: 'layout-traps',
      title: 'Layout traps and tricks',
      body: [
        { table: {
          head: ['Symptom', 'Cause and fix'],
          rows: [
            ['Flex row overflows its parent', '<code>min-width: auto</code> on flex items. Add <code>min-width: 0</code>.'],
            ['<code>position: fixed</code> scrolls with the page', 'An ancestor has <code>transform</code>, <code>filter</code> or <code>will-change</code>.'],
            ['<code>position: sticky</code> does nothing', 'No offset set, or an ancestor has <code>overflow</code> hidden or auto.'],
            ['<code>z-index: 9999</code> still behind something', 'A parent stacking context is capping it.'],
            ['Percentage height ignored', 'No definite height on the parent chain. Use flex or grid.'],
            ['Grid item ignores <code>align-self</code>', 'The item has a fixed height, so there is nothing to align within.'],
            ['<code>auto-fit</code> collapses to one huge column', 'The container is narrower than the minmax minimum. Use <code>minmax(min(260px, 100%), 1fr)</code>.'],
            ['Layout jumps when a scrollbar appears', 'Use <code>scrollbar-gutter: stable</code> on the scroll container.'],
            ['Horizontal scrollbar from nowhere', 'Something is wider than the viewport. Find it with <code>* { outline: 1px solid red }</code>.'],
            ['<code>100vw</code> is wider than the screen', '<code>100vw</code> includes the scrollbar width. Use <code>100%</code>.']
          ]
        }},

        { h: 'Tricks' },

        { list: [
          'Use the DevTools grid and flex overlays. Chrome shows line numbers, track sizes ' +
          'and gap areas visually; guessing is unnecessary.',
          '<code>gap</code> works in flexbox, grid <em>and</em> multi-column. Stop using ' +
          '<code>margin-right</code> on children with a <code>:last-child</code> reset.',
          '<code>grid-column: 1 / -1</code> makes any item span the full grid whatever the ' +
          'column count.',
          'A <code>display: contents</code> wrapper lets you keep semantic markup without ' +
          'adding an extra grid cell.',
          '<strong>Build the layout with plain coloured boxes before adding real content.</strong> ' +
          'It is far faster to spot a structural mistake, and it is step two of every ' +
          'walkthrough on this site.',
          'Test every layout at 320px and at 200% browser zoom. Both are real user ' +
          'conditions and both break bad layouts.'
        ]},

        { callout: { kind: 'tip', title: 'What to carry forward from Part 3',
          text: 'Grid for the page skeleton, flexbox for the contents of each region, ' +
                '<code>gap</code> instead of margins, <code>clamp()</code> and ' +
                '<code>min()</code> instead of many breakpoints, and container queries for ' +
                'components that must work in more than one context. Positioning is for ' +
                'overlays and badges only, never for building layouts.' }}
      ]
    }

  ]
});
