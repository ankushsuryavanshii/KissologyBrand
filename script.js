/* =========================================
   Kissology — Interactions & Animations
   ========================================= */

/* ---------- Cursor Glow ---------- */
(() => {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let tx = x, ty = y;
  window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  const tick = () => {
    x += (tx - x) * 0.18; y += (ty - y) * 0.18;
    glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();
})();

/* ---------- Particles Background ---------- */
(() => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  const init = () => {
    const count = Math.min(90, Math.floor((w * h) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.6 + 0.2,
    }));
  };
  const draw = () => {
    // repaint the gradient bg
    const g = ctx.createRadialGradient(w/2, 0, 0, w/2, 0, Math.max(w,h));
    g.addColorStop(0, '#2a0f3a');
    g.addColorStop(0.45, '#120814');
    g.addColorStop(1, '#08040a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      grad.addColorStop(0, `rgba(243,210,122,${p.a})`);
      grad.addColorStop(1, 'rgba(243,210,122,0)');
      ctx.fillStyle = grad;
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ---------- Navbar scroll ---------- */
(() => {
  const nav = document.getElementById('mainNav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Close mobile nav on link click
  document.querySelectorAll('#navContent .nav-link').forEach(l => {
    l.addEventListener('click', () => {
      const c = document.getElementById('navContent');
      if (c.classList.contains('show')) new bootstrap.Collapse(c).hide();
    });
  });
})();

/* ---------- Hero Slideshow ---------- */
(() => {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.getElementById('heroDots');
  const prev = document.getElementById('heroPrev');
  const next = document.getElementById('heroNext');
  if (!slides.length) return;
  let idx = 0, timer;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot' + (i === 0 ? ' active' : '');
    b.addEventListener('click', () => go(i));
    dotsWrap.appendChild(b);
  });
  const dots = dotsWrap.querySelectorAll('.dot');

  const go = i => {
    slides[idx].classList.remove('active');
    dots[idx].classList.remove('active');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
    reset();
  };
  const reset = () => { clearInterval(timer); timer = setInterval(() => go(idx + 1), 4000); };

  prev.addEventListener('click', () => go(idx - 1));
  next.addEventListener('click', () => go(idx + 1));
  reset();

  // parallax on scroll
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      slides.forEach(s => { s.style.backgroundPosition = `center ${50 + y * 0.05}%`; });
    }
  }, { passive: true });
})();

/* ---------- Data ---------- */
const PRODUCTS = [
  { name: 'First Kiss',    desc: 'A tender opening of rose petals & vanilla dew.',    price: '₹1,299', old: '₹1,999', img:'assets/first-kiss.jpg' },
  { name: 'Midnight Kiss', desc: 'Smoky oud, black amber & a whisper of jasmine.',    price: '₹1,499', old: '₹2,199', img:'assets/midnight-kiss.jpg' },
  { name: 'Velvet Kiss',   desc: 'Warm suede, saffron & musk — indulgent & bold.',    price: '₹1,599', old: '₹2,399', img:'assets/velvet-kiss.jpg' },
  { name: 'Wild Kiss',     desc: 'Bergamot, leather & spice for the daring soul.',    price: '₹1,399', old: '₹2,099', img:'assets/wild-kiss.jpg' },
  { name: 'Forever Kiss',  desc: 'Eternal blend of sandalwood, iris & white amber.',  price: '₹1,799', old: '₹2,599', img:'assets/forever-kiss.jpg' },
];

const REVIEWS = [
  { name:'Ananya S.', role:'Verified Buyer', text:'Midnight Kiss is intoxicating. I get compliments every single time I wear it.', img:'https://i.pravatar.cc/100?img=47' },
  { name:'Ritvik M.', role:'Verified Buyer', text:'Velvet Kiss has become my signature scent. The bottle alone is a work of art.', img:'https://i.pravatar.cc/100?img=12' },
  { name:'Priya K.',  role:'Verified Buyer', text:'Gifted First Kiss to my sister — she was in tears. Truly premium in every way.', img:'https://i.pravatar.cc/100?img=32' },
  { name:'Arjun R.',  role:'Verified Buyer', text:'Long lasting, luxurious, and honestly better than brands 3x the price.', img:'https://i.pravatar.cc/100?img=15' },
];

const GALLERY = [
  'assets/hero-1.jpg',
  'assets/midnight-kiss.jpg',
  'assets/velvet-kiss.jpg',
  'assets/hero-3.jpg',
  'assets/first-kiss.jpg',
  'assets/hero-2.jpg',
  'assets/wild-kiss.jpg',
  'assets/forever-kiss.jpg',
];

/* ---------- Render Collection ---------- */
(() => {
  const grid = document.getElementById('collectionGrid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="col-sm-6 col-lg-4" data-reveal>
      <article class="product-card">
        <div class="pc-img-wrap">
          <img class="pc-img" loading="lazy" src="${p.img}" alt="${p.name} luxury perfume by Kissology" />
        </div>
        <h3 class="pc-name">${p.name}</h3>
        <p class="pc-desc">${p.desc}</p>
        <div class="pc-price">${p.price}<small>${p.old}</small></div>
        <a href="https://wa.me/919355236004?text=I%20want%20to%20order%20${encodeURIComponent(p.name)}" target="_blank" rel="noopener" class="btn btn-outline-gold">Buy Now</a>
      </article>
    </div>
  `).join('');

  // spotlight hover
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
})();

/* ---------- Premium Slider (Best Sellers) ---------- */
(() => {
  const track = document.getElementById('psTrack');
  const dotsWrap = document.getElementById('psDots');
  const prev = document.getElementById('psPrev');
  const next = document.getElementById('psNext');
  if (!track) return;

  track.innerHTML = PRODUCTS.map(p => `
    <div class="ps-slide">
      <article class="product-card">
        <div class="pc-img-wrap"><img class="pc-img" loading="lazy" src="${p.img}" alt="${p.name}" /></div>
        <h3 class="pc-name">${p.name}</h3>
        <p class="pc-desc">${p.desc}</p>
        <div class="pc-price">${p.price}</div>
        <a href="https://wa.me/919355236004?text=I%20want%20to%20order%20${encodeURIComponent(p.name)}" target="_blank" rel="noopener" class="btn btn-gold">Order</a>
      </article>
    </div>
  `).join('');

  const slides = track.querySelectorAll('.ps-slide');
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot' + (i === 0 ? ' active' : '');
    b.addEventListener('click', () => scrollTo(i));
    dotsWrap.appendChild(b);
  });
  const dots = dotsWrap.querySelectorAll('.dot');

  const scrollTo = i => {
    const s = slides[i];
    if (!s) return;
    track.scrollTo({ left: s.offsetLeft - track.offsetLeft, behavior:'smooth' });
    dots.forEach((d,di)=>d.classList.toggle('active', di===i));
  };

  let cur = 0;
  prev.addEventListener('click', () => scrollTo(cur = (cur - 1 + slides.length) % slides.length));
  next.addEventListener('click', () => scrollTo(cur = (cur + 1) % slides.length));

  let auto = setInterval(() => next.click(), 5000);
  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => auto = setInterval(() => next.click(), 5000));
})();

/* ---------- Reviews ---------- */
(() => {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = REVIEWS.map(r => `
    <div class="col-md-6 col-lg-3" data-reveal>
      <div class="review-card">
        <div class="stars">★ ★ ★ ★ ★</div>
        <p>"${r.text}"</p>
        <div class="review-user">
          <div><h6>${r.name}</h6><small>${r.role}</small></div>
        </div>
      </div>
    </div>
  `).join('');
})();

/* ---------- Gallery ---------- */
(() => {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = GALLERY.map(src => `
    <a href="${src}" class="glightbox" data-gallery="kissology">
      <img loading="lazy" src="${src}" alt="Kissology luxury perfume" />
    </a>
  `).join('');
  if (window.GLightbox) GLightbox({ selector: '.glightbox' });
})();

/* ---------- Scroll Reveal + GSAP ---------- */
(() => {
  // Basic reveal for all [data-reveal] and [data-anim]
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  const observe = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach(el => observer.observe(el));
  observe();
  // observe again after dynamic content injection
  setTimeout(observe, 300);

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero intro
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero .eyebrow', { y: 20, opacity: 0, duration: .8, delay: .2 })
      .from('.hero-title',    { y: 40, opacity: 0, duration: 1.1 }, '-=.4')
      .from('.hero-sub',      { y: 20, opacity: 0, duration: .8 }, '-=.6')
      .from('.hero-ctas .btn',{ y: 20, opacity: 0, duration: .6, stagger: .12 }, '-=.4');

    // Section titles
    gsap.utils.toArray('.section-title').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out'
      });
    });

    // Feature cards stagger
    gsap.utils.toArray('.feature-card').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 90%' },
        y: 50, opacity: 0, duration: .8, delay: i * 0.05, ease: 'power2.out'
      });
    });
  }
})();

/* ---------- Year (optional footer helper) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
});