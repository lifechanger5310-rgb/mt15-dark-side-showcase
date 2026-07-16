gsap.registerPlugin(ScrollTrigger);

// prefers-reduced-motion gate — sanctioned gsap.matchMedia() pattern.
// Reduced: elements land in end-state instantly, no animation.
// Default: full Dramatic-tier motion (0.6–1.2s, back.out/elastic.out) with light stagger.
let mm = gsap.matchMedia();

mm.add(
  {
    reduced: "(prefers-reduced-motion: reduce)",
    full: "(prefers-reduced-motion: no-preference)",
  },
  (context) => {
    let { reduced } = context.conditions;

    // ---------- HERO ENTRANCE ----------
    const heroTl = gsap.timeline({ defaults: { ease: reduced ? "none" : "back.out(1.4)" } });

    if (reduced) {
      gsap.set(
        [".hero-eyebrow", ".hero-heading", ".hero-sub", ".hero-cta", ".hero-bike", ".scroll-cue"],
        { opacity: 1 }
      );
    } else {
      heroTl
        .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.1)
        .fromTo(".hero-heading", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.25)
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.7)
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.85)
        .fromTo(".hero-bike", { opacity: 0, scale: 0.85, rotate: -4 }, { opacity: 1, scale: 1, rotate: 0, duration: 1.1 }, 0.5)
        .to(".scroll-cue", { opacity: 1, duration: 0.6 }, 1.4);

      // draw-in effect on the bike line art
      const bikeLines = document.querySelectorAll("#bike-svg .bike-line");
      bikeLines.forEach((path) => {
        const len = path.getTotalLength ? path.getTotalLength() : 300;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", delay: 0.6 });
      });
    }

    // ---------- HERO SCRUB (single centerpiece moment) ----------
    if (!reduced) {
      gsap.to(".hero-bike", {
        yPercent: -12,
        scale: 1.05,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".grid-lines", {
        backgroundPosition: "48px 48px",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // ---------- DISCRETE SCROLL REVEALS ----------
    document.querySelectorAll(".reveal").forEach((el) => {
      if (reduced) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });

    // ---------- LIGHT STAGGER GROUPS ----------
    [".specs-grid", ".features-grid", ".color-swatches"].forEach((selector) => {
      const container = document.querySelector(selector);
      if (!container) return;
      const items = container.children;
      if (reduced) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "back.out(1.2)",
          stagger: 0.08,
          scrollTrigger: { trigger: container, start: "top 85%", once: true },
        }
      );
    });
  }
);

// ---------- COLORWAY SWITCHER ----------
const colorBtns = document.querySelectorAll(".color-btn");
const bikeFillEls = document.querySelectorAll("#bike-svg-2 .bike-fill-2, #bike-svg-2 .bike-line-2");
const colorLabel = document.getElementById("color-label");

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    colorBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const color = btn.dataset.color;
    const name = btn.dataset.name;

    gsap.to(bikeFillEls, {
      color: color,
      duration: 0.6,
      ease: "back.out(1.6)",
    });

    if (colorLabel) {
      gsap.to(colorLabel, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          colorLabel.textContent = name;
          gsap.to(colorLabel, { opacity: 1, duration: 0.3 });
        },
      });
    }
  });
});

// set initial bike-2 stroke color to match default active swatch
if (bikeFillEls.length) {
  gsap.set(bikeFillEls, { color: "#f2f2f2" });
}
