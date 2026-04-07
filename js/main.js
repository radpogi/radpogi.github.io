/* =============================================
   RADEN MALANG — PORTFOLIO · main.js
   ============================================= */

// ── Disable right-click ──
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// ── Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S ──
document.addEventListener('keydown', function(e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
    (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||
    (e.ctrlKey && (e.key === 's' || e.key === 'S'))
  ) {
    e.preventDefault();
    return false;
  }
});

// ── Detect DevTools open and blur content ──
(function() {
  const threshold = 160;
  function check() {
    const widthDiff  = window.outerWidth  - window.innerWidth  > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;
    if (widthDiff || heightDiff) {
      document.body.style.filter = 'blur(8px)';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.filter = '';
      document.body.style.pointerEvents = '';
    }
  }
  setInterval(check, 1000);
})();


// ── Scroll-triggered section reveal ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skill bars when stack section becomes visible
        if (entry.target.id === 'stack') {
          animateSkills();
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
);

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section').forEach((s) => observer.observe(s));
});


// ── Skill bar animation ──
function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach((bar) => {
    const target = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = target + '%';
    }, 200);
  });
}


// ── Active nav highlight on scroll ──
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = '#888';
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => navObserver.observe(s));


// ── Subtle cursor glow ──
const glow = document.createElement('div');
glow.style.cssText = `
  position:fixed; width:500px; height:500px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,255,255,0.012) 0%, transparent 70%);
  pointer-events:none; z-index:0;
  transform:translate(-50%,-50%);
  transition: left 0.2s ease, top 0.2s ease;
`;
document.body.appendChild(glow);
document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});
