/* =============================================
   RADEN MALANG — PORTFOLIO
   main.js
   ============================================= */

// ── Scroll-triggered section reveal ──
// Watches each .section element and adds "visible"
// class when it enters the viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Stop watching once revealed
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12, // trigger when 12% of the element is visible
    rootMargin: "0px 0px -40px 0px",
  },
);

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// ── Active nav link highlight on scroll ──
// Highlights the correct nav link based on which
// section is currently in view
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.color = "";
        });
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`,
        );
        if (activeLink) {
          activeLink.style.color = "#888";
        }
      }
    });
  },
  {
    threshold: 0.4,
  },
);

sections.forEach((section) => navObserver.observe(section));

// ── Subtle cursor glow effect ──
// Adds a soft radial glow that follows the mouse
const glow = document.createElement("div");
glow.style.cssText = `
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.018) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease;
`;
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ── Stagger project cards on load ──
document.querySelectorAll(".project-card").forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

// ── Stack pills stagger ──
document.querySelectorAll(".stack-pill").forEach((pill, i) => {
  pill.style.transitionDelay = `${i * 0.03}s`;
});
