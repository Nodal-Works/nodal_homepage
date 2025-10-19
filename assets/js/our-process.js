// GSAP is loaded via CDN, no imports needed
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const rim = document.getElementById("circle-rim");
  const fill = document.getElementById("circle-fill");
  const text = document.getElementById("circle-text");

  // Ensure fill starts small and transparent
  gsap.set(fill, { scale: 0, transformOrigin: "50% 50%", opacity: 1, fill: "#ffffff00" });
  gsap.set(text, { opacity: 0, y: 10 });

  // Scroll-triggered timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#our-process",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  });

  // Rim slowly draws
  tl.to(rim, { 
    strokeDashoffset: 0, 
    duration: 2, 
    ease: "power2.inOut" 
  });

  // Fill scales and transitions color
  tl.to(fill, { 
    scale: 1, 
    fill: "#4773d1", 
    duration: 1.5, 
    ease: "power2.inOut" 
  }, "+=0.2");

  // Text fades in
  tl.to(text, { 
    opacity: 1, 
    y: 0, 
    duration: 1, 
    ease: "power2.out" 
  }, "-=0.5"); // overlap slightly with fill
});
