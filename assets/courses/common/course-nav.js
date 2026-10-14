/* ==========================================================================
   course-nav.js — shared navigation for lecture notes

   Add ONE line to the <head> of any lecture file:

     <script src="/assets/courses/common/course-nav.js" data-course="precalculus" defer></script>

   data-course names a file in _data/courses/ (without .yml). The script reads
   the course list from /assets/courses/manifest.json and adds:
     - a slim course bar (contents button, course link, previous / next)
     - a contents drawer listing every unit and section, with search
     - previous / next cards at the foot of the page
     - "continue where you left off" (saved in the reader's own browser)
     - light/dark sync with the rest of the site
   If the course list cannot be loaded (for example, the file was opened
   straight from a computer), the page is left exactly as it was.

   Optional attributes on the script tag:
     data-manifest="…"      a different location for the course list
     data-theme-attr="…"    the attribute the notes use for light/dark (default data-theme)
     data-theme-button="…"  id of the notes' own light/dark button (default theme)
   ========================================================================== */
(function () {
  'use strict';

  var me = document.currentScript;
  if (!me || !me.dataset.course || !window.fetch) return;

  var COURSE = me.dataset.course;
  var here = new URL('.', me.src);
  var manifestURL = me.dataset.manifest
    ? new URL(me.dataset.manifest, document.baseURI)
    : new URL('../manifest.json', here);
  var root = document.documentElement;
  var STORE = 'cn:' + COURSE;

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* storage off */ } }
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  /* ---------- 1. light / dark, shared with the rest of the site ---------- */
  (function syncTheme() {
    var attr = me.dataset.themeAttr || 'data-theme';
    var pref = read('theme');                                   /* Chirpy 7 */
    if (pref !== 'light' && pref !== 'dark') {
      try { pref = sessionStorage.getItem('mode'); } catch (e) { pref = null; } /* older Chirpy */
    }
    if ((pref === 'light' || pref === 'dark') && root.getAttribute(attr) !== pref) {
      var btn = document.getElementById(me.dataset.themeButton || 'theme');
      if (btn) btn.click();
      if (root.getAttribute(attr) !== pref) root.setAttribute(attr, pref);
    }
    new MutationObserver(function () {
      var v = root.getAttribute(attr);
      if (v === 'light' || v === 'dark') {
        store('theme', v);
        try { sessionStorage.setItem('mode', v); } catch (e) { /* ignore */ }
      }
    }).observe(root, { attributes: true, attributeFilter: [attr] });
  })();

  /* ---------- 2. load styles and the course list ---------- */
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = new URL('course-nav.css', here).href;
  document.head.appendChild(css);

  fetch(manifestURL.href, { credentials: 'same-origin' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (all) { if (all && all[COURSE]) build(all[COURSE]); })
    .catch(function () { css.remove(); });

  /* ---------- helpers ---------- */
  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (attrs[k] === null || attrs[k] === undefined || attrs[k] === false) return;
      if (k === 'text') e.textContent = attrs[k];
      else if (k === 'class') e.className = attrs[k];
      else e.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }
  function fileOf(path) { return decodeURIComponent(path.split('?')[0].split('#')[0].split('/').pop() || ''); }
  function stopName(s) { return (s.label ? s.label + ' · ' : '') + s.title; }

  /* ======================================================================= */
  function build(course) {
    var folder = course.folder || '';
    var units = (course.units || []).filter(function (u) { return u && u.file; });
    var thisFile = fileOf(location.pathname);
    var uIndex = -1;
    units.forEach(function (u, i) { if (uIndex < 0 && u.file === thisFile) uIndex = i; });
    if (uIndex < 0) { css.remove(); return; }
    var unit = units[uIndex];

    /* flat reading order: every published section, or the unit itself */
    var stops = [];
    units.forEach(function (u, ui) {
      if (u.draft) return;
      var secs = (u.sections || []).filter(function (s) { return !s.draft && s.anchor; });
      if (secs.length) secs.forEach(function (s) {
        stops.push({ ui: ui, unit: u, sec: s, href: folder + u.file + '#' + s.anchor,
                     local: ui === uIndex ? '#' + s.anchor : null, label: s.label, title: s.title });
      });
      else stops.push({ ui: ui, unit: u, sec: null, href: folder + u.file,
                        local: ui === uIndex ? '#top' : null, label: u.label, title: u.title });
    });
    var mine = stops.filter(function (s) { return s.ui === uIndex && s.sec; });
    var heads = mine.map(function (s) { return document.getElementById(s.sec.anchor); });

    /* ---------- the bar ---------- */
    var menuBtn = el('button', { type: 'button', class: 'cn-menu', 'aria-expanded': 'false',
                                 'aria-controls': 'cn-drawer' },
      [el('span', { class: 'cn-burger', 'aria-hidden': 'true' }), el('span', { class: 'cn-menu-txt', text: 'Contents' })]);
    var where = el('span', { class: 'cn-where' });
    var prevA = el('a', { class: 'cn-step cn-prev' }, [el('span', { 'aria-hidden': 'true', text: '‹' })]);
    var nextA = el('a', { class: 'cn-step cn-next' }, [el('span', { 'aria-hidden': 'true', text: '›' })]);
    var bar = el('nav', { class: 'cn-bar', 'aria-label': 'Course' }, [
      el('div', { class: 'cn-bar-in' }, [
        menuBtn,
        el('a', { class: 'cn-course', href: course.page || '/' , text: course.title }),
        where,
        el('span', { class: 'cn-steps' }, [prevA, nextA])
      ])
    ]);
    document.body.insertBefore(bar, document.body.firstChild);

    /* ---------- the drawer ---------- */
    var search = el('input', { type: 'search', class: 'cn-search', id: 'cn-q', autocomplete: 'off',
                               placeholder: 'search this course', 'aria-describedby': 'cn-count' });
    var count = el('p', { class: 'cn-count', id: 'cn-count', 'aria-live': 'polite' });
    var closeBtn = el('button', { type: 'button', class: 'cn-close', 'aria-label': 'Close contents' },
                      [el('span', { 'aria-hidden': 'true', text: '×' })]);
    var list = el('ol', { class: 'cn-units' });
    var secLinks = [];

    units.forEach(function (u, ui) {
      var current = ui === uIndex;
      var draft = !!u.draft;
      var head = draft
        ? el('span', { class: 'cn-utitle is-draft' }, [el('span', { class: 'cn-ulabel', text: u.label || '' }), u.title, el('em', { class: 'cn-soon', text: ' coming soon' })])
        : el('a', { class: 'cn-utitle', href: current ? '#top' : folder + u.file,
                    'aria-current': current ? 'page' : null },
             [el('span', { class: 'cn-ulabel', text: u.label || '' }), u.title]);
      var li = el('li', { class: 'cn-unit' + (current ? ' is-current' : '') }, [head]);
      li.dataset.text = ((u.label || '') + ' ' + u.title + ' ' + (u.blurb || '')).toLowerCase();
      var secs = u.sections || [];
      if (secs.length) {
        var ol = el('ol', { class: 'cn-secs' });
        secs.forEach(function (s) {
          var off = draft || s.draft || !s.anchor;
          var inner = [s.label ? el('span', { class: 'cn-slabel', text: s.label }) : null, s.title];
          var item = off
            ? el('span', { class: 'is-draft' }, inner.concat([el('em', { class: 'cn-soon', text: ' coming soon' })]))
            : el('a', { href: (current ? '' : folder + u.file) + '#' + s.anchor }, inner);
          if (!off && current) { item.dataset.anchor = s.anchor; secLinks.push(item); }
          var sli = el('li', null, [item]);
          sli.dataset.text = ((s.label || '') + ' ' + s.title).toLowerCase();
          ol.appendChild(sli);
        });
        li.appendChild(ol);
      }
      list.appendChild(li);
    });

    var drawer = el('div', { id: 'cn-drawer', class: 'cn-drawer', role: 'dialog', 'aria-modal': 'true',
                             'aria-labelledby': 'cn-dtitle', hidden: true }, [
      el('div', { class: 'cn-dhead' }, [
        el('div', { class: 'cn-drow' }, [
          el('a', { id: 'cn-dtitle', class: 'cn-dtitle', href: course.page || '/', text: course.title }),
          closeBtn
        ]),
        el('label', { class: 'cn-vh', for: 'cn-q', text: 'Search this course' }),
        search, count
      ]),
      list
    ]);
    var scrim = el('div', { class: 'cn-scrim', hidden: true });
    document.body.appendChild(scrim);
    document.body.appendChild(drawer);

    var lastFocus = null;
    function others() {
      return Array.prototype.filter.call(document.body.children, function (n) { return n !== drawer && n !== scrim; });
    }
    function open() {
      lastFocus = document.activeElement;
      drawer.hidden = false; scrim.hidden = false;
      others().forEach(function (n) { n.inert = true; });
      document.documentElement.classList.add('cn-locked');
      menuBtn.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(function () {
        drawer.classList.add('is-open'); scrim.classList.add('is-open');
        var cur = drawer.querySelector('[aria-current="location"]') || drawer.querySelector('[aria-current="page"]');
        if (cur) {
          /* scroll the drawer only: scrollIntoView would also move the page */
          var top = cur.getBoundingClientRect().top - drawer.getBoundingClientRect().top + drawer.scrollTop;
          drawer.scrollTop = Math.max(0, top - drawer.clientHeight / 2);
          cur.focus({ preventScroll: true });
        } else closeBtn.focus({ preventScroll: true });
      });
    }
    function close(restore) {
      drawer.classList.remove('is-open'); scrim.classList.remove('is-open');
      others().forEach(function (n) { n.inert = false; });
      document.documentElement.classList.remove('cn-locked');
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.hidden = true; scrim.hidden = true;
      if (restore !== false && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    menuBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', function () { close(); });
    scrim.addEventListener('click', function () { close(); });
    drawer.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      if (e.key === 'Tab') {                                   /* keep focus inside */
        var f = drawer.querySelectorAll('a[href],button,input');
        f = Array.prototype.filter.call(f, function (x) { return x.offsetParent !== null; });
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    drawer.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (a && a.getAttribute('href').charAt(0) === '#') close(false);
    });

    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase(), shown = 0;
      Array.prototype.forEach.call(list.children, function (li) {
        var unitHit = !q || li.dataset.text.indexOf(q) >= 0, anySec = false;
        Array.prototype.forEach.call(li.querySelectorAll('.cn-secs > li'), function (s) {
          var hit = !q || unitHit || s.dataset.text.indexOf(q) >= 0;
          s.hidden = !hit; if (hit && q) { anySec = true; shown++; }
        });
        li.hidden = !(unitHit || anySec);
        if (q && unitHit) shown++;
      });
      count.textContent = q ? (shown ? shown + ' match' + (shown === 1 ? '' : 'es') : 'Nothing matches “' + search.value.trim() + '”.') : '';
    });

    /* ---------- the foot of the page ---------- */
    function prevUnit() { for (var i = uIndex - 1; i >= 0; i--) if (!units[i].draft) return units[i]; return null; }
    function nextUnit() { for (var i = uIndex + 1; i < units.length; i++) if (!units[i].draft) return units[i]; return null; }
    function card(u, dir) {
      if (!u) return el('span', { class: 'cn-card is-empty' });
      return el('a', { class: 'cn-card cn-card-' + dir, href: folder + u.file, rel: dir }, [
        el('span', { class: 'cn-card-dir', text: dir === 'prev' ? '‹ previous' : 'next ›' }),
        el('span', { class: 'cn-card-label', text: u.label || '' }),
        el('span', { class: 'cn-card-title', text: u.title })
      ]);
    }
    var foot = el('nav', { class: 'cn-foot', 'aria-label': 'Previous and next' }, [
      el('div', { class: 'cn-cards' }, [card(prevUnit(), 'prev'), card(nextUnit(), 'next')]),
      el('a', { class: 'cn-home', href: course.page || '/', text: '↑ ' + course.title + ' contents' })
    ]);
    var wrap = document.querySelector('.wrap') || document.querySelector('main') || document.body;
    wrap.appendChild(foot);

    /* ---------- where am I? ---------- */
    function setStep(a, s, dir) {
      if (!s) {
        a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true');
        a.setAttribute('aria-label', dir === 'prev' ? 'No previous section' : 'No next section');
        a.removeAttribute('title'); return;
      }
      a.removeAttribute('aria-disabled');
      a.href = s.local || s.href;
      var name = (dir === 'prev' ? 'Previous: ' : 'Next: ') + stopName(s);
      a.setAttribute('aria-label', name); a.title = name;
    }
    var shown = null;
    function update() {
      var k = -1;
      heads.forEach(function (h, i) { if (h && h.getBoundingClientRect().top <= 96) k = i; });
      var cur = k >= 0 ? mine[k] : null;
      var key = cur ? cur.sec.anchor : '';
      if (key === shown && shown !== null) return;
      shown = key;
      var idx = cur ? stops.indexOf(cur) : -1;
      var first = stops.findIndex(function (s) { return s.ui === uIndex; });
      if (cur) { setStep(prevA, stops[idx - 1], 'prev'); setStep(nextA, stops[idx + 1], 'next'); }
      else { setStep(prevA, stops[first - 1], 'prev'); setStep(nextA, mine.length ? stops[first] : stops[first + 1], 'next'); }
      where.textContent = cur ? stopName(cur) : ((unit.label ? unit.label + ' · ' : '') + unit.title);
      secLinks.forEach(function (a) {
        if (cur && a.dataset.anchor === cur.sec.anchor) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
      store(STORE, JSON.stringify({
        href: location.pathname + (cur ? '#' + cur.sec.anchor : ''),
        name: cur ? stopName(cur) : ((unit.label ? unit.label + ' · ' : '') + unit.title),
        t: Date.now()
      }));
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () { ticking = false; update(); });
    }, { passive: true });
    function soon() { shown = null; requestAnimationFrame(update); }
    window.addEventListener('hashchange', soon);
    window.addEventListener('resize', soon);
    window.addEventListener('load', soon);
    /* equations and figures can render late and move the headings */
    if (window.ResizeObserver) {
      var pending = false;
      new ResizeObserver(function () {
        if (pending) return; pending = true;
        setTimeout(function () { pending = false; soon(); }, 150);
      }).observe(document.body);
    }
    update();
  }
})();
