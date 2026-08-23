/* exams-index.js — the grid of all twelve prototypes.

   Reads WP.site.prototypes, which is the single list of what exists. A card
   links to its walkthrough when one is written and says so plainly when it
   is not, rather than linking somewhere that will disappoint. */

(function (WP) {
  'use strict';

  var el = WP.el;

  /* Which walkthroughs exist. Kept here rather than inferred, because the
     data files are only loaded on the walkthrough page itself. */
  var READY = ['251-q1', '251-q2', '253-q1', '253-q2', 'slot1-q1', 'slot1-q2', 'slot2-q2'];

  WP.renderPrototypeIndex = function () {
    var host = document.querySelector('[data-prototypes]');
    if (!host || !WP.site) return;

    var papers = {};
    WP.site.prototypes.forEach(function (p) {
      (papers[p.paper] = papers[p.paper] || []).push(p);
    });

    var readyCount = WP.site.prototypes.filter(function (p) {
      return READY.indexOf(p.id) !== -1;
    }).length;

    host.appendChild(el('p', { class: 'wt__note', html:
      '<strong>' + readyCount + ' of ' + WP.site.prototypes.length +
      '</strong> walkthroughs written so far. The rest are next.' }));

    Object.keys(papers).forEach(function (paper) {
      host.appendChild(el('h2', { class: 'wt__h', text: paper }));

      var grid = el('div', { class: 'card-grid ex__grid' });

      papers[paper].forEach(function (p) {
        var ready = READY.indexOf(p.id) !== -1;
        var href = WP.url('exams/walkthrough.html') + '?p=' + p.id;

        var thumb = el('img', {
          class: 'ex__thumb',
          src: WP.url('assets/img/prototypes/' + p.id + '.jpg'),
          alt: 'The ' + p.title + ' prototype',
          loading: 'lazy'
        });

        var meta = el('p', { class: 'ex__meta' }, [
          el('span', { class: 'badge', text: '15 marks' }),
          el('span', {
            class: 'badge ' + (p.palette === 'annotated' ? 'badge--ok' : 'badge--warn'),
            text: p.palette === 'annotated' ? 'palette annotated' : 'palette sampled'
          }),
          el('span', {
            class: 'badge ' + (ready ? 'badge--brand' : ''),
            text: ready ? 'walkthrough ready' : 'walkthrough soon'
          })
        ]);

        var inner = [thumb, el('h3', { text: p.title }), meta];

        grid.appendChild(ready
          ? el('a', { class: 'card ex__card', href: href }, inner)
          : el('div', { class: 'card ex__card ex__card--pending' }, inner));
      });

      host.appendChild(grid);
    });
  };

}(window.WP));
