/* site-index.js — the navigation tree and the page registry.
   Paths are written relative to the repo root; nav.js prefixes them with
   the current page's data-base. Never write a leading slash here.

   `ready: false` renders the entry as greyed-out text instead of a link,
   so the nav shows the whole shape of the site from Phase 1 onward without
   ever linking to a page that does not exist. */

window.WP = window.WP || {};

WP.site = {
  title: 'Web-Prep',
  repo: 'https://github.com/meteorboyF/Web-Prep',

  nav: [
    {
      heading: 'Start',
      items: [
        { label: 'Home', href: 'index.html', ready: true }
      ]
    },
    {
      heading: 'Learn',
      items: [
        { label: 'Playground demo', href: 'lessons/demo.html', ready: true },
        { label: 'Part 1 · HTML5 foundations', href: 'lessons/part-1.html', ready: true },
        { label: 'Part 2 · CSS fundamentals', href: 'lessons/part-2.html', ready: true },
        { label: 'Part 3 · Layout mastery', href: 'lessons/part-3.html', ready: true },
        { label: 'Part 4 · Advanced CSS', href: 'lessons/part-4.html', ready: false },
        { label: 'Part 5 · Professional practice', href: 'lessons/part-5.html', ready: false }
      ]
    },
    {
      heading: 'Reference',
      items: [
        { label: 'Cheatsheet', href: 'cheatsheet.html', ready: false },
        { label: 'Exam checklist', href: 'checklist.html', ready: false }
      ]
    },
    {
      heading: 'Solve',
      items: [
        { label: 'All 12 prototypes', href: 'exams/index.html', ready: false },
        { label: 'Exam mode', href: 'exam-mode.html', ready: false }
      ]
    }
  ],

  /* The twelve past-paper prototypes. Walkthrough data files land in
     data/exams/<id>.js from Phase 8 onward. */
  prototypes: [
    { id: '243-q1',   paper: 'Mid Term 243',      title: 'UIU Housing Society hero',        palette: 'sampled'   },
    { id: '243-q2',   paper: 'Mid Term 243',      title: 'United Kitchen services + about', palette: 'sampled'   },
    { id: '251-q1',   paper: 'Mid Term 251',      title: 'UIU Information Desk pricing',    palette: 'annotated' },
    { id: '251-q2',   paper: 'Mid Term 251',      title: 'Sign in, split page',             palette: 'annotated' },
    { id: '252-q1',   paper: 'Mid Term 252',      title: 'UIU Learning Hub dashboard',      palette: 'sampled'   },
    { id: '252-q2',   paper: 'Mid Term 252',      title: 'Course registration + sign up',   palette: 'sampled'   },
    { id: '253-q1',   paper: 'Mid Term 253',      title: 'ProConnect landing + signup',     palette: 'annotated' },
    { id: '253-q2',   paper: 'Mid Term 253',      title: 'Admin dashboard',                 palette: 'annotated' },
    { id: 'slot1-q1', paper: 'Slot 1 Spring 2026', title: 'CORE-TECH admin panel',          palette: 'annotated' },
    { id: 'slot1-q2', paper: 'Slot 1 Spring 2026', title: 'UIU CareerHub job board',        palette: 'annotated' },
    { id: 'slot2-q1', paper: 'Slot 2 Spring 2026', title: 'Cloud storage dashboard',        palette: 'annotated' },
    { id: 'slot2-q2', paper: 'Slot 2 Spring 2026', title: 'UIU Book Share Hub',             palette: 'annotated' }
  ]
};
