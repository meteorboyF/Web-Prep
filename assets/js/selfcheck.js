/* selfcheck.js — proves at runtime that every relative path resolved on
   whatever host this page is being served from.

   This exists because the failure it guards against is invisible locally:
   an absolute path like /assets/css/base.css works from a server root and
   404s under https://user.github.io/Web-Prep/. Rather than trust a grep,
   the live page reports what actually loaded. */

(function (WP) {
  'use strict';

  function set(row, pass, detail) {
    var dot = row.querySelector('.check-dot');
    dot.dataset.state = pass ? 'pass' : 'fail';
    dot.setAttribute('aria-label', pass ? 'loaded' : 'failed');
    var d = row.querySelector('.detail');
    if (d && detail) d.textContent = detail;
  }

  function checkStylesheet() {
    /* If tokens.css and base.css loaded, body has the token background and
       the reset has zeroed the default body margin. */
    var cs = getComputedStyle(document.body);
    return cs.marginTop === '0px' &&
           getComputedStyle(document.documentElement)
             .getPropertyValue('--brand').trim() !== '';
  }

  function checkImage(img) {
    return !!(img && img.complete && img.naturalWidth > 0);
  }

  WP.runSelfCheck = function () {
    var host = document.querySelector('[data-selfcheck]');
    if (!host) return;

    var rows = host.querySelectorAll('[data-check]');
    rows.forEach(function (row) {
      var kind = row.dataset.check;
      if (kind === 'css') {
        set(row, checkStylesheet());
      } else if (kind === 'js') {
        set(row, typeof WP.el === 'function');
      } else if (kind === 'data') {
        set(row, !!(WP.site && WP.site.prototypes && WP.site.prototypes.length === 12));
      } else if (kind === 'img') {
        var img = document.querySelector('[data-check-img]');
        if (checkImage(img)) set(row, true);
        else if (img) {
          img.addEventListener('load', function () { set(row, true); });
          img.addEventListener('error', function () { set(row, false); });
        } else {
          set(row, false);
        }
      } else if (kind === 'storage') {
        var ok = WP.store.set('selfcheck', Date.now()) !== false;
        set(row, ok, ok ? 'available' : 'denied — progress will not persist');
      }
    });

    var env = host.querySelector('[data-env]');
    if (env) {
      var proto = window.location.protocol;
      var where = proto === 'file:' ? 'opened directly from the filesystem'
                                    : 'served from ' + window.location.origin;
      env.textContent = 'Running ' + where +
        ', page at ' + window.location.pathname + '.';
    }
  };

}(window.WP));
