/* grid.js — two grid tools.

   WP.tools.grid       track sizing, gaps and alignment, with live items you
                       can click to make them span columns.

   WP.tools.gridAreas  type the layout as words and watch it become the
                       layout. grid-template-areas is the most readable way
                       to define a page shell and the hardest to picture from
                       a syntax table, which is exactly what a tool is for.
*/

(function (WP) {
  'use strict';

  var el = WP.el;
  var uid = 0;

  /* ================================================================== */
  /* Track explorer                                                      */
  /* ================================================================== */

  var COLUMN_PRESETS = [
    'repeat(3, 1fr)',
    '200px 1fr',
    '1fr 2fr',
    'repeat(4, 1fr)',
    'repeat(auto-fit, minmax(150px, 1fr))',
    '240px 1fr 240px'
  ];

  var ALIGN = [
    { name: 'justify-items', values: ['stretch', 'start', 'center', 'end'] },
    { name: 'align-items', values: ['stretch', 'start', 'center', 'end'] }
  ];

  var SPANS = [1, 2, 3];

  function mountGrid(host) {
    uid++;
    var ns = 'gr' + uid;

    var state = {
      columns: 'repeat(3, 1fr)',
      gap: 12,
      'justify-items': 'stretch',
      'align-items': 'stretch',
      count: 6,
      spans: {}
    };

    var root = el('div', { class: 'fx gr' });
    var controls = el('div', { class: 'fx__controls' });

    /* Columns: a free text field plus presets, because the interesting part
       of grid-template-columns is the values you would not think to try. */
    var colId = ns + '-cols';
    var colInput = el('input', { type: 'text', id: colId, class: 'spec__input',
      spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off' });
    colInput.value = state.columns;
    colInput.addEventListener('input', function () {
      state.columns = colInput.value;
      render();
    });

    var presets = el('div', { class: 'fx__opts gr__presets' });
    COLUMN_PRESETS.forEach(function (p) {
      var b = el('button', { class: 'spec__preset', type: 'button', text: p });
      b.addEventListener('click', function () {
        state.columns = p;
        colInput.value = p;
        render();
      });
      presets.appendChild(b);
    });

    controls.appendChild(el('fieldset', { class: 'fx__group gr__group--wide' }, [
      el('legend', { text: 'grid-template-columns' }),
      colInput,
      presets
    ]));

    /* Alignment */
    ALIGN.forEach(function (prop) {
      var fieldset = el('fieldset', { class: 'fx__group' });
      fieldset.appendChild(el('legend', { text: prop.name }));
      var opts = el('div', { class: 'fx__opts' });

      prop.values.forEach(function (value) {
        var id = ns + '-' + prop.name + '-' + value;
        var input = el('input', { type: 'radio', class: 'fx__radio',
          name: ns + '-' + prop.name, id: id, value: value });
        if (state[prop.name] === value) input.checked = true;
        input.addEventListener('change', function () {
          state[prop.name] = value;
          render();
        });
        opts.appendChild(input);
        opts.appendChild(el('label', { class: 'fx__opt', for: id, text: value }));
      });

      fieldset.appendChild(opts);
      controls.appendChild(fieldset);
    });

    /* Gap */
    var gapInput = el('input', { type: 'range', min: '0', max: '40', step: '4',
      class: 'fx__range', 'aria-label': 'gap' });
    gapInput.value = String(state.gap);
    var gapOut = el('output', { class: 'fx__out', text: state.gap + 'px' });
    gapInput.addEventListener('input', function () {
      state.gap = Number(gapInput.value);
      gapOut.textContent = state.gap + 'px';
      render();
    });
    controls.appendChild(el('fieldset', { class: 'fx__group' }, [
      el('legend', { text: 'gap' }),
      el('div', { class: 'fx__opts fx__opts--range' }, [gapInput, gapOut])
    ]));

    /* Item count */
    var minus = el('button', { class: 'fx__step', type: 'button', text: '−',
      'aria-label': 'Remove an item' });
    var plus = el('button', { class: 'fx__step', type: 'button', text: '+',
      'aria-label': 'Add an item' });
    var countOut = el('span', { class: 'fx__out' });
    minus.addEventListener('click', function () {
      if (state.count > 1) { state.count--; render(); }
    });
    plus.addEventListener('click', function () {
      if (state.count < 12) { state.count++; render(); }
    });
    controls.appendChild(el('fieldset', { class: 'fx__group' }, [
      el('legend', { text: 'items' }),
      el('div', { class: 'fx__opts fx__opts--range' }, [minus, countOut, plus])
    ]));

    var box = el('div', { class: 'fx__box gr__box' });
    var stage = el('div', { class: 'fx__stage' }, [box]);
    var code = el('code');
    var pre = el('pre', { class: 'fx__code' }, [code]);

    root.appendChild(controls);
    root.appendChild(el('p', { class: 'fx__hint', html:
      'Click an item to cycle <code>grid-column: span 1 / 2 / 3</code>. Try ' +
      '<code>repeat(auto-fit, minmax(150px, 1fr))</code> and then narrow the window.' }));
    root.appendChild(stage);
    root.appendChild(pre);

    host.replaceWith(root);

    function render() {
      box.style.display = 'grid';
      box.style.gridTemplateColumns = state.columns;
      box.style.gap = state.gap + 'px';
      box.style.justifyItems = state['justify-items'];
      box.style.alignItems = state['align-items'];

      box.textContent = '';
      for (var i = 0; i < state.count; i++) {
        (function (index) {
          var span = state.spans[index] || 1;
          var item = el('button', { class: 'fx__item gr__item', type: 'button',
            'data-span': String(span),
            title: 'Click to change how many columns this item spans' });
          item.appendChild(el('span', { class: 'fx__n', text: String(index + 1) }));
          if (span > 1) item.appendChild(el('span', { class: 'fx__f', text: 'span ' + span }));
          item.style.gridColumn = span > 1 ? 'span ' + span : '';
          item.addEventListener('click', function () {
            var at = SPANS.indexOf(span);
            state.spans[index] = SPANS[(at + 1) % SPANS.length];
            render();
          });
          box.appendChild(item);
        }(i));
      }

      countOut.textContent = String(state.count);

      var lines = [
        '.grid {',
        '  display: grid;',
        '  grid-template-columns: ' + state.columns + ';',
        '  gap: ' + state.gap + 'px;',
        '  justify-items: ' + state['justify-items'] + ';',
        '  align-items: ' + state['align-items'] + ';',
        '}'
      ];
      var spans = [];
      Object.keys(state.spans).forEach(function (k) {
        if (state.spans[k] > 1) {
          spans.push('.item:nth-child(' + (Number(k) + 1) + ') { grid-column: span ' +
            state.spans[k] + '; }');
        }
      });
      if (spans.length) lines.push('', spans.join('\n'));
      code.textContent = lines.join('\n');
    }

    render();
  }

  /* ================================================================== */
  /* grid-template-areas editor                                          */
  /* ================================================================== */

  var AREA_COLOURS = ['#0f766e', '#205bcb', '#b4541b', '#781fa0', '#1f6d4a',
                      '#c0392b', '#6b63ff', '#0db0d7'];

  var DEFAULT_AREAS = [
    'header  header',
    'sidebar main',
    'sidebar footer'
  ].join('\n');

  function mountGridAreas(host) {
    uid++;
    var ns = 'ga' + uid;

    var root = el('div', { class: 'fx ga' });

    var taId = ns + '-areas';
    var ta = el('textarea', { class: 'pg__ta ga__input', id: taId, rows: '5',
      spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off' });
    ta.value = DEFAULT_AREAS;

    var field = el('fieldset', { class: 'fx__group gr__group--wide' }, [
      el('legend', { text: 'the layout, as words' }),
      el('label', { class: 'sr-only', for: taId, text: 'Grid template areas' }),
      ta
    ]);

    var status = el('p', { class: 'ga__status' });
    var box = el('div', { class: 'fx__box ga__box' });
    var stage = el('div', { class: 'fx__stage' }, [box]);
    var code = el('code');
    var pre = el('pre', { class: 'fx__code' }, [code]);

    root.appendChild(field);
    root.appendChild(el('p', { class: 'fx__hint', html:
      'One row per line, one word per cell. Repeat a word to make an area span. ' +
      'Use a full stop <code>.</code> for a deliberately empty cell.' }));
    root.appendChild(status);
    root.appendChild(stage);
    root.appendChild(pre);

    ta.addEventListener('input', render);
    host.replaceWith(root);

    function render() {
      var rows = ta.value.split('\n')
        .map(function (l) { return l.trim(); })
        .filter(function (l) { return l.length; })
        .map(function (l) { return l.split(/\s+/); });

      if (!rows.length) {
        status.textContent = 'Type a row or two above.';
        status.dataset.state = 'warn';
        box.textContent = '';
        code.textContent = '';
        return;
      }

      /* Every row must have the same number of columns. The browser silently
         drops the whole declaration when they do not, which is a genuinely
         baffling five minutes if nothing tells you. */
      var width = rows[0].length;
      var ragged = rows.filter(function (r) { return r.length !== width; }).length;

      if (ragged) {
        status.dataset.state = 'error';
        status.textContent = 'Every row must have the same number of words. Row 1 has ' +
          width + '; ' + ragged + ' other row' + (ragged > 1 ? 's do' : ' does') +
          ' not. The browser drops the whole declaration when that happens — silently.';
        return;
      }

      var names = [];
      rows.forEach(function (r) {
        r.forEach(function (n) {
          if (n !== '.' && names.indexOf(n) === -1) names.push(n);
        });
      });

      status.dataset.state = 'ok';
      status.textContent = rows.length + ' rows × ' + width + ' columns, ' +
        names.length + ' named area' + (names.length === 1 ? '' : 's') + '.';

      var template = rows.map(function (r) { return '"' + r.join(' ') + '"'; });

      box.textContent = '';
      box.style.display = 'grid';
      box.style.gridTemplateColumns = 'repeat(' + width + ', 1fr)';
      box.style.gridTemplateRows = 'repeat(' + rows.length + ', 1fr)';
      box.style.gridTemplateAreas = template.join(' ');
      box.style.gap = '8px';

      names.forEach(function (name, i) {
        var cell = el('div', { class: 'ga__area', text: name });
        cell.style.gridArea = name;
        cell.style.background = AREA_COLOURS[i % AREA_COLOURS.length];
        box.appendChild(cell);
      });

      code.textContent = [
        '.page {',
        '  display: grid;',
        '  grid-template-columns: repeat(' + width + ', 1fr);',
        '  grid-template-areas:',
        template.map(function (t) { return '    ' + t; }).join('\n'),
        '  gap: 8px;',
        '}',
        ''
      ].concat(names.map(function (n) {
        return '.' + n + ' { grid-area: ' + n + '; }';
      })).join('\n');
    }

    render();
  }

  WP.tools = WP.tools || {};
  WP.tools.grid = mountGrid;
  WP.tools.gridAreas = mountGridAreas;

}(window.WP));
