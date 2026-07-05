// ========================================
// SKYCODE — Digital Heroes Style JS
// ========================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- CURSOR ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
});
(function loop() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(loop);
})();
document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

// --- ORBS MOUSE PARALLAX ---
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    document.querySelectorAll('.orb').forEach((orb, i) => {
        gsap.to(orb, { x: x * (i+1) * 15, y: y * (i+1) * 15, duration: 2.5, ease: 'power2.out' });
    });
});

// --- MOBILE MENU ---
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');
mobileToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) { gsap.to(window, { duration: 1.1, scrollTo: { y: t, offsetY: 0 }, ease: 'power3.inOut' }); }
    });
});

// --- HERO ENTRANCE ---
const tl = gsap.timeline({ delay: 0.2 });
tl.from('.hl-solid', { opacity: 0, y: 60, duration: 0.9, ease: 'power4.out' })
  .from('.hl-second', { opacity: 0, y: 50, duration: 0.9, ease: 'power4.out' }, '-=0.6')
  .from('.hero-para', { opacity: 0, y: 30, duration: 0.7 }, '-=0.5')
  .from('.hero-form', { opacity: 0, y: 30, duration: 0.7 }, '-=0.4')
  .from('.hero-right', { opacity: 0, x: 60, duration: 1, ease: 'power3.out' }, '-=0.8')
  .from('.mockup-badge', { opacity: 0, scale: 0.8, stagger: 0.12, duration: 0.5 }, '-=0.4');

// Floating badge animation
gsap.to('.badge-tl', { y: -8, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
gsap.to('.badge-br', { y: 8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
gsap.to('.hero-sphere', { y: -15, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

// --- SCROLL SPHERES: new sphere per section ---
const spheres = document.querySelectorAll('.sphere-3d');
const sphereMap = {
    leads: document.querySelector('.sphere-blue'),
    services: document.querySelector('.sphere-purple'),
    work: document.querySelector('.sphere-metal'),
    process: document.querySelector('.sphere-green'),
    pricing: document.querySelector('.sphere-gold')
};

function activateSphere(key) {
    spheres.forEach(s => s.classList.remove('active'));
    if (sphereMap[key]) sphereMap[key].classList.add('active');
}

// Attach ScrollTriggers per section
[
    { sel: '.leads', key: 'leads' },
    { sel: '.services', key: 'services' },
    { sel: '.work', key: 'work' },
    { sel: '.process', key: 'process' },
    { sel: '.pricing', key: 'pricing' }
].forEach(({ sel, key }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => activateSphere(key),
        onEnterBack: () => activateSphere(key),
        onLeave: () => { if (sphereMap[key]) sphereMap[key].classList.remove('active'); },
        onLeaveBack: () => { if (sphereMap[key]) sphereMap[key].classList.remove('active'); }
    });
});

// --- LEADS COUNTER ---
ScrollTrigger.create({
    trigger: '.leads',
    start: 'top 75%',
    onEnter: () => {
        document.querySelectorAll('.lead-num').forEach(el => {
            if (el.dataset.done) return;
            el.dataset.done = '1';
            const target = parseInt(el.dataset.target);
            gsap.to(el, {
                textContent: target, duration: 2, ease: 'power2.out',
                snap: { textContent: 1 },
                onUpdate: function() { el.textContent = Math.floor(el.textContent); }
            });
        });
    }
});

// --- SECTION REVEALS ---
gsap.utils.toArray('.sec-label, .sec-title, .intro-statement, .intro-label, .leads-tag').forEach(el => {
    gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        opacity: 0, y: 40, duration: 0.9, ease: 'power3.out'
    });
});

gsap.utils.toArray('.srv-line').forEach((row, i) => {
    gsap.from(row, {
        scrollTrigger: { trigger: row, start: 'top 90%' },
        opacity: 0, x: 50, duration: 0.7, delay: i * 0.06, ease: 'power3.out'
    });
});

// --- SERVICE HOVER: sphere color + accent ---
const srvSphere = document.getElementById('srvSphere');
document.querySelectorAll('.srv-line').forEach((line, i) => {
    line.addEventListener('mouseenter', () => {
        const color = line.dataset.color;
        line.style.setProperty('--srv-hover', color);
        if (srvSphere) {
            srvSphere.style.background = `radial-gradient(circle at 35% 30%, ${color}, ${color}11 70%)`;
            gsap.to(srvSphere, { top: (18 + i * 11) + '%', duration: 0.6, ease: 'power2.out' });
        }
    });
});

gsap.utils.toArray('.work-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 80%' },
        opacity: 0, y: 60, duration: 0.9, ease: 'power3.out'
    });
});

gsap.utils.toArray('.act').forEach((act, i) => {
    gsap.from(act, {
        scrollTrigger: { trigger: '.acts', start: 'top 80%' },
        opacity: 0, y: 40, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
    });
});

gsap.utils.toArray('.tl-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 88%' },
        opacity: 0, x: -40, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
    });
});

gsap.utils.toArray('.price-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: '.price-grid', start: 'top 82%' },
        opacity: 0, y: 50, duration: 0.7, delay: i * 0.1, ease: 'power3.out'
    });
});

// --- WORK IMAGE PARALLAX ---
gsap.utils.toArray('.work-img img').forEach(img => {
    gsap.to(img, {
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
        y: -40, ease: 'none'
    });
});

// --- FORMS ---
document.querySelectorAll('#contactForm, #launchForm').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const span = btn.querySelector('span');
        const orig = span.textContent;
        span.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
            span.textContent = '✓ Message Sent!';
            setTimeout(() => { span.textContent = orig; btn.disabled = false; form.reset(); }, 3000);
        }, 1500);
    });
});
