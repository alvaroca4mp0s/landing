document.documentElement.classList.add('js');

const supportsIO = 'IntersectionObserver' in window;
const prefersReducedMotion =
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealEls = document.querySelectorAll('.reveal');
if (supportsIO) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('show'));
}

const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = Number(el.dataset.target || 0);
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 35));
  const timer = setInterval(() => {
    n += step;
    if (n >= target) {
      el.textContent = String(target);
      clearInterval(timer);
    } else {
      el.textContent = String(n);
    }
  }, 35);
};

if (supportsIO) {
  const cObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.done) {
          entry.target.dataset.done = '1';
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((counter) => cObs.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = String(Number(counter.dataset.target || 0));
  });
}

const carousel = document.getElementById('cases-carousel');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const buttons = carousel ? Array.from(carousel.querySelectorAll('.carousel-btn')) : [];
let idx = Math.max(
  0,
  items.findIndex((item) => item.classList.contains('active'))
);
let autoRotateId = null;

const setActive = (i) => {
  items.forEach((item, itemIndex) => {
    item.classList.toggle('active', itemIndex === i);
  });
};

const stopAutoRotate = () => {
  if (autoRotateId) {
    clearInterval(autoRotateId);
    autoRotateId = null;
  }
};

const startAutoRotate = () => {
  if (prefersReducedMotion || items.length <= 1) return;
  stopAutoRotate();
  autoRotateId = setInterval(() => {
    idx = (idx + 1) % items.length;
    setActive(idx);
  }, 4200);
};

if (items.length > 0) {
  setActive(idx);
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      idx = btn.dataset.dir === 'next' ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
      setActive(idx);
    });
  });

  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoRotate);
    carousel.addEventListener('mouseleave', startAutoRotate);
    carousel.addEventListener('focusin', stopAutoRotate);
    carousel.addEventListener('focusout', startAutoRotate);
  }

  startAutoRotate();
}
