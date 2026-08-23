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
    },

    /* --------------------------------------------------------------- 15 */
    {
      id: 'tables',
      title: 'Tables',
      body: [
        'Tables are for tabular data and nothing else — never for page layout. But when the ' +
        'data really is a table, the full structure matters, because it is what makes the ' +
        'table navigable by someone who cannot see it.',

        { table: {
          head: ['Part', 'Purpose'],
          rows: [
            ['<code>&lt;caption&gt;</code>',
             'The table title. Must be the <em>first</em> child. Announced before the data.'],
            ['<code>&lt;thead&gt;</code> <code>&lt;tbody&gt;</code> <code>&lt;tfoot&gt;</code>',
             'Row groups. <code>thead</code> repeats on every printed page.'],
            ['<code>&lt;th scope="col|row"&gt;</code>',
             'A header cell. <code>scope</code> is what tells a screen reader which cells a ' +
             'header governs. Without it a large table is meaningless read aloud.'],
            ['<code>colspan</code> / <code>rowspan</code>', 'Merge cells across or down.'],
            ['<code>&lt;colgroup&gt;</code> <code>&lt;col&gt;</code>',
             'Style whole columns at once — mainly widths and background.']
          ]
        }},

        'Two CSS rules you will always want: <code>border-collapse: collapse</code> to remove ' +
        'the double borders, and a wrapper with <code>overflow-x: auto</code> so a wide table ' +
        'scrolls on a phone instead of breaking the page. Every table on this site does both.'
      ],
      playground: {
        title: 'A table with the full structure',
        height: 340,
        tryThis: 'Delete <code>border-collapse: collapse</code> and the double borders come ' +
                 'back. Then remove the <code>scope</code> attributes — nothing changes ' +
                 'visually, which is precisely the problem with leaving them out.',
        html: `
<table>
  <caption>Semester results</caption>
  <thead>
    <tr>
      <th scope="col">Course</th>
      <th scope="col">Code</th>
      <th scope="col">Credit</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">Web Programming</th><td>CSE 4165</td><td>3.0</td></tr>
    <tr><th scope="row">Data Structures</th><td>CSE 2216</td><td>3.0</td></tr>
  </tbody>
  <tfoot>
    <tr><td colspan="2">Total</td><td>6.0</td></tr>
  </tfoot>
</table>
`,
        css: `
body { font-family: system-ui, sans-serif; }
table { border-collapse: collapse; width: 100%; }
caption {
  text-align: left;
  font-weight: 600;
  padding-bottom: 8px;
}
th, td {
  border: 1px solid #dfe3e8;
  padding: 8px 12px;
  text-align: left;
}
thead th { background: #eceff3; }
tfoot td { font-weight: 600; background: #f6f7f9; }
`
      },
      tip: 'Prototype <strong>252 Q2</strong> is the only one of the twelve with a real ' +
           'table — <em>Course · Code · Credit</em> with a header row. Writing a proper ' +
           '<code>&lt;thead&gt;</code> with <code>scope="col"</code> costs you nothing and ' +
           'is the difference between a table and three divs pretending to be one.'
    },

    /* --------------------------------------------------------------- 16 */
    {
      id: 'form-rules',
      title: 'Forms: the three rules of a field',
      body: [
        'Six of the twelve past prototypes contain a form. Forms are also where HTML stops ' +
        'being decorative — almost every attribute in the next two sections removes ' +
        'JavaScript you would otherwise have to write.',

        { list: [
          '<strong>Every input needs a <code>name</code></strong>, or its value is never submitted.',
          '<strong>Every input needs a <code>&lt;label for="id"&gt;</code></strong> matching ' +
          'its <code>id</code>. That is what a screen reader announces, and it makes the ' +
          'label itself clickable — which quietly doubles the size of a checkbox target.',
          '<strong>A placeholder is not a label.</strong> It disappears the moment typing ' +
          'starts, has poor contrast by default, and vanishes for anyone who needs to ' +
          're-check what they were filling in.'
        ]},

        'The playground shows the difference you can feel rather than read: click the word ' +
        '"Email" and the cursor jumps into the field. Click "Student ID" and nothing happens.'
      ],
      playground: {
        title: 'Labels',
        height: 320,
        tryThis: 'Click each label text in the preview. Only the first two do anything. Now ' +
                 'give the third field an <code>id</code> and point its label at it, and ' +
                 'watch it start working.',
        html: `
<form>
  <p>
    <label for="email">Email</label>
    <input type="email" id="email" name="email">
  </p>

  <p>
    <label>Full name
      <input type="text" name="fullname">
    </label>
  </p>

  <p>
    <label>Student ID</label>
    <input type="text" name="sid" placeholder="011233001">
  </p>

  <p>
    <label><input type="checkbox" name="agree"> I agree to the terms</label>
  </p>
</form>
`,
        css: `
body { font-family: system-ui, sans-serif; }
label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
input[type="text"], input[type="email"] {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #7c8794;
  border-radius: 6px;
  font: inherit;
}
label:has(input[type="checkbox"]) { font-weight: 400; }
input[type="checkbox"] { accent-color: #0f766e; }
`
      },
      trap: 'Wrapping the input <em>inside</em> the label works too, and needs no ' +
            '<code>id</code> at all — that is the second field above. In the exam it is the ' +
            'faster of the two and just as correct.'
    },

    /* --------------------------------------------------------------- 17 */
    {
      id: 'input-types',
      title: 'Input types',
      body: [
        'Picking the right <code>type</code> gets you validation, the right mobile keyboard ' +
        'and a native picker, all for free. This is much better seen than read, so the whole ' +
        'set is rendered below.',

        { table: {
          head: ['type', 'What it gives you'],
          rows: [
            ['<code>text</code>', 'Plain single line.'],
            ['<code>email</code>', 'Format validation and an email keyboard on mobile.'],
            ['<code>password</code>', 'Masked characters.'],
            ['<code>number</code>', 'Numeric with <code>min</code>, <code>max</code>, <code>step</code>, and spinners.'],
            ['<code>tel</code>', 'Numeric keypad on mobile. No validation, so pair it with <code>pattern</code>.'],
            ['<code>url</code> / <code>search</code>', 'URL validation; a clear button in some browsers.'],
            ['<code>date</code> <code>time</code> <code>month</code>', 'Native pickers.'],
            ['<code>checkbox</code>', 'Independent on/off. Submits only when checked.'],
            ['<code>radio</code>', 'One of a group. The group is defined by a shared <code>name</code>.'],
            ['<code>file</code>', 'File picker. Add <code>accept="image/*"</code> and <code>multiple</code>.'],
            ['<code>range</code>', 'Slider. It has no visible number — show it yourself.'],
            ['<code>color</code>', 'Colour picker returning a hex value.'],
            ['<code>hidden</code>', 'Not shown, still submitted. For tokens and ids.']
          ]
        }}
      ],
      playground: {
        title: 'Every input type',
        height: 380,
        tryThis: 'Try the two radio groups. The first pair share a <code>name</code> and are ' +
                 'mutually exclusive; the second pair do not, so both can be on at once. ' +
                 'That single difference is the most common radio button bug there is.',
        html: `
<p><input type="text" placeholder="text"></p>
<p><input type="email" placeholder="email"></p>
<p><input type="number" min="0" max="10" step="1" value="3"></p>
<p><input type="date"></p>
<p><input type="range" min="0" max="100" value="60"></p>
<p><input type="color" value="#0f766e"></p>
<p><input type="file" accept="image/*"></p>

<fieldset>
  <legend>Shared name: exclusive</legend>
  <label><input type="radio" name="plan" value="a"> Monthly</label>
  <label><input type="radio" name="plan" value="b"> Yearly</label>
</fieldset>

<fieldset>
  <legend>Different names: not exclusive</legend>
  <label><input type="radio" name="x"> Monthly</label>
  <label><input type="radio" name="y"> Yearly</label>
</fieldset>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }
input[type="text"], input[type="email"] {
  width: 220px; padding: 6px 8px;
  border: 1px solid #7c8794; border-radius: 6px; font: inherit;
}
input { accent-color: #0f766e; }
fieldset {
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  margin: 12px 0 0;
  padding: 8px 12px 12px;
}
legend { font-weight: 600; padding-inline: 4px; }
fieldset label { display: block; font-weight: 400; }
`
      },
      trap: 'Radio buttons with the same <code>name</code> are mutually exclusive. Different ' +
            'names means they are unrelated — which is why "only the first one works" is ' +
            'almost always "they all have different names".'
    },

    /* --------------------------------------------------------------- 18 */
    {
      id: 'validation',
      title: 'Validation attributes',
      body: [
        { table: {
          head: ['Attribute', 'Effect'],
          rows: [
            ['<code>required</code>', 'Must not be empty.'],
            ['<code>minlength</code> / <code>maxlength</code>', 'Character limits for text-like inputs.'],
            ['<code>min</code> / <code>max</code> / <code>step</code>',
             'Range limits for numbers and dates. <code>step="0.01"</code> for money.'],
            ['<code>pattern="[0-9]{11}"</code>',
             'A regular expression the value must match. Always add a <code>title</code> ' +
             'describing the rule — browsers show it in the error bubble.'],
            ['<code>novalidate</code>', 'On the <code>&lt;form&gt;</code>: switch off native validation.'],
            ['<code>autocomplete</code>',
             'Tokens such as <code>email</code>, <code>tel</code>, <code>new-password</code>. ' +
             'Correct tokens let password managers fill forms accurately — an accessibility ' +
             'requirement, not a convenience.'],
            ['<code>inputmode="numeric"</code>', 'Chooses the mobile keyboard without changing the type.'],
            ['<code>readonly</code> vs <code>disabled</code>',
             '<code>readonly</code> is submitted and focusable; <code>disabled</code> is neither.']
          ]
        }},

        'The form below can actually be submitted, so the native error bubbles are real. ' +
        'Every preview on this site normally blocks forms outright; this one is granted that ' +
        'single capability because the behaviour <em>is</em> the lesson.'
      ],
      playground: {
        title: 'Native validation',
        allowForms: true,
        height: 360,
        tryThis: 'Press Register with everything empty and read what the browser says. Then ' +
                 'type five characters into the ID field and try again — the ' +
                 '<code>title</code> is what makes that message useful rather than cryptic. ' +
                 'None of this needed a line of JavaScript.',
        html: `
<form>
  <p>
    <label for="e">UIU email</label>
    <input type="email" id="e" name="email" required
           autocomplete="email" placeholder="name@students.uiu.ac.bd">
  </p>
  <p>
    <label for="sid">Student ID</label>
    <input type="text" id="sid" name="sid" required
           pattern="[0-9]{9}" inputmode="numeric"
           title="Nine digits, no spaces">
  </p>
  <p>
    <label for="pw">Password</label>
    <input type="password" id="pw" name="password"
           required minlength="8" autocomplete="new-password">
  </p>
  <button type="submit">Register</button>
</form>
`,
        css: `
body { font-family: system-ui, sans-serif; }
label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
input {
  width: 100%; padding: 8px 10px; font: inherit;
  border: 1px solid #7c8794; border-radius: 6px;
}
/* Only complain after the user has actually interacted */
input:user-invalid { border-color: #c0392b; }
button {
  margin-top: 8px; padding: 8px 18px;
  border: 0; border-radius: 6px;
  background: #0f766e; color: #fff; font: inherit; cursor: pointer;
}
`
      },
      tip: 'Use <code>:user-invalid</code> rather than <code>:invalid</code>. Plain ' +
           '<code>:invalid</code> matches an empty required field before the user has typed ' +
           'a single character, so the form greets you covered in red.'
    },

    /* --------------------------------------------------------------- 19 */
    {
      id: 'other-controls',
      title: 'Textarea, select and the rest',
      body: [
        { list: [
          '<code>&lt;textarea&gt;</code> takes its value from the text <em>between</em> the ' +
          'tags, not from a <code>value</code> attribute. Any whitespace you leave in there ' +
          'becomes content — which is why an "empty" textarea sometimes starts with a blank line.',
          '<code>&lt;select&gt;</code> groups options with <code>&lt;optgroup&gt;</code>. ' +
          'It is one of the few controls that is genuinely hard to restyle, so in the exam ' +
          'leave it close to native and spend the time elsewhere.',
          '<code>&lt;datalist&gt;</code> gives a text input suggestions without restricting ' +
          'it to them.',
          '<code>&lt;fieldset&gt;</code> plus <code>&lt;legend&gt;</code> is the correct way ' +
          'to label a set of radio buttons.',
          '<code>&lt;progress&gt;</code> and <code>&lt;meter&gt;</code> exist, but every ' +
          'progress bar in the past papers is a styled div — easier to colour, and that is ' +
          'what the marks are for.'
        ]}
      ],
      playground: {
        title: 'Other controls',
        height: 340,
        tryThis: 'Press each button. Only one of them reloads the preview — the one without ' +
                 '<code>type="button"</code>, because inside a form a button defaults to ' +
                 '<code>type="submit"</code>. This is a genuinely maddening bug to track down.',
        html: `
<form>
  <p>
    <label for="dept">Department</label>
    <select id="dept" name="dept">
      <optgroup label="Engineering">
        <option value="cse" selected>CSE</option>
        <option value="eee">EEE</option>
      </optgroup>
      <optgroup label="Business">
        <option value="bba">BBA</option>
      </optgroup>
    </select>
  </p>

  <p>
    <label for="city">City</label>
    <input list="cities" id="city" name="city">
    <datalist id="cities">
      <option value="Dhaka"></option>
      <option value="Chattogram"></option>
    </datalist>
  </p>

  <p>
    <label for="note">Condition / note</label>
    <textarea id="note" name="note" rows="3" maxlength="300"></textarea>
  </p>

  <button type="button">Safe: type="button"</button>
  <button>Dangerous: defaults to submit</button>
</form>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }
label { display: block; font-weight: 600; margin-bottom: 4px; }
select, input, textarea {
  width: 100%; padding: 8px 10px; font: inherit;
  border: 1px solid #7c8794; border-radius: 6px;
}
textarea { resize: vertical; }
button {
  padding: 8px 14px; margin-right: 6px;
  border: 1px solid #7c8794; border-radius: 6px;
  background: #fff; font: inherit; cursor: pointer;
}
`
      },
      trap: 'A <code>&lt;button&gt;</code> inside a form defaults to ' +
            '<code>type="submit"</code>. Forgetting <code>type="button"</code> on a ' +
            'decorative button reloads the page and looks, for all the world, like your ' +
            'JavaScript is broken.'
    },

    /* --------------------------------------------------------------- 20 */
    {
      id: 'semantic-structure',
      title: 'Semantic structure',
      body: [
        'A <code>&lt;div&gt;</code> says nothing. Semantic elements behave identically in ' +
        'every visual respect but tell browsers, search engines and screen readers what a ' +
        'region <em>is</em>. They create landmarks that assistive technology can jump between.',

        { table: {
          head: ['Element', 'Use it for', 'Landmark'],
          rows: [
            ['<code>&lt;header&gt;</code>', 'Introductory content for the page or a section.', 'banner'],
            ['<code>&lt;nav&gt;</code>', 'A block of major navigation links.', 'navigation'],
            ['<code>&lt;main&gt;</code>', 'The unique content of this page. Exactly one, never nested in the others.', 'main'],
            ['<code>&lt;article&gt;</code>', 'A self-contained item that makes sense alone: a post, a card, a job listing.', 'article'],
            ['<code>&lt;section&gt;</code>', 'A thematic grouping, normally with a heading.', 'region'],
            ['<code>&lt;aside&gt;</code>', 'Tangential content: sidebar, related links, filters.', 'complementary'],
            ['<code>&lt;footer&gt;</code>', 'Closing content for the page or section.', 'contentinfo'],
            ['<code>&lt;details&gt;</code> / <code>&lt;summary&gt;</code>', 'A native accordion. No JavaScript needed.', 'group']
          ]
        }},

        { h: 'Choosing between section, article and div' },

        { list: [
          'Would this content make sense on its own, syndicated as an RSS item? Use ' +
          '<code>&lt;article&gt;</code>. Every job card in <em>UIU CareerHub</em> is an article.',
          'Is it a thematic chunk of the page that deserves a heading? Use ' +
          '<code>&lt;section&gt;</code>.',
          'Am I only wrapping things to hang CSS on? Use <code>&lt;div&gt;</code>. That is a ' +
          'perfectly good answer and always has been.'
        ]}
      ],
      playground: {
        title: 'Landmarks',
        height: 340,
        tryThis: 'The outline rule at the top is the single most useful debugging line in ' +
                 'CSS. Change every semantic tag to <code>&lt;div&gt;</code> — the page ' +
                 'looks <em>exactly</em> the same, and everything a screen reader could use ' +
                 'to navigate it is gone.',
        html: `
<header>
  <strong>UIU CareerHub</strong>
  <nav>
    <a href="#">Jobs</a> <a href="#">Companies</a>
  </nav>
</header>

<main>
  <h1>Available positions</h1>
  <article>
    <h2>Junior Software Engineer</h2>
    <p>Kaz Software · Dhaka</p>
  </article>
</main>

<aside>Filters</aside>
<footer>&copy; 2026 UIU</footer>
`,
        css: `
/* Reveal every box. Use this the moment a layout misbehaves. */
* { outline: 1px solid rgb(180 84 27 / .45); }

body { font-family: system-ui, sans-serif; font-size: 14px; }
header { display: flex; gap: 16px; align-items: center;
         padding: 10px; background: #eceff3; }
header nav { margin-left: auto; display: flex; gap: 12px; }
main { padding: 10px; }
article { border: 1px solid #dfe3e8; border-radius: 8px; padding: 10px; }
aside, footer { padding: 10px; color: #5b6672; }
`
      }
    },

    /* --------------------------------------------------------------- 21 */
    {
      id: 'exam-skeleton',
      title: 'The skeleton you type first in the exam',
      body: [
        'This is the highest-value thing on this page. Roughly three minutes of typing that ' +
        'you should be able to produce without thinking, before you look at the prototype ' +
        'properly at all.',

        'It is the document structure from section 2, plus the four reset rules that prevent ' +
        'the box-model and default-margin surprises which otherwise eat twenty minutes. Parts ' +
        '2 and 5 explain why each line is there; for now, memorise it.',

        { playground: {
          doc: true,
          title: 'The exam starter',
          height: 340,
          tryThis: 'Comment out the reset block and watch the header gain a gap it never ' +
                   'asked for, from the default margin on <code>h1</code>. Every one of ' +
                   'those four rules is preventing a specific bug.',
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prototype</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="header">
    <h1 class="logo">Brand</h1>
    <nav class="nav">
      <a href="#">Home</a>
      <a href="#">About</a>
    </nav>
  </header>

  <main class="main">
    <p>Then build section by section, top to bottom.</p>
  </main>
</body>
</html>
`,
          css: `
/* The reset. Type this before anything else. */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, Arial, sans-serif; }
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }

/* Then the layout. */
.header {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: #0f766e;
  color: #fff;
}
.logo { font-size: 20px; margin-right: auto; }
.nav { display: flex; gap: 20px; }
.main { padding: 24px; }
`
        }},

        { callout: { kind: 'tip', title: 'Why this exact order',
          text: 'Reset, then body font, then the outermost container, then each section top ' +
                'to bottom. It matches the order the marker reads the page, it means a ' +
                'half-finished answer still looks deliberate rather than broken, and it is ' +
                'the order every walkthrough on this site follows.' }}
      ]
    },

    /* --------------------------------------------------------------- 22 */
    {
      id: 'global-attributes',
      title: 'Global attributes and data hooks',
      body: [
        { table: {
          head: ['Attribute', 'What it does'],
          rows: [
            ['<code>id</code>',
             'Unique on the page. A link anchor, a label target, a JS handle. Never reuse one.'],
            ['<code>class</code>',
             'The reusable hook. Space separated for several. Case sensitive, no spaces inside a name.'],
            ['<code>data-*</code>',
             'Your own attributes: <code>data-state="open"</code>. Readable in JS via ' +
             '<code>element.dataset</code>, and targetable in CSS with ' +
             '<code>[data-state="open"]</code>.'],
            ['<code>style</code>',
             'Inline CSS. Beats every selector, so use it sparingly — though it is genuinely ' +
             'useful for a per-item custom property, as in the card examples on this site.'],
            ['<code>hidden</code>', 'Hides the element entirely. Beaten by any CSS <code>display</code> rule.'],
            ['<code>tabindex</code>',
             '<code>0</code> puts an element into the natural tab order, <code>-1</code> ' +
             'makes it focusable only by script. Never use positive values; they wreck the order.'],
            ['<code>inert</code>',
             'Removes a whole subtree from interaction and from the accessibility tree. Ideal ' +
             'for the page behind a modal.']
          ]
        }},

        'Styling state with a data attribute rather than a class is worth the habit: it is ' +
        'self-documenting, a value can only be one thing at a time, and it reads the same in ' +
        'the markup, the CSS and the JavaScript.'
      ],
      playground: {
        title: 'Styling state with data attributes',
        height: 300,
        tryThis: 'Change <code>data-state</code> on the second row from <code>closed</code> ' +
                 'to <code>open</code>. One attribute, no class juggling, and the CSS reads ' +
                 'like the thing it describes.',
        html: `
<div class="row" data-state="open">
  <span>Job Type</span> <b>&#9650;</b>
</div>
<div class="row" data-state="closed">
  <span>Department</span> <b>&#9660;</b>
</div>
<div class="row" data-state="closed">
  <span>Experience</span> <b>&#9660;</b>
</div>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid #dfe3e8;
  border-radius: 8px;
  margin-bottom: 8px;
}
.row[data-state="open"] {
  border-color: #205bcb;
  background: #e2ebfa;
  color: #205bcb;
  font-weight: 600;
}
`
      }
    },

    /* --------------------------------------------------------------- 23 */
    {
      id: 'aria-and-access',
      title: 'ARIA in five rules, and the checklist',
      body: [
        { list: [
          '<strong>No ARIA is better than bad ARIA.</strong> A wrong role is worse than none at all.',
          '<strong>Use a native element first.</strong> <code>&lt;button&gt;</code> beats ' +
          '<code>&lt;div role="button" tabindex="0"&gt;</code> plus keyboard handlers, every time.',
          '<strong><code>aria-label</code></strong> gives an accessible name to something ' +
          'with no visible text — an icon-only button.',
          '<strong><code>aria-labelledby</code> / <code>aria-describedby</code></strong> ' +
          'point at the <code>id</code> of visible text that names or explains the element.',
          '<strong><code>aria-hidden="true"</code></strong> hides decoration from screen ' +
          'readers. Never put it on anything focusable.'
        ]},

        { h: 'The checklist' },

        { list: [
          'Every image has an <code>alt</code>; decorative ones have <code>alt=""</code>.',
          'Every input has a real <code>&lt;label&gt;</code>.',
          'Headings run in order from a single <code>&lt;h1&gt;</code>.',
          'The page works with the keyboard alone, and the focus ring is visible.',
          'Colour is never the only way information is conveyed.',
          'Text contrast is at least 4.5:1 for body text.',
          'There is a skip link to <code>&lt;main&gt;</code> before the navigation.',
          'The <code>&lt;html&gt;</code> element has a <code>lang</code>.'
        ]},

        'Around 80% of accessibility comes free from writing the HTML correctly, which is ' +
        'everything this part has covered. The rest is that list.'
      ],
      playground: {
        title: 'Names, hidden text and the skip link',
        height: 320,
        tryThis: 'Press <kbd>Tab</kbd> in the preview. The skip link appears from nowhere as ' +
                 'the first stop — that is the <code>.skip-link</code> trick, and it is how ' +
                 'a keyboard user avoids tabbing through your whole navigation on every page.',
        html: `
<a class="skip-link" href="#main">Skip to content</a>

<button class="icon-btn">&#215;</button>
<button class="icon-btn" aria-label="Close dialog">&#215;</button>

<p>The first button is announced as "times". The second has a name.</p>

<p>
  <span class="sr-only">Rating:</span>
  <span aria-hidden="true">&#9733;&#9733;&#9733;&#9734;&#9734;</span>
  <span class="sr-only">3 out of 5</span>
</p>

<main id="main"><p>Main content starts here.</p></main>
`,
        css: `
body { font-family: system-ui, sans-serif; font-size: 14px; }

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.skip-link {
  position: absolute; left: 8px; top: -40px;
  background: #17202a; color: #fff;
  padding: 8px 14px; border-radius: 0 0 6px 6px;
  transition: top .15s;
}
.skip-link:focus { top: 0; }

.icon-btn {
  width: 32px; height: 32px; font-size: 18px;
  border: 1px solid #7c8794; border-radius: 6px;
  background: #fff; cursor: pointer;
}
:focus-visible { outline: 3px solid #0f766e; outline-offset: 2px; }
`
      }
    },

    /* --------------------------------------------------------------- 24 */
    {
      id: 'traps',
      title: 'Traps that cost hours',
      body: [
        'Every one of these has a symptom that looks nothing like its cause. Read them once ' +
        'now, and again the night before the exam.',

        { table: {
          head: ['Symptom', 'Cause and fix'],
          rows: [
            ['Layout behaves strangely, box sizes wrong',
             'Missing <code>&lt;!DOCTYPE html&gt;</code>, so the browser is in quirks mode.'],
            ['Media queries ignored on a phone', 'Missing viewport meta tag.'],
            ['Accented or Bengali text becomes garbage',
             'Missing or late <code>&lt;meta charset="UTF-8"&gt;</code>.'],
            ['A stray gap between inline-block boxes',
             'The whitespace between the tags in your source is a real space character. ' +
             'Remove the newline, or use flexbox.'],
            ['Button reloads the page unexpectedly',
             'A <code>&lt;button&gt;</code> inside a form without <code>type="button"</code>.'],
            ['Form submits nothing', 'Inputs are missing the <code>name</code> attribute.'],
            ['Only the first radio in a group works', 'Different <code>name</code> values.'],
            ['CSS file not loading',
             'Wrong relative path, or a capitalisation mismatch. Linux servers are case ' +
             'sensitive; Windows is not, so it works locally and breaks live.'],
            ['Page jumps while loading',
             'Images without <code>width</code> and <code>height</code> attributes.'],
            ['Nested <code>&lt;p&gt;</code> tags disappear',
             'A <code>&lt;p&gt;</code> cannot contain block elements; the parser auto-closes it.']
          ]
        }},

        { h: 'Habits worth building' },

        { list: [
          'Write the HTML for a component <em>fully</em> before writing a line of its CSS. ' +
          'Structure first prevents div soup, and it is step two of every walkthrough here.',
          'Name classes for what the thing is, not what it looks like: <code>.alert-danger</code>, ' +
          'never <code>.red-text</code>. Themes change; roles do not.',
          'Use Emmet in VS Code. <code>!</code> then Tab gives the whole skeleton; ' +
          '<code>ul>li*5</code> then Tab gives a five-item list; <code>.card>h2+p</code> ' +
          'builds nested elements instantly. In a 90-minute exam this is worth real marks.',
          '<code>* { outline: 1px solid red }</code> reveals every box the moment a layout ' +
          'misbehaves.',
          'Keep one folder pattern: <code>index.html</code>, <code>css/</code>, ' +
          '<code>img/</code>. Consistency beats cleverness.'
        ]},

        { callout: { kind: 'tip', title: 'What to carry forward from Part 1',
          text: 'HTML is a tree of meaning. Choose the element that describes the content, ' +
                'give every interactive thing a name a human can read, and let CSS handle ' +
                'appearance. If only three things survive: correct heading order, real ' +
                'labels on form fields, and honest alt text.' }}
      ]
    }

  ]
});
