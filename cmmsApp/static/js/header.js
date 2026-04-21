document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav");
  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const links = document.querySelectorAll('[data-scroll-to]');
  const header = document.querySelector(".header");

  if (!nav || !navMenu || !navToggle) return;

  function openMenu() {
    navMenu.classList.add("show-menu");
    nav.classList.add("show-icon");
    document.body.classList.add("no-scroll");
    navToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    navMenu.classList.remove("show-menu");
    nav.classList.remove("show-icon");
    document.body.classList.remove("no-scroll");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = navMenu.classList.contains("show-menu");
    isOpen ? closeMenu() : openMenu();
  });

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

  links.forEach((el) => {
    el.addEventListener("click", function (e) {
      const targetSel = this.getAttribute("href") || this.dataset.target;

      if (!targetSel || !targetSel.startsWith("#")) return;

      const target = document.querySelector(targetSel);
      if (!target) return;

      e.preventDefault();
      closeMenu();

      setTimeout(() => {
        smoothScrollTo(targetSel);
      }, 180);
    });
  });

  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && navMenu.classList.contains("show-menu")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("show-menu")) {
      closeMenu();
    }
  });

  const solutionToggle = document.querySelector(".dropdown-toggle-solutions");

  if (solutionToggle) {
    const solutionItem = solutionToggle.closest(".dropdown__item");

    solutionToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      solutionItem.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
      if (!solutionItem.contains(event.target)) {
        solutionItem.classList.remove("active");
      }
    });
  }
});