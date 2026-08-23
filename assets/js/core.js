/* core.js — the WP namespace, shared helpers, and the theme toggle.
   Classic script, no modules: this must run from file:// as well as from
   GitHub Pages. See CLAUDE.md, non-negotiable 3. */

window.WP = window.WP || {};

(function (WP) {
  'use strict';

  /* ---- Registries -------------------------------------------------- */
  /* Data files call these. Pages read them. */

  WP.lessons = WP.lessons || {};
  WP.exams = WP.exams || {};

  WP.lesson = function (id, data) { WP.lessons[id] = data; };
  WP.exam = function (id, data) { WP.exams[id] = data; };

  /* ---- Paths ------------------------------------------------------- */
  /* Every page declares its depth on <body data-base="./"> or "../".
     Nothing is ever resolved from the domain root: this site lives in a
     project subfolder on GitHub Pages and a single leading slash would
     work locally and 404 live. */

  WP.base = function () {
    var b = document.body && document.body.dataset.base;
    return b || './';
  };

  WP.url = function (path) {
    return WP.base() + path;
  };

  /* True when `href` (relative to this page) points at the current page. */
  WP.isCurrent = function (href) {
    try {
      var target = new URL(href, window.location.href);
      var here = window.location.pathname.replace(/index\.html$/, '');
      var there = target.pathname.replace(/index\.html$/, '');
      return here === there;
    } catch (e) {
      return false;
    }
  };

  /* ---- DOM helpers ------------------------------------------------- */

  WP.el = function (tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  };

  /* Inject a classic script and resolve when it has run.
     Used by search to pull in every lesson data file on demand — fetch()
     would fail on file://, a <script> tag does not. */
  WP.loadScript = function (src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-wp-src="' + src + '"]');
      if (existing) { resolve(); return; }
      var s = document.createElement('script');
      s.src = src;
      s.defer = false;
      s.dataset.wpSrc = src;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(s);
    });
  };

  /* ---- Storage ----------------------------------------------------- */
  /* Private browsing and file:// on some browsers throw on localStorage.
     Every call is guarded; the site must still work with storage denied. */

  var STORE_KEY = 'webprep:v1';

  WP.store = {
    read: function () {
      try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); }
      catch (e) { return {}; }
    },
    write: function (obj) {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(obj)); return true; }
      catch (e) { return false; }
    },
    get: function (key, fallback) {
      var v = WP.store.read()[key];
      return v === undefined ? fallback : v;
    },
    set: function (key, value) {
      var all = WP.store.read();
      all[key] = value;
      return WP.store.write(all);
    },
    clear: function () {
      try { localStorage.removeItem(STORE_KEY); return true; }
      catch (e) { return false; }
    }
  };

  /* ---- Theme ------------------------------------------------------- */
  /* The stored choice is applied by a tiny inline script in each page's
     <head>, before paint, so there is never a flash of the wrong theme.
     This only handles the toggle afterwards. */

  var THEME_KEY = 'webprep:theme';

  WP.theme = {
    get: function () {
      try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
    },
    set: function (value) {
      try {
        if (value) localStorage.setItem(THEME_KEY, value);
        else localStorage.removeItem(THEME_KEY);
      } catch (e) { /* storage denied — the toggle still works for this page */ }
      if (value) document.documentElement.dataset.theme = value;
      else delete document.documentElement.dataset.theme;
    },
    active: function () {
      var explicit = document.documentElement.dataset.theme;
      if (explicit) return explicit;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },
    toggle: function () {
      WP.theme.set(WP.theme.active() === 'dark' ? 'light' : 'dark');
    }
  };

  WP.initTheme = function () {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      WP.theme.toggle();
      btn.setAttribute('aria-label',
        WP.theme.active() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  };

  /* ---- Boot -------------------------------------------------------- */

  WP.ready = function (fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

}(window.WP));
