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

// ---- Reveal timeline items on scroll ----
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");

  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  items.forEach(item => observer.observe(item));
});

// --- Photo proximity bounce effect ---
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".hero-photo").forEach(photo => {
    const rect = photo.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(x*x + y*y);

    // distance threshold (adjust for sensitivity)
    if (dist < 160) {
      const angle = Math.atan2(y, x);
      const offsetX = Math.cos(angle) * -14;
      const offsetY = Math.sin(angle) * -14;

      photo.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    } else {
      photo.style.transform = "";
    }
  });
});
