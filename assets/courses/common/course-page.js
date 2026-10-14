/* Adds a "continue where you left off" link to a course page, using the
   reading position that course-nav.js saved in this browser. */
(function () {
  'use strict';
  var box = document.querySelector('.cp[data-course]');
  if (!box) return;
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem('cn:' + box.dataset.course) || 'null'); } catch (e) { saved = null; }
  if (!saved || !saved.href || saved.href.charAt(0) !== '/') return;
  var actions = box.querySelector('.cp-actions');
  if (!actions) return;
  var a = document.createElement('a');
  a.className = 'cp-btn cp-resume';
  a.href = saved.href;
  a.textContent = 'Continue: ' + (saved.name || 'where you left off');
  actions.insertBefore(a, actions.firstChild);
  var start = actions.querySelector('.cp-start');
  if (start) { start.classList.add('cp-btn-quiet'); start.textContent = 'Start from the beginning'; }
})();
