// script.js — Single Fin Coffee

// Année automatique (si tu as <span id="year"></span>)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menu mobile (burger)
const burger = document.getElementById("burger");
const mobileNav = document.getElementById("mobileNav");

function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove("open");
  if (burger) burger.classList.remove("open");
}

function toggleMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.toggle("open");
  if (burger) burger.classList.toggle("open");
}

if (burger && mobileNav) {
  burger.addEventListener("click", toggleMobileNav);

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileNav.contains(e.target) && !burger.contains(e.target)) {
      closeMobileNav();
    }
  });

  // Close menu on scroll if open
  window.addEventListener("scroll", () => {
    if (mobileNav.classList.contains("open")) {
      closeMobileNav();
    }
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".mobile-nav__link").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  closeMobileNav();
}

// --- Menu Category Tabs Logic ---
function initMenuTabs() {
  const menuTabs = document.querySelectorAll(".menu-tab-btn");
  const menuCategories = document.querySelectorAll(".menu-category");

  if (menuTabs.length === 0) return;

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const category = tab.getAttribute("data-category");

      // Update Active Tab Button
      menuTabs.forEach((btn) => btn.classList.remove("active"));
      tab.classList.add("active");

      // Update Active Category Content
      menuCategories.forEach((content) => {
        content.classList.remove("active");
        if (content.id === category) {
          content.classList.add("active");
        }
      });
    });
  });
}

// --- Image Slider Logic ---
function initSliders() {
  const sliders = document.querySelectorAll("[data-slider]");

  sliders.forEach((slider) => {
    const images = slider.querySelectorAll(".slider-img");
    if (images.length <= 1) return;

    let currentIndex = 0;

    setInterval(() => {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }, 4000); // Change image every 4 seconds
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initMenuTabs();
    initSliders();
  });
} else {
  initMenuTabs();
  initSliders();
}

// Scroll doux pour ancres + ferme le menu mobile
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    closeMobileNav();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Modal simple pour zoom sur les images de menu
// -> Mets class="menu-photo" sur les <img> à zoomer
function createModal() {
  const overlay = document.createElement("div");
  overlay.id = "imgModal";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(11,15,20,.78)";
  overlay.style.display = "none";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.padding = "22px";
  overlay.style.zIndex = "9999";

  const img = document.createElement("img");
  img.style.maxWidth = "min(980px, 92vw)";
  img.style.maxHeight = "92vh";
  img.style.borderRadius = "16px";
  img.style.boxShadow = "0 20px 60px rgba(0,0,0,.55)";
  img.alt = "Image en grand";

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  function close() {
    overlay.style.display = "none";
    img.src = "";
  }

  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  return { open: (src) => { img.src = src; overlay.style.display = "flex"; } };
}

const modal = createModal();

document.querySelectorAll("img.menu-photo").forEach((image) => {
  image.style.cursor = "zoom-in";
  image.addEventListener("click", () => {
    const src = image.getAttribute("src");
    if (src) modal.open(src);
  });
});

// --- Hero Text Parallax (Spread on scroll) ---
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const line1 = document.querySelector(".hero__title .line1");
  const line2 = document.querySelector(".hero__title .line2");
  const line3 = document.querySelector(".hero__title .line3");

  if (line1) {
    // S'écarte beaucoup plus vite vers la gauche
    line1.style.transform = `translateX(-${scroll * 1.2}px)`;
    line1.style.opacity = 1 - scroll / 400;
  }
  if (line2) {
    // S'écarte beaucoup plus vite vers la droite
    line2.style.transform = `translateX(${scroll * 0.8}px)`;
    line2.style.opacity = 1 - scroll / 450;
  }
  if (line3) {
    // S'écarte beaucoup plus vite vers la gauche
    line3.style.transform = `translateX(-${scroll * 1.6}px)`;
    line3.style.opacity = 1 - scroll / 500;
  }
});


