const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('show');
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => io.observe(el));

const counters = document.querySelectorAll('.counter');
const animateCounter = (el) => {
  const target = Number(el.dataset.target || 0);
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 35));
  const t = setInterval(() => {
    n += step;
    if (n >= target) {
      el.textContent = String(target);
      clearInterval(t);
    } else el.textContent = String(n);
  }, 35);
};

const cObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.6 });
counters.forEach((c) => cObs.observe(c));

const items = [...document.querySelectorAll('.carousel-item')];
let idx = 0;
const setActive = (i) => {
  items.forEach((el, k) => el.classList.toggle('active', k === i));
};
document.querySelectorAll('.carousel-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    idx = btn.dataset.dir === 'next' ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
    setActive(idx);
  });
});
setInterval(() => {
  idx = (idx + 1) % items.length;
  setActive(idx);
}, 4200);
