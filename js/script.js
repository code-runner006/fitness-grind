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

/* ---------------------------------------------------------
   2. FILTER BUTTONS
   Used on Exercises page (by muscle group) and Meals page
   (by meal category). Every filterable card carries a
   data-category attribute in the HTML. Clicking a filter
   button compares its data-filter value against each card's
   data-category and shows/hides cards by toggling a class
   (no elements are removed from the DOM, just hidden).
--------------------------------------------------------- */
const filterButtons = document.querySelectorAll(".filter-btn");
const filterCards = document.querySelectorAll("[data-category]");

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    filterCards.forEach(function (card) {
      const matches =
        filter === "all" || card.getAttribute("data-category") === filter;
      card.classList.toggle("hidden", !matches);
    });
  });
});

/* ---------------------------------------------------------
   3. CARD EXPAND / COLLAPSE
   Each exercise/meal card has a "details-toggle" button.
   Clicking it toggles an "expanded" class on the parent
   card, which CSS uses to animate max-height from 0 to
   its full content height.
--------------------------------------------------------- */
document.querySelectorAll(".details-toggle").forEach(function (toggle) {
  toggle.addEventListener("click", function () {
    const card = toggle.closest(".card");
    card.classList.toggle("expanded");
  });
});

/* ---------------------------------------------------------
   4. MACRO BAR CALCULATION (Meals page)
   Each meal card stores its macros in grams as data
   attributes: data-protein, data-carbs, data-fat.
   Protein and carbs supply 4 calories per gram, fat
   supplies 9 calories per gram. We convert each macro to
   calories, then work out what percentage of the meal's
   total calories each macro represents, and use that
   percentage to set the width of its bar.
--------------------------------------------------------- */
function initMacroBars() {
  document.querySelectorAll(".card[data-protein]").forEach(function (card) {
    const protein = parseFloat(card.getAttribute("data-protein"));
    const carbs = parseFloat(card.getAttribute("data-carbs"));
    const fat = parseFloat(card.getAttribute("data-fat"));

    const proteinCals = protein * 4;
    const carbsCals = carbs * 4;
    const fatCals = fat * 9;
    const totalCals = proteinCals + carbsCals + fatCals;

    const proteinPct = Math.round((proteinCals / totalCals) * 100);
    const carbsPct = Math.round((carbsCals / totalCals) * 100);
    const fatPct = Math.round((fatCals / totalCals) * 100);

    const proteinBar = card.querySelector(".macro-bar-fill.protein");
    const carbsBar = card.querySelector(".macro-bar-fill.carbs");
    const fatBar = card.querySelector(".macro-bar-fill.fat");

    const proteinVal = card.querySelector(".macro-value.protein");
    const carbsVal = card.querySelector(".macro-value.carbs");
    const fatVal = card.querySelector(".macro-value.fat");

    if (proteinBar) proteinBar.style.width = proteinPct + "%";
    if (carbsBar) carbsBar.style.width = carbsPct + "%";
    if (fatBar) fatBar.style.width = fatPct + "%";

    if (proteinVal)
      proteinVal.textContent = protein + "g (" + proteinPct + "%)";
    if (carbsVal) carbsVal.textContent = carbs + "g (" + carbsPct + "%)";
    if (fatVal) fatVal.textContent = fat + "g (" + fatPct + "%)";
  });
}
initMacroBars();

/* ---------------------------------------------------------
   5. ANIMATED STAT COUNTERS (Home page)
   Each stat number carries a data-target (the final value)
   and an optional data-suffix (e.g. "+" or "%"). An
   IntersectionObserver watches the stats strip and starts
   the count-up animation the first time it scrolls into
   view, so it only plays once per page visit.
--------------------------------------------------------- */
const statNumbers = document.querySelectorAll(".stat-number");

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  const suffix = el.getAttribute("data-suffix") || "";
  const duration = 1200; // ms
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + suffix;
    }
  }
  requestAnimationFrame(step);
}

if (statNumbers.length) {
  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 },
  );

  statNumbers.forEach(function (num) {
    counterObserver.observe(num);
  });
}

/* ---------------------------------------------------------
   6. FAQ ACCORDION (About page)
   Only one FAQ item stays open at a time: opening one
   closes any other that was previously open.
--------------------------------------------------------- */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", function () {
    const wasActive = item.classList.contains("active");
    faqItems.forEach(function (i) {
      i.classList.remove("active");
    });
    if (!wasActive) item.classList.add("active");
  });
});
