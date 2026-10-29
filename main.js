// Anclas antiguas en español (enlaces del CV) sobre la versión inglesa
const legacy = { proyectos: 'projects', experiencia: 'experience', formacion: 'education', 'sobre-mi': 'about', contacto: 'contact' };
const alias = legacy[location.hash.slice(1)];
if (alias && document.getElementById(alias)) location.replace(`#${alias}`);

// Menú móvil
const burger = document.getElementById('burger');
const links = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('is-open')));

// Aparición progresiva de tarjetas
const targets = document.querySelectorAll('.stack-card, .project, .table, .fact, .how, .form');
targets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
  targets.forEach(el => io.observe(el));
  // Red de seguridad: si algo impide al observador disparar, se muestra todo igualmente
  setTimeout(() => targets.forEach(el => el.classList.add('is-visible')), 2500);
} else {
  targets.forEach(el => el.classList.add('is-visible'));
}

// Formulario: abre el cliente de correo con el mensaje preparado
document.getElementById('contactForm').addEventListener('submit', ev => {
  ev.preventDefault();
  const f = new FormData(ev.target);
  const en = document.documentElement.lang === 'en';
  const subject = encodeURIComponent(`${en ? 'Contact from the portfolio' : 'Contacto desde el portfolio'}: ${f.get('nombre')}`);
  const body = encodeURIComponent(`${f.get('mensaje')}\n\n— ${f.get('nombre')} (${f.get('email')})`);
  window.location.href = `mailto:crisrn04@icloud.com?subject=${subject}&body=${body}`;
});

// Lluvia de código en la portada
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
const glyphs = 'swift kotlin let var func fun val if else return async await { } ( ) => :: 0 1 $ # < > = ;'.split(' ');
let cols = [];
function resize() {
  const r = canvas.parentElement.getBoundingClientRect();
  canvas.width = r.width; canvas.height = r.height;
  const n = Math.floor(canvas.width / 46);
  cols = Array.from({ length: n }, (_, i) => ({ x: i * 46 + 12, y: Math.random() * canvas.height, v: 0.4 + Math.random() * 1.1, t: glyphs[Math.floor(Math.random() * glyphs.length)] }));
}
function draw() {
  ctx.fillStyle = 'rgba(13, 27, 42, 0.18)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '600 15px "Barlow Condensed", monospace';
  cols.forEach(c => {
    ctx.fillStyle = Math.random() < 0.04 ? '#7ec9ff' : 'rgba(126, 201, 255, 0.28)';
    ctx.fillText(c.t, c.x, c.y);
    c.y += c.v * 2.2;
    if (c.y > canvas.height + 20) { c.y = -20; c.t = glyphs[Math.floor(Math.random() * glyphs.length)]; }
  });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) requestAnimationFrame(draw);
}
resize(); draw();
window.addEventListener('resize', resize);
