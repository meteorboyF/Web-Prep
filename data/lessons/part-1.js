/* part-1.js — HTML5 Foundations.
   Sections 1 to 14 (document structure through media). Sections 15 onward —
   tables, forms, semantics, global attributes, traps — land in phase 3b. */

WP.lesson('part-1', {
  eyebrow: 'Part 1 of 5',
  title: 'HTML5 Foundations',
  blurb: 'Structure, semantics and media — the language of meaning, before any of it is ' +
         'made to look like anything.',
  next: { label: 'Part 2 · CSS fundamentals', href: 'lessons/part-2.html' },

  sections: [

    /* ---------------------------------------------------------------- 1 */
    {
      id: 'what-html-is',
      title: 'What HTML actually is',
      body: [
        'HTML is not a programming language. It has no variables, no logic, no loops. It is ' +
        'a markup language: you take content and wrap it in tags that say what each piece ' +
        '<em>means</em>. The browser decides how to draw it, and CSS overrides those decisions.',

        { table: {
          head: ['Layer', 'Job', 'The question it answers'],
          rows: [
            ['HTML', 'Structure and meaning', 'What is this content?'],
            ['CSS', 'Presentation', 'What does it look like?'],
            ['JavaScript', 'Behaviour', 'What happens when the user acts?']
          ]
        }},

        'The mental model that matters: the browser parses your HTML into a tree called the ' +
        'DOM. Every element becomes a node, nested exactly the way you nested your tags. ' +
        'CSS selectors walk that tree. JavaScript manipulates that tree. If your nesting is ' +
        'wrong, everything downstream is wrong — which is why the second step of every exam ' +
        'walkthrough on this site is to draw the boxes before styling anything.',

        { h: 'The rendering pipeline, in one paragraph' },

        'The browser downloads HTML and builds the DOM. It downloads CSS and builds the ' +
        'CSSOM. It merges them into a render tree, calculates the geometry of every box ' +
        '(<strong>layout</strong>), fills in the pixels (<strong>paint</strong>), and ' +
        'combines layers on the GPU (<strong>composite</strong>). Those four words are what ' +
        'let you reason about performance later: changing a width triggers layout, changing ' +
        'a colour only triggers paint, changing a transform only triggers composite. That is ' +
        'the whole reason Part 4 tells you to animate <code>transform</code> and ' +
        '<code>opacity</code> and nothing else.'
      ]
    },

    /* ---------------------------------------------------------------- 2 */
    {
      id: 'document-skeleton',
      title: 'The document skeleton',
      body: [
        'Every page starts here. In the exam you type this from memory in under a minute, ' +
        'and every mark after that depends on it being right.',

        { table: {
          head: ['Line', 'Why it exists'],
          rows: [
            ['<code>&lt;!DOCTYPE html&gt;</code>',
             'Switches the browser into standards mode. Without it you get quirks mode, ' +
             'where the box model silently reverts to 1990s rules. Not optional — see the ' +
             'playground below.'],
            ['<code>lang="en"</code>',
             'Tells screen readers which pronunciation rules to use. <code>lang="bn"</code> ' +
             'for Bengali.'],
            ['<code>&lt;meta charset="UTF-8"&gt;</code>',
             'The character encoding. Must appear in the first 1024 bytes. Without it, ' +
             'accented characters and even curly quotes render as mojibake.'],
            ['viewport meta',
             'Tells mobile browsers to use the real device width instead of pretending to be ' +
             'a 980px desktop. Without it every media query you write is ignored on phones.'],
            ['<code>&lt;title&gt;</code>',
             'Tab label, bookmark name, and the single biggest on-page SEO signal.'],
            ['<code>&lt;head&gt;</code> vs <code>&lt;body&gt;</code>',
             'Head holds metadata and resource links, all invisible. Body holds content.']
          ]
        }},

        { h: 'What the doctype actually does' },

        'This playground runs a complete document rather than a fragment, so the doctype is ' +
        'yours to delete. Both boxes ask for <code>width: 200px</code> with 20px of padding ' +
        'and a 4px border.',

        { playground: {
          doc: true,
          title: 'The doctype',
          height: 300,
          tryThis: 'Delete the first line. In quirks mode the browser computes width the way ' +
                   '<code>border-box</code> does, so the box shrinks to 200px and your ' +
                   'careful measurements are all wrong. Put the line back.',
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Standards mode</title>
</head>
<body>
  <div class="box">I should be 248px wide</div>
  <div class="ruler">200px</div>
</body>
</html>
`,
          css: `
body { font-family: system-ui, sans-serif; margin: 16px; }
.box {
  width: 200px;
  padding: 20px;
  border: 4px solid #0f766e;
  background: #e3f2f0;
}
.ruler {
  width: 200px;
  border-top: 2px dashed #b4541b;
  color: #b4541b;
  font-size: 12px;
  margin-top: 8px;
}
`
        }},

        { h: 'Where to put scripts' },

        { table: {
          head: ['Form', 'Behaviour'],
          rows: [
            ['<code>&lt;script src="a.js"&gt;</code>',
             'Blocks HTML parsing while downloading and executing. Avoid in the head.'],
            ['<code>&lt;script src="a.js" defer&gt;</code>',
             'Downloads in parallel, executes after the HTML is parsed, in document order. ' +
             'This is the default you want.'],
            ['<code>&lt;script src="a.js" async&gt;</code>',
             'Downloads in parallel, executes the instant it arrives, order not guaranteed. ' +
             'Only for independent things.'],
            ['<code>&lt;script type="module"&gt;</code>',
             'ES modules. Deferred by default and always strict mode — but they will not ' +
             'load from <code>file://</code>, which is why this site does not use them.']
          ]
        }}
      ],
      tip: 'Stylesheets in the head, scripts with <code>defer</code>. That gives you styled ' +
           'content as early as possible and never blocks the parser.'
    },

    /* ---------------------------------------------------------------- 3 */
    {
      id: 'syntax-rules',
      title: 'Syntax rules in full',
      body: [
        { list: [
          '<strong>Most elements come in pairs.</strong> <code>&lt;p&gt;text&lt;/p&gt;</code>.',
          '<strong>Void elements never close.</strong> <code>&lt;img&gt;</code>, ' +
          '<code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;input&gt;</code>, ' +
          '<code>&lt;meta&gt;</code>, <code>&lt;link&gt;</code>, <code>&lt;source&gt;</code>. ' +
          'Writing <code>&lt;img /&gt;</code> is legal but the slash does nothing in HTML5.',
          '<strong>Nesting must not overlap.</strong> The browser will silently repair ' +
          '<code>&lt;p&gt;&lt;strong&gt;x&lt;/p&gt;&lt;/strong&gt;</code> into something you ' +
          'did not intend.',
          '<strong>Attributes go in the opening tag only</strong>, as ' +
          '<code>name="value"</code>. Quotes are technically optional without spaces. ' +
          'Always quote.',
          '<strong>Tag names are case insensitive</strong> but write them lowercase. Class ' +
          'names and ids <em>are</em> case sensitive.',
          '<strong>Whitespace collapses.</strong> Any run of spaces, tabs and newlines ' +
          'becomes one space on screen. Indent freely; it costs nothing visually.',
          '<strong>Boolean attributes have no value.</strong> <code>required</code>, ' +
          '<code>disabled</code>, <code>checked</code>, <code>hidden</code>. Presence is ' +
          'true, absence is false.'
        ]},

        { playground: {
          title: 'Syntax rules',
          height: 300,
          tryThis: 'Three things to try. Set <code>disabled="false"</code> on the button — ' +
                   'it stays disabled, because the value is meaningless. Add a stray ' +
                   '<code>&lt;/div&gt;</code> and watch nothing happen. Then break the ' +
                   'nesting on the strong tag and inspect what the browser silently rebuilt.',
          html: `
<p>Whitespace     collapses      to one space,
   even   across
   lines.</p>

<pre>Inside pre it does not.
   Every space survives.</pre>

<p>Correct nesting: <strong>bold <em>and italic</em></strong></p>

<button disabled="false">Boolean attributes ignore their value</button>

<hr>
<p>Void elements<br>never close.</p>
`,
          css: `
body { font-family: system-ui, sans-serif; }
pre { background: #f4f6f8; padding: 8px; }
button { padding: 6px 12px; }
`
        }},

        { h: 'Comments' },

        'Comments are visible in "View Source", so never put anything sensitive in them. ' +
        'Their most useful job is labelling the end of a long section — ' +
        '<code>&lt;!-- /site-header --&gt;</code> — which you will be grateful for when a ' +
        'prototype has six nested divs closing in a row.'
      ],
      trap: 'A <code>&lt;p&gt;</code> cannot contain a <code>&lt;div&gt;</code> or another ' +
            '<code>&lt;p&gt;</code>. The parser closes the paragraph for you at the point ' +
            'the block element starts, and your CSS then targets a structure that no longer ' +
            'exists. This is a genuinely confusing hour to lose.'
    },

    /* ---------------------------------------------------------------- 4 */
    {
      id: 'entities',
      title: 'Character entities',
      body: [
        'Some characters have to be escaped because they are part of the syntax. Others are ' +
        'simply easier to type as an entity than to find on a keyboard.',

        { table: {
          head: ['Entity', 'Renders', 'When you need it'],
          rows: [
            ['<code>&amp;lt;</code> <code>&amp;gt;</code>', '&lt; &gt;', 'Showing HTML code on a page'],
            ['<code>&amp;amp;</code>', '&amp;', 'Ampersands, especially inside URLs and attributes'],
            ['<code>&amp;quot;</code> <code>&amp;apos;</code>', '" \'', 'Quotes inside attribute values'],
            ['<code>&amp;nbsp;</code>', 'a space that never breaks', 'Stop a line breaking between two words, e.g. 10 kg'],
            ['<code>&amp;copy;</code> <code>&amp;reg;</code> <code>&amp;trade;</code>', '© ® ™', 'Footers and legal lines'],
            ['<code>&amp;times;</code> <code>&amp;middot;</code> <code>&amp;hellip;</code>', '× · …', 'Close buttons, separators, truncation'],
            ['<code>&amp;#8594;</code>', '→', 'Any Unicode code point by number']
          ]
        }},

        'That last row is worth remembering for the exam. Several of the past prototypes use ' +
        'arrows and chevrons as buttons. A numbered entity costs one line; hunting for an ' +
        'icon font costs ten minutes you do not have.'
      ],
      playground: {
        title: 'Character entities',
        height: 220,
        tryThis: 'Replace <code>&amp;lt;</code> on the first line with a literal ' +
                 '<code>&lt;</code>. The browser tries to read it as a tag and the rest of ' +
                 'the line vanishes — which is exactly why the entity exists.',
        html: `
<p>Showing code: &lt;p&gt;hello&lt;/p&gt;</p>
<p>Ampersand in a URL: ?a=1&amp;b=2</p>
<p>Non-breaking space: 10&nbsp;kg never splits</p>
<p>Legal line: &copy; 2026 &middot; UIU &trade;</p>
<p>Close: &times; &nbsp; Next: &#8594; &nbsp; More: &hellip;</p>
<p>Chevrons for a carousel: &lsaquo; &rsaquo;</p>
`
      }
    },

    /* ---------------------------------------------------------------- 5 */
    {
      id: 'headings',
      title: 'Headings are an outline, not font sizes',
      body: [
        '<code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code> create a document outline. ' +
        'Screen reader users navigate a page by jumping between headings, so a broken ' +
        'heading order is a broken page.',

        { list: [
          'One <code>&lt;h1&gt;</code> per page, describing what the page is about.',
          'Never skip a level going down. <code>h2</code> then <code>h4</code> is wrong. ' +
          'Skipping back upward is fine.',
          'If a heading looks too big, fix it in CSS. Never pick <code>&lt;h4&gt;</code> ' +
          'because it happens to look right.'
        ]},

        { playground: {
          title: 'Headings',
          height: 300,
          tryThis: 'The second card uses <code>&lt;h4&gt;</code> purely because it looked ' +
                   'the right size. Change it to <code>&lt;h2&gt;</code> and add ' +
                   '<code>.card h2 { font-size: 1rem; }</code> — same appearance, correct ' +
                   'outline. That is the whole lesson.',
          html: `
<h1>UIU Housing Society</h1>

<section class="card">
  <h2>Find a flat</h2>
  <p>Correct: h1 then h2.</p>
</section>

<section class="card">
  <h4>Contact the office</h4>
  <p>Wrong: h2 then h4 skips a level.</p>
</section>
`,
          css: `
body { font-family: system-ui, sans-serif; }
h1 { font-size: 1.6rem; }
.card {
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
}
.card h2, .card h4 { margin: 0 0 4px; }
`
        }}
      ],
      trap: 'Choosing a heading level by how big it looks is the most common accessibility ' +
            'mistake in student work, and it is invisible until someone tries to navigate ' +
            'the page without a mouse.'
    },

    /* ---------------------------------------------------------------- 6 */
    {
      id: 'paragraphs',
      title: 'Paragraphs, breaks and rules',
      body: [
        { table: {
          head: ['Element', 'Meaning'],
          rows: [
            ['<code>&lt;p&gt;</code>',
             'A paragraph. Has default top and bottom margin. Cannot contain block elements.'],
            ['<code>&lt;br&gt;</code>',
             'A line break that is <em>part of the content</em>, such as in an address or a ' +
             'poem. Never use it to create vertical space; that is what margin is for.'],
            ['<code>&lt;hr&gt;</code>',
             'A thematic break between sections. Style it with <code>border</code>, not ' +
             'with <code>height</code>.'],
            ['<code>&lt;pre&gt;</code>',
             'Preformatted: preserves every space and newline, uses a monospace font.'],
            ['<code>&lt;blockquote cite="url"&gt;</code>', 'A quoted passage from another source.'],
            ['<code>&lt;q&gt;</code>', 'A short inline quote. The browser adds the quotation marks.']
          ]
        }},

        'One exam-relevant use of <code>&lt;br&gt;</code>: when a prototype shows a heading ' +
        'deliberately broken across two lines at a specific word, that is a ' +
        '<code>&lt;br&gt;</code>, not wrapping. Prototype <em>UIU Book Share Hub</em> has ' +
        'exactly this — "Book" on one line, "Categories" on the next. One second of work if ' +
        'you recognise it, five minutes of fighting <code>width</code> if you do not.'
      ],
      playground: {
        title: 'Paragraphs and breaks',
        height: 300,
        tryThis: 'Delete the two <code>&lt;br&gt;</code> tags in the address. It collapses ' +
                 'onto one line, because the newlines in your source are only whitespace. ' +
                 'Then try adding <code>&lt;br&gt;&lt;br&gt;</code> between the paragraphs ' +
                 'to make a gap, and compare it with what <code>margin</code> gives you.',
        html: `
<h2>Book<br>Categories</h2>
<p>The break above is deliberate, not wrapping.</p>

<address>
  United International University<br>
  Madani Avenue, Badda<br>
  Dhaka 1212
</address>

<hr>

<blockquote>Structure first, styling second.</blockquote>
`,
        css: `
body { font-family: system-ui, sans-serif; }
h2 { margin: 0 0 8px; line-height: 1.15; }
address { font-style: normal; color: #5b6672; }
hr { border: 0; border-top: 1px solid #dfe3e8; margin: 16px 0; }
blockquote {
  margin: 0;
  border-left: 3px solid #0f766e;
  padding-left: 12px;
  color: #5b6672;
}
`
      }
    },

    /* ---------------------------------------------------------------- 7 */
    {
      id: 'inline-elements',
      title: 'Inline semantic elements',
      body: [
        'These live inside a line of text. Several pairs look identical on screen — the ' +
        'difference is meaning, and meaning is what assistive technology reads aloud.',

        { table: {
          head: ['Element', 'Renders as', 'Meaning'],
          rows: [
            ['<code>&lt;strong&gt;</code>', 'bold', 'Strong importance. Announced with emphasis.'],
            ['<code>&lt;b&gt;</code>', 'bold', 'Stylistically offset with no extra importance — a product name.'],
            ['<code>&lt;em&gt;</code>', 'italic', 'Stress emphasis. Changes the meaning of the sentence.'],
            ['<code>&lt;i&gt;</code>', 'italic', 'Alternate voice: a term, a foreign phrase, a thought.'],
            ['<code>&lt;mark&gt;</code>', 'highlight', 'Relevance in the current context, such as a search hit.'],
            ['<code>&lt;small&gt;</code>', 'smaller', 'Side comments and legal small print.'],
            ['<code>&lt;del&gt;</code> / <code>&lt;ins&gt;</code>', 'strike / underline', 'Removed and added content, such as a price change.'],
            ['<code>&lt;code&gt;</code>', 'monospace', 'A fragment of computer code.'],
            ['<code>&lt;sub&gt;</code> / <code>&lt;sup&gt;</code>', 'lowered / raised', 'H<sub>2</sub>O, x<sup>2</sup>, footnote markers.'],
            ['<code>&lt;abbr title="…"&gt;</code>', 'dotted underline', 'Abbreviation; <code>title</code> gives the expansion.'],
            ['<code>&lt;time datetime="…"&gt;</code>', 'plain text', 'A machine-readable date or time.'],
            ['<code>&lt;span&gt;</code>', 'nothing', 'The generic hook with zero meaning. Use when nothing else fits.']
          ]
        }},

        'The exam use for <code>&lt;span&gt;</code> is the two-tone logo, which appears in ' +
        'four of the twelve prototypes: <em>UIU <strong>CareerHub</strong></em>, ' +
        '<em>UIU <strong>Information</strong> Desk</em>. One word in a different colour is ' +
        'a span with a class, not two elements and not a flexbox.'
      ],
      playground: {
        title: 'Inline elements',
        height: 320,
        tryThis: 'The two-tone logo at the bottom is the pattern to memorise. Change the ' +
                 'span colour and add a <code>font-weight</code> — that is an exam logo done ' +
                 'in two lines.',
        html: `
<p><strong>Strong</strong> and <b>bold</b> look the same, mean
different things.</p>

<p><em>Emphasis</em> and <i>alternate voice</i>, likewise.</p>

<p>Search hit: the <mark>flat</mark> is available.</p>

<p>Price: <del>1200</del> <ins>950</ins> <small>per month</small></p>

<p>H<sub>2</sub>O and x<sup>2</sup>, and <abbr title="United
International University">UIU</abbr>.</p>

<h1 class="logo">UIU <span>CareerHub</span></h1>
`,
        css: `
body { font-family: system-ui, sans-serif; }
mark { background: #fdebc0; }
del { color: #8a8f96; }
ins { text-decoration: none; color: #1f6d4a; }

.logo { font-size: 1.5rem; color: #17202a; }
.logo span { color: #205bcb; }
`
      }
    },

    /* ---------------------------------------------------------------- 8 */
    {
      id: 'lists',
      title: 'Lists',
      body: [
        { list: [
          'Only <code>&lt;li&gt;</code> may be a direct child of <code>&lt;ul&gt;</code> or ' +
          '<code>&lt;ol&gt;</code>. Put anything else <em>inside</em> the ' +
          '<code>&lt;li&gt;</code>.',
          'Nest a list by placing the child <code>&lt;ul&gt;</code> inside the parent ' +
          '<code>&lt;li&gt;</code>, not between two of them.',
          'Navigation menus should be lists. A screen reader then announces "list, 5 items", ' +
          'which tells the user how much menu there is.',
          '<code>&lt;ol&gt;</code> takes <code>type</code> (1 a A i I), <code>start</code>, ' +
          'and <code>reversed</code>; <code>value</code> on an <code>&lt;li&gt;</code> jumps ' +
          'the counter.',
          '<code>&lt;dl&gt;</code> with <code>&lt;dt&gt;</code> and <code>&lt;dd&gt;</code> ' +
          'is for name/value pairs — a specification table, a glossary.'
        ]},

        'Every single one of the twelve past prototypes has a navigation bar. Every one of ' +
        'them should be a <code>&lt;ul&gt;</code> inside a <code>&lt;nav&gt;</code>. It ' +
        'costs no extra time and it is the semantically correct answer.'
      ],
      playground: {
        title: 'Lists',
        height: 320,
        tryThis: 'The nav is a list, styled flat. Remove ' +
                 '<code>list-style: none</code> <em>and</em> <code>padding: 0</code> one at ' +
                 'a time — you need both, because clearing the bullets does not clear the ' +
                 'indent the browser adds for them.',
        html: `
<nav>
  <ul class="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">Jobs</a></li>
    <li><a href="#">Companies</a></li>
  </ul>
</nav>

<ol start="3">
  <li>Third item, because start says so</li>
  <li>Fourth
    <ul><li>Nested inside the li, not between them</li></ul>
  </li>
</ol>

<dl>
  <dt>Credit</dt><dd>3.0</dd>
  <dt>Code</dt><dd>CSE 4165</dd>
</dl>
`,
        css: `
body { font-family: system-ui, sans-serif; }
.menu {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  display: flex;
  gap: 20px;
}
.menu a { color: #205bcb; text-decoration: none; }
dt { font-weight: 600; }
dd { margin: 0 0 6px 16px; color: #5b6672; }
`
      }
    },

    /* ---------------------------------------------------------------- 9 */
    {
      id: 'links-and-paths',
      title: 'Links and paths',
      body: [
        { table: {
          head: ['<code>href</code> value', 'Result'],
          rows: [
            ['<code>https://example.com</code>', 'Absolute URL, another site.'],
            ['<code>/about.html</code>',
             'Root relative: always from the <em>domain</em> root, wherever the current page ' +
             'sits. Read the trap below before using this.'],
            ['<code>about.html</code>', 'Document relative: a file beside the current one.'],
            ['<code>../about.html</code>', 'One folder up, then the file.'],
            ['<code>assets/img/a.png</code>', 'Down into assets, then img.'],
            ['<code>#section-id</code>', 'Jump to the element with that id on this page.'],
            ['<code>page.html#top</code>', 'Another page, scrolled to an anchor.'],
            ['<code>mailto:me@x.com</code>', 'Opens the mail client.'],
            ['<code>tel:+8801700000000</code>', 'Dials on mobile.'],
            ['<code>#</code>', 'A deliberate placeholder. An <em>empty</em> href reloads the page.']
          ]
        }},

        'Link text must make sense out of context. Screen reader users can list every link on ' +
        'a page; nine links all reading "click here" is an unusable page. Write "Download the ' +
        'syllabus (PDF)".'
      ],
      playground: {
        title: 'Paths',
        height: 260,
        tryThis: 'The anchor link at the top jumps to the section at the bottom. Change the ' +
                 '<code>href</code> to <code>#nope</code> and it stops working silently — ' +
                 'broken anchors never announce themselves, which is why you test them.',
        html: `
<p><a href="#contact">Skip to contact</a></p>

<p>Absolute: <a href="https://uiu.ac.bd">uiu.ac.bd</a></p>
<p>Beside this file: <a href="about.html">about.html</a></p>
<p>One folder up: <a href="../index.html">../index.html</a></p>
<p>Email: <a href="mailto:info@uiu.ac.bd">info@uiu.ac.bd</a></p>
<p>Phone: <a href="tel:+8801700000000">+880 1700 000000</a></p>

<p style="margin-top:180px" id="contact"><strong>Contact</strong> —
you arrived here from the anchor.</p>
`,
        css: `
body { font-family: system-ui, sans-serif; }
a { color: #205bcb; }
a:hover { color: #0f766e; }
`
      },
      trap: '<strong>The single most common "it worked locally" bug.</strong> A root-relative ' +
            'path like <code>/styles.css</code> points at the <em>domain</em> root. Deploy to ' +
            'a project subfolder — which is exactly what GitHub Pages does, and what this ' +
            'site does — and it resolves to <code>uiu.github.io/styles.css</code> instead of ' +
            '<code>uiu.github.io/Web-Prep/styles.css</code>, and every stylesheet 404s. It ' +
            'works perfectly on your laptop right up until it is live. Use <code>./</code> ' +
            'and <code>../</code>. Related: Linux servers are case sensitive and Windows is ' +
            'not, so <code>Styles.css</code> is another bug of the same shape.'
    },

    /* --------------------------------------------------------------- 10 */
    {
      id: 'link-attributes',
      title: 'Link attributes',
      body: [
        { table: {
          head: ['Attribute', 'Effect'],
          rows: [
            ['<code>target="_blank"</code>', 'Opens in a new tab.'],
            ['<code>rel="noopener noreferrer"</code>',
             'Add this to <em>every</em> <code>target="_blank"</code> link. Without ' +
             '<code>noopener</code> the new page can manipulate yours through ' +
             '<code>window.opener</code>.'],
            ['<code>download</code>',
             'Downloads instead of navigating. <code>download="name.pdf"</code> renames the file.'],
            ['<code>rel="nofollow"</code>',
             'Tells search engines not to pass ranking credit. For user-submitted links.'],
            ['<code>title=""</code>',
             'Tooltip on hover. Not available on touch and not reachable by keyboard, so ' +
             'never put essential information here.']
          ]
        }},

        'The <code>:hover</code>, <code>:focus-visible</code> and <code>:visited</code> ' +
        'states are CSS, covered in Part 2 — but note now that a link with no visible focus ' +
        'style is unusable by keyboard, and removing the outline without replacing it is the ' +
        'fastest way to fail an accessibility check.'
      ],
      playground: {
        title: 'Link states',
        height: 260,
        tryThis: 'Press <kbd>Tab</kbd> inside the preview to move between the links. Then ' +
                 'delete the <code>:focus-visible</code> rule and Tab again — you can still ' +
                 'move, but you can no longer see where you are. That is what removing a ' +
                 'focus ring does to someone.',
        html: `
<p><a href="https://uiu.ac.bd" target="_blank"
      rel="noopener noreferrer">External link (new tab)</a></p>

<p><a href="syllabus.pdf" download>Download the syllabus (PDF)</a></p>

<p><a class="btn" href="#">Looks like a button, still a link</a></p>
`,
        css: `
body { font-family: system-ui, sans-serif; }
a { color: #205bcb; text-underline-offset: 2px; }
a:hover { color: #0f766e; }
a:focus-visible { outline: 3px solid #0f766e; outline-offset: 3px; }

.btn {
  display: inline-block;
  background: #205bcb;
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
}
`
      },
      tip: 'A link navigates, a button acts. If clicking it changes the URL it is an ' +
           '<code>&lt;a href&gt;</code>; if it does something on the page it is a ' +
           '<code>&lt;button&gt;</code>. Styling one to look like the other is fine — using ' +
           'the wrong one is not.'
    },

    /* --------------------------------------------------------------- 11 */
    {
      id: 'images',
      title: 'Images, done properly',
      body: [
        { table: {
          head: ['Attribute', 'Why'],
          rows: [
            ['<code>alt</code>',
             'The text alternative. Describe the <em>purpose</em>, not the pixels. Purely ' +
             'decorative? Use <code>alt=""</code> — empty, not missing — so screen readers ' +
             'skip it. A <em>missing</em> alt makes the reader announce the filename.'],
            ['<code>width</code> / <code>height</code>',
             'Set the intrinsic pixel dimensions even when CSS resizes the image. The ' +
             'browser reserves the right space and the page stops jumping as images load.'],
            ['<code>loading="lazy"</code>',
             'Defers offscreen images. Never put it on your hero image — that delays the ' +
             'first thing the user sees.'],
            ['<code>decoding="async"</code>', 'Lets the browser decode off the main thread.']
          ]
        }},

        'The playground below deliberately points at files that do not exist, because a ' +
        'broken image is the clearest possible demonstration of what <code>alt</code> is for.',

        { playground: {
          title: 'alt text',
          height: 300,
          tryThis: 'Three images, none of which load. Notice what each one shows you: real ' +
                   'alt text, nothing at all, and a filename. Now imagine hearing these ' +
                   'read aloud instead of seeing them.',
          html: `
<figure>
  <img src="cat.jpg" alt="A ginger cat asleep on a windowsill"
       width="240" height="160">
  <figcaption>Good: describes the purpose</figcaption>
</figure>

<figure>
  <img src="swirl.png" alt="" width="240" height="160">
  <figcaption>Decorative: alt="" so it is skipped</figcaption>
</figure>

<figure>
  <img src="IMG_20260823_1147.jpg" width="240" height="160">
  <figcaption>Bad: no alt at all</figcaption>
</figure>
`,
          css: `
body { font-family: system-ui, sans-serif; }
figure { margin: 0 0 16px; }
img {
  display: block;
  border: 1px dashed #b4541b;
  background: #fdf0e7;
  color: #b4541b;
  font-size: 13px;
}
figcaption { font-size: 13px; color: #5b6672; margin-top: 4px; }
`
        }},

        { callout: { kind: 'tip', title: 'In the exam',
          text: 'Prototypes are full of photographs you do not have. Write ' +
                '<code>&lt;img src="hero.jpg" alt=""&gt;</code> and move on, or use a ' +
                'coloured <code>&lt;div&gt;</code> with a fixed <code>aspect-ratio</code>. ' +
                'The marks are for the layout around the image, never for the image. Every ' +
                'walkthrough on this site does exactly this.' }}
      ],
      trap: 'A page that jumps around while it loads is almost always images without ' +
            '<code>width</code> and <code>height</code> attributes. The browser cannot ' +
            'reserve space for something whose size it does not know yet.'
    },

    /* --------------------------------------------------------------- 12 */
    {
      id: 'responsive-images',
      title: 'Responsive images',
      body: [
        'Two different jobs, two different tools. This is one of the few topics that cannot ' +
        'be honestly demonstrated in a playground — it needs several real image files at ' +
        'several real sizes — so here it is as code, with what each part does.',

        { code:
`<!-- Same image, different sizes: let the browser choose -->
<img src="photo-800.jpg"
     srcset="photo-400.jpg   400w,
             photo-800.jpg   800w,
             photo-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="Aerial view of the UIU campus">`,
          label: '<strong>Resolution switching.</strong> <code>srcset</code> lists the files ' +
                 'with their real widths; <code>sizes</code> tells the browser how wide the ' +
                 'image will be <em>displayed</em>. It then picks the best file for the ' +
                 'screen and the connection.' },

        { code:
`<!-- Different images or formats: you choose -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <source media="(max-width: 600px)" srcset="hero-portrait.jpg">
  <img src="hero.jpg" alt="Students outside the library">
</picture>`,
          label: '<strong>Art direction and format fallback.</strong> The browser takes the ' +
                 'first matching <code>&lt;source&gt;</code>, so order from most preferred ' +
                 'to least. The <code>&lt;img&gt;</code> inside is <em>mandatory</em> — it ' +
                 'is the fallback and it carries the <code>alt</code>.' },

        'The one line you should apply to every project, exam included, is in the CSS rather ' +
        'than the HTML: <code>img { max-width: 100%; height: auto; display: block; }</code>. ' +
        'Without it an oversized image overflows its container and produces a horizontal ' +
        'scrollbar on every phone.'
      ]
    },

    /* --------------------------------------------------------------- 13 */
    {
      id: 'media-and-figures',
      title: 'Figures, video, audio and iframes',
      body: [
        { table: {
          head: ['Element', 'What to know'],
          rows: [
            ['<code>&lt;figure&gt;</code> / <code>&lt;figcaption&gt;</code>',
             'Self-contained media with a caption. The <code>&lt;figcaption&gt;</code> must ' +
             'be the first or last child, nothing in between.'],
            ['<code>&lt;video controls poster="…"&gt;</code>',
             'Several <code>&lt;source&gt;</code> children for format fallback, plus a ' +
             '<code>&lt;track kind="captions"&gt;</code>. <code>autoplay</code> is ignored ' +
             'unless the video is also <code>muted</code> — that is deliberate, not a bug.'],
            ['<code>&lt;audio controls&gt;</code>',
             'Same idea, simpler. <code>src</code> directly is fine.'],
            ['<code>&lt;iframe&gt;</code>',
             'Always give it a <code>title</code> — it is how a screen reader announces the ' +
             'frame. Add <code>loading="lazy"</code> for embeds below the fold.']
          ]
        }},

        'The video below has no real source file, so what you see is the browser\'s own ' +
        'player chrome. That is still worth looking at: the control bar is a fixed height ' +
        'you have to design around, and it is why <code>aspect-ratio</code> on the wrapper ' +
        'matters more than a fixed <code>height</code>.',

        { playground: {
          title: 'Figures and media',
          height: 320,
          tryThis: 'Move the <code>&lt;figcaption&gt;</code> to sit between the two images ' +
                   'and the markup becomes invalid — the browser will still draw it, which ' +
                   'is exactly why invalid HTML is easy to ship without noticing.',
          html: `
<figure class="fig">
  <div class="placeholder">hero.jpg</div>
  <figcaption>Figure 1: a placeholder standing in for a photo</figcaption>
</figure>

<video controls width="320" poster="thumb.jpg">
  <source src="clip.webm" type="video/webm">
  <source src="clip.mp4" type="video/mp4">
  Your browser does not support video.
</video>
`,
          css: `
body { font-family: system-ui, sans-serif; }
.fig { margin: 0 0 16px; }

/* The exam placeholder: a div with an aspect ratio and a gradient.
   Costs one rule, reads as an image, needs no asset. */
.placeholder {
  aspect-ratio: 16 / 9;
  width: 320px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  color: #fff;
  background: linear-gradient(135deg, #0f766e, #2dd4bf);
}
figcaption { font-size: 13px; color: #5b6672; margin-top: 6px; }
`
        }},

        { callout: { kind: 'note', title: 'Why there is no iframe here',
          text: 'Every preview on this site runs in an iframe with <code>sandbox=""</code>, ' +
                'which blocks nested frames from loading anything. That is the correct ' +
                'setting for running your code safely, and it means an embed demo would show ' +
                'you an empty box. The syntax is ' +
                '<code>&lt;iframe src="…" title="…" loading="lazy" allowfullscreen&gt;&lt;/iframe&gt;</code>.' }}
      ]
    },

    /* --------------------------------------------------------------- 14 */
    {
      id: 'svg-and-icons',
      title: 'SVG, and what to do about icons in the exam',
      body: [
        'SVG is vector: infinitely scalable, tiny for icons and logos, and — when you paste ' +
        'the markup straight into the HTML — stylable with CSS. Use ' +
        '<code>&lt;img src="logo.svg"&gt;</code> for simple cases, and inline the ' +
        '<code>&lt;svg&gt;</code> when you want to change its colour on hover.',

        { list: [
          'An inline icon sitting <em>beside</em> a text label should carry ' +
          '<code>aria-hidden="true"</code> — otherwise a screen reader announces the same ' +
          'thing twice.',
          'An icon that <em>is</em> the label needs <code>role="img"</code> and a ' +
          '<code>&lt;title&gt;</code>, or an <code>aria-label</code> on the button around it.',
          '<code>fill="currentColor"</code> makes the icon inherit the text colour, so one ' +
          '<code>color</code> change themes both.'
        ]},

        { playground: {
          title: 'Inline SVG icons',
          height: 300,
          tryThis: 'Change <code>color</code> on <code>.chip</code> and watch both the text ' +
                   'and the tick change together — that is <code>currentColor</code> doing ' +
                   'the work. Then try the character version below it: for exam purposes ' +
                   'they are worth the same marks.',
          html: `
<span class="chip">
  <svg viewBox="0 0 16 16" width="14" height="14"
       fill="currentColor" aria-hidden="true">
    <path d="M6.2 11.4 2.8 8l1.1-1.1 2.3 2.3 5.9-5.9L13.2 4z"/>
  </svg>
  Full-time
</span>

<span class="chip chip--warm">&#10003; Internship</span>

<button class="icon-btn" aria-label="Next slide">&#8250;</button>
`,
          css: `
body { font-family: system-ui, sans-serif; display: flex;
       gap: 10px; align-items: center; }
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e2ebfa;
  color: #205bcb;
  font-size: 13px;
}
.chip--warm { background: #fdebc0; color: #8a5a00; }

.icon-btn {
  width: 32px; height: 32px;
  border: 0; border-radius: 50%;
  background: #21b573; color: #fff;
  font-size: 18px; cursor: pointer;
}
`
        }},

        { callout: { kind: 'tip', title: 'The exam rule for icons',
          text: 'You have 45 minutes per prototype and no icon library. Every icon in every ' +
                'past paper is worth roughly nothing on its own — the marks are in the ' +
                'layout, the colours and the structure around it. Use a Unicode character ' +
                '(<code>&amp;#10003;</code> <code>&amp;#8250;</code> <code>&amp;times;</code>), ' +
                'or a coloured square, or skip it. Draw an inline SVG only if you finish ' +
                'early. The walkthroughs on this site flag the icon step in every prototype ' +
                'for exactly this reason.' }}
      ]
    }

  ]
});
