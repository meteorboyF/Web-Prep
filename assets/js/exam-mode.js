/* exam-mode.js — a 90 minute clock, a random prototype, and a blank editor.

   The timer keeps its state in localStorage rather than in a variable, so a
   refresh, a crash or a closed tab does not lose the run. What is stored is
   the accumulated elapsed time plus the moment the current segment started;
   the remaining time is computed from those, never counted down by the
   interval. An interval that stops firing — a backgrounded tab throttles to
   once a minute — would otherwise make the clock run slow, which is exactly
   the wrong failure for a practice timer. */

(function (WP) {
  'use strict';

  var el = WP.el;
  var TOTAL = 90 * 60 * 1000;
  var KEY = 'exam';

  /* ---- Clock state ---------------------------------------------------- */

  function state() {
    return WP.store.get(KEY, { elapsed: 0, startedAt: null, prototype: null });
  }

  function save(s) { WP.store.set(KEY, s); }

  function elapsed(s) {
    return s.elapsed + (s.startedAt ? Date.now() - s.startedAt : 0);
  }

  function fmt(ms) {
    if (ms < 0) ms = 0;
    var total = Math.floor(ms / 1000);
    var m = Math.floor(total / 60);
    var sec = total % 60;
    return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  /* ---- Page ----------------------------------------------------------- */

  WP.renderExamMode = function () {
    var host = document.querySelector('[data-exam]');
    if (!host || !WP.site) return;

    var s = state();

    /* Pick a prototype, and remember it for the length of the run. */
    var list = WP.site.prototypes;
    if (!s.prototype || !list.some(function (p) { return p.id === s.prototype; })) {
      s.prototype = list[Math.floor(Math.random() * list.length)].id;
      save(s);
    }
    var proto = list.filter(function (p) { return p.id === s.prototype; })[0];

    /* --- clock --- */
    var readout = el('p', { class: 'ex__clock', role: 'timer', 'aria-live': 'off' });
    var startBtn = el('button', { class: 'btn', type: 'button' });
    var resetBtn = el('button', { class: 'btn btn--ghost', type: 'button', text: 'Reset' });
    var bar = el('div', { class: 'ex__bar' }, [el('span')]);
    var note = el('p', { class: 'ex__note' });

    var clock = el('section', { class: 'ex__clockbox' }, [
      readout,
      bar,
      el('div', { class: 'ex__controls' }, [startBtn, resetBtn]),
      note
    ]);

    function paint() {
      var st = state();
      var used = elapsed(st);
      var left = TOTAL - used;

      readout.textContent = fmt(left);
      clock.dataset.state = st.startedAt ? 'running' : (used > 0 ? 'paused' : 'idle');
      startBtn.textContent = st.startedAt ? 'Pause' : (used > 0 ? 'Resume' : 'Start 90 minutes');

      bar.firstChild.style.width = Math.min(100, (used / TOTAL) * 100) + '%';

      if (left <= 0) {
        clock.dataset.warn = 'over';
        note.textContent = 'Time. In the real thing you would be handing this in now.';
      } else if (left <= 5 * 60 * 1000) {
        clock.dataset.warn = 'high';
        note.textContent = 'Five minutes. Stop styling and make sure both answers are on screen.';
      } else if (left <= 15 * 60 * 1000) {
        clock.dataset.warn = 'mid';
        note.textContent = 'Fifteen minutes. If the second prototype has not been started, start it now.';
      } else if (used >= 45 * 60 * 1000) {
        clock.dataset.warn = '';
        note.textContent = 'Halfway. You should be finishing the first prototype about now.';
      } else {
        clock.dataset.warn = '';
        note.textContent = 'Structure first, then the palette, then section by section.';
      }
    }

    startBtn.addEventListener('click', function () {
      var st = state();
      if (st.startedAt) {
        st.elapsed = elapsed(st);
        st.startedAt = null;
      } else {
        st.startedAt = Date.now();
      }
      save(st);
      paint();
    });

    resetBtn.addEventListener('click', function () {
      if (!window.confirm('Reset the clock and pick a different prototype?')) return;
      WP.store.set(KEY, { elapsed: 0, startedAt: null, prototype: null });
      window.location.reload();
    });

    host.appendChild(clock);

    /* --- target --- */
    var img = el('img', {
      src: WP.url('assets/img/prototypes/' + proto.id + '.jpg'),
      alt: 'The ' + proto.title + ' prototype'
    });

    var reveal = el('a', {
      class: 'pg__btn',
      href: WP.url('exams/walkthrough.html') + '?p=' + proto.id,
      text: 'Reveal the walkthrough'
    });

    var hidden = el('button', { class: 'pg__btn', type: 'button', text: 'Hide the target' });

    var figure = el('figure', { class: 'wt__target ex__target', 'data-hidden': 'false' }, [
      el('div', { class: 'wt__targetbar' }, [
        el('strong', { text: proto.paper + ' — ' + proto.title }),
        el('span', {
          class: 'badge ' + (proto.palette === 'annotated' ? 'badge--ok' : 'badge--warn'),
          text: proto.palette === 'annotated' ? 'palette annotated' : 'palette sampled'
        }),
        el('span', { class: 'spacer' }),
        hidden,
        el('a', { class: 'pg__btn', href: WP.url('assets/img/prototypes/' + proto.id + '.jpg'),
          target: '_blank', rel: 'noopener', text: 'Full size' }),
        reveal
      ]),
      img
    ]);

    hidden.addEventListener('click', function () {
      var on = figure.dataset.hidden === 'true';
      figure.dataset.hidden = on ? 'false' : 'true';
      hidden.textContent = on ? 'Hide the target' : 'Show the target';
    });

    host.appendChild(el('h2', { class: 'wt__h', text: 'Your prototype' }));
    host.appendChild(el('p', { class: 'wt__note', html:
      'Picked at random and kept for this run. <strong>Reset</strong> draws a different one. ' +
      'Reproduce it in the editor below, then reveal the walkthrough and compare.' }));
    host.appendChild(figure);

    /* --- blank editor --- */
    host.appendChild(el('h2', { class: 'wt__h', text: 'Your answer' }));
    host.appendChild(el('p', { class: 'wt__note', html:
      'Two files, as in the exam. The reset is already typed — in the real thing you type it ' +
      'yourself, and it should take about thirty seconds.' }));

    var mount = el('div');
    host.appendChild(mount);

    WP.playground.mount(mount, {
      doc: true,
      title: 'Exam answer',
      height: 460,
      live: true,
      html: [
        '<!DOCTYPE html>',
        '<html lang="en">',
        '<head>',
        '  <meta charset="UTF-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '  <title>Prototype</title>',
        '  <link rel="stylesheet" href="style.css">',
        '</head>',
        '<body>',
        '',
        '  <!-- structure first. All of it, before any styling. -->',
        '',
        '</body>',
        '</html>'
      ].join('\n'),
      css: [
        '/* 1. The reset. */',
        '* { margin: 0; padding: 0; box-sizing: border-box; }',
        '',
        'body { font-family: system-ui, Arial, sans-serif; }',
        'img { max-width: 100%; display: block; }',
        'a { text-decoration: none; color: inherit; }',
        '',
        '/* 2. Show me the boxes while you build. */',
        '* { outline: 1px solid rgba(180, 84, 27, .5); }',
        '',
        '/* 3. The palette, straight off the question paper. */',
        ':root {',
        '  --brand: #000000;',
        '}',
        ''
      ].join('\n')
    });

    paint();
    setInterval(paint, 1000);

    /* Coming back to a backgrounded tab repaints immediately rather than
       waiting up to a second, which matters when the number is the point. */
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) paint();
    });
  };

}(window.WP));
