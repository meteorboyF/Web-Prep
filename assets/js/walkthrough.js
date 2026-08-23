/* walkthrough.js — builds a prototype walkthrough from its data file.

   The shape of the page, in order:

     target image      pinned, and viewable beside the preview via Compare
     palette strip     click any swatch to copy the hex
     structure         the analysis, before a single line of code
     method            why this build order, for this layout
     steps             prev / next / jump, with a line diff of what changed
     final solution    copy button, what earns marks, what to drop

   The structure analysis comes before the code deliberately. Reading a
   screenshot and naming its regions is the transferable skill; the code is
   the easy part once you have done that.

   Each step stores the *cumulative* code, and the renderer diffs step N
   against step N-1 to highlight what changed. Storing diffs instead would be
   wrong: real build steps modify earlier lines, they do not only append. */

(function (WP) {
  'use strict';

  var el = WP.el;

  /* ---- Line diff ----------------------------------------------------- */
  /* Plain LCS. The files are a couple of hundred lines at most, so the
     quadratic table is irrelevant and the result is exact. */

  function lineDiff(oldText, newText) {
    var b = (newText || '').split('\n');

    /* On the first step there is no previous version, so everything is new.
       Without this, ''.split('\n') is [''] and the LCS happily matches it
       against the first blank line in the new file, leaving one line of
       step 1 mysteriously unhighlighted. */
    if (!oldText) {
      return b.map(function (t) { return { text: t, added: true }; });
    }

    var a = oldText.split('\n');
    var m = a.length, n = b.length;

    var dp = [];
    for (var i = 0; i <= m; i++) dp.push(new Uint16Array(n + 1));

    for (var i2 = m - 1; i2 >= 0; i2--) {
      for (var j2 = n - 1; j2 >= 0; j2--) {
        dp[i2][j2] = a[i2] === b[j2]
          ? dp[i2 + 1][j2 + 1] + 1
          : Math.max(dp[i2 + 1][j2], dp[i2][j2 + 1]);
      }
    }

    var out = [];
    var i3 = 0, j3 = 0;
    while (i3 < m && j3 < n) {
      if (a[i3] === b[j3]) { out.push({ text: b[j3], added: false }); i3++; j3++; }
      else if (dp[i3 + 1][j3] >= dp[i3][j3 + 1]) { i3++; }
      else { out.push({ text: b[j3], added: true }); j3++; }
    }
    while (j3 < n) { out.push({ text: b[j3], added: true }); j3++; }

    return out;
  }

  /* ---- Preview -------------------------------------------------------- */

  function buildDoc(html, css) {
    if (/<\/head\s*>/i.test(html)) {
      return html.replace(/<\/head\s*>/i, '<style>' + css + '</style></head>');
    }
    return '<style>' + css + '</style>' + html;
  }

  /* ---- Clipboard ------------------------------------------------------ */

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text)
        .then(function () { return true; })
        .catch(legacy);
    }
    return Promise.resolve(legacy());

    function legacy() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:absolute;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch (e) { return false; }
    }
  }

  function flash(btn, ok, done) {
    var original = btn.textContent;
    btn.textContent = ok ? (done || 'Copied') : 'Select and copy';
    btn.dataset.done = ok ? 'true' : 'false';
    setTimeout(function () {
      btn.textContent = original;
      delete btn.dataset.done;
    }, 1600);
  }

  /* ---- Page ----------------------------------------------------------- */

  WP.renderWalkthrough = function () {
    var host = document.querySelector('[data-walkthrough]');
    if (!host) return;

    var id;
    try { id = new URLSearchParams(window.location.search).get('p'); } catch (e) { id = null; }
    id = id || host.getAttribute('data-walkthrough') || '';

    var data = WP.exams[id];

    if (!data) {
      host.appendChild(el('aside', { class: 'callout callout--trap', html:
        '<strong>No walkthrough for that prototype yet</strong>' +
        (id ? 'Nothing is registered under <code>' + id + '</code>. ' : '') +
        'See <a href="' + WP.url('exams/index.html') + '">all twelve prototypes</a> for what is ready.' }));
      return;
    }

    document.title = data.title + ' — Web-Prep';

    /* --- Heading --- */
    host.appendChild(el('div', { class: 'wt__intro' }, [
      el('p', { class: 'eyebrow', text: data.paper }),
      el('h1', { html: data.title }),
      el('p', { class: 'wt__meta' }, [
        el('span', { class: 'badge badge--brand', text: data.marks + ' marks' }),
        el('span', { class: 'badge', text: data.minutes + ' min budget' }),
        el('span', {
          class: 'badge ' + (data.paletteSource === 'annotated' ? 'badge--ok' : 'badge--warn'),
          text: data.paletteSource === 'annotated'
            ? 'palette printed on the paper'
            : 'palette sampled, not specified'
        })
      ])
    ]));

    /* --- Target image --- */
    var img = el('img', {
      src: WP.url(data.image),
      alt: 'The ' + data.title + ' prototype as printed on the exam paper',
      loading: 'eager'
    });

    var pinBtn = el('button', { class: 'pg__btn', type: 'button', text: 'Pin',
      'aria-pressed': 'false', title: 'Keep the target visible while you scroll' });

    var figure = el('figure', { class: 'wt__target', 'data-pinned': 'false' }, [
      el('div', { class: 'wt__targetbar' }, [
        el('strong', { text: 'The target' }),
        el('span', { class: 'spacer' }),
        pinBtn,
        el('a', { class: 'pg__btn', href: WP.url(data.image), target: '_blank',
          rel: 'noopener', text: 'Full size' })
      ]),
      img
    ]);

    pinBtn.addEventListener('click', function () {
      var on = figure.dataset.pinned === 'true';
      figure.dataset.pinned = on ? 'false' : 'true';
      pinBtn.setAttribute('aria-pressed', on ? 'false' : 'true');
      pinBtn.textContent = on ? 'Pin' : 'Unpin';
    });

    host.appendChild(figure);

    /* --- Palette --- */
    host.appendChild(el('h2', { class: 'wt__h', text: 'The palette' }));
    host.appendChild(el('p', { class: 'wt__note', html:
      data.paletteSource === 'annotated'
        ? 'Every one of these is printed on the paper with a red arrow. <strong>They are ' +
          'marks.</strong> Copy them into a <code>:root</code> block before you write any ' +
          'layout — click a swatch to copy it.'
        : 'This paper carries <strong>no annotated hex codes</strong>. These were sampled ' +
          'from the printed prototype, so close is fine and exact matching is not worth ' +
          'your time. Click a swatch to copy it.' }));

    var strip = el('div', { class: 'wt__palette' });
    data.palette.forEach(function (c) {
      var btn = el('button', { class: 'wt__sw', type: 'button',
        title: 'Copy ' + c.hex });
      btn.appendChild(el('span', { class: 'wt__chip', style: 'background:' + c.hex }));
      btn.appendChild(el('span', { class: 'wt__hex', text: c.hex }));
      btn.appendChild(el('span', { class: 'wt__role', html: c.role }));
      btn.addEventListener('click', function () {
        copy(c.hex).then(function (ok) {
          btn.dataset.copied = ok ? 'true' : 'false';
          setTimeout(function () { delete btn.dataset.copied; }, 1200);
        });
      });
      strip.appendChild(btn);
    });

    var copyAll = el('button', { class: 'pg__btn', type: 'button', text: 'Copy all as :root' });
    copyAll.addEventListener('click', function () {
      var lines = [':root {'];
      data.palette.forEach(function (c) {
        lines.push('  --' + c.name + ': ' + c.hex + ';');
      });
      lines.push('}');
      copy(lines.join('\n')).then(function (ok) { flash(copyAll, ok); });
    });

    host.appendChild(strip);
    host.appendChild(el('p', { class: 'wt__actions' }, [copyAll]));

    /* --- Structure --- */
    host.appendChild(el('h2', { class: 'wt__h', text: 'Read the structure first' }));
    host.appendChild(el('p', { class: 'wt__note', html: data.structureIntro || '' }));

    var tree = el('ol', { class: 'wt__structure' });
    data.structure.forEach(function (s) {
      tree.appendChild(el('li', {}, [
        el('strong', { html: s.region }),
        el('span', { html: s.note })
      ]));
    });
    host.appendChild(tree);

    /* --- Method --- */
    host.appendChild(el('aside', { class: 'callout callout--tip wt__method', html:
      '<strong>Why this order</strong>' + data.method }));

    /* --- Steps --- */
    host.appendChild(el('h2', { class: 'wt__h', id: 'steps', text: 'Build it, step by step' }));

    var jump = el('ol', { class: 'wt__jump' });
    var stepButtons = [];

    data.steps.forEach(function (s, i) {
      var b = el('button', { class: 'wt__jumpbtn', type: 'button' }, [
        el('span', { class: 'wt__jumpn', text: String(i + 1) }),
        el('span', { html: s.title }),
        el('span', { class: 'wt__jumpm', text: s.minutes + ' min' })
      ]);
      b.addEventListener('click', function () { show(i); });
      stepButtons.push(b);
      jump.appendChild(el('li', {}, [b]));
    });
    host.appendChild(jump);

    var panel = el('section', { class: 'wt__panel' });
    host.appendChild(panel);

    /* --- Final solution --- */
    var last = data.steps[data.steps.length - 1];

    host.appendChild(el('h2', { class: 'wt__h', text: 'The finished answer' }));

    var finalWrap = el('div', { class: 'wt__final' });
    ['html', 'css'].forEach(function (kind) {
      var text = last[kind];
      var btn = el('button', { class: 'pg__btn', type: 'button',
        text: 'Copy ' + kind.toUpperCase() });
      btn.addEventListener('click', function () {
        copy(text).then(function (ok) { flash(btn, ok); });
      });
      var box = el('details', { class: 'wt__filebox' }, [
        el('summary', {}, [
          el('span', { text: kind === 'html' ? 'index.html' : 'style.css' }),
          el('span', { class: 'spacer' }),
          btn
        ]),
        el('pre', {}, [el('code', { text: text })])
      ]);
      finalWrap.appendChild(box);
    });
    host.appendChild(finalWrap);

    host.appendChild(el('aside', { class: 'callout callout--tip', html:
      '<strong>What earns the marks</strong>' + data.marksNote }));
    host.appendChild(el('aside', { class: 'callout callout--trap', html:
      '<strong>What to drop if you are short on time</strong>' + data.skipNote }));

    if (data.next || data.prev) {
      var nav = el('nav', { class: 'lsn__nav', 'aria-label': 'Other prototypes' });
      if (data.prev) nav.appendChild(el('a', { class: 'btn btn--ghost',
        href: '?p=' + data.prev.id, html: '← ' + data.prev.label }));
      nav.appendChild(el('a', { class: 'btn btn--ghost',
        href: WP.url('exams/index.html'), text: 'All twelve' }));
      if (data.next) nav.appendChild(el('a', { class: 'btn',
        href: '?p=' + data.next.id, html: data.next.label + ' →' }));
      host.appendChild(nav);
    }

    /* ---- Step rendering ------------------------------------------------ */

    var current = -1;
    var stepMounted = [];

    function show(index) {
      if (index < 0 || index >= data.steps.length) return;
      current = index;

      stepButtons.forEach(function (b, i) {
        b.setAttribute('aria-current', i === index ? 'step' : 'false');
      });

      var step = data.steps[index];
      var prevStep = index > 0 ? data.steps[index - 1] : { html: '', css: '' };

      panel.textContent = '';

      /* Header row: position, title, budget, prev/next */
      var prevBtn = el('button', { class: 'pg__btn', type: 'button', text: '← Previous' });
      var nextBtn = el('button', { class: 'pg__btn pg__btn--go', type: 'button', text: 'Next →' });
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === data.steps.length - 1;
      prevBtn.addEventListener('click', function () { show(index - 1); jumpToPanel(); });
      nextBtn.addEventListener('click', function () { show(index + 1); jumpToPanel(); });

      panel.appendChild(el('div', { class: 'wt__panelbar' }, [
        el('span', { class: 'wt__step-n', text: 'Step ' + (index + 1) + ' of ' + data.steps.length }),
        el('span', { class: 'badge', text: '~' + step.minutes + ' min' }),
        el('span', { class: 'spacer' }),
        prevBtn, nextBtn
      ]));

      panel.appendChild(el('h3', { class: 'wt__step-title', html: step.title }));
      panel.appendChild(el('p', { class: 'wt__why', html: step.why }));

      if (step.trap) {
        panel.appendChild(el('aside', { class: 'callout callout--trap',
          html: '<strong>Watch out</strong>' + step.trap }));
      }

      /* Code and preview */
      var body = el('div', { class: 'wt__body' });

      var tabs = el('div', { class: 'pg__tabs', role: 'tablist', 'aria-label': 'Files' });
      var codeHost = el('div', { class: 'wt__code' });

      var panes = {};
      ['html', 'css'].forEach(function (kind, i) {
        var changed = lineDiff(prevStep[kind], step[kind]);
        var added = changed.filter(function (l) { return l.added; }).length;

        var pre = el('pre', { class: 'wt__pre', 'data-active': i === 0 ? 'true' : 'false' });
        changed.forEach(function (line) {
          pre.appendChild(el('span', {
            class: 'wt__line' + (line.added ? ' wt__line--new' : ''),
            text: line.text === '' ? ' ' : line.text
          }));
        });
        codeHost.appendChild(pre);
        panes[kind] = pre;

        var tab = el('button', { class: 'pg__tab', type: 'button', role: 'tab',
          'aria-selected': i === 0 ? 'true' : 'false',
          text: (kind === 'html' ? 'index.html' : 'style.css') + (added ? '  +' + added : '') });
        tab.addEventListener('click', function () {
          Object.keys(panes).forEach(function (k) {
            panes[k].dataset.active = k === kind ? 'true' : 'false';
          });
          Array.prototype.forEach.call(tabs.children, function (t) {
            t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
          });
        });
        tabs.appendChild(tab);
      });

      /* The preview renders at a fixed desktop width and is scaled to fit the
         pane, rather than being squeezed into it.

         These prototypes are desktop screenshots. Letting the iframe take the
         pane's own width means a two-column card becomes two unequal columns
         on a laptop and one narrow column on a phone — so the preview stops
         resembling the thing you are being asked to compare it against.
         Scaling shows the real layout at any pane size. */

      var VW = data.previewWidth || 1180;
      var VH = data.previewHeight || 820;

      var frame = el('iframe', { class: 'wt__frame', sandbox: '',
        title: 'Result after step ' + (index + 1) });
      frame.style.width = VW + 'px';
      frame.style.height = VH + 'px';
      frame.srcdoc = buildDoc(step.html, step.css);

      var scaler = el('div', { class: 'wt__scaler' }, [frame]);

      /* Scale to fit, but never below MIN_SCALE — a 1180px design shrunk to
         26% on a phone is legible to nobody. Below that the pane scrolls
         sideways instead, which is at least usable. */
      var MIN_SCALE = 0.45;

      function fit() {
        var w = scaler.clientWidth;
        if (!w) return;
        var k = Math.max(MIN_SCALE, Math.min(1, w / VW));
        frame.style.transform = 'scale(' + k + ')';
        scaler.style.height = Math.round(VH * k) + 'px';
        scaler.dataset.scrolls = (VW * k > w + 1) ? 'true' : 'false';
      }

      if (window.ResizeObserver) {
        new ResizeObserver(fit).observe(scaler);
      } else {
        window.addEventListener('resize', fit);
      }
      /* The observer fires while the node is still detached, where
         clientWidth is 0 and fit() correctly bails. Call it once more after
         the panel is in the document. */
      stepMounted.push(fit);

      var target = el('img', { class: 'wt__compare', src: WP.url(data.image), alt: '' });

      var preview = el('div', { class: 'wt__preview', 'data-compare': 'false' }, [scaler, target]);

      var compareBtn = el('button', { class: 'pg__btn', type: 'button', text: 'Compare',
        'aria-pressed': 'false', title: 'Show the target beside the result' });
      compareBtn.addEventListener('click', function () {
        var on = preview.dataset.compare === 'true';
        preview.dataset.compare = on ? 'false' : 'true';
        compareBtn.setAttribute('aria-pressed', on ? 'false' : 'true');
        compareBtn.textContent = on ? 'Compare' : 'Result only';
      });

      var editBtn = el('button', { class: 'pg__btn', type: 'button', text: 'Edit from here' });
      var editSlot = el('div', { class: 'wt__edit' });
      editBtn.addEventListener('click', function () {
        if (editSlot.dataset.open === 'true') {
          editSlot.textContent = '';
          editSlot.dataset.open = 'false';
          editBtn.textContent = 'Edit from here';
          return;
        }
        var mount = el('div');
        editSlot.appendChild(mount);
        WP.playground.mount(mount, {
          doc: true,
          title: data.title + ', step ' + (index + 1),
          height: 380,
          html: step.html,
          css: step.css
        });
        editSlot.dataset.open = 'true';
        editBtn.textContent = 'Close editor';
      });

      body.appendChild(el('div', { class: 'wt__col' }, [tabs, codeHost]));
      body.appendChild(el('div', { class: 'wt__col' }, [
        el('div', { class: 'wt__previewbar' }, [
          el('strong', { text: 'Result so far' }),
          el('span', { class: 'wt__scalenote', text: 'shown at ' + VW + 'px, scaled to fit' }),
          el('span', { class: 'spacer' }),
          compareBtn, editBtn
        ]),
        preview
      ]));

      panel.appendChild(body);
      panel.appendChild(editSlot);

      stepMounted.forEach(function (fn) { fn(); });
      stepMounted.length = 0;
    }

    function jumpToPanel() {
      var top = panel.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }

    /* Arrow keys move between steps when the jump list has focus. */
    jump.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        var n = Math.min(current + 1, data.steps.length - 1);
        show(n); stepButtons[n].focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        var p = Math.max(current - 1, 0);
        show(p); stepButtons[p].focus();
      }
    });

    show(0);
  };

}(window.WP));
