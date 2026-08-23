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
    }

  ]
});
