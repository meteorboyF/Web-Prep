/* nav.js — renders the sidebar from WP.site.nav and marks the current page.
   Every href is prefixed with the page's data-base, so the same data drives
   the nav from the repo root and from lessons/ two levels in. */

(function (WP) {
  'use strict';

  function buildGroup(group) {
    var list = WP.el('ul', { class: 'nav-list' });

    group.items.forEach(function (item) {
      var li = WP.el('li');

      if (item.ready === false) {
        li.appendChild(WP.el('span', { class: 'is-pending', text: item.label }));
      } else {
        var href = WP.url(item.href);
        var a = WP.el('a', { href: href, text: item.label });
        if (WP.isCurrent(href)) a.setAttribute('aria-current', 'page');
        li.appendChild(a);
      }

      list.appendChild(li);
    });

    return WP.el('div', { class: 'nav-group' }, [
      WP.el('h2', { text: group.heading }),
      list
    ]);
  }

  WP.renderNav = function () {
    var host = document.querySelector('[data-nav]');
    if (!host || !WP.site) return;

    host.textContent = '';
    WP.site.nav.forEach(function (group) {
      host.appendChild(buildGroup(group));
    });
  };

  WP.initNavToggle = function () {
    var btn = document.querySelector('[data-nav-toggle]');
    var sidebar = document.querySelector('.sidebar');
    if (!btn || !sidebar) return;

    btn.addEventListener('click', function () {
      var open = sidebar.dataset.open === 'true';
      sidebar.dataset.open = open ? 'false' : 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
  };

}(window.WP));
