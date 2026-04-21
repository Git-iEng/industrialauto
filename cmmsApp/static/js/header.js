document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav");              // NEW
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const links = document.querySelectorAll('[data-scroll-to]');
  const header = document.querySelector(".header");

  if (!navMenu || !navToggle) return;

  /* ===== OPEN MENU ===== */
  function openMenu() {
    navMenu.classList.add("show-menu");
    nav.classList.add("show-icon");            // FIXED (was on toggle)
    document.body.classList.add("no-scroll");
    navToggle.setAttribute("aria-expanded", "true");
  }

  /* ===== CLOSE MENU ===== */
  function closeMenu() {
    navMenu.classList.remove("show-menu");
    nav.classList.remove("show-icon");         // FIXED
    document.body.classList.remove("no-scroll");
    navToggle.setAttribute("aria-expanded", "false");
  }

  /* ===== TOGGLE MENU ===== */
  navToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = navMenu.classList.contains("show-menu");
    isOpen ? closeMenu() : openMenu();
  });

  /* ===== SMOOTH SCROLL ===== */
  function headerOffset() {
    return header ? header.offsetHeight : 0;
  }

  function smoothScrollTo(targetSel) {
    const target = document.querySelector(targetSel);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }

  /* ===== NAV LINK CLICK ===== */
  links.forEach((el) => {
    el.addEventListener("click", function (e) {
      const targetSel = this.getAttribute("href") || this.dataset.target;

      if (!targetSel || !targetSel.startsWith("#")) return;

      const target = document.querySelector(targetSel);
      if (!target) return;

      e.preventDefault();

      closeMenu();   // FIX: close menu first

      setTimeout(() => {
        smoothScrollTo(targetSel);
      }, 180);
    });
  });

  /* ===== CLICK OUTSIDE CLOSE ===== */
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && navMenu.classList.contains("show-menu")) {
      closeMenu();
    }
  });

  /* ===== ESC KEY CLOSE ===== */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("show-menu")) {
      closeMenu();
    }
  });

  /* ===== SAFE DROPDOWN (FIXED) ===== */
  const solutionToggle = document.querySelector('.dropdown-toggle-solutions');

  if (solutionToggle) {   // FIX: prevent crash
    const solutionItem = solutionToggle.closest('.dropdown__item');

    solutionToggle.addEventListener('click', (e) => {
      e.preventDefault();
      solutionItem.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
      if (!solutionItem.contains(event.target)) {
        solutionItem.classList.remove('active');
      }
    });
  }
});