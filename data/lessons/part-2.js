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
    }

  ]
});
