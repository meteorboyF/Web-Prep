/* playground.js — the two-pane editor and live preview.

   Design notes worth knowing before editing this file:

   * The editor is built as a plain <textarea> first, then upgraded to
     CodeMirror if it is available. That order is deliberate: it means the
     fallback path is the one that always runs, so it cannot rot, and a slow
     or blocked CDN degrades instead of breaking.

   * The preview is an <iframe srcdoc> with sandbox="" — the most restrictive
     value there is. HTML and CSS still render; scripts, forms, popups and
     top-level navigation cannot run, so a playground can never navigate or
     touch the page around it. allow-same-origin is not needed and is not set.

   * The preview is always light. It is a page preview, and every prototype
     in the exam is a light-background design; making it follow the site
     theme would show you something you are not building.
*/

(function (WP) {
  'use strict';

  var DEBOUNCE = 300;
  var NARROW = 768;          /* below this, panes stack and live defaults off */

  /* Registry: data files call WP.playground.define(id, config), pages call
     mountAll() to bring every [data-playground] element to life. */
  var registry = {};
  var instances = [];

  /* ---- Preview document -------------------------------------------- */

  /* A minimal reset inside the preview so examples behave predictably and
     the same way the exam's own answers would. Kept short on purpose: the
     more this does, the less the example is teaching. */
  var PREVIEW_RESET = [
    '*, *::before, *::after { box-sizing: border-box; }',
    'html { color-scheme: light; }',
    'body {',
    '  margin: 0; padding: 16px;',
    '  background: #fff; color: #17202a;',
    '  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;',
    '  line-height: 1.5;',
    '}',
    'img, svg, video { display: block; max-width: 100%; }'
  ].join('\n');

  /* Two modes.

     Default: the HTML pane holds body content, and it is wrapped in a
     document with the small reset above. Right for teaching one idea.

     doc: true — the HTML pane holds a *complete* document, doctype and all,
     and is used verbatim with only the stylesheet injected into its head.
     No reset is added: the author's document is the truth. This is the mode
     the exam walkthroughs use, and it is the only way to demonstrate things
     that depend on the document itself — a missing doctype throwing the
     browser into quirks mode, for one. */

  function buildDoc(html, css, full) {
    var style = '<style>' + (css || '') + '</style>';

    if (full) {
      html = html || '';
      if (/<\/head\s*>/i.test(html)) {
        return html.replace(/<\/head\s*>/i, style + '</head>');
      }
      if (/<body[^>]*>/i.test(html)) {
        return html.replace(/<body[^>]*>/i, '$&' + style);
      }
      return style + html;
    }

    return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<style>' + PREVIEW_RESET + '</style>' +
      style +
      '</head><body>' + (html || '') + '</body></html>';
  }

  /* ---- Editors ------------------------------------------------------ */
  /* Both editor kinds expose the same three methods, so nothing downstream
     has to know which one it got. */

  function textareaEditor(ta) {
    return {
      kind: 'textarea',
      get: function () { return ta.value; },
      /* Setting .value does not fire an input event, but CodeMirror's
         setValue does fire change. Dispatching here keeps the two editor
         kinds behaving identically, so nothing downstream can work with one
         and silently fail with the other. */
      set: function (v) {
        ta.value = v;
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      },
      onChange: function (fn) { ta.addEventListener('input', fn); },
      focus: function () { ta.focus(); },
      refresh: function () {}
    };
  }

  function codeMirrorEditor(ta, mode) {
    var cm = window.CodeMirror.fromTextArea(ta, {
      mode: mode,
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 2,
      tabSize: 2,
      viewportMargin: Infinity,
      styleActiveLine: false
    });
    return {
      kind: 'codemirror',
      cm: cm,
      get: function () { return cm.getValue(); },
      set: function (v) { cm.setValue(v); },
      onChange: function (fn) { cm.on('change', fn); },
      focus: function () { cm.focus(); },
      refresh: function () { cm.refresh(); }
    };
  }

  function hasCodeMirror() {
    return !!(window.CodeMirror && typeof window.CodeMirror.fromTextArea === 'function');
  }

  /* ---- Mounting ----------------------------------------------------- */

  function mount(host, config) {
    config = config || {};

    var seed = {
      html: (config.html || '').replace(/^\n/, ''),
      css: (config.css || '').replace(/^\n/, '')
    };

    var panes = [];
    if (config.html !== undefined) panes.push({ key: 'html', label: 'HTML', mode: 'htmlmixed' });
    if (config.css !== undefined) panes.push({ key: 'css', label: 'CSS', mode: 'css' });
    if (!panes.length) return null;

    var uid = 'pg-' + (instances.length + 1);
    var narrow = window.innerWidth < NARROW;
    var live = config.live !== undefined ? config.live : !narrow;

    /* --- shell --- */
    var root = WP.el('section', { class: 'pg', 'data-expanded': 'false' });
    if (config.height) root.style.setProperty('--pg-h', config.height + 'px');

    var tablist = WP.el('div', { class: 'pg__tabs', role: 'tablist',
      'aria-label': 'Code panes' });
    var actions = WP.el('div', { class: 'pg__actions' });
    var bar = WP.el('div', { class: 'pg__bar' }, [tablist, actions]);

    var editorsHost = WP.el('div', { class: 'pg__editors' });

    /* sandbox="" is the default and blocks everything, including forms —
       which means a submit button does nothing and native validation never
       appears. allowForms grants exactly one capability back, and only where
       a lesson needs it. The frame still cannot run scripts, open popups or
       navigate anything but itself, so the worst a submit can do is replace
       the preview's own contents. */
    var frame = WP.el('iframe', {
      title: (config.title || 'Live preview') + ' — result',
      sandbox: config.allowForms ? 'allow-forms' : '',
      loading: 'lazy'
    });
    var previewHost = WP.el('div', { class: 'pg__preview' }, [frame]);
    var body = WP.el('div', { class: 'pg__body' }, [editorsHost, previewHost]);

    root.appendChild(bar);
    root.appendChild(body);

    if (config.tryThis) {
      root.appendChild(WP.el('p', { class: 'pg__try', html:
        '<strong>Try this</strong>' + config.tryThis }));
    }

    var status = WP.el('p', { class: 'pg__status' });
    root.appendChild(status);

    host.replaceWith(root);

    /* --- editors --- */
    var editors = {};
    var tabs = {};

    panes.forEach(function (pane, i) {
      var taId = uid + '-' + pane.key;

      var ta = WP.el('textarea', {
        class: 'pg__ta',
        id: taId,
        spellcheck: 'false',
        autocapitalize: 'off',
        autocomplete: 'off',
        'aria-label': pane.label + ' source'
      });
      ta.value = seed[pane.key];

      var wrap = WP.el('div', {
        class: 'pg__pane',
        id: uid + '-panel-' + pane.key,
        role: 'tabpanel',
        'aria-labelledby': uid + '-tab-' + pane.key,
        'data-active': i === 0 ? 'true' : 'false'
      }, [ta]);

      editorsHost.appendChild(wrap);

      var tab = WP.el('button', {
        class: 'pg__tab',
        type: 'button',
        role: 'tab',
        id: uid + '-tab-' + pane.key,
        'aria-controls': uid + '-panel-' + pane.key,
        'aria-selected': i === 0 ? 'true' : 'false',
        tabindex: i === 0 ? '0' : '-1',
        text: pane.label
      });
      tablist.appendChild(tab);

      tabs[pane.key] = { tab: tab, panel: wrap };
      editors[pane.key] = textareaEditor(ta);
      editors[pane.key]._ta = ta;
      editors[pane.key]._mode = pane.mode;
      editors[pane.key]._panel = wrap;
    });

    /* --- instance --- */
    var timer = null;

    function cancel() {
      if (timer) { clearTimeout(timer); timer = null; }
    }

    var api = {
      root: root,
      editors: editors,
      seed: seed,
      live: live,
      value: function (key) {
        return editors[key] ? editors[key].get() : '';
      },
      render: function () {
        /* Cancel any pending debounce: a manual Run, a Reset or switching
           Live off must not be undone a moment later by a timer that was
           already in flight. */
        cancel();
        frame.srcdoc = buildDoc(api.value('html'), api.value('css'), config.doc === true);
      },
      schedule: function () {
        cancel();
        if (!api.live) { note('Edited — press Run to update the preview.'); return; }
        timer = setTimeout(function () { timer = null; api.render(); note(''); }, DEBOUNCE);
      },
      selectPane: selectPane,
      upgrade: upgrade
    };

    function note(msg) { status.textContent = msg; }

    function selectPane(key) {
      Object.keys(tabs).forEach(function (k) {
        var on = k === key;
        tabs[k].tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tabs[k].tab.tabIndex = on ? 0 : -1;
        tabs[k].panel.dataset.active = on ? 'true' : 'false';
        if (on) editors[k].refresh();
      });
      api.active = key;
    }

    api.active = panes[0].key;

    /* --- tab behaviour, including arrow keys --- */
    var order = panes.map(function (p) { return p.key; });

    order.forEach(function (key) {
      tabs[key].tab.addEventListener('click', function () {
        selectPane(key);
        editors[key].focus();
      });
      tabs[key].tab.addEventListener('keydown', function (e) {
        var i = order.indexOf(key);
        var next = null;
        if (e.key === 'ArrowRight') next = order[(i + 1) % order.length];
        else if (e.key === 'ArrowLeft') next = order[(i - 1 + order.length) % order.length];
        else if (e.key === 'Home') next = order[0];
        else if (e.key === 'End') next = order[order.length - 1];
        if (next) {
          e.preventDefault();
          selectPane(next);
          tabs[next].tab.focus();
        }
      });
    });

    /* --- actions --- */

    var liveLabel = WP.el('label', { class: 'pg__live' });
    var liveBox = WP.el('input', { type: 'checkbox' });
    liveBox.checked = live;
    liveLabel.appendChild(liveBox);
    liveLabel.appendChild(document.createTextNode('Live'));
    liveLabel.title = 'Update the preview as you type';
    actions.appendChild(liveLabel);

    liveBox.addEventListener('change', function () {
      api.live = liveBox.checked;
      if (api.live) {
        api.render();
        note('');
      } else {
        cancel();
        note('Live update is off — press Run to see changes.');
      }
    });

    function addBtn(label, cls, title, fn) {
      var b = WP.el('button', { class: 'pg__btn' + (cls ? ' ' + cls : ''),
        type: 'button', text: label, title: title });
      b.addEventListener('click', function () { fn(b); });
      actions.appendChild(b);
      return b;
    }

    addBtn('Run', 'pg__btn--go', 'Update the preview now', function () {
      api.render();
      note('');
    });

    addBtn('Reset', '', 'Restore the original example', function () {
      Object.keys(editors).forEach(function (k) { editors[k].set(seed[k]); });
      api.render();
      note('Reset to the original example.');
    });

    addBtn('Copy', '', 'Copy the code in the pane you are looking at', function (b) {
      var text = api.value(api.active);
      copy(text).then(function (ok) {
        b.textContent = ok ? 'Copied' : 'Select and copy';
        b.dataset.done = ok ? 'true' : 'false';
        setTimeout(function () {
          b.textContent = 'Copy';
          delete b.dataset.done;
        }, 1600);
      });
    });

    var expandBtn = addBtn('Preview only', '', 'Give the preview the full width',
      function (b) {
        var on = root.dataset.expanded === 'true';
        root.dataset.expanded = on ? 'false' : 'true';
        b.textContent = on ? 'Preview only' : 'Show code';
        if (on) {
          Object.keys(editors).forEach(function (k) { editors[k].refresh(); });
        }
      });
    expandBtn.setAttribute('aria-pressed', 'false');

    /* --- wire up change handling --- */
    Object.keys(editors).forEach(function (k) {
      editors[k].onChange(api.schedule);
    });

    if (!live) {
      note('Live update is off on narrow screens — press Run to see changes.');
    }

    api.render();
    instances.push(api);

    /* --- upgrade to CodeMirror, if it is there --- */
    function upgrade() {
      if (!hasCodeMirror()) return false;
      Object.keys(editors).forEach(function (k) {
        var old = editors[k];
        if (old.kind === 'codemirror') return;
        var value = old.get();
        old._ta.value = value;
        var next = codeMirrorEditor(old._ta, old._mode);
        next._ta = old._ta;
        next._mode = old._mode;
        next._panel = old._panel;
        next.onChange(api.schedule);
        editors[k] = next;
      });
      selectPane(api.active);
      return true;
    }

    upgrade();

    return api;
  }

  /* ---- Clipboard ---------------------------------------------------- */
  /* navigator.clipboard needs a secure context, which file:// is not. The
     execCommand path is the fallback, and if both fail the button says so
     rather than silently doing nothing. */

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text)
        .then(function () { return true; })
        .catch(function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:absolute;left:-9999px;top:0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  /* ---- Public API ---------------------------------------------------- */

  WP.playground = {
    define: function (id, config) { registry[id] = config; },

    get: function (id) { return registry[id]; },

    mount: mount,

    mountAll: function (scope) {
      var hosts = (scope || document).querySelectorAll('[data-playground]');
      Array.prototype.forEach.call(hosts, function (host) {
        var id = host.getAttribute('data-playground');
        var config = registry[id];
        if (!config) {
          host.replaceWith(WP.el('div', { class: 'callout callout--trap', html:
            '<strong>Missing example</strong>No playground is registered under <code>' +
            id + '</code>.' }));
          return;
        }
        mount(host, config);
      });
    },

    /* Second chance for a CDN that arrived after DOMContentLoaded. */
    upgradeAll: function () {
      instances.forEach(function (i) { i.upgrade(); });
    },

    instances: instances,
    hasEditor: hasCodeMirror
  };

  window.addEventListener('load', function () {
    WP.playground.upgradeAll();
  });

}(window.WP));
