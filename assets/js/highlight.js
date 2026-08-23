/* highlight.js — a small HTML and CSS tokeniser for the walkthrough code panes.

   Why not reuse CodeMirror: CodeMirror highlights an *editor*. The walkthrough
   shows read-only code where each line must also carry a diff state, so what
   is needed is a plain token list that can be split at newlines and wrapped
   per line. That is about eighty lines of tokeniser and no dependency.

   The whole text is tokenised at once rather than line by line, so multi-line
   comments and strings cannot desynchronise the way a per-line tokeniser
   eventually does.

   Output: an array of lines, each an array of { text, type } tokens. */

(function (WP) {
  'use strict';

  /* ---- HTML ---------------------------------------------------------- */

  function tokenizeHTML(src) {
    var out = [];
    var i = 0;
    var n = src.length;

    function push(text, type) { if (text) out.push({ text: text, type: type }); }

    while (i < n) {
      if (src.startsWith('<!--', i)) {
        var end = src.indexOf('-->', i);
        end = end === -1 ? n : end + 3;
        push(src.slice(i, end), 'comment');
        i = end;
        continue;
      }

      if (src[i] === '<') {
        /* the tag opener and its name */
        var m = /^<\/?[a-zA-Z][\w-]*/.exec(src.slice(i));
        if (m) {
          push(m[0], 'tag');
          i += m[0].length;

          /* attributes until the tag closes */
          while (i < n && src[i] !== '>') {
            var ws = /^\s+/.exec(src.slice(i));
            if (ws) { push(ws[0], 'text'); i += ws[0].length; continue; }

            var name = /^[a-zA-Z_:@#$-][\w:.-]*/.exec(src.slice(i));
            if (name) {
              push(name[0], 'attr');
              i += name[0].length;
              if (src[i] === '=') {
                push('=', 'punct');
                i++;
                var q = src[i];
                if (q === '"' || q === "'") {
                  var close = src.indexOf(q, i + 1);
                  close = close === -1 ? n : close + 1;
                  push(src.slice(i, close), 'string');
                  i = close;
                } else {
                  var bare = /^[^\s>]+/.exec(src.slice(i));
                  if (bare) { push(bare[0], 'string'); i += bare[0].length; }
                }
              }
              continue;
            }

            push(src[i], 'punct');
            i++;
          }

          if (i < n) { push('>', 'tag'); i++; }
          continue;
        }
        push('<', 'text');
        i++;
        continue;
      }

      /* plain text, with entities picked out */
      var next = src.indexOf('<', i);
      if (next === -1) next = n;
      var chunk = src.slice(i, next);
      var re = /&[#\w]+;/g;
      var last = 0, mm;
      while ((mm = re.exec(chunk))) {
        push(chunk.slice(last, mm.index), 'text');
        push(mm[0], 'entity');
        last = mm.index + mm[0].length;
      }
      push(chunk.slice(last), 'text');
      i = next;
    }

    return out;
  }

  /* ---- CSS ------------------------------------------------------------ */

  function tokenizeCSS(src) {
    var out = [];
    var i = 0;
    var n = src.length;
    var inBlock = false;
    var afterColon = false;

    function push(text, type) { if (text) out.push({ text: text, type: type }); }

    while (i < n) {
      if (src.startsWith('/*', i)) {
        var end = src.indexOf('*/', i);
        end = end === -1 ? n : end + 2;
        push(src.slice(i, end), 'comment');
        i = end;
        continue;
      }

      var ch = src[i];

      if (ch === '{') { push('{', 'punct'); inBlock = true; afterColon = false; i++; continue; }
      if (ch === '}') { push('}', 'punct'); inBlock = false; afterColon = false; i++; continue; }
      if (ch === ';') { push(';', 'punct'); afterColon = false; i++; continue; }
      if (ch === ':' && inBlock) { push(':', 'punct'); afterColon = true; i++; continue; }

      if (ch === '"' || ch === "'") {
        var close = src.indexOf(ch, i + 1);
        close = close === -1 ? n : close + 1;
        push(src.slice(i, close), 'string');
        i = close;
        continue;
      }

      var ws2 = /^\s+/.exec(src.slice(i));
      if (ws2) { push(ws2[0], 'text'); i += ws2[0].length; continue; }

      if (ch === '@') {
        var at = /^@[\w-]+/.exec(src.slice(i));
        if (at) { push(at[0], 'atrule'); i += at[0].length; continue; }
      }

      /* a custom property is a property wherever it appears */
      var custom = /^--[\w-]+/.exec(src.slice(i));
      if (custom && !afterColon) {
        push(custom[0], 'prop');
        i += custom[0].length;
        continue;
      }

      if (!inBlock) {
        var sel = /^[^{};/@\s"']+/.exec(src.slice(i));
        if (sel) { push(sel[0], 'selector'); i += sel[0].length; continue; }
        push(ch, 'text');
        i++;
        continue;
      }

      if (!afterColon) {
        var prop = /^[-\w]+/.exec(src.slice(i));
        if (prop) { push(prop[0], 'prop'); i += prop[0].length; continue; }
        push(ch, 'text');
        i++;
        continue;
      }

      /* inside a value */
      var num = /^#[0-9a-fA-F]{3,8}\b|^-?[\d.]+(px|rem|em|%|s|ms|deg|fr|ch|vw|vh|dvh|vmin|vmax|pt|cm)?\b/
        .exec(src.slice(i));
      if (num) { push(num[0], 'number'); i += num[0].length; continue; }

      var word = /^[\w-]+/.exec(src.slice(i));
      if (word) { push(word[0], 'value'); i += word[0].length; continue; }

      push(ch, 'punct');
      i++;
    }

    return out;
  }

  /* ---- Split tokens into lines ---------------------------------------- */

  function toLines(tokens) {
    var lines = [[]];
    tokens.forEach(function (t) {
      var parts = t.text.split('\n');
      parts.forEach(function (p, idx) {
        if (idx > 0) lines.push([]);
        if (p) lines[lines.length - 1].push({ text: p, type: t.type });
      });
    });
    return lines;
  }

  WP.highlight = {
    lines: function (src, lang) {
      return toLines(lang === 'css' ? tokenizeCSS(src || '') : tokenizeHTML(src || ''));
    }
  };

}(window.WP));
