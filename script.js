const links = Array.from(document.querySelectorAll('.nav-link'));
const sections = links
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActive = (id) => {
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

const onScroll = () => {
  const offset = 140; // header + spacing
  let currentId = sections[0]?.id;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top - offset <= 0) {
      currentId = section.id;
    }
  });

  if (currentId) setActive(currentId);
};

window.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

links.forEach(link => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href')?.slice(1);
    if (targetId) setActive(targetId);
  });
});

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('mainNav');
const closeNavMenu = () => {
  mainNav?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.classList.toggle('menu-open', Boolean(isOpen));
});

links.forEach(link => {
  link.addEventListener('click', closeNavMenu);
});

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (!mainNav?.classList.contains('open')) return;
  if (mainNav.contains(target) || navToggle?.contains(target)) return;
  closeNavMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeNavMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNavMenu();
});

const enableScrollReveal = () => {
  const footerCopy = document.querySelector('.footer-copy');
  const revealTargets = Array.from(document.querySelectorAll(
    '.hero-image, .hero-text, .when-content, .tickets, .contact-section, .merch-section, .site-footer'
  ));

  if (!revealTargets.length) return;

  document.body.classList.add('js-animate');
  revealTargets.forEach((el) => el.classList.add('reveal'));
  footerCopy?.classList.add('reveal');

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('in-view'));
    footerCopy?.classList.add('in-view');
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      if (entry.target.classList.contains('site-footer')) {
        footerCopy?.classList.add('in-view');
      }
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -8% 0px',
  });

  revealTargets.forEach((el) => revealObserver.observe(el));
};

enableScrollReveal();
