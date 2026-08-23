/* lesson.js — builds a whole lesson page from its data file.

   A lesson page's HTML is a shell: a header, an empty <div data-lesson="part-1">
   and the script tags. Everything below comes from data/lessons/part-1.js, so
   adding a section is a one-file change. See CLAUDE.md.

   Body blocks, in the order they are declared:

     'a paragraph'                        inline HTML is allowed
     { h: 'A subheading' }
     { list: [...], ordered: true }
     { table: { head: [...], rows: [[...]] , caption: '...' } }
     { code: '...', label: 'optional caption' }
     { callout: { kind: 'trap'|'tip'|'note', title: '...', text: '...' } }
     { playground: { ...playground config... } }

   `trap:` and `tip:` on the section itself are shorthand for callouts placed
   at the end, which is where most of them belong.
*/

(function (WP) {
  'use strict';

  var el = WP.el;

  /* ---- Body blocks --------------------------------------------------- */

  function renderBlock(block, mounts) {
    if (typeof block === 'string') {
      return el('p', { html: block });
    }

    if (block.h) {
      return el('h3', { html: block.h });
    }

    if (block.list) {
      var list = el(block.ordered ? 'ol' : 'ul');
      block.list.forEach(function (item) {
        list.appendChild(el('li', { html: item }));
      });
      return list;
    }

    if (block.table) {
      return renderTable(block.table);
    }

    if (block.code) {
      var pre = el('pre', {}, [el('code', { text: block.code.replace(/^\n/, '') })]);
      if (!block.label) return pre;
      return el('figure', { class: 'codeblock' }, [
        pre,
        el('figcaption', { html: block.label })
      ]);
    }

    if (block.callout) {
      return renderCallout(block.callout);
    }

    if (block.playground) {
      var host = el('div', { 'data-pg-slot': '' });
      mounts.push({ host: host, config: block.playground });
      return host;
    }

    return el('p', { text: '[unrecognised block]' });
  }

  function renderTable(spec) {
    var table = el('table');

    if (spec.caption) {
      table.appendChild(el('caption', { html: spec.caption }));
    }

    if (spec.head) {
      var hr = el('tr');
      spec.head.forEach(function (h) {
        hr.appendChild(el('th', { scope: 'col', html: h }));
      });
      table.appendChild(el('thead', {}, [hr]));
    }

    var tbody = el('tbody');
    (spec.rows || []).forEach(function (row) {
      var tr = el('tr');
      row.forEach(function (cell, i) {
        /* First cell is a row header when the table has a head: it is what
           makes a wide table navigable aloud. Part 1 §7 teaches this, so the
           site had better do it. */
        tr.appendChild(i === 0 && spec.head
          ? el('th', { scope: 'row', html: cell })
          : el('td', { html: cell }));
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    return el('div', { class: 'table-wrap' }, [table]);
  }

  function renderCallout(spec) {
    var kind = spec.kind || 'note';
    var defaultTitle = { trap: 'Trap', tip: 'Tip', note: 'Note' }[kind] || 'Note';
    return el('aside', {
      class: 'callout' + (kind === 'note' ? '' : ' callout--' + kind),
      html: '<strong>' + (spec.title || defaultTitle) + '</strong>' + spec.text
    });
  }

  /* ---- Sections ------------------------------------------------------ */

  function renderSection(pageId, section, index, mounts, ticks) {
    var node = el('section', { class: 'lsn', id: section.id });

    var heading = el('h2', { class: 'lsn__h' }, [
      el('span', { class: 'lsn__num', text: String(index + 1) }),
      el('span', { html: section.title }),
      el('a', { class: 'lsn__anchor', href: '#' + section.id,
        'aria-label': 'Link to “' + stripTags(section.title) + '”', text: '#' })
    ]);
    node.appendChild(heading);

    (section.body || []).forEach(function (block) {
      node.appendChild(renderBlock(block, mounts));
    });

    if (section.playground) {
      var host = el('div', { 'data-pg-slot': '' });
      mounts.push({ host: host, config: section.playground });
      node.appendChild(host);
    }

    if (section.trap) {
      node.appendChild(renderCallout({ kind: 'trap', text: section.trap }));
    }
    if (section.tip) {
      node.appendChild(renderCallout({ kind: 'tip', text: section.tip }));
    }

    /* Completion tick */
    var key = pageId + '/' + section.id;
    var box = el('input', { type: 'checkbox', id: 'tick-' + section.id });
    box.checked = WP.progress.isDone(key);

    var label = el('label', { class: 'lsn__tick', for: 'tick-' + section.id }, [
      box, document.createTextNode('Got this')
    ]);
    node.appendChild(el('div', { class: 'lsn__foot' }, [label]));

    ticks.push({ key: key, box: box, section: section });

    return node;
  }

  function stripTags(s) {
    return String(s).replace(/<[^>]*>/g, '');
  }

  /* ---- Page ---------------------------------------------------------- */

  WP.renderLesson = function (pageId) {
    var host = document.querySelector('[data-lesson]');
    var data = WP.lessons[pageId];

    if (!host) return;
    if (!data) {
      host.appendChild(renderCallout({ kind: 'trap', title: 'Missing lesson',
        text: 'No lesson is registered under <code>' + pageId + '</code>.' }));
      return;
    }

    /* The shell page's <title> is left alone. It carries "Part 1 · …", which
       is more useful in a tab strip than the bare lesson title, and a unique
       title per page is a Part 5 requirement this site should meet itself. */

    var mounts = [];
    var ticks = [];

    /* Header */
    var header = el('div', { class: 'lsn__intro' }, [
      el('p', { class: 'eyebrow', html: data.eyebrow || '' }),
      el('h1', { html: data.title }),
      el('p', { class: 'lede', html: data.blurb || '' })
    ]);
    host.appendChild(header);

    /* Progress */
    var prog = el('div', { class: 'prog' });
    host.appendChild(prog);

    /* Sections */
    data.sections.forEach(function (section, i) {
      host.appendChild(renderSection(pageId, section, i, mounts, ticks));
    });

    /* Footer navigation between parts */
    if (data.next || data.prev) {
      var foot = el('nav', { class: 'lsn__nav', 'aria-label': 'Lesson navigation' });
      if (data.prev) {
        foot.appendChild(el('a', { class: 'btn btn--ghost', href: WP.url(data.prev.href),
          html: '← ' + data.prev.label }));
      }
      if (data.next) {
        foot.appendChild(el('a', { class: 'btn', href: WP.url(data.next.href),
          html: data.next.label + ' →' }));
      }
      host.appendChild(foot);
    }

    /* Mount every playground now that the tree is in the document. */
    mounts.forEach(function (m) {
      WP.playground.mount(m.host, m.config);
    });

    buildProgress(pageId, prog, ticks, data);
    buildToc(pageId, data, ticks);
    trackPosition(pageId, data);
  };

  /* ---- Progress bar --------------------------------------------------- */

  function buildProgress(pageId, host, ticks, data) {
    var total = ticks.length;

    var fill = el('span');
    var bar = el('div', { class: 'prog__bar', role: 'progressbar',
      'aria-label': 'Sections completed',
      'aria-valuemin': '0', 'aria-valuemax': String(total) }, [fill]);

    var count = el('span', { class: 'prog__count' });

    var reset = el('button', { class: 'pg__btn', type: 'button',
      text: 'Reset progress',
      title: 'Clear every tick on every page' });

    host.appendChild(bar);
    host.appendChild(el('p', { class: 'prog__meta' }, [
      count,
      el('span', { class: 'spacer' }),
      reset
    ]));

    function refresh() {
      var done = ticks.filter(function (t) { return t.box.checked; }).length;
      fill.style.width = total ? Math.round((done / total) * 100) + '%' : '0%';
      bar.setAttribute('aria-valuenow', String(done));
      count.textContent = done + ' of ' + total + ' sections marked';
      updateTocTicks(ticks);
    }

    ticks.forEach(function (t) {
      t.box.addEventListener('change', function () {
        WP.progress.setDone(t.key, t.box.checked);
        refresh();
      });
    });

    reset.addEventListener('click', function () {
      if (!window.confirm('Clear every tick on every page? This cannot be undone.')) return;
      WP.progress.reset();
      ticks.forEach(function (t) { t.box.checked = false; });
      refresh();
    });

    if (!WP.progress.available()) {
      host.appendChild(el('p', { class: 'prog__warn', text:
        'Local storage is unavailable in this browser, so ticks will not be remembered.' }));
    }

    refresh();
    data._refresh = refresh;
  }

  /* ---- Sidebar table of contents -------------------------------------- */

  var tocLinks = {};

  function buildToc(pageId, data, ticks) {
    var sidebar = document.querySelector('[data-nav]');
    if (!sidebar) return;

    var list = el('ul', { class: 'nav-list toc' });

    data.sections.forEach(function (section) {
      var a = el('a', { href: '#' + section.id }, [
        el('span', { class: 'toc__dot', 'aria-hidden': 'true' }),
        el('span', { html: section.title })
      ]);
      tocLinks[pageId + '/' + section.id] = a;
      list.appendChild(el('li', {}, [a]));
    });

    sidebar.appendChild(el('div', { class: 'nav-group' }, [
      el('h2', { text: 'On this page' }),
      list
    ]));

    updateTocTicks(ticks);
  }

  function updateTocTicks(ticks) {
    ticks.forEach(function (t) {
      var a = tocLinks[t.key];
      if (a) a.dataset.done = t.box.checked ? 'true' : 'false';
    });
  }

  /* ---- Remember where you were ----------------------------------------- */

  /* Scrollspy.

     An IntersectionObserver looks like the right tool here and is not: it
     reports which elements *changed* state, so when a band spans a section
     boundary the answer depends on entry order, and the sticky header means
     the band never sits where you think it does. Picking the last section
     whose top has passed under the header is deterministic and is what the
     reader actually perceives as "the section I am in". */

  function trackPosition(pageId, data) {
    var nodes = data.sections.map(function (s) {
      return { id: s.id, title: stripTags(s.title), node: document.getElementById(s.id) };
    }).filter(function (s) { return s.node; });

    if (!nodes.length) return;

    var current = null;
    var queued = false;

    /* The line a section's top must cross to count as "current".

       It has to sit just *below* where an anchor jump parks a section, which
       lesson.css does with scroll-margin-top: header + --s-4 (16px). Land on
       or above that and clicking a link in the contents highlights the
       section before the one you asked for — off by four pixels, and
       thoroughly confusing to look at. */

    function headerOffset() {
      var header = document.querySelector('.site-header');
      return (header ? header.getBoundingClientRect().height : 0) + 24;
    }

    function update() {
      queued = false;
      var line = headerOffset();
      var active = nodes[0];

      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].node.getBoundingClientRect().top <= line) active = nodes[i];
        else break;
      }

      /* At the very bottom of the page the last section may never reach the
         line, so treat "scrolled to the end" as being in it. */
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        active = nodes[nodes.length - 1];
      }

      if (active.id === current) return;
      current = active.id;

      Object.keys(tocLinks).forEach(function (k) {
        tocLinks[k].removeAttribute('aria-current');
      });
      var a = tocLinks[pageId + '/' + active.id];
      if (a) a.setAttribute('aria-current', 'true');

      WP.progress.setLast(pageId, active.id, active.title);
    }

    function onScroll() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

}(window.WP));
