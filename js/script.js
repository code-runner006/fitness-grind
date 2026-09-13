/* =========================================================
   FITNESS GRIND — MAIN SCRIPT
   Sections:
   1. Mobile navigation (hamburger menu)
   2. Filter buttons (Exercises / Meals pages)
   3. Card expand / collapse (details toggle)
   4. Macro bar calculation (Meals page)
   5. Animated stat counters (Home page)
   6. FAQ accordion (About page)
   7. Contact form validation
   ========================================================= */

/* ---------------------------------------------------------
   1. MOBILE NAVIGATION
   Toggles the slide-in nav panel and hamburger icon animation.
   Also closes the menu automatically when a link is clicked
   or when the dark overlay behind the menu is tapped.
--------------------------------------------------------- */
const hamburger = document.getElementById("hamburgerBtn");
const mainNav = document.getElementById("mainNav");
const navOverlay = document.getElementById("navOverlay");

function toggleNav() {
  hamburger.classList.toggle("active");
  mainNav.classList.toggle("active");
  navOverlay.classList.toggle("active");
  const isOpen = mainNav.classList.contains("active");
  hamburger.setAttribute("aria-expanded", String(isOpen));
}

if (hamburger) {
  hamburger.addEventListener("click", toggleNav);
  navOverlay.addEventListener("click", toggleNav);

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (mainNav.classList.contains("active")) toggleNav();
    });
  });
}
