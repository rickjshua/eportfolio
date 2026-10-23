document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');
  var toTop = document.getElementById('toTop');

  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Scroll: nav shadow, back-to-top, active link
  var links = Array.prototype.slice.call(menu.querySelectorAll('a'));
  var sections = links.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 500);
    var current = 0;
    sections.forEach(function (s, i) {
      if (s && s.offsetTop - 120 <= y) current = i;
    });
    links.forEach(function (a, i) { a.classList.toggle('current', i === current); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Portfolio filters
  var chips = document.querySelectorAll('.chip');
  var works = document.querySelectorAll('.work');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var f = chip.getAttribute('data-filter');
      works.forEach(function (w) {
        w.hidden = !(f === 'all' || w.getAttribute('data-cat') === f);
      });
    });
  });

  // Keep placeholder links from jumping to the top
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });
});