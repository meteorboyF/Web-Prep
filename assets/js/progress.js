/* progress.js — which sections you have ticked off, and where you were last.

   Everything lives under the single `webprep:v1` localStorage key that
   WP.store owns, and every call is guarded: with storage denied the site
   still works, it just forgets. */

(function (WP) {
  'use strict';

  var DONE = 'done';
  var LAST = 'last';

  WP.progress = {

    /* key is 'part-1/document-skeleton' — page id and section id. */
    isDone: function (key) {
      var done = WP.store.get(DONE, {});
      return done[key] === true;
    },

    setDone: function (key, value) {
      var done = WP.store.get(DONE, {});
      if (value) done[key] = true;
      else delete done[key];
      WP.store.set(DONE, done);
      return value;
    },

    toggle: function (key) {
      return WP.progress.setDone(key, !WP.progress.isDone(key));
    },

    /* How many keys under a page id are ticked. */
    count: function (prefix) {
      var done = WP.store.get(DONE, {});
      return Object.keys(done).filter(function (k) {
        return k.indexOf(prefix + '/') === 0;
      }).length;
    },

    all: function () { return WP.store.get(DONE, {}); },

    /* Where you were reading last, so the home page can offer to resume. */
    setLast: function (page, section, label) {
      WP.store.set(LAST, { page: page, section: section, label: label });
    },

    getLast: function () { return WP.store.get(LAST, null); },

    reset: function () {
      WP.store.set(DONE, {});
      WP.store.set(LAST, null);
    },

    available: function () {
      return WP.store.write(WP.store.read());
    }
  };

}(window.WP));
