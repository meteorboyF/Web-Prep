/* part-2.js — CSS Fundamentals.
   Sections 1 to 11: getting CSS onto the page, every selector type, the
   cascade, specificity and inheritance. The box model onward lands in 4b. */

WP.lesson('part-2', {
  eyebrow: 'Part 2 of 5',
  title: 'CSS Fundamentals',
  blurb: 'Selectors, the cascade and inheritance — how a rule finds its element, and who ' +
         'wins when two rules disagree.',
  prev: { label: 'Part 1 · HTML5 foundations', href: 'lessons/part-1.html' },
  next: { label: 'Part 3 · Layout mastery', href: 'lessons/part-3.html' },

  sections: [

    /* ---------------------------------------------------------------- 1 */
    {
      id: 'css-delivery',
      title: 'Getting CSS onto the page',
      body: [
        'Almost every "CSS is weird" moment traces back to one of four things: a selector ' +
        'matching more or fewer elements than you thought, the cascade picking a different ' +
        'winner, the box model adding size you did not account for, or a value inheriting ' +
        'when you expected it not to. This part covers the first three; the fourth is ' +
        'section 11.',

        { table: {
          head: ['Method', 'Syntax', 'When'],
          rows: [
            ['External', '<code>&lt;link rel="stylesheet" href="styles.css"&gt;</code>',
             'Always, for real work. Cached across pages, keeps the HTML clean.'],
            ['Internal', '<code>&lt;style&gt; … &lt;/style&gt;</code> in the head',
             'Single-page demos — and a perfectly acceptable exam answer.'],
            ['Inline', '<code>&lt;div style="color:red"&gt;</code>',
             'Values a script computes, and a per-item custom property. Otherwise avoid: no ' +
             'reuse, and it beats every selector.'],
            ['<code>@import</code>', '<code>@import url("a.css");</code>',
             'Avoid. It blocks parallel downloading and slows the page. Use several ' +
             '<code>&lt;link&gt;</code> tags.']
          ]
        }},

        { callout: { kind: 'tip', title: 'Which to use in the exam',
          text: 'Either one linked <code>style.css</code> or one <code>&lt;style&gt;</code> ' +
                'block in the head. Both are worth full marks. A <code>&lt;style&gt;</code> ' +
                'block removes any chance of a path typo costing you the entire stylesheet, ' +
                'which is a real failure mode under time pressure.' }}
      ]
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: 'rule-anatomy',
      title: 'Anatomy of a rule',
      body: [
        { code:
`selector {
  property: value;   /* one declaration */
  property: value;
}

/* This is a CSS comment. There is no // line comment. */`
        },

        { list: [
          'The semicolon after the last declaration is optional, but always write it. Adding ' +
          'a line later without one is a silent failure.',
          'An <em>invalid declaration</em> is dropped on its own and the rest of the block ' +
          'still applies.',
          'An <em>invalid selector</em> invalidates the whole rule block. One typo can look ' +
          'like everything broke at once.',
          'Property names are case insensitive. Class names, ids and file paths are not.'
        ]}
      ],
      playground: {
        title: 'When CSS fails silently',
        height: 320,
        tryThis: 'Three deliberate mistakes are in the CSS. Fix them one at a time and watch ' +
                 'each box come to life. Nothing in the browser will ever tell you these ' +
                 'were wrong.',
        html: `
<div class="one">Typo in the value</div>
<div class="two">Missing semicolon above</div>
<div class="three">Typo in the selector</div>
`,
        css: `
div { padding: 10px; margin-bottom: 8px; color: #fff; }

/* 1. "backgroundcolor" is not a property, so it is dropped
      on its own. The padding above still worked. */
.one { backgroundcolor: #0f766e; }

/* 2. No semicolon after the background, so the browser reads
      "#b4541b color: #fff" as one broken value. */
.two { background: #b4541b
       border-radius: 8px; }

/* 3. A stray character makes the whole selector invalid,
      so every declaration inside is thrown away. */
.three! { background: #205bcb; }
`
      },
      trap: 'The Styles panel in DevTools shows dropped declarations struck through or with a ' +
            'warning triangle. When a rule "does nothing", look there before you look ' +
            'anywhere else — it is almost always a typo one line above the line you are ' +
            'staring at.'
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: 'basic-selectors',
      title: 'Basic selectors',
      body: [
        { table: {
          head: ['Selector', 'Matches'],
          rows: [
            ['<code>*</code>', 'Everything. Useful in resets, expensive if abused.'],
            ['<code>p</code>', 'Every <code>&lt;p&gt;</code> — a type selector.'],
            ['<code>.card</code>', 'Every element with <code>class="card"</code>.'],
            ['<code>#header</code>',
             'The element with <code>id="header"</code>. Very high specificity, so avoid ' +
             'styling by id.'],
            ['<code>.card.featured</code>', 'Elements with <strong>both</strong> classes — no space.'],
            ['<code>h2.title</code>', 'An <code>&lt;h2&gt;</code> that also has <code>class="title"</code>.'],
            ['<code>h1, h2, .lead</code>', 'Grouping: all three get the same styles.']
          ]
        }},

        'The space is the whole difference between <code>.card.featured</code> and ' +
        '<code>.card .featured</code>. The first is one element with two classes; the second ' +
        'is a <code>.featured</code> somewhere inside a <code>.card</code>. Reading a ' +
        'selector out loud helps: "card that is also featured" against "featured inside card".'
      ],
      playground: {
        title: 'Basic selectors',
        height: 320,
        tryThis: 'Add a space to <code>.chip.new</code> so it reads <code>.chip .new</code>. ' +
                 'Every chip loses its highlight, because now the rule is looking for ' +
                 'something <em>inside</em> a chip.',
        html: `
<span class="chip">Full-time</span>
<span class="chip new">Internship</span>
<span class="chip">Remote</span>

<h2 class="title">An h2 with a class</h2>
<h2>An h2 without one</h2>
`,
        css: `
body { font-family: system-ui, sans-serif; }

.chip {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e2ebfa;
  color: #205bcb;
  font-size: 13px;
}

/* Both classes on the same element. No space. */
.chip.new { background: #fdebc0; color: #8a5a00; }

/* An h2 that also has .title */
h2.title { color: #0f766e; }
`
      }
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: 'combinators',
      title: 'Combinators',
      body: [
        { table: {
          head: ['Selector', 'Means'],
          rows: [
            ['<code>.card p</code>', 'Descendant: any <code>&lt;p&gt;</code> anywhere inside, at any depth.'],
            ['<code>.card &gt; p</code>', 'Child: only a <code>&lt;p&gt;</code> that is a <em>direct</em> child.'],
            ['<code>h2 + p</code>', 'Adjacent sibling: the <code>&lt;p&gt;</code> immediately after an <code>&lt;h2&gt;</code>.'],
            ['<code>h2 ~ p</code>', 'General sibling: every <code>&lt;p&gt;</code> after an <code>&lt;h2&gt;</code> with the same parent.']
          ]
        }},

        'There is no parent selector in the classic sense — but <code>:has()</code>, in ' +
        'section 6, now does exactly that job and is supported everywhere current.'
      ],
      playground: {
        title: 'Combinators',
        height: 340,
        tryThis: 'All four rules run on the same markup, each one colouring a border. Change ' +
                 '<code>.box &gt; p</code> to <code>.box p</code> and the nested paragraph ' +
                 'joins in — that is the difference between "child" and "descendant" in one ' +
                 'character.',
        html: `
<div class="box">
  <h2>Heading</h2>
  <p>Adjacent sibling of the h2, and a direct child</p>
  <p>General sibling of the h2</p>
  <div><p>Nested one level deeper</p></div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }
.box { border: 1px solid #dfe3e8; padding: 12px; }
p { padding: 6px; margin: 0 0 6px; border-left: 4px solid transparent; }

/* Direct children only */
.box > p { border-left-color: #0f766e; }

/* The one immediately after the h2 */
h2 + p { background: #e3f2f0; }

/* Every p after the h2 with the same parent */
h2 ~ p { font-weight: 600; }
`
      }
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: 'attribute-selectors',
      title: 'Attribute selectors',
      body: [
        { table: {
          head: ['Selector', 'Matches'],
          rows: [
            ['<code>[disabled]</code>', 'Any element with the attribute, whatever its value.'],
            ['<code>[type="email"]</code>', 'Exact value match.'],
            ['<code>[class~="btn"]</code>', 'Value is one of a space-separated list.'],
            ['<code>[href^="https"]</code>', 'Starts with.'],
            ['<code>[href$=".pdf"]</code>', 'Ends with. Perfect for appending a file-type marker.'],
            ['<code>[href*="youtube"]</code>', 'Contains anywhere.'],
            ['<code>[lang|="en"]</code>', 'Exactly <code>en</code>, or starts with <code>en-</code>.'],
            ['<code>[data-state="open" i]</code>', 'The <code>i</code> flag makes the match case insensitive.']
          ]
        }},

        'These are how you style form controls by their <code>type</code> without inventing a ' +
        'class for each — which is what the input styling in every one of the exam ' +
        'prototypes is really doing.'
      ],
      playground: {
        title: 'Attribute selectors',
        height: 340,
        tryThis: 'The links get a marker from what they point at, with no classes anywhere in ' +
                 'the HTML. Add a fourth link ending in <code>.zip</code> and give it a rule.',
        html: `
<p><a href="https://uiu.ac.bd">External site</a></p>
<p><a href="syllabus.pdf">The syllabus</a></p>
<p><a href="about.html">A local page</a></p>

<p><input type="email" placeholder="email"></p>
<p><input type="password" placeholder="password"></p>
<p><input type="text" placeholder="text" disabled></p>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }
a { color: #205bcb; text-decoration: none; }

a[href^="https"]::after { content: " \\2197"; }
a[href$=".pdf"]::after  { content: " (PDF)"; color: #b4541b; }

input {
  width: 220px; padding: 6px 8px; font: inherit;
  border: 1px solid #7c8794; border-radius: 6px;
}
input[type="email"]    { border-color: #205bcb; }
input[type="password"] { letter-spacing: 2px; }
input[disabled]        { background: #eceff3; color: #8a8f96; }
`
      }
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: 'pseudo-classes',
      title: 'Pseudo-classes',
      body: [
        'A pseudo-class describes a <em>state</em>, and is written with one colon.',

        { table: {
          head: ['Pseudo-class', 'Fires when'],
          rows: [
            ['<code>:hover</code>',
             'The pointer is over the element. Has no meaning on touch, so never hide ' +
             'essential content behind it.'],
            ['<code>:active</code>', 'The element is being pressed.'],
            ['<code>:focus</code>', 'The element has keyboard focus.'],
            ['<code>:focus-visible</code>',
             'Focused <em>and</em> the browser judges a focus ring is warranted — keyboard, ' +
             'not a mouse click. Use this rather than <code>:focus</code> for outlines.'],
            ['<code>:focus-within</code>',
             'The element, or anything inside it, has focus. Ideal for highlighting a whole form row.'],
            ['<code>:first-child</code> / <code>:last-child</code>', 'Position among all siblings.'],
            ['<code>:first-of-type</code> / <code>:last-of-type</code>', 'Position among siblings of the same tag.'],
            ['<code>:not(.a, .b)</code>', 'Anything that does not match. Accepts a list.'],
            ['<code>:is(h1, h2, h3)</code>',
             'Shorthand for grouping. Takes the specificity of its <em>most specific</em> argument.'],
            ['<code>:where(h1, h2)</code>',
             'Same as <code>:is</code> but contributes <strong>zero</strong> specificity. The ' +
             'safest way to write defaults.'],
            ['<code>:has(&gt; img)</code>', 'The parent selector: an element that contains a match.'],
            ['<code>:checked</code> / <code>:disabled</code>', 'Form control states.'],
            ['<code>:user-valid</code> / <code>:user-invalid</code>',
             'Validation state <em>after</em> the user has interacted. Prefer these to ' +
             '<code>:valid</code> and <code>:invalid</code>.'],
            ['<code>:placeholder-shown</code>', 'The field is still empty. Powers the floating-label trick.'],
            ['<code>:target</code>', 'The element whose id matches the URL fragment.'],
            ['<code>:root</code>', 'The <code>&lt;html&gt;</code> element. Where custom properties normally live.'],
            ['<code>:empty</code>', 'No children at all, not even whitespace.']
          ]
        }},

        'For links, the order matters: <strong>L V H A</strong> — <code>:link</code>, ' +
        '<code>:visited</code>, <code>:hover</code>, <code>:active</code>. Written out of ' +
        'order they overwrite each other and hover stops working on visited links.'
      ],
      playground: {
        title: 'States, and :has()',
        height: 360,
        tryThis: 'Tick a checkbox. The label goes bold and the whole row changes — with no ' +
                 'JavaScript, because <code>:has()</code> lets a parent react to its own ' +
                 'child. Then click into the text field and watch <code>:focus-within</code> ' +
                 'light up the row around it.',
        html: `
<label class="row"><input type="checkbox"> Full-time</label>
<label class="row"><input type="checkbox" checked> Internship</label>

<div class="field">
  <label for="q">Search</label>
  <input type="text" id="q" placeholder="job title">
</div>

<button class="btn">Apply Filters</button>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }

.row {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; margin-bottom: 6px;
  border: 1px solid #dfe3e8; border-radius: 8px;
}
input { accent-color: #205bcb; }

/* A parent reacting to its own child */
.row:has(input:checked) {
  background: #e2ebfa;
  border-color: #205bcb;
  font-weight: 600;
}

/* The whole row lights up when anything in it has focus */
.field { padding: 8px 10px; border: 1px solid #dfe3e8; border-radius: 8px; }
.field:focus-within { border-color: #0f766e; background: #e3f2f0; }
.field input { border: 1px solid #7c8794; border-radius: 6px; padding: 6px 8px; }

.btn {
  margin-top: 10px; padding: 8px 16px; border: 0; border-radius: 6px;
  background: #205bcb; color: #fff; font: inherit; cursor: pointer;
}
.btn:hover  { background: #1a4aa8; }
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 3px solid #0f766e; outline-offset: 3px; }
`
      },
      tip: '<code>:focus-within</code> and <code>:has()</code> between them replace a ' +
           'surprising amount of JavaScript. Prototype <em>UIU CareerHub</em> has checkbox ' +
           'filter rows exactly like the ones above.'
    },

    /* ---------------------------------------------------------------- 7 */
    {
      id: 'nth-formulas',
      title: 'nth-child formulas',
      body: [
        { table: {
          head: ['Formula', 'Selects'],
          rows: [
            ['<code>:nth-child(3)</code>', 'The third child.'],
            ['<code>:nth-child(odd)</code> or <code>(2n+1)</code>', '1st, 3rd, 5th …'],
            ['<code>:nth-child(even)</code> or <code>(2n)</code>', '2nd, 4th, 6th … classic zebra striping.'],
            ['<code>:nth-child(3n)</code>', 'Every third.'],
            ['<code>:nth-child(n+4)</code>', 'The fourth onward.'],
            ['<code>:nth-child(-n+3)</code>', 'The first three only.'],
            ['<code>:nth-last-child(2)</code>', 'Second from the end.']
          ]
        }},

        '<code>:nth-child</code> counts <em>all</em> siblings; <code>:nth-of-type</code> ' +
        'counts only siblings of the same tag. If <code>li:nth-child(2)</code> picks the ' +
        'wrong item, you almost certainly have another element type mixed in among the list ' +
        'items.'
      ],
      playground: {
        title: 'nth-child',
        height: 320,
        tryThis: 'Change the formula on <code>.item:nth-child(…)</code> and watch which ' +
                 'boxes light up. Work through <code>3n</code>, <code>n+4</code>, ' +
                 '<code>-n+3</code> and <code>odd</code> — thirty seconds each and you will ' +
                 'never have to look the syntax up again.',
        html: `
<div class="grid">
  <div class="item">1</div><div class="item">2</div>
  <div class="item">3</div><div class="item">4</div>
  <div class="item">5</div><div class="item">6</div>
  <div class="item">7</div><div class="item">8</div>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.item {
  padding: 16px 0;
  text-align: center;
  border-radius: 6px;
  background: #eceff3;
  color: #5b6672;
}

/* Change this formula */
.item:nth-child(2n) {
  background: #0f766e;
  color: #fff;
}
`
      }
    },

    /* ---------------------------------------------------------------- 8 */
    {
      id: 'pseudo-elements',
      title: 'Pseudo-elements',
      body: [
        'A pseudo-element targets a <em>virtual part</em> of an element, and is written with ' +
        'two colons.',

        { table: {
          head: ['Pseudo-element', 'Targets'],
          rows: [
            ['<code>::before</code> / <code>::after</code>',
             'A generated child at the start or end. Requires the <code>content</code> ' +
             'property, even when empty: <code>content: ""</code>.'],
            ['<code>::first-line</code> / <code>::first-letter</code>', 'Typographic flourishes such as drop caps.'],
            ['<code>::selection</code>',
             'Text the user has highlighted. Only <code>color</code>, <code>background</code> ' +
             'and <code>text-shadow</code> are allowed.'],
            ['<code>::placeholder</code>', 'Placeholder text inside an input.'],
            ['<code>::marker</code>', 'The bullet or number of a list item.'],
            ['<code>::backdrop</code>', 'The area behind a <code>&lt;dialog&gt;</code>.'],
            ['<code>::file-selector-button</code>', 'The button inside <code>&lt;input type="file"&gt;</code>.']
          ]
        }},

        { callout: { kind: 'trap', title: 'Never put meaning in generated content',
          text: 'Text from <code>content</code> is not reliably announced by screen readers, ' +
                'cannot be selected, and cannot be copied. Decoration only.' }}
      ],
      playground: {
        title: 'Pseudo-elements',
        height: 360,
        tryThis: 'Delete <code>content: ""</code> from the divider rule. The line vanishes ' +
                 'entirely — a pseudo-element with no <code>content</code> is not generated ' +
                 'at all, which is the single most common reason "my ::after does nothing".',
        html: `
<p class="required">Full name</p>

<div class="divider"><span>OR</span></div>

<ul class="list">
  <li>Real-time collaboration</li>
  <li>Advanced reporting tools</li>
</ul>

<p class="drop">Select this text to see ::selection.</p>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }

.required::after { content: " *"; color: #c0392b; }

/* The OR divider from the sign-in prototype: two lines and a word. */
.divider { display: flex; align-items: center; gap: 10px; margin: 16px 0; }
.divider::before, .divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #dfe3e8;
}
.divider span { color: #5b6672; font-size: 12px; }

.list { list-style: none; padding: 0; }
.list li { padding-left: 22px; position: relative; margin-bottom: 6px; }
.list li::before {
  content: "";
  position: absolute; left: 0; top: 3px;
  width: 12px; height: 12px;
  background: #50ad50; border-radius: 2px;
}

.drop::first-letter { font-size: 2em; font-weight: 700; color: #0f766e; }
::selection { background: #0f766e; color: #fff; }
`
      },
      tip: 'That divider is worth memorising. Prototype <strong>251 Q2</strong> has an ' +
           '"OR" separator between the social buttons and the email field, and this is the ' +
           'whole answer — a flex row with two <code>::before</code>/<code>::after</code> ' +
           'lines set to <code>flex: 1</code>.'
    },

    /* ---------------------------------------------------------------- 9 */
    {
      id: 'cascade',
      title: 'The cascade',
      body: [
        'When two rules set the same property on the same element, the browser resolves it in ' +
        'a fixed order. Learn the order and CSS stops feeling arbitrary.',

        { list: [
          '<strong>Origin and importance.</strong> Author <code>!important</code> beats ' +
          'author normal, which beats the browser’s own defaults. A <em>user</em> ' +
          'stylesheet’s <code>!important</code> beats everything — deliberately, for ' +
          'accessibility.',
          '<strong>Cascade layers.</strong> Styles inside <code>@layer</code> lose to ' +
          'unlayered styles, and layers compete in the order you declare them. Part 4.',
          '<strong>Specificity.</strong> The more specific selector wins. Next section.',
          '<strong>Source order.</strong> If everything above ties, the rule written ' +
          '<em>last</em> wins. This is why your override goes at the bottom of the file, or ' +
          'in the file linked last.'
        ], ordered: true },

        'Note what is <em>not</em> in that list: where the element sits in the document, how ' +
        'long the selector is, or how recently you saved the file. Only those four things.'
      ],
      playground: {
        title: 'Source order breaks the tie',
        height: 320,
        tryThis: 'The last two rules have identical specificity, so the second one wins. Swap ' +
                 'the two blocks and the colour changes — nothing else about them matters.',
        html: `
<p class="note lead">Which colour am I?</p>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 18px; }

/* (0,0,1) — loses to any class */
p { color: #5b6672; }

/* (0,1,0) */
.note { color: #0f766e; }

/* (0,1,0) as well — a tie, so this one wins by being later */
.lead { color: #b4541b; }
`
      }
    },

    /* --------------------------------------------------------------- 10 */
    {
      id: 'specificity',
      title: 'Calculating specificity',
      body: [
        'Specificity is a three-part score, written <strong>(A, B, C)</strong>. Compare from ' +
        'left to right. A higher A beats any B, and it is <em>not</em> decimal — eleven ' +
        'classes never beat one id.',

        { table: {
          head: ['Column', 'Counts', 'Example'],
          rows: [
            ['A', 'ID selectors', '<code>#nav</code> = (1,0,0)'],
            ['B', 'Classes, attribute selectors, pseudo-classes', '<code>.card:hover</code> = (0,2,0)'],
            ['C', 'Element types and pseudo-elements', '<code>li::before</code> = (0,0,2)']
          ]
        }},

        'Type a selector below and it will show you the score and which token earned each ' +
        'point. The second field is there so you can settle the question you actually have, ' +
        'which is never "what is the score" but "which of these two wins".',

        { tool: 'specificity' },

        { h: 'The parts people get wrong' },

        { table: {
          head: ['Selector', 'Score', 'Why'],
          rows: [
            ['<code>:where(.a, #b)</code>', '(0,0,0)',
             'Always zero, whatever is inside. This is the point of it.'],
            ['<code>:is(.a, #b)</code>', '(1,0,0)',
             'Takes the score of its <em>most specific</em> argument, not the sum.'],
            ['<code>:not(.a)</code>', '(0,1,0)',
             'The <code>:not</code> itself scores nothing; its argument scores normally.'],
            ['<code>a::after</code>', '(0,0,2)',
             'A pseudo-<em>element</em> is column C, not B. This one catches everybody.'],
            ['<code>style="…"</code>', 'Beats all selectors', 'An inline style is not scored at all.'],
            ['<code>!important</code>', 'Beats everything', 'Including an inline style.']
          ]
        }},

        { callout: { kind: 'tip', title: 'The practical advice',
          text: 'Never use <code>!important</code> to win a fight you created. Nine times out ' +
                'of ten the real fix is to <em>lower</em> the specificity of the rule you are ' +
                'fighting. Keep selectors flat — mostly single classes — and specificity ' +
                'stops being something you think about at all. Every prototype answer on this ' +
                'site is written that way.' }}
      ]
    },

    /* --------------------------------------------------------------- 11 */
    {
      id: 'inheritance',
      title: 'Inheritance',
      body: [
        'Some properties pass automatically from parent to child; most do not. The rule of ' +
        'thumb is that <strong>text-related properties inherit and box-related properties do ' +
        'not</strong>.',

        { table: {
          head: ['Inherits', 'Does not inherit'],
          rows: [
            ['<code>color</code>, <code>font-family</code>, <code>font-size</code>, ' +
             '<code>font-weight</code>, <code>line-height</code>, <code>letter-spacing</code>, ' +
             '<code>text-align</code>, <code>text-transform</code>, <code>visibility</code>, ' +
             '<code>cursor</code>, <code>list-style</code>, <code>white-space</code>',
             '<code>margin</code>, <code>padding</code>, <code>border</code>, ' +
             '<code>background</code>, <code>width</code>, <code>height</code>, ' +
             '<code>display</code>, <code>position</code>, <code>overflow</code>, ' +
             '<code>box-shadow</code>, <code>z-index</code>, and every flex and grid property']
          ]
        }},

        'This is why setting <code>font-family</code> once on <code>body</code> styles the ' +
        'whole page, and why setting <code>background</code> on <code>body</code> does not ' +
        'give every element its own background.',

        { h: 'The four global values' },

        { table: {
          head: ['Value', 'Effect'],
          rows: [
            ['<code>inherit</code>', 'Force the parent value, even for a property that does not normally inherit.'],
            ['<code>initial</code>', 'Reset to the CSS specification default — which is not the same as the browser default.'],
            ['<code>unset</code>', '<code>inherit</code> if the property inherits, otherwise <code>initial</code>.'],
            ['<code>revert</code>', 'Roll back to the browser stylesheet value. The most useful of the four in practice.'],
            ['<code>all: unset</code>', 'Wipe every property on an element in one line. Handy for stripping a button back to nothing.']
          ]
        }}
      ],
      playground: {
        title: 'What inherits',
        height: 340,
        tryThis: 'Form controls are the famous exception: they do not inherit ' +
                 '<code>font-family</code> at all. Uncomment the <code>font: inherit</code> ' +
                 'rule and the input joins the rest of the page. This one line is why an ' +
                 'unstyled form always looks like it came from a different website.',
        html: `
<div class="card">
  <h3>Inherited from .card</h3>
  <p>This colour and font came from the parent.</p>
  <input type="text" value="But not in here">
  <button>Nor here</button>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; }

.card {
  font-family: Georgia, serif;
  color: #0f766e;
  letter-spacing: 0.02em;

  /* Not inherited by anything: */
  border: 2px solid #0f766e;
  padding: 16px;
  border-radius: 10px;
}

/* Uncomment me */
/* input, button, textarea, select { font: inherit; color: inherit; } */
`
      },
      trap: '<code>line-height</code> should be unitless. <code>line-height: 1.5</code> ' +
            'multiplies each element’s own font-size, but <code>line-height: 24px</code> ' +
            'is inherited as a fixed 24px, which crushes any child with larger text.'
    },

    /* --------------------------------------------------------------- 12 */
    {
      id: 'box-model',
      title: 'The box model',
      body: [
        'Every element is a rectangle made of four rings: content, padding, border, margin. ' +
        'Padding and border sit <em>inside</em> the visible box and share its background. ' +
        'Margin is outside and always transparent.',

        'The question that matters is what <code>width</code> means. With the default ' +
        '<code>content-box</code>, width describes the content only, and padding and border ' +
        'are added on top. An element set to <code>width: 200px</code> with 20px of padding ' +
        'and a 2px border occupies <strong>244px</strong>. With <code>border-box</code> it ' +
        'occupies exactly 200px and the padding eats inward.',

        { code:
`/* Put this at the top of every project. Every one. */
*, *::before, *::after {
  box-sizing: border-box;
}` },

        'There is no downside and every modern codebase does it. The reason it is not the ' +
        'default is history, not merit.'
      ],
      playground: {
        title: 'content-box against border-box',
        height: 300,
        tryThis: 'Both boxes ask for 200px and sit above a 200px ruler. Change the first to ' +
                 '<code>border-box</code> and they line up. Then set a percentage width on ' +
                 'both and watch how much easier the arithmetic becomes.',
        html: `
<div class="box content">content-box &mdash; really 248px</div>
<div class="box border">border-box &mdash; really 200px</div>
<p class="ruler">200px</p>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.box {
  width: 200px;
  padding: 20px;
  border: 4px solid #0f766e;
  background: #e3f2f0;
  margin-bottom: 10px;
}
.content { box-sizing: content-box; }
.border  { box-sizing: border-box; }

.ruler {
  width: 200px; margin: 0;
  border-top: 2px dashed #b4541b;
  color: #b4541b;
}
`
      },
      trap: 'An element is wider than you set it? It is <code>content-box</code>. This is the ' +
            'first thing to check and it is right most of the time.'
    },

    /* --------------------------------------------------------------- 13 */
    {
      id: 'margin',
      title: 'Margin and the shorthand',
      body: [
        { table: {
          head: ['Written as', 'Means'],
          rows: [
            ['<code>margin: 10px</code>', 'All four sides.'],
            ['<code>margin: 10px 20px</code>', 'Top and bottom, then left and right.'],
            ['<code>margin: 10px 20px 30px</code>', 'Top, then left and right, then bottom.'],
            ['<code>margin: 10px 20px 30px 40px</code>', 'Clockwise from the top: top, right, bottom, left.'],
            ['<code>margin: 0 auto</code>',
             'Centres a block element that has a width. <code>auto</code> splits the leftover ' +
             'space equally.'],
            ['Negative margin', 'Pulls elements toward each other and can overlap them. Legal, occasionally useful, a smell if you need it often.'],
            ['<code>margin-inline</code> / <code>margin-block</code>',
             'Logical equivalents: inline is left and right in English, block is top and bottom.']
          ]
        }},

        'Clockwise from the top is the pattern for <code>margin</code>, ' +
        '<code>padding</code>, <code>border-width</code> and <code>border-radius</code> ' +
        'alike. Learn it once.'
      ],
      playground: {
        title: 'Shorthand and auto',
        height: 300,
        tryThis: 'Delete <code>width: 240px</code> from the centred box. It stops centring — ' +
                 '<code>margin: 0 auto</code> needs a width to have any leftover space to ' +
                 'split.',
        html: `
<div class="b one">margin: 10px 20px</div>
<div class="b two">margin: 10px 20px 30px 40px</div>
<div class="b centre">margin: 0 auto, width 240px</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px;
       background: #eceff3; }
.b { background: #0f766e; color: #fff; padding: 10px; }

.one    { margin: 10px 20px; }
.two    { margin: 10px 20px 30px 40px; }
.centre { width: 240px; margin: 0 auto; }
`
      }
    },

    /* --------------------------------------------------------------- 14 */
    {
      id: 'margin-collapsing',
      title: 'Margin collapsing',
      body: [
        'Adjacent vertical margins between block elements <strong>merge into one</strong>, ' +
        'taking the larger of the two rather than the sum. A 30px bottom margin next to a ' +
        '20px top margin gives 30px of space, not 50.',

        'It also happens between a parent and its first or last child, which is why a child’s ' +
        'margin can appear to push the <em>parent</em> down — the single most confusing gap ' +
        'in CSS.',

        { list: [
          'Collapsing only affects <strong>vertical</strong> margins in normal flow.',
          'It <strong>never</strong> happens inside flexbox or grid.',
          'Stop it by adding padding or a border to the parent, or ' +
          '<code>display: flow-root</code>, or <code>overflow: hidden</code>.',
          'The modern answer: use <code>gap</code> in flex or grid and stop fighting margins ' +
          'entirely.'
        ]}
      ],
      playground: {
        title: 'The mystery gap',
        height: 360,
        tryThis: 'The top card has a gap above it that nothing in the card asked for — the ' +
                 'h3 inside is pushing its own parent down. Add <code>display: flow-root</code> ' +
                 'to <code>.card</code> and it snaps into place. The second pair shows 30 and ' +
                 '20 giving 30, not 50.',
        html: `
<div class="card">
  <h3>Where did this gap come from?</h3>
</div>

<div class="pair">
  <p class="a">30px bottom margin</p>
  <p class="b">20px top margin</p>
</div>
<p class="note">The space between them is 30px, not 50px.</p>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; background: #eceff3; }

.card { background: #fff; border-radius: 8px; }
.card h3 { margin: 24px; }        /* this margin escapes the card */

.pair { background: #fff; border: 1px solid #dfe3e8; }
.a { margin: 0 0 30px; background: #e3f2f0; padding: 6px; }
.b { margin: 20px 0 0; background: #e2ebfa; padding: 6px; }
.note { color: #5b6672; }
`
      },
      trap: 'Unexplained vertical space is margin collapsing, a default margin on ' +
            '<code>&lt;p&gt;</code> or <code>&lt;h1&gt;</code> that you never cleared, or ' +
            'inline-block whitespace. In that order of likelihood.'
    },

    /* --------------------------------------------------------------- 15 */
    {
      id: 'padding-border-outline',
      title: 'Padding, border and outline',
      body: [
        { table: {
          head: ['Property', 'Notes'],
          rows: [
            ['<code>padding</code>',
             'Same shorthand pattern as margin. Cannot be negative. Increases the clickable ' +
             'area, which is why buttons should use padding rather than a fixed height.'],
            ['<code>border: 1px solid #ccc</code>',
             'Width, style, colour. <strong>Without a style the border does not appear at ' +
             'all</strong> — a genuinely common five-minute bug.'],
            ['Border styles', '<code>solid</code>, <code>dashed</code>, <code>dotted</code>, <code>double</code>, <code>none</code>.'],
            ['<code>border-radius: 8px</code>',
             '<code>50%</code> makes a circle from a square. Two values per corner give an ' +
             'ellipse: <code>50% / 20%</code>.'],
            ['<code>border-radius: 10px 0 0 10px</code>', 'Clockwise from top-left.'],
            ['<code>outline</code>',
             'Drawn <em>outside</em> the border, takes no space in layout, and does not move ' +
             'siblings. This is exactly why it is the right tool for focus rings.'],
            ['<code>outline-offset: 3px</code>', 'Pushes the outline away from the element.']
          ]
        }},

        'One border trick worth knowing for the exam: a coloured stripe down the left of a ' +
        'card is <code>border-left: 4px solid</code>, not a positioned div. Prototypes ' +
        '<em>UIU CareerHub</em> and <em>United Kitchen</em> both use it.'
      ],
      playground: {
        title: 'Borders, radius and outline',
        height: 340,
        tryThis: 'Delete the word <code>solid</code> from the first card. The border vanishes ' +
                 'entirely — width and colour mean nothing without a style. Then compare how ' +
                 'the outline and the border affect the spacing around the last box.',
        html: `
<div class="card stripe">border-left stripe</div>
<div class="card round">border-radius: 10px 0 0 10px</div>
<div class="card ring">outline, offset 3px</div>
<div class="avatar">JS</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
.card {
  background: #fff;
  border: 1px solid #dfe3e8;
  padding: 12px;
  margin-bottom: 12px;
}
.stripe { border-left: 4px solid #205bcb; }
.round  { border-radius: 10px 0 0 10px; }
.ring   { outline: 3px solid #0f766e; outline-offset: 3px; }

/* 50% turns a square into a circle */
.avatar {
  width: 48px; aspect-ratio: 1;
  border-radius: 50%;
  background: #536ffe; color: #fff;
  display: grid; place-items: center;
  font-weight: 700;
}
`
      }
    },

    /* --------------------------------------------------------------- 16 */
    {
      id: 'units',
      title: 'Units',
      body: [
        { table: {
          head: ['Unit', 'Relative to', 'Use for'],
          rows: [
            ['<code>px</code>', 'Nothing.', 'Borders, small fixed details, shadows.'],
            ['<code>%</code>',
             'The parent — though padding and margin percentages resolve against the parent ' +
             '<em>width</em>, even vertically.', 'Fluid widths.'],
            ['<code>em</code>', 'The font-size of the element itself.', 'Padding that should scale with the component’s own text.'],
            ['<code>rem</code>', 'The root font-size, 16px by default.', 'Font sizes, spacing, breakpoints. Your default unit.'],
            ['<code>ch</code>', 'The width of the "0" character.', '<code>max-width: 65ch</code> is the classic readable measure.'],
            ['<code>vw</code> / <code>vh</code>', '1% of the viewport.', 'Hero sections, full-screen panels.'],
            ['<code>dvh</code> / <code>svh</code> / <code>lvh</code>', 'Dynamic, small and large viewport height.',
             'Mobile, where <code>100vh</code> is famously wrong because of the browser toolbars.'],
            ['<code>vmin</code> / <code>vmax</code>', 'The smaller or larger viewport dimension.', 'Elements that must fit in either orientation.'],
            ['<code>fr</code>', 'A fraction of the free space in a grid.', 'Grid tracks only.']
          ]
        }},

        '<code>em</code> compounds and <code>rem</code> does not. Nested elements each ' +
        'multiplying by <code>1.2em</code> reach absurd sizes within four levels. Use ' +
        '<code>rem</code> for type, and <code>em</code> only where scaling with the local ' +
        'text is the actual point — button padding, for instance.'
      ],
      playground: {
        title: 'em compounds, rem does not',
        height: 320,
        tryThis: 'Both lists nest four levels deep. One uses <code>em</code> and runs away; ' +
                 'the other uses <code>rem</code> and stays put. Change the ' +
                 '<code>font-size</code> on <code>html</code> and watch every rem value move ' +
                 'together — that is what makes rem the accessible choice.',
        html: `
<ul class="em"><li>1.2em
  <ul><li>1.2em<ul><li>1.2em<ul><li>1.2em</li></ul></li></ul></li></ul>
</li></ul>

<ul class="rem"><li>1.05rem
  <ul><li>1.05rem<ul><li>1.05rem<ul><li>1.05rem</li></ul></li></ul></li></ul>
</li></ul>
`,
        css: `
html { font-size: 16px; }
body { font-family: system-ui, sans-serif; }

.em  li { font-size: 1.2em; color: #b4541b; }
.rem li { font-size: 1.05rem; color: #0f766e; }
`
      },
      trap: '<code>100vh</code> is too tall on a phone because the browser bar is counted. ' +
            'Use <code>100dvh</code>.'
    },

    /* --------------------------------------------------------------- 17 */
    {
      id: 'value-types',
      title: 'Other value types',
      body: [
        { table: {
          head: ['Type', 'Examples'],
          rows: [
            ['Angle', '<code>deg</code>, <code>rad</code>, <code>turn</code>. <code>0.25turn</code> = <code>90deg</code>.'],
            ['Time', '<code>s</code>, <code>ms</code>. Both valid; <code>0.3s</code> = <code>300ms</code>.'],
            ['Resolution', '<code>dpi</code>, <code>dppx</code>, used in media queries for retina screens.'],
            ['Unitless', '<code>line-height: 1.5</code>, <code>opacity: .5</code>, <code>z-index: 10</code>, <code>flex-grow: 1</code>.'],
            ['Zero', '<code>0</code> needs no unit. <code>0px</code> and <code>0</code> are identical.']
          ]
        }},

        'The one that bites is <code>line-height</code>. Unitless multiplies each element’s ' +
        'own font-size; a unit is inherited as a fixed value and crushes any child with ' +
        'larger text. Always unitless.'
      ]
    },

    /* --------------------------------------------------------------- 18 */
    {
      id: 'colour',
      title: 'Colour',
      body: [
        { table: {
          head: ['Notation', 'Example', 'Notes'],
          rows: [
            ['Keyword', '<code>red</code>, <code>tomato</code>', '148 names. Fine for prototypes.'],
            ['Hex', '<code>#0096FF</code>', 'Two hex digits each for red, green, blue.'],
            ['Hex short', '<code>#09F</code>', 'Expands to <code>#0099FF</code>. Only when both digits of each pair match.'],
            ['Hex with alpha', '<code>#0096FF80</code>', 'Eight digits; the last pair is opacity. <code>80</code> is roughly 50%.'],
            ['<code>rgb()</code>', '<code>rgb(0 150 255 / 50%)</code>', 'Modern syntax uses spaces and a slash for alpha.'],
            ['<code>hsl()</code>', '<code>hsl(210 100% 50%)</code>',
             'Hue 0–360, saturation, lightness. The best notation for building a palette by ' +
             'hand: hold the hue, change the lightness.'],
            ['<code>oklch()</code>', '<code>oklch(70% 0.15 240)</code>',
             'Perceptually uniform: two colours with the same lightness number actually look ' +
             'equally bright.'],
            ['<code>currentColor</code>', '<code>border: 1px solid currentColor</code>',
             'The element’s own colour. Set it once and let borders and SVG fills follow.'],
            ['<code>color-mix()</code>', '<code>color-mix(in oklch, blue 30%, white)</code>',
             'Blend two colours in CSS, no preprocessor. Ideal for hover shades.']
          ]
        }},

        { callout: { kind: 'tip', title: 'This is the exam section',
          text: 'Eight of the twelve past papers print hex codes on the prototype with red ' +
                'arrows. <strong>Those are marks.</strong> The first thing to do after ' +
                'reading the paper is copy every annotated code into a ' +
                '<code>:root</code> block as a custom property. Then no colour is ever ' +
                'looked up twice, and changing one is a one-line edit rather than a hunt ' +
                'through the file.' }}
      ],
      playground: {
        title: 'A palette in :root',
        height: 340,
        tryThis: 'This is the annotated palette from <em>Slot 2, Q1</em>, transcribed exactly ' +
                 'as you would in the first two minutes of the exam. Change one value and ' +
                 'every swatch using it follows. That is the whole argument for doing this ' +
                 'first.',
        html: `
<div class="sw" style="--c: var(--sidebar)">#0d3e86 sidebar</div>
<div class="sw" style="--c: var(--pictures)">#6b63ff Pictures</div>
<div class="sw" style="--c: var(--documents)">#0db0d7 Documents</div>
<div class="sw" style="--c: var(--videos)">#ea6aa8 Videos</div>
<div class="sw" style="--c: var(--audio)">#2c74db Audio</div>
`,
        css: `
:root {
  --sidebar:   #0d3e86;
  --pictures:  #6b63ff;
  --documents: #0db0d7;
  --videos:    #ea6aa8;
  --audio:     #2c74db;
}

body { font-family: system-ui, sans-serif; font-size: 13px; }
.sw {
  background: var(--c);
  color: #fff;
  padding: 14px;
  border-radius: 8px;
  margin-bottom: 8px;
  font-family: ui-monospace, monospace;
}
`
      }
    },

    /* --------------------------------------------------------------- 19 */
    {
      id: 'opacity-vs-alpha',
      title: 'Opacity against alpha',
      body: [
        '<code>opacity: .5</code> fades the element <em>and every child</em>, including its ' +
        'text. <code>background: rgb(0 0 0 / .5)</code> fades only that background layer, ' +
        'leaving the text fully opaque.',

        'Choosing the wrong one is why overlay text so often looks washed out — and it is a ' +
        'real risk in the exam, because several prototypes have a translucent pill sitting on ' +
        'a coloured card.'
      ],
      playground: {
        title: 'Which one fades the text',
        height: 300,
        tryThis: 'Both cards want a translucent white pill. One uses <code>opacity</code> and ' +
                 'the label goes grey and hard to read; the other uses an alpha background ' +
                 'and the text stays crisp. This exact pill appears on the CORE-TECH stat ' +
                 'cards.',
        html: `
<div class="card">
  <p class="label">Total Users</p>
  <p class="value">12,450</p>
  <p class="pill bad">opacity: .25</p>
</div>

<div class="card">
  <p class="label">Total Users</p>
  <p class="value">12,450</p>
  <p class="pill good">rgb(255 255 255 / .25)</p>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px;
       display: flex; gap: 12px; }
.card { background: #1975d1; color: #fff; padding: 14px;
        border-radius: 8px; flex: 1; }
.label { margin: 0; font-size: 11px; font-weight: 700; }
.value { margin: 4px 0 12px; font-size: 26px; font-weight: 800; }

.pill { margin: 0; padding: 6px; border-radius: 4px;
        text-align: center; font-size: 11px; font-weight: 700; }

.bad  { background: #fff; opacity: .25; }
.good { background: rgb(255 255 255 / .25); }
`
      }
    },

    /* --------------------------------------------------------------- 20 */
    {
      id: 'palette-method',
      title: 'A workable palette method',
      body: [
        { list: [
          'Pick one brand hue. Generate light and dark variants by changing <em>only the ' +
          'lightness</em> in <code>hsl()</code> or <code>oklch()</code>.',
          'You need far fewer greys than you think: a background, a surface, a border, a ' +
          'muted text and a body text. Five.',
          'Check contrast: 4.5:1 for body text, 3:1 for large text and for interface borders.',
          'Store every colour as a custom property from day one, so dark mode is a one-line ' +
          'switch rather than a rewrite.'
        ], ordered: true },

        'This site follows exactly that: five greys, one brand hue, and dark mode implemented ' +
        'by redefining nine variables and not one component rule.'
      ],
      playground: {
        title: 'One hue, many lightnesses',
        height: 300,
        tryThis: 'Change the <code>--h</code> value once at the top. The whole scale moves ' +
                 'together and stays coherent, because only the lightness differs between ' +
                 'the steps. Try 210 for blue, 25 for orange, 150 for green.',
        html: `
<div class="s" style="--l: 96%">96%</div>
<div class="s" style="--l: 88%">88%</div>
<div class="s" style="--l: 70%">70%</div>
<div class="s" style="--l: 50%">50%</div>
<div class="s" style="--l: 34%">34%</div>
<div class="s" style="--l: 20%">20%</div>
`,
        css: `
:root { --h: 175; --sat: 55%; }

body { font-family: system-ui, sans-serif; font-size: 13px; }
.s {
  background: hsl(var(--h) var(--sat) var(--l));
  color: hsl(var(--h) 60% 12%);
  padding: 12px;
  font-family: ui-monospace, monospace;
}
.s:nth-child(n+5) { color: hsl(var(--h) 40% 96%); }
`
      }
    },

    /* --------------------------------------------------------------- 21 */
    {
      id: 'typography',
      title: 'Typography',
      body: [
        { table: {
          head: ['Property', 'Notes'],
          rows: [
            ['<code>font-family</code>',
             'A stack. The browser walks left to right until it finds an installed font. ' +
             '<strong>Always end with a generic family</strong>: <code>serif</code>, ' +
             '<code>sans-serif</code>, <code>monospace</code>, <code>system-ui</code>.'],
            ['<code>font-size</code>', '<code>rem</code> for scalability.'],
            ['<code>font-weight</code>',
             '100 to 900 in hundreds. 400 normal, 500 medium, 600 semibold, 700 bold. The ' +
             'weight must exist in the font file or the browser fakes it badly.'],
            ['<code>line-height</code>', 'Unitless. 1.4–1.7 for body text, 1.1–1.25 for large headings.'],
            ['<code>letter-spacing</code>',
             'Slight positive tracking helps uppercase text; negative tightens large headings.'],
            ['<code>text-align</code>',
             'Justified text without hyphenation makes ugly rivers; add <code>hyphens: auto</code>.'],
            ['<code>text-transform</code>',
             '<code>uppercase</code> changes appearance only, so the underlying text stays ' +
             'readable to screen readers. Use it for the small caps labels in the prototypes.'],
            ['<code>white-space: nowrap</code>', 'Stop wrapping. Useful on chips and buttons.'],
            ['<code>overflow-wrap: anywhere</code>', 'Break long unbroken strings such as URLs.'],
            ['<code>text-wrap: balance</code>', 'Evens out the lines of a heading so you never get one orphan word.']
          ]
        }}
      ],
      playground: {
        title: 'Type that reads like the prototypes',
        height: 340,
        tryThis: 'The eyebrow label is <code>uppercase</code> with positive ' +
                 '<code>letter-spacing</code> — that combination is what makes small labels ' +
                 'look designed rather than shouted. Set the spacing to 0 and the difference ' +
                 'is immediate.',
        html: `
<p class="eyebrow">System Configuration</p>
<h2 class="title">Launch Your Project, Faster.</h2>
<p class="body">The ultimate tool for modern teams. Join over 10,000
satisfied users who have streamlined their workflow.</p>
`,
        css: `
body { font-family: system-ui, sans-serif; }

.eyebrow {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #0f766e;
}
.title {
  margin: 0 0 10px;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -.02em;
  text-wrap: balance;
  max-width: 14ch;
}
.body {
  margin: 0;
  line-height: 1.6;
  color: #5b6672;
  max-width: 45ch;
}
`
      }
    },

    /* --------------------------------------------------------------- 22 */
    {
      id: 'font-shorthand',
      title: 'The font shorthand',
      body: [
        { code:
`font: italic 700 1.25rem/1.4 Roboto, sans-serif;
/*    style  weight size/line-height family        */` },

        'Size and family are mandatory. Everything you leave out is <strong>reset to its ' +
        'initial value</strong>, not left alone — so a <code>font</code> shorthand written ' +
        'after a <code>font-weight</code> silently wipes it.'
      ],
      trap: 'The shorthand resets every font property you do not list. If a weight or style ' +
            'mysteriously stops applying, look for a <code>font:</code> shorthand further ' +
            'down the file.'
    },

    /* --------------------------------------------------------------- 23 */
    {
      id: 'truncation',
      title: 'Truncation and clamping',
      body: [
        'Card text in a prototype is almost always cut off with an ellipsis. Two recipes ' +
        'cover every case.'
      ],
      playground: {
        title: 'Ellipsis and line clamp',
        height: 320,
        tryThis: 'Both need <code>overflow: hidden</code> to work. Remove it from either and ' +
                 'the text spills out. The three-line clamp is what the project cards in the ' +
                 '<em>Admin Dashboard</em> prototype are doing.',
        html: `
<p class="truncate">One line only, with an ellipsis when it runs out
of room to breathe.</p>

<p class="clamp">Three lines, then an ellipsis. Diam elitr kasd sed at
elitr sed ipsum justo dolor sed clita amet diam. Tempor erat elitr
rebum at clita, diam dolor diam ipsum sit, aliqu diam amet diam et
eos erat ipsum et lorem et sit.</p>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }
p { width: 260px; border: 1px dashed #dfe3e8; padding: 8px; }

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`
      }
    },

    /* --------------------------------------------------------------- 24 */
    {
      id: 'web-fonts',
      title: 'Web fonts',
      body: [
        { code:
`<!-- Google Fonts, pasted into <head> -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">` },

        { code:
`/* Or self-hosted: faster and private */
@font-face {
  font-family: "Inter";
  src: url("fonts/inter.woff2") format("woff2");
  font-weight: 100 900;      /* a variable font range */
  font-display: swap;        /* show fallback text immediately */
}` },

        { list: [
          'Use <code>woff2</code> only. Every browser you care about supports it and it is ' +
          'the smallest.',
          '<code>font-display: swap</code> avoids invisible text while the font loads.',
          'Load only the weights you use. Each extra weight is a separate download.',
          'For Bengali text, put a Bengali font in the stack: ' +
          '<code>font-family: "Noto Sans Bengali", "Hind Siliguri", sans-serif;</code>'
        ]},

        { callout: { kind: 'tip', title: 'In the exam, do not',
          text: 'No prototype is marked on its typeface. A Google Fonts link is a network ' +
                'request that may not resolve in an exam environment, and if it fails your ' +
                'whole page reflows. Write <code>font-family: system-ui, Arial, ' +
                'sans-serif</code> in the reset and spend the minutes on layout instead. ' +
                'Every walkthrough on this site does this.' }}
      ]
    },

    /* --------------------------------------------------------------- 25 */
    {
      id: 'backgrounds',
      title: 'Backgrounds',
      body: [
        { table: {
          head: ['Property', 'Values'],
          rows: [
            ['<code>background-color</code>', 'Any colour value.'],
            ['<code>background-image</code>', '<code>url()</code>, a gradient, or several comma-separated layers.'],
            ['<code>background-repeat</code>', '<code>no-repeat</code>, <code>repeat-x</code>, <code>space</code>, <code>round</code>.'],
            ['<code>background-position</code>', '<code>center</code>, <code>top left</code>, <code>50% 20%</code>.'],
            ['<code>background-size</code>',
             '<code>cover</code> fills and crops; <code>contain</code> fits and letterboxes.'],
            ['<code>background-clip: text</code>', 'Clips the background to the glyphs — gradient text.']
          ]
        }},

        { code:
`/* Shorthand: position/size after a slash */
background: #222 url("hero.jpg") center/cover no-repeat;

/* Multiple layers: the FIRST listed sits on TOP */
background:
  linear-gradient(rgb(0 0 0 / .6), rgb(0 0 0 / .6)),
  url("hero.jpg") center/cover;` },

        'That second pattern — a flat translucent gradient over a photo — is how you get ' +
        'readable white text on any image, and it is the correct answer to a hero section ' +
        'with text over a photograph.'
      ],
      trap: 'A gradient is an <em>image</em>. Putting one in <code>background-color</code> ' +
            'does nothing at all, silently. It belongs in <code>background-image</code>, or ' +
            'in the <code>background</code> shorthand.'
    },

    /* --------------------------------------------------------------- 26 */
    {
      id: 'gradients',
      title: 'Gradients',
      body: [
        'Worth more attention than the other decorative properties, because ' +
        '<strong>prototype 252 is effectively a gradient exam</strong> — nearly every ' +
        'coloured surface on both of its questions is a two- or three-stop gradient rather ' +
        'than a flat fill.',

        { table: {
          head: ['Function', 'Example'],
          rows: [
            ['<code>linear-gradient</code>', '<code>linear-gradient(to right, #ff6a00, #ee0979)</code>'],
            ['with an angle', '<code>linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)</code>'],
            ['<code>radial-gradient</code>', '<code>radial-gradient(circle at 30% 30%, #fff, #999)</code>'],
            ['<code>conic-gradient</code>', '<code>conic-gradient(from 0deg, red, yellow, green, red)</code>'],
            ['repeating', '<code>repeating-linear-gradient(45deg, #eee 0 10px, #ddd 10px 20px)</code>']
          ]
        }},

        'Angles run clockwise from "to top". <code>0deg</code> points up, ' +
        '<code>90deg</code> points right, <code>135deg</code> points down-right — which is ' +
        'the one that reads as a natural highlight and is what most of the prototype cards use.'
      ],
      playground: {
        title: 'Gradients, including the 252 sidebar',
        height: 360,
        tryThis: 'The last panel is the three-stop sidebar from <em>252 Q2</em>: teal at the ' +
                 'top, blue in the middle, pale at the bottom. It is one declaration, not ' +
                 'three stacked divs. Move the middle stop percentage and watch the blend ' +
                 'point slide.',
        html: `
<div class="g linear">linear 135deg</div>
<div class="g radial">radial</div>
<div class="g conic">conic</div>
<div class="g stripes">repeating</div>
<div class="g sidebar">three stops</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 12px;
       display: flex; gap: 8px; }
.g {
  flex: 1; height: 220px; border-radius: 8px;
  padding: 8px; color: #fff; font-weight: 600;
}

.linear  { background: linear-gradient(135deg, #00c6ff, #0072ff); }
.radial  { background: radial-gradient(circle at 30% 30%, #ea6aa8, #6b63ff); }
.conic   { background: conic-gradient(from 0deg, #f97316, #fdebc0, #f97316); }
.stripes { background: repeating-linear-gradient(45deg,
             #0f766e 0 10px, #14867d 10px 20px); }

/* Prototype 252 Q2, sidebar */
.sidebar { background: linear-gradient(180deg,
             #5ed4c8 0%, #8fb6e8 55%, #b9c9e8 100%); }
`
      }
    },

    /* --------------------------------------------------------------- 27 */
    {
      id: 'shadows',
      title: 'Shadows',
      body: [
        { table: {
          head: ['Syntax', 'Meaning'],
          rows: [
            ['<code>box-shadow: 0 2px 4px rgb(0 0 0 / .1)</code>', 'x-offset, y-offset, blur, colour.'],
            ['<code>box-shadow: 0 2px 4px 2px #0002</code>', 'The fourth length is <em>spread</em>, which grows the shadow before blurring.'],
            ['<code>box-shadow: inset 0 1px 2px #0003</code>', '<code>inset</code> draws the shadow inside the box.'],
            ['Comma separated', 'Layer a tight dark shadow over a wide soft one for realistic depth.'],
            ['<code>text-shadow: 0 1px 2px #0006</code>', 'Same idea, no spread value.']
          ]
        }},

        'The realistic-depth recipe: stack two or three shadows with increasing blur and ' +
        'decreasing opacity, and keep the x offset at 0. A single hard black shadow always ' +
        'looks like 2004 — <em>except</em> when it is deliberate, which brings us to the ' +
        'third card below.'
      ],
      playground: {
        title: 'Soft depth, and the hard offset shadow',
        height: 320,
        tryThis: 'The third card is the deliberate hard shadow from <em>251 Q1</em>: no blur, ' +
                 'solid black, offset down and right. Set its blur to <code>10px</code> and ' +
                 'the whole style collapses — that one is meant to look flat and graphic.',
        html: `
<div class="c one">single flat shadow</div>
<div class="c two">stacked, soft</div>
<div class="c three">hard offset, no blur</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px;
       display: flex; gap: 20px; padding: 20px; background: #f6f7f9; }
.c { flex: 1; background: #fff; padding: 20px; border-radius: 8px; }

.one   { box-shadow: 3px 4px 5px rgb(0 0 0 / .4); }

.two   { box-shadow: 0 1px 2px rgb(16 25 35 / .07),
                     0 12px 28px rgb(16 25 35 / .10); }

/* Prototype 251 Q1 pricing cards */
.three { border-radius: 0;
         box-shadow: 10px 10px 0 #000; }
`
      }
    },

    /* --------------------------------------------------------------- 28 */
    {
      id: 'overflow',
      title: 'Overflow and visibility',
      body: [
        { table: {
          head: ['Property', 'Effect'],
          rows: [
            ['<code>overflow: hidden</code>',
             'Clips anything outside the box. Also creates a new block formatting context, ' +
             'which is why it accidentally fixes float and margin-collapse bugs.'],
            ['<code>overflow: auto</code>', 'Scrollbars only when needed. The right default for a scrollable panel.'],
            ['<code>overflow: clip</code>', 'Clips like hidden but does not become scrollable.'],
            ['<code>display: none</code>', 'Removed from layout entirely. Not read by screen readers. Cannot be transitioned.'],
            ['<code>visibility: hidden</code>', 'Invisible but still occupies its space. Can be transitioned.'],
            ['<code>opacity: 0</code>',
             'Invisible, occupies space, and is <strong>still clickable and focusable</strong>. ' +
             'Add <code>pointer-events: none</code> if that matters.']
          ]
        }},

        'Setting <code>overflow-x: visible</code> with <code>overflow-y: hidden</code> does ' +
        'not do what you expect — the visible axis silently becomes <code>auto</code>.'
      ],
      tip: '<code>overflow: hidden</code> on a card is also what makes a child’s background ' +
           'respect the parent’s <code>border-radius</code>. Without it, a coloured header ' +
           'inside a rounded card pokes square corners out — a small detail that appears in ' +
           'half the prototypes.'
    },

    /* --------------------------------------------------------------- 29 */
    {
      id: 'list-styling',
      title: 'List styling',
      body: [
        'Removing bullets takes <em>two</em> declarations, and forgetting the second is why a ' +
        'navigation bar so often sits mysteriously indented.'
      ],
      playground: {
        title: 'Bullets and indents',
        height: 320,
        tryThis: 'Delete <code>padding: 0</code> from <code>.nav</code>. The bullets are ' +
                 'already gone, but the list still sits 40px in — that indent is padding the ' +
                 'browser added for the bullets, and <code>list-style: none</code> does not ' +
                 'remove it.',
        html: `
<ul class="nav">
  <li><a href="#">Home</a></li>
  <li><a href="#">Jobs</a></li>
  <li><a href="#">Companies</a></li>
</ul>

<ul class="ticks">
  <li>Real-time collaboration</li>
  <li>Advanced reporting tools</li>
</ul>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }

.nav {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  gap: 20px;
}
.nav a { color: #205bcb; text-decoration: none; }

/* A custom marker, without ::before */
.ticks { list-style: none; padding: 0; }
.ticks li { padding-left: 22px; position: relative; margin-bottom: 6px; }
.ticks li::before {
  content: "\\2713";
  position: absolute; left: 0;
  color: #50ad50; font-weight: 700;
}
`
      }
    },

    /* --------------------------------------------------------------- 30 */
    {
      id: 'table-styling',
      title: 'Table styling essentials',
      body: [
        'Five declarations cover almost every table you will be asked to draw.',

        { code:
`table { border-collapse: collapse; width: 100%; }
th, td { padding: .6rem .8rem; text-align: left;
         border-bottom: 1px solid #e3e3e3; }
tbody tr:nth-child(even) { background: #fafafa; }
thead th { position: sticky; top: 0; background: #fff; }
table { table-layout: fixed; }   /* equal columns, faster rendering */` },

        'Prototype <em>252 Q2</em> needs the first three of those, plus a gradient on the ' +
        'rows. Note that a gradient on a <code>&lt;tr&gt;</code> is unreliable — put it on ' +
        'the cells, or on the table with <code>background-attachment</code> tricks. The ' +
        'walkthrough for that paper takes the simple route.'
      ],
      playground: {
        title: 'A styled table',
        height: 320,
        tryThis: 'Remove <code>border-collapse: collapse</code> and every border doubles. ' +
                 'Then switch the zebra rule from <code>even</code> to <code>odd</code>.',
        html: `
<table>
  <thead>
    <tr><th>Course</th><th>Code</th><th>Credit</th></tr>
  </thead>
  <tbody>
    <tr><td>Web Programming</td><td>CSE201</td><td>3.0</td></tr>
    <tr><td>Data Structures</td><td>CSE202</td><td>3.0</td></tr>
    <tr><td>Algorithms</td><td>CSE203</td><td>3.0</td></tr>
  </tbody>
</table>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 13px; }
table { border-collapse: collapse; width: 100%; }
th, td { padding: 10px 12px; text-align: left;
         border-bottom: 1px solid #e3e3e3; }
thead th {
  background: linear-gradient(90deg, #e08a4f, #d97742);
  color: #fff;
}
tbody tr:nth-child(even) { background: #fafafa; }
`
      }
    },

    /* --------------------------------------------------------------- 31 */
    {
      id: 'css-traps',
      title: 'Traps and tricks',
      body: [
        { table: {
          head: ['Symptom', 'Cause'],
          rows: [
            ['Element is wider than I set', '<code>box-sizing</code> is <code>content-box</code>. Set <code>border-box</code> globally.'],
            ['Space appears where I set none',
             'Vertical margins are collapsing, or a default margin on <code>&lt;p&gt;</code>, ' +
             '<code>&lt;h1&gt;</code> or <code>&lt;body&gt;</code> is still there.'],
            ['My style is ignored',
             'Something more specific wins. Check the Styles panel — overridden rules are ' +
             'shown struck through.'],
            ['Style ignored even though it is last',
             'A typo in the selector, a missing semicolon on the line above, or an invalid ' +
             'value dropped silently.'],
            ['line-height crushes nested text', 'A unit was used. Make it unitless.'],
            ['100vh is too tall on mobile', 'The browser bar is counted. Use <code>100dvh</code>.'],
            ['Text goes washed out over an image', '<code>opacity</code> used instead of an alpha background.'],
            ['Percentage height does nothing',
             'Percentage heights need a parent with a definite height. Use flex or grid instead.'],
            ['Gradient does not appear', 'It was put in <code>background-color</code>. Gradients are images.'],
            ['Square corners poke out of a rounded card', 'The card needs <code>overflow: hidden</code>.']
          ]
        }},

        { h: 'Tricks worth memorising' },

        { list: [
          '<code>* { outline: 1px solid red }</code> instantly reveals every box when a ' +
          'layout misbehaves.',
          '<code>max-width: 65ch</code> gives a comfortable reading length with no arithmetic.',
          '<code>color: currentColor</code> on borders and SVG makes theming a single ' +
          'property change.',
          '<code>:where()</code> for defaults means your later rules always win without ' +
          '<code>!important</code>.',
          '<code>aspect-ratio: 16 / 9</code> replaces the old padding-top percentage hack ' +
          'completely.',
          '<code>accent-color: teal</code> recolours native checkboxes, radios and range ' +
          'sliders in one line — worth remembering, because four prototypes have checkboxes.',
          '<code>inset: 0</code> is shorthand for all four offsets at zero.'
        ]},

        { callout: { kind: 'tip', title: 'What to carry forward from Part 2',
          text: 'The cascade is deterministic, not mysterious: origin, then layer, then ' +
                'specificity, then source order. Keep selectors flat and specificity low, set ' +
                '<code>box-sizing: border-box</code> once, use <code>rem</code> for type and ' +
                '<code>ch</code> for measure, and store every colour as a custom property. ' +
                'Parts 3 and 4 assume all of these habits.' }}
      ]
    }

  ]
});
