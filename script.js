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

// --- Hero image slider (auto-rotate every 4s) ---
const slider = document.querySelector(".hero-slider");
if (slider) {
  const slides = slider.querySelectorAll("img");
  let current = 0;

  if (slides.length > 0) {
    slides[0].classList.add("active");

    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 4000);
  }
}
// --- Typewriter effect below "Hi, I'm Parvati." ---
const roles = [
  "Clinical informaticist",
  "Pharmacist",
  "Product Manager",
  "Independent Researcher",
  "Risk taker",
  "Nature Lover"
];

const typedSpan = document.getElementById("role-typed");

if (typedSpan) {
  let roleIndex = 0;
  let charIndex = 0;
  let typing = true;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (typing) {
      typedSpan.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        typing = false;
        setTimeout(typeEffect, 1000);
        return;
      }
    } else {
      typedSpan.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        typing = true;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, typing ? 80 : 50);
  }

  typeEffect();
}


