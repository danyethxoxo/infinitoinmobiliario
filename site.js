const menu = document.querySelector('.menu-button');
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
}));

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: .1, rootMargin: '0px 0px -24px 0px' });
  reveals.forEach((element, index) => {
    if (element.closest('.hero, .page-hero')) element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 140}ms`);
    observer.observe(element);
  });
}

if (!reducedMotion.matches && !sessionStorage.getItem('infinito-intro-seen')) {
  sessionStorage.setItem('infinito-intro-seen', '1');
  const intro = document.createElement('div');
  intro.className = 'site-intro';
  intro.setAttribute('aria-hidden', 'true');
  intro.innerHTML = '<span class="intro-line"></span><span class="intro-word">INFINITO<span>•</span></span><span class="intro-caption">INMOBILIARIO</span><span class="intro-line"></span>';
  document.body.append(intro);
  requestAnimationFrame(() => intro.classList.add('playing'));
  setTimeout(() => intro.classList.add('finished'), 1250);
  intro.addEventListener('transitionend', event => { if (event.target === intro && intro.classList.contains('finished')) intro.remove(); });
  setTimeout(() => intro.remove(), 2200);
}

let ticking = false;
function updateScroll() {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 24);
  if (!reducedMotion.matches) {
    document.documentElement.style.setProperty('--scroll-shift', `${Math.min(y * .13, 90)}px`);
    document.documentElement.style.setProperty('--scroll-progress', `${Math.min(y / Math.max(document.documentElement.scrollHeight - innerHeight, 1), 1) * 100}%`);
  }
  ticking = false;
}
addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScroll);
    ticking = true;
  }
}, { passive: true });
updateScroll();
