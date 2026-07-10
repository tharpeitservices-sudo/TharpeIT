"use strict";

/* =========================================================
THARPE IT SERVICES
Navigation, animations, particles, and footer year
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("mainNavigation");
const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");
const yearElement = document.getElementById("currentYear");
const particleContainer = document.getElementById("particles");

/* Current year */
if (yearElement) {
yearElement.textContent = new Date().getFullYear();
}

/* Header background after scrolling */
function updateHeader() {
if (!header) {
return;
}

header.classList.toggle("scrolled", window.scrollY > 25);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* Mobile navigation */
if (menuToggle && navigation) {
menuToggle.addEventListener("click", () => {
const isOpen = navigation.classList.toggle("open");

menuToggle.classList.toggle("open", isOpen);
menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
link.addEventListener("click", () => {
navigation.classList.remove("open");
menuToggle.classList.remove("open");
menuToggle.setAttribute("aria-expanded", "false");
});
});

document.addEventListener("click", (event) => {
const clickedInsideHeader = header?.contains(event.target);

if (!clickedInsideHeader) {
navigation.classList.remove("open");
menuToggle.classList.remove("open");
menuToggle.setAttribute("aria-expanded", "false");
}
});
}

/* Reveal sections while scrolling */
if ("IntersectionObserver" in window) {
const revealObserver = new IntersectionObserver(
(entries, observer) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("visible");
observer.unobserve(entry.target);
}
});
},
{
threshold: 0.12,
rootMargin: "0px 0px -45px 0px"
}
);

revealElements.forEach((element) => {
revealObserver.observe(element);
});
} else {
revealElements.forEach((element) => {
element.classList.add("visible");
});
}

/* Highlight current navigation section */
const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && pageSections.length > 0) {
const navigationObserver = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (!entry.isIntersecting) {
return;
}

const activeSection = entry.target.id;

navLinks.forEach((link) => {
const linkSection =
link.getAttribute("href")?.replace("#", "");

link.classList.toggle(
"active",
linkSection === activeSection
);
});
});
},
{
threshold: 0.38
}
);

pageSections.forEach((section) => {
navigationObserver.observe(section);
});
}

/* Create subtle floating stars */
function createParticles() {
if (!particleContainer) {
return;
}

const particleCount = window.innerWidth < 700 ? 24 : 48;

for (let index = 0; index < particleCount; index += 1) {
const particle = document.createElement("span");

particle.className = "particle";

const size = Math.random() * 2.5 + 1;
const leftPosition = Math.random() * 100;
const duration = Math.random() * 18 + 16;
const delay = Math.random() * -25;
const opacity = Math.random() * 0.65 + 0.2;

particle.style.width = `${size}px`;
particle.style.height = `${size}px`;
particle.style.left = `${leftPosition}%`;
particle.style.animationDuration = `${duration}s`;
particle.style.animationDelay = `${delay}s`;
particle.style.opacity = String(opacity);

particleContainer.appendChild(particle);
}
}

createParticles();

/* Gentle hero image movement using the mouse */
const heroSection = document.querySelector(".hero-section");
const heroImage = document.querySelector(".hero-person-image");

if (
heroSection &&
heroImage &&
window.matchMedia("(pointer: fine)").matches
) {
heroSection.addEventListener("mousemove", (event) => {
const bounds = heroSection.getBoundingClientRect();

const horizontal =
(event.clientX - bounds.left) / bounds.width - 0.5;

const vertical =
(event.clientY - bounds.top) / bounds.height - 0.5;

heroImage.style.transform =
`scale(1.025) translate(${horizontal * 8}px, ${vertical * 8}px)`;
});

heroSection.addEventListener("mouseleave", () => {
heroImage.style.transform = "";
});
}
});
