/* flexbox.js — the flexbox visual playground.

   A button per value of every container property, a live stage, and the CSS
   it would take to produce what you are looking at. The point is to make the
   axis swap physical: change flex-direction and watch justify-content and
   align-items trade places, which no amount of prose achieves.

   Controls are real radio inputs with styled labels rather than buttons with
   ARIA. Radios come with arrow-key navigation, grouping and screen reader
   announcement already correct; re-implementing that with role="radio" is
   how you end up with a widget that looks fine and is unusable by keyboard. */

(function (WP) {
  'use strict';

  var el = WP.el;

  var PROPERTIES = [
    { name: 'flex-direction', values: ['row', 'row-reverse', 'column', 'column-reverse'] },
    { name: 'flex-wrap', values: ['nowrap', 'wrap', 'wrap-reverse'] },
    { name: 'justify-content',
      values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] },
    { name: 'align-items', values: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'] },
    { name: 'align-content',
      values: ['stretch', 'flex-start', 'center', 'space-between', 'space-around'],
      needsWrap: true }
  ];

  /* Clicking an item cycles it through these. `null` means "leave it alone",
     which is the default and the one people forget exists. */
  var ITEM_FLEX = [null, '1', '2', 'none'];

  var uid = 0;

  function mount(host) {
    uid++;
    var ns = 'fx' + uid;

    var state = {
      'flex-direction': 'row',
      'flex-wrap': 'nowrap',
      'justify-content': 'flex-start',
      'align-items': 'stretch',
      'align-content': 'stretch',
      gap: 8,
      count: 4,
      itemFlex: {}          /* index -> value from ITEM_FLEX */
    };

    var root = el('div', { class: 'fx' });
    var controls = el('div', { class: 'fx__controls' });
    var stage = el('div', { class: 'fx__stage' });
    var box = el('div', { class: 'fx__box' });
    var code = el('code');
    var pre = el('pre', { class: 'fx__code' }, [code]);

    stage.appendChild(box);

    /* ---- Control groups ---------------------------------------------- */

    var groups = {};

    PROPERTIES.forEach(function (prop) {
      var fieldset = el('fieldset', { class: 'fx__group' });
      fieldset.appendChild(el('legend', { text: prop.name }));

      var wrap = el('div', { class: 'fx__opts' });

      prop.values.forEach(function (value) {
        var id = ns + '-' + prop.name + '-' + value;
        var input = el('input', { type: 'radio', name: ns + '-' + prop.name,
          id: id, value: value, class: 'fx__radio' });
        if (state[prop.name] === value) input.checked = true;

        input.addEventListener('change', function () {
          state[prop.name] = value;
          render();
        });

        wrap.appendChild(input);
        wrap.appendChild(el('label', { class: 'fx__opt', for: id, text: value }));
      });

      fieldset.appendChild(wrap);
      groups[prop.name] = fieldset;
      controls.appendChild(fieldset);
    });

    /* ---- Gap and item count ------------------------------------------ */

    var gapId = ns + '-gap';
    var gapInput = el('input', { type: 'range', min: '0', max: '40', step: '4',
      id: gapId, class: 'fx__range' });
    gapInput.value = String(state.gap);
    var gapOut = el('output', { class: 'fx__out', for: gapId, text: state.gap + 'px' });
    gapInput.addEventListener('input', function () {
      state.gap = Number(gapInput.value);
      gapOut.textContent = state.gap + 'px';
      render();
    });

    var gapGroup = el('fieldset', { class: 'fx__group' }, [
      el('legend', { text: 'gap' }),
      el('div', { class: 'fx__opts fx__opts--range' }, [gapInput, gapOut])
    ]);
    controls.appendChild(gapGroup);

    var minus = el('button', { class: 'fx__step', type: 'button', text: '−',
      'aria-label': 'Remove an item' });
    var plus = el('button', { class: 'fx__step', type: 'button', text: '+',
      'aria-label': 'Add an item' });
    var countOut = el('span', { class: 'fx__out' });

    minus.addEventListener('click', function () {
      if (state.count > 1) { state.count--; render(); }
    });
    plus.addEventListener('click', function () {
      if (state.count < 8) { state.count++; render(); }
    });

    controls.appendChild(el('fieldset', { class: 'fx__group' }, [
      el('legend', { text: 'items' }),
      el('div', { class: 'fx__opts fx__opts--range' }, [minus, countOut, plus])
    ]));

    /* ---- Assemble ----------------------------------------------------- */

    root.appendChild(controls);
    root.appendChild(el('p', { class: 'fx__hint', html:
      'Click any item in the stage to cycle its <code>flex</code> through ' +
      '<code>1</code>, <code>2</code> and <code>none</code>.' }));
    root.appendChild(stage);
    root.appendChild(pre);

    var reset = el('button', { class: 'pg__btn', type: 'button', text: 'Reset' });
    var copy = el('button', { class: 'pg__btn', type: 'button', text: 'Copy CSS' });
    root.appendChild(el('div', { class: 'fx__actions' }, [reset, copy]));

    reset.addEventListener('click', function () {
      state['flex-direction'] = 'row';
      state['flex-wrap'] = 'nowrap';
      state['justify-content'] = 'flex-start';
      state['align-items'] = 'stretch';
      state['align-content'] = 'stretch';
      state.gap = 8;
      state.count = 4;
      state.itemFlex = {};
      gapInput.value = '8';
      gapOut.textContent = '8px';
      PROPERTIES.forEach(function (p) {
        var input = root.querySelector('#' + ns + '-' + p.name + '-' +
          CSS.escape(state[p.name]));
        if (input) input.checked = true;
      });
      render();
    });

    copy.addEventListener('click', function () {
      var text = code.textContent;
      var done = false;
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:absolute;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        done = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch (e) { done = false; }
      copy.textContent = done ? 'Copied' : 'Select and copy';
      setTimeout(function () { copy.textContent = 'Copy CSS'; }, 1600);
    });

    host.replaceWith(root);

    /* ---- Render -------------------------------------------------------- */

    function render() {
      /* align-content only does anything once items wrap. Saying so is more
         useful than letting a control silently do nothing. */
      var wraps = state['flex-wrap'] !== 'nowrap';
      groups['align-content'].dataset.inert = wraps ? 'false' : 'true';
      groups['align-content'].querySelectorAll('input').forEach(function (i) {
        i.disabled = !wraps;
      });

      box.style.display = 'flex';
      box.style.flexDirection = state['flex-direction'];
      box.style.flexWrap = state['flex-wrap'];
      box.style.justifyContent = state['justify-content'];
      box.style.alignItems = state['align-items'];
      box.style.alignContent = state['align-content'];
      box.style.gap = state.gap + 'px';

      box.textContent = '';
      for (var i = 0; i < state.count; i++) {
        (function (index) {
          var flex = state.itemFlex[index];
          var item = el('button', { class: 'fx__item', type: 'button',
            'data-flex': flex || 'auto',
            title: 'Click to change this item’s flex value' });
          item.appendChild(el('span', { class: 'fx__n', text: String(index + 1) }));
          if (flex) item.appendChild(el('span', { class: 'fx__f', text: 'flex: ' + flex }));
          if (flex === null && index === 1) item.classList.add('fx__item--tall');
          item.style.flex = flex === null ? '' : flex;
          item.addEventListener('click', function () {
            var at = ITEM_FLEX.indexOf(state.itemFlex[index] === undefined
              ? null : state.itemFlex[index]);
            state.itemFlex[index] = ITEM_FLEX[(at + 1) % ITEM_FLEX.length];
            render();
          });
          box.appendChild(item);
        }(i));
      }

      countOut.textContent = String(state.count);

      var lines = ['.container {', '  display: flex;'];
      PROPERTIES.forEach(function (p) {
        if (p.needsWrap && !wraps) return;
        lines.push('  ' + p.name + ': ' + state[p.name] + ';');
      });
      lines.push('  gap: ' + state.gap + 'px;');
      lines.push('}');

      var itemLines = [];
      Object.keys(state.itemFlex).forEach(function (k) {
        var v = state.itemFlex[k];
        if (v) itemLines.push('.item:nth-child(' + (Number(k) + 1) + ') { flex: ' + v + '; }');
      });
      if (itemLines.length) lines.push('', itemLines.join('\n'));

      code.textContent = lines.join('\n');
    }

    render();
  }

  WP.tools = WP.tools || {};
  WP.tools.flexbox = mount;

}(window.WP));
