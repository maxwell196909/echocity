
const header = document.querySelector(".site-header");
const nav = document.querySelector(".main-nav");
const menuButton = document.querySelector(".menu-toggle");
const languageButton = document.querySelector(".language-switch");
const langEn = document.querySelector(".lang-en");
const langZh = document.querySelector(".lang-zh");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

function setLanguage(lang) {
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-en][data-zh]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
  langEn.classList.toggle("active", lang === "en");
  langZh.classList.toggle("active", lang === "zh");
  localStorage.setItem("echocity-language", lang);
}

languageButton.addEventListener("click", () => {
  const current = document.documentElement.dataset.lang;
  setLanguage(current === "en" ? "zh" : "en");
});

setLanguage(localStorage.getItem("echocity-language") || "en");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const slides = [...document.querySelectorAll(".hero-bg")];
let slideIndex = 0;
setInterval(() => {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}, 7000);
