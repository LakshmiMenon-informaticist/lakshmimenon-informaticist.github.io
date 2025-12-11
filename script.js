// Update footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


// --- Typewriter effect below "Hi, I'm Parvati." ---
document.addEventListener("DOMContentLoaded", () => {
  const roles = [
    "Clinical informaticist",
    "Pharmacist",
    "Product Manager",
    "Independent researcher",
    "Risk taker",
    "Nature lover"
  ];

  const typedSpan = document.getElementById("role-typed");
  if (!typedSpan) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      // typing
      charIndex++;
      typedSpan.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1000); // pause at full word
        return;
      }
    } else {
      // deleting
      charIndex--;
      typedSpan.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const delay = isDeleting ? 60 : 90;
    setTimeout(typeLoop, delay);
  }

  typeLoop();
});

// --- Smooth photo proximity effect ---
document.addEventListener("DOMContentLoaded", () => {
  const photos = document.querySelectorAll(".hero-photo");
  if (!photos.length) return;

  let mouseX = 0;
  let mouseY = 0;

  // track mouse position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // per-photo state for smooth interpolation
  const state = new Map();
  photos.forEach((photo) => {
    state.set(photo, { x: 0, y: 0 });
  });

  const MAX_RADIUS = 200;   // how far the “aura” around each photo extends
  const MAX_OFFSET = 18;    // maximum distance a photo moves away
  const SMOOTHING = 0.12;   // lower = slower, higher = snappier

  function animate() {
    photos.forEach((photo) => {
      const rect = photo.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      let targetX = 0;
      let targetY = 0;

      if (dist < MAX_RADIUS) {
        // strength goes from 0 (far) → 1 (very close)
        const strength = (MAX_RADIUS - dist) / MAX_RADIUS;
        const angle = Math.atan2(dy, dx);
        const offset = strength * MAX_OFFSET; // closer = bigger push

        // move *away* from cursor
        targetX = -Math.cos(angle) * offset;
        targetY = -Math.sin(angle) * offset;
      }

      const s = state.get(photo);
      // smooth interpolation (lerp) toward target
      s.x += (targetX - s.x) * SMOOTHING;
      s.y += (targetY - s.y) * SMOOTHING;

      photo.style.transform = `translate(${s.x}px, ${s.y}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
});
