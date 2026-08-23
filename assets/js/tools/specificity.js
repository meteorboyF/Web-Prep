/* specificity.js — type a selector, see its (A, B, C) score and why.

   The scoring follows the Selectors Level 4 rules:

     A  id selectors
     B  classes, attribute selectors, pseudo-classes
     C  element types and pseudo-elements
     -  the universal selector and combinators score nothing

   Compare left to right. A higher A beats any B, and it is not decimal, so
   eleven classes never beat one id.

   The functional pseudo-classes are the part people get wrong, so they are
   handled properly rather than approximated:

     :where(...)                  always zero, whatever is inside
     :is() :not() :has()          take the score of their most specific argument
     :nth-child(n of S)           counts as one pseudo-class, plus the most
                                  specific S

   A comma-separated list is not one selector. Each side is scored on its own
   and matched independently, which is why this tool splits on top-level
   commas and reports them separately.
*/

(function (WP) {
  'use strict';

  var el = WP.el;

  /* ---- Parsing ------------------------------------------------------ */

  function matchBracket(s, start, open, close) {
    var depth = 0;
    for (var i = start; i < s.length; i++) {
      var ch = s[i];
      if (ch === '"' || ch === "'") {           /* skip quoted values */
        var q = ch;
        i++;
        while (i < s.length && s[i] !== q) { if (s[i] === '\\') i++; i++; }
        continue;
      }
      if (ch === open) depth++;
      else if (ch === close) { depth--; if (depth === 0) return i; }
    }
    return s.length - 1;
  }

  function splitTopLevel(s, sep) {
    var out = [], depth = 0, current = '';
    for (var i = 0; i < s.length; i++) {
      var ch = s[i];
      if (ch === '(' || ch === '[') depth++;
      else if (ch === ')' || ch === ']') depth--;
      if (ch === sep && depth === 0) { out.push(current); current = ''; continue; }
      current += ch;
    }
    out.push(current);
    return out.map(function (x) { return x.trim(); }).filter(function (x) { return x.length; });
  }

  var IDENT = /^[-\w -￿]+/;

  /* Pseudo-elements that predate the double colon and still score as one. */
  var LEGACY_PSEUDO_ELEMENTS = ['before', 'after', 'first-line', 'first-letter'];

  /* Take the specificity of the most specific argument, not the sum. */
  var MOST_SPECIFIC_ARG = ['is', 'not', 'has', 'matches', '-moz-any', '-webkit-any'];

  var NTH = ['nth-child', 'nth-last-child', 'nth-of-type', 'nth-last-of-type'];

  function compare(x, y) {
    if (x.a !== y.a) return x.a - y.a;
    if (x.b !== y.b) return x.b - y.b;
    return x.c - y.c;
  }

  function maxOf(list) {
    var best = { a: 0, b: 0, c: 0 };
    list.forEach(function (s) {
      var got = scoreOne(s);
      if (compare(got, best) > 0) best = { a: got.a, b: got.b, c: got.c };
    });
    return best;
  }

  function scoreOne(selector) {
    var a = 0, b = 0, c = 0, parts = [];
    var s = selector;
    var i = 0;

    function ident(from) {
      var m = IDENT.exec(s.slice(from));
      return m ? m[0] : '';
    }

    while (i < s.length) {
      var ch = s[i];

      if (ch === '#') {
        var id = ident(i + 1);
        if (id) { a++; parts.push({ t: '#' + id, col: 'a' }); i += 1 + id.length; }
        else i++;

      } else if (ch === '.') {
        var cls = ident(i + 1);
        if (cls) { b++; parts.push({ t: '.' + cls, col: 'b' }); i += 1 + cls.length; }
        else i++;

      } else if (ch === '[') {
        var close = matchBracket(s, i, '[', ']');
        b++;
        parts.push({ t: s.slice(i, close + 1), col: 'b' });
        i = close + 1;

      } else if (ch === ':') {
        var isDouble = s[i + 1] === ':';
        var nameAt = i + (isDouble ? 2 : 1);
        var name = ident(nameAt);
        var after = nameAt + name.length;
        var lower = name.toLowerCase();

        if (s[after] === '(') {
          var end = matchBracket(s, after, '(', ')');
          var inner = s.slice(after + 1, end);
          var text = s.slice(i, end + 1);

          if (lower === 'where') {
            parts.push({ t: text, col: 'zero', note: 'contributes nothing, by design' });

          } else if (MOST_SPECIFIC_ARG.indexOf(lower) !== -1) {
            var best = maxOf(splitTopLevel(inner, ','));
            a += best.a; b += best.b; c += best.c;
            parts.push({ t: text, col: 'fn',
              note: 'most specific argument: (' + best.a + ',' + best.b + ',' + best.c + ')' });

          } else if (NTH.indexOf(lower) !== -1) {
            b++;
            var ofMatch = /\bof\s+([\s\S]+)$/i.exec(inner);
            if (ofMatch) {
              var ofBest = maxOf(splitTopLevel(ofMatch[1], ','));
              a += ofBest.a; b += ofBest.b; c += ofBest.c;
              parts.push({ t: text, col: 'fn',
                note: 'one pseudo-class, plus its "of" argument' });
            } else {
              parts.push({ t: text, col: 'b' });
            }

          } else {
            b++;
            parts.push({ t: text, col: 'b' });
          }
          i = end + 1;

        } else {
          if (isDouble || LEGACY_PSEUDO_ELEMENTS.indexOf(lower) !== -1) {
            c++;
            parts.push({ t: s.slice(i, after), col: 'c',
              note: isDouble ? null : 'a pseudo-element in old single-colon form' });
          } else {
            b++;
            parts.push({ t: s.slice(i, after), col: 'b' });
          }
          i = after;
        }

      } else if (ch === '*') {
        parts.push({ t: '*', col: 'zero', note: 'the universal selector scores nothing' });
        i++;

      } else if (ch === '>' || ch === '+' || ch === '~' || ch === '|') {
        parts.push({ t: ch, col: 'zero', note: 'a combinator scores nothing' });
        i++;

      } else if (/\s/.test(ch)) {
        i++;

      } else {
        var type = ident(i);
        if (type) { c++; parts.push({ t: type, col: 'c' }); i += type.length; }
        else i++;
      }
    }

    return { a: a, b: b, c: c, parts: parts, text: selector };
  }

  function analyse(input) {
    var important = /!important\b/i.test(input);
    var cleaned = input.replace(/!important\b/ig, '').trim();
    return {
      important: important,
      selectors: splitTopLevel(cleaned, ',').map(scoreOne),
      raw: cleaned
    };
  }

  /* ---- Rendering ----------------------------------------------------- */

  var PRESETS = [
    '*',
    'p',
    '.card',
    'nav ul li a',
    '.nav a:hover',
    '#main .card p',
    ':where(.a, #b) p',
    ':is(h1, #title) span',
    'li:nth-child(2n)',
    'a[href$=".pdf"]::after',
    '.btn:not(.btn--ghost)'
  ];

  function badge(label, value, kind) {
    return el('div', { class: 'spec__badge spec__badge--' + kind }, [
      el('span', { class: 'spec__badge-n', text: String(value) }),
      el('span', { class: 'spec__badge-l', text: label })
    ]);
  }

  function renderResult(host, input) {
    host.textContent = '';
    var result = analyse(input);

    if (!result.selectors.length) {
      host.appendChild(el('p', { class: 'spec__empty', text: 'Type a selector above.' }));
      return null;
    }

    var overall = null;

    result.selectors.forEach(function (s, idx) {
      if (!overall || compare(s, overall) > 0) overall = s;

      var row = el('div', { class: 'spec__row' });

      if (result.selectors.length > 1) {
        row.appendChild(el('p', { class: 'spec__multi', html:
          'Selector ' + (idx + 1) + ' of ' + result.selectors.length +
          ' — <code>' + escapeHtml(s.text) + '</code>' }));
      }

      row.appendChild(el('div', { class: 'spec__score' }, [
        badge('ids', s.a, 'a'),
        badge('classes, attributes, pseudo-classes', s.b, 'b'),
        badge('types, pseudo-elements', s.c, 'c'),
        el('p', { class: 'spec__total', html: '= <strong>(' + s.a + ', ' + s.b + ', ' + s.c + ')</strong>' })
      ]));

      var chips = el('div', { class: 'spec__chips' });
      if (!s.parts.length) {
        chips.appendChild(el('span', { class: 'spec__chip spec__chip--zero', text: 'nothing scored' }));
      }
      s.parts.forEach(function (p) {
        var chip = el('span', { class: 'spec__chip spec__chip--' + p.col, text: p.t });
        if (p.note) chip.title = p.note;
        chips.appendChild(chip);
        if (p.note) {
          chips.appendChild(el('span', { class: 'spec__note', text: p.note }));
        }
      });
      row.appendChild(chips);

      host.appendChild(row);
    });

    if (result.selectors.length > 1) {
      host.appendChild(el('p', { class: 'spec__hint', html:
        'A comma-separated list is not one selector. Each side is scored and matched ' +
        'on its own — the highest above is what wins a conflict.' }));
    }

    if (result.important) {
      host.appendChild(el('p', { class: 'spec__hint spec__hint--warn', html:
        '<strong>!important</strong> sidesteps all of this and beats every selector, ' +
        'including an inline <code>style</code>. Nine times out of ten the real fix is to ' +
        'lower the specificity of the rule you are fighting.' }));
    }

    return overall;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch];
    });
  }

  /* ---- Mount --------------------------------------------------------- */

  function mount(host) {
    var root = el('div', { class: 'spec' });

    var inputs = {};
    var results = {};
    var verdict = el('p', { class: 'spec__verdict' });

    ['a', 'b'].forEach(function (side, i) {
      var id = 'spec-' + side + '-' + Math.random().toString(36).slice(2, 7);

      var field = el('input', {
        type: 'text', id: id, class: 'spec__input',
        spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off',
        placeholder: i === 0 ? '.card p' : '#main p'
      });
      field.value = i === 0 ? '.nav a:hover' : '#main p';

      var out = el('div', { class: 'spec__out' });

      inputs[side] = field;
      results[side] = out;

      root.appendChild(el('div', { class: 'spec__side' }, [
        el('label', { class: 'spec__label', for: id,
          text: i === 0 ? 'Selector one' : 'Selector two' }),
        field,
        out
      ]));
    });

    root.appendChild(verdict);

    var presets = el('div', { class: 'spec__presets' }, [
      el('span', { class: 'spec__presets-l', text: 'Try:' })
    ]);
    PRESETS.forEach(function (p) {
      var btn = el('button', { class: 'spec__preset', type: 'button', text: p });
      btn.addEventListener('click', function () {
        inputs.a.value = p;
        update();
        inputs.a.focus();
      });
      presets.appendChild(btn);
    });
    root.appendChild(presets);

    function update() {
      var one = renderResult(results.a, inputs.a.value);
      var two = renderResult(results.b, inputs.b.value);

      if (!one || !two) { verdict.textContent = ''; return; }

      var d = compare(one, two);
      if (d > 0) {
        verdict.className = 'spec__verdict spec__verdict--one';
        verdict.innerHTML = '<strong>Selector one wins.</strong> (' + one.a + ', ' + one.b +
          ', ' + one.c + ') beats (' + two.a + ', ' + two.b + ', ' + two.c + ').';
      } else if (d < 0) {
        verdict.className = 'spec__verdict spec__verdict--two';
        verdict.innerHTML = '<strong>Selector two wins.</strong> (' + two.a + ', ' + two.b +
          ', ' + two.c + ') beats (' + one.a + ', ' + one.b + ', ' + one.c + ').';
      } else {
        verdict.className = 'spec__verdict spec__verdict--tie';
        verdict.innerHTML = '<strong>Tie</strong> at (' + one.a + ', ' + one.b + ', ' + one.c +
          '). Specificity cannot decide it, so the rule written <em>later</em> in the ' +
          'stylesheet wins. This is why your override goes at the bottom.';
      }
    }

    inputs.a.addEventListener('input', update);
    inputs.b.addEventListener('input', update);

    host.replaceWith(root);
    update();
  }

  WP.tools = WP.tools || {};
  WP.tools.specificity = mount;

  /* Exposed for testing the parser without driving the interface. */
  WP.tools._specificityScore = analyse;

}(window.WP));
