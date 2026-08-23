/* cheatsheet.js — renders the reference page and filters it as you type.

   Rows come from data/cheatsheet.js as [syntax, meaning, tryConfig?]. A row
   with a third element gets a "try it" button that mounts a playground
   inline, on demand — mounting all of them up front would be a few hundred
   iframes for a page most people scroll past. */

(function (WP) {
  'use strict';

  var el = WP.el;

  function stripTags(s) { return String(s).replace(/<[^>]*>/g, ''); }

  /* Search text is matched against the rendered text, not the markup, so
     typing "flex" does not match a stray class name inside an example. */
  function searchable(row, groupName) {
    return (groupName + ' ' + stripTags(row[0]) + ' ' + stripTags(row[1] || ''))
      .toLowerCase()
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  }

  WP.renderCheatsheet = function () {
    var host = document.querySelector('[data-cheatsheet]');
    if (!host || !WP.cheatsheet) return;

    var groups = [];
    var totalRows = 0;

    /* ---- Group index ------------------------------------------------- */

    var index = el('nav', { class: 'cs__index', 'aria-label': 'Cheatsheet sections' });
    var indexList = el('ul');

    WP.cheatsheet.forEach(function (g) {
      indexList.appendChild(el('li', {}, [
        el('a', { href: '#' + g.id, text: g.group })
      ]));
    });
    index.appendChild(indexList);

    /* ---- Search ------------------------------------------------------ */

    var input = el('input', {
      type: 'search', class: 'cs__search', id: 'cs-search',
      placeholder: 'Filter — try "flex", "shadow", "sticky", "exam"',
      autocomplete: 'off', spellcheck: 'false'
    });
    var count = el('p', { class: 'cs__count', role: 'status', 'aria-live': 'polite' });

    var searchBox = el('div', { class: 'cs__searchbox' }, [
      el('label', { class: 'sr-only', for: 'cs-search', text: 'Filter the cheatsheet' }),
      input,
      count
    ]);

    host.appendChild(searchBox);
    host.appendChild(index);

    /* ---- Groups and rows --------------------------------------------- */

    WP.cheatsheet.forEach(function (g) {
      var section = el('section', { class: 'cs__group', id: g.id });
      section.appendChild(el('h2', {}, [
        el('span', { text: g.group }),
        el('a', { class: 'lsn__anchor', href: '#' + g.id,
          'aria-label': 'Link to ' + g.group, text: '#' })
      ]));

      var list = el('div', { class: 'cs__rows' });
      var rows = [];

      g.rows.forEach(function (r) {
        var row = el('div', { class: 'cs__row' });

        var syntax = el('div', { class: 'cs__syntax' }, [
          el('code', { html: r[0] })
        ]);

        var meaning = el('div', { class: 'cs__meaning', html: r[1] || '' });

        row.appendChild(syntax);
        row.appendChild(meaning);

        if (r[2]) {
          var slot = el('div', { class: 'cs__try' });
          var btn = el('button', { class: 'pg__btn cs__trybtn', type: 'button',
            text: 'Try it', 'aria-expanded': 'false' });

          btn.addEventListener('click', function () {
            if (slot.dataset.open === 'true') {
              slot.textContent = '';
              slot.dataset.open = 'false';
              btn.textContent = 'Try it';
              btn.setAttribute('aria-expanded', 'false');
              return;
            }
            var mountPoint = el('div');
            slot.appendChild(mountPoint);
            WP.playground.mount(mountPoint, Object.assign({
              title: stripTags(r[0]),
              height: 240
            }, r[2]));
            slot.dataset.open = 'true';
            btn.textContent = 'Hide';
            btn.setAttribute('aria-expanded', 'true');
          });

          meaning.appendChild(btn);
          row.appendChild(slot);
        }

        list.appendChild(row);
        rows.push({ node: row, text: searchable(r, g.group) });
        totalRows++;
      });

      section.appendChild(list);
      host.appendChild(section);
      groups.push({ node: section, rows: rows });
    });

    /* ---- Filtering ---------------------------------------------------- */

    function filter() {
      var q = input.value.trim().toLowerCase();
      var shown = 0;

      groups.forEach(function (g) {
        var visible = 0;
        g.rows.forEach(function (r) {
          var match = !q || r.text.indexOf(q) !== -1;
          r.node.hidden = !match;
          if (match) visible++;
        });
        g.node.hidden = visible === 0;
        shown += visible;
      });

      index.hidden = !!q;

      if (!q) {
        count.textContent = totalRows + ' rows across ' + groups.length + ' sections.';
        count.dataset.state = '';
      } else if (shown === 0) {
        count.textContent = 'Nothing matches “' + input.value.trim() + '”.';
        count.dataset.state = 'empty';
      } else {
        count.textContent = shown + ' of ' + totalRows + ' rows.';
        count.dataset.state = 'filtered';
      }
    }

    input.addEventListener('input', filter);

    /* Escape clears, which is what a search field should do. */
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && input.value) {
        e.preventDefault();
        input.value = '';
        filter();
      }
    });

    /* "/" focuses the filter from anywhere on the page. */
    document.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable) return;
      e.preventDefault();
      input.focus();
      input.select();
    });

    filter();
  };

}(window.WP));
