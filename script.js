const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress');
const backTop = document.querySelector('.back-top');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 35);
  backTop.classList.toggle('visible', y > 600);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(y / max) * 100}%`;
});

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counter = document.querySelector('[data-count]');
if (counter) {
  const countObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    const target = Number(counter.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 35));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current;
    }, 35);
    countObserver.disconnect();
  }, {threshold:.7});
  countObserver.observe(counter);
}

document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('mousemove', e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

document.querySelectorAll('.expertise-card, .achievement-item, .floating-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    if (window.innerWidth < 800) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(700px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});
