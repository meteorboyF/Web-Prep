/* search.js — one box that searches every lesson section, every cheatsheet
   row and every prototype.

   There is no generated index file. On first focus this injects the five
   lesson data files and the cheatsheet, then reads what they registered.
   That costs one round of requests the first time the box is used and
   nothing at all otherwise — and, more importantly, an index that is built
   from the data cannot drift out of date with it.

   Script injection rather than fetch(), because fetch fails from file:// and
   this site has to keep working when it is opened by double-clicking. */

(function (WP) {
  'use strict';

  var el = WP.el;

  var SOURCES = [
    'data/lessons/part-1.js',
    'data/lessons/part-2.js',
    'data/lessons/part-3.js',
    'data/lessons/part-4.js',
    'data/lessons/part-5.js',
    'data/cheatsheet.js'
  ];

  var PART_PAGE = {
    'part-1': 'lessons/part-1.html',
    'part-2': 'lessons/part-2.html',
    'part-3': 'lessons/part-3.html',
    'part-4': 'lessons/part-4.html',
    'part-5': 'lessons/part-5.html'
  };

  var index = null;
  var loading = null;

  function strip(s) { return String(s).replace(/<[^>]*>/g, ''); }

  function build() {
    var out = [];

    Object.keys(WP.lessons).forEach(function (id) {
      var lesson = WP.lessons[id];
      var page = PART_PAGE[id];
      if (!page) return;
      lesson.sections.forEach(function (s) {
        out.push({
          kind: lesson.eyebrow || 'Lesson',
          title: strip(s.title),
          href: page + '#' + s.id,
          extra: strip((s.body || []).filter(function (b) {
            return typeof b === 'string';
          }).join(' ')).slice(0, 400)
        });
      });
    });

    (WP.cheatsheet || []).forEach(function (g) {
      g.rows.forEach(function (r) {
        out.push({
          kind: 'Cheatsheet · ' + g.group,
          title: strip(r[0]).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'),
          href: 'cheatsheet.html#' + g.id,
          extra: strip(r[1] || '')
        });
      });
    });

    (WP.site.prototypes || []).forEach(function (p) {
      out.push({
        kind: 'Prototype · ' + p.paper,
        title: p.title,
        href: 'exams/walkthrough.html?p=' + p.id,
        extra: '15 marks. Palette ' + p.palette + '.'
      });
    });

    out.forEach(function (r) {
      r.hay = (r.kind + ' ' + r.title + ' ' + r.extra).toLowerCase();
    });

    return out;
  }

  function load() {
    if (index) return Promise.resolve(index);
    if (loading) return loading;
    loading = Promise.all(SOURCES.map(function (src) {
      return WP.loadScript(WP.url(src)).catch(function () { /* keep going */ });
    })).then(function () {
      index = build();
      return index;
    });
    return loading;
  }

  WP.initSearch = function () {
    var input = document.querySelector('[data-search]');
    var host = document.querySelector('[data-search-results]');
    if (!input || !host) return;

    var status = el('p', { class: 'srch__status', role: 'status', 'aria-live': 'polite' });
    var list = el('ul', { class: 'srch__list' });
    host.appendChild(status);
    host.appendChild(list);

    var ready = false;

    function warm() {
      if (ready) return Promise.resolve();
      status.textContent = 'Loading the index…';
      return load().then(function () {
        ready = true;
        status.textContent = index.length + ' things to search.';
      });
    }

    input.addEventListener('focus', warm, { once: true });

    function run() {
      var q = input.value.trim().toLowerCase();
      list.textContent = '';

      if (!q) {
        status.textContent = ready ? index.length + ' things to search.' : '';
        host.dataset.open = 'false';
        return;
      }

      warm().then(function () {
        list.textContent = '';
        var hits = index.filter(function (r) { return r.hay.indexOf(q) !== -1; }).slice(0, 40);

        host.dataset.open = 'true';

        if (!hits.length) {
          status.textContent = 'Nothing matches “' + input.value.trim() + '”.';
          return;
        }
        status.textContent = hits.length === 40
          ? 'First 40 matches.'
          : hits.length + (hits.length === 1 ? ' match.' : ' matches.');

        hits.forEach(function (r) {
          list.appendChild(el('li', {}, [
            el('a', { href: WP.url(r.href) }, [
              el('span', { class: 'srch__kind', text: r.kind }),
              el('span', { class: 'srch__title', text: r.title })
            ])
          ]));
        });
      });
    }

    input.addEventListener('input', run);

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && input.value) {
        e.preventDefault();
        input.value = '';
        run();
      }
      if (e.key === 'ArrowDown') {
        var first = list.querySelector('a');
        if (first) { e.preventDefault(); first.focus(); }
      }
    });

    list.addEventListener('keydown', function (e) {
      var links = [].slice.call(list.querySelectorAll('a'));
      var i = links.indexOf(document.activeElement);
      if (i === -1) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); (links[i + 1] || links[0]).focus(); }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (i === 0) input.focus(); else links[i - 1].focus();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      input.focus();
      input.select();
    });
  };

  /* ---- Home page progress summary -------------------------------------- */

  WP.renderProgressSummary = function () {
    var host = document.querySelector('[data-progress]');
    if (!host) return;

    var TOTALS = {
      'part-1': 24, 'part-2': 31, 'part-3': 26, 'part-4': 25, 'part-5': 19
    };
    var LABELS = {
      'part-1': 'HTML5 foundations', 'part-2': 'CSS fundamentals',
      'part-3': 'Layout mastery', 'part-4': 'Advanced CSS',
      'part-5': 'Professional practice'
    };

    var doneAll = 0, totalAll = 0;
    var rows = el('div', { class: 'prog__rows' });

    Object.keys(TOTALS).forEach(function (id) {
      var done = WP.progress.count(id);
      var total = TOTALS[id];
      doneAll += done; totalAll += total;

      var fill = el('span');
      fill.style.width = Math.round((done / total) * 100) + '%';

      rows.appendChild(el('a', { class: 'prog__row', href: WP.url(PART_PAGE[id]) }, [
        el('span', { class: 'prog__name', text: LABELS[id] }),
        el('span', { class: 'prog__bar prog__bar--sm' }, [fill]),
        el('span', { class: 'prog__n', text: done + '/' + total })
      ]));
    });

    host.appendChild(el('p', { class: 'prog__count', html:
      '<strong>' + doneAll + '</strong> of ' + totalAll + ' lesson sections marked' }));
    host.appendChild(rows);

    var last = WP.progress.getLast();
    if (last && PART_PAGE[last.page]) {
      host.appendChild(el('p', { class: 'prog__resume' }, [
        el('a', { class: 'btn', href: WP.url(PART_PAGE[last.page]) + '#' + last.section,
          text: 'Resume: ' + last.label })
      ]));
    }

    var reset = el('button', { class: 'pg__btn', type: 'button', text: 'Reset progress' });
    reset.addEventListener('click', function () {
      if (!window.confirm('Clear every tick on every page? This cannot be undone.')) return;
      WP.progress.reset();
      window.location.reload();
    });
    host.appendChild(el('p', { class: 'prog__meta' }, [reset]));
  };

}(window.WP));
