const header = document.querySelector('.topbar');
const menu = document.querySelector('.menu-toggle');

menu.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => header.classList.remove('open'));
});

const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero-title');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let updateQueued = false;

function updateScroll() {
  updateQueued = false;
  const scrollY = window.scrollY;
  const heroTop = hero.offsetTop;
  const heroProgress = Math.max(0, Math.min(1, (scrollY - heroTop) / hero.offsetHeight));

  if (!reducedMotion) {
    hero.style.setProperty('--hero-parallax', `${heroProgress * 55}px`);
    heroTitle.style.transform = `translate3d(-50%, ${heroProgress * -55}px, 0)`;
    heroTitle.style.opacity = `${Math.max(0, 1 - heroProgress * 2)}`;
  }
}

function queueScrollUpdate() {
  if (updateQueued) return;
  updateQueued = true;
  window.requestAnimationFrame(updateScroll);
}

window.addEventListener('scroll', queueScrollUpdate, { passive: true });
window.addEventListener('resize', queueScrollUpdate);
updateScroll();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll(
  '.copy-block, .flavor-heading, .flavor-card, .menu-wrap, .location-list a, .order > *'
).forEach(element => {
  element.classList.add('scroll-reveal');
  revealObserver.observe(element);
});
