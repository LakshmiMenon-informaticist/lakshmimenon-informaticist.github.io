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


const slider = document.querySelector(".hero-slider");
const track = document.querySelector(".hero-track");

if (slider && track) {
  const slides = Array.from(track.querySelectorAll("img"));
  let i = 0;
  let timer = null;

  const goTo = (index) => {
    i = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${i * 100}%)`;
  };

  const start = () => {
    stop();
    timer = setInterval(() => goTo(i + 1), 3500); // speed between slides
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  // optional: swipe/drag later if you want
  start();
}



// Reveal timeline items on scroll
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");

  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target); // reveal once
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  items.forEach(el => io.observe(el));
});
