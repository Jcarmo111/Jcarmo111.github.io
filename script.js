'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');

if (menuButton && navigation) {
  document.documentElement.classList.add('js-nav');
  menuButton.hidden = false;

  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('span').textContent = '+';
  };

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(expanded));
    menuButton.querySelector('span').textContent = expanded ? '−' : '+';
    navigation.classList.toggle('is-open', expanded);
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    // Keep keyboard focus on the destination when the mobile menu closes.
    if (link.hash && link.pathname === location.pathname) {
      const destination = document.querySelector(link.hash);
      if (destination) {
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });

  const desktop = window.matchMedia('(min-width: 681px)');
  desktop.addEventListener('change', closeMenu);

  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
  let scheduled = false;
  const updateCurrentSection = () => {
    let current = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 150) current = section.id;
    }
    for (const link of links) {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateCurrentSection);
    }
  }, { passive: true });
  window.addEventListener('resize', updateCurrentSection);
  updateCurrentSection();
}
