// Interactive Mouse Spotlight & Parallax Effect on Hero Section
const heroSection = document.getElementById("hero");
const watermark = document.querySelector(".hero-jp-watermark");

if (heroSection) {
    heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        heroSection.style.setProperty("--mouse-x", `${x}px`);
        heroSection.style.setProperty("--mouse-y", `${y}px`);

        if (watermark) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.03;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.03;
            watermark.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// Scroll Fade-in observer for Sections
const aboutContainer = document.getElementById("aboutContainer");
const popularWrapper = document.getElementById("popularWrapper");
const eventsWrapper = document.getElementById("eventsWrapper");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.15 },
);

if (aboutContainer) observer.observe(aboutContainer);
if (popularWrapper) observer.observe(popularWrapper);
if (eventsWrapper) observer.observe(eventsWrapper);

// Popular Songs Carousel Logic
const cards = Array.from(document.querySelectorAll(".carousel-card"));
const songInfo = document.querySelector(".song-info");
const songTitle = document.getElementById("songTitle");
const songDate = document.getElementById("songDate");
const songDesc = document.getElementById("songDesc");

let currentIndex = 0;

function updateCarousel() {
    if (!cards.length) return;

    cards.forEach((card, index) => {
        card.className = "carousel-card";

        if (index === currentIndex) {
            card.classList.add("active");
            if (songInfo) {
                songInfo.classList.add("fade-out");

                setTimeout(() => {
                    if (songTitle) songTitle.innerHTML = card.dataset.title;
                    if (songDate) songDate.textContent = card.dataset.date;
                    if (songDesc) songDesc.textContent = card.dataset.desc;
                    songInfo.classList.remove("fade-out");
                }, 180);
            }
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add("prev");
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add("next");
        } else {
            card.classList.add(
                index < currentIndex ? "hidden-left" : "hidden-right",
            );
        }
    });
}

cards.forEach((card, index) => {
    card.addEventListener("click", (e) => {
        if (index !== currentIndex) {
            e.preventDefault();
            currentIndex = index;
            updateCarousel();
        }
    });
});

updateCarousel();

// Events Interactive Video Switcher
const eventCards = document.querySelectorAll(".event-card");
const eventIframe = document.getElementById("eventIframe");

eventCards.forEach((card) => {
    card.addEventListener("click", () => {
        if (card.classList.contains("active")) return;

        eventCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");

        const videoUrl = card.dataset.video;
        if (eventIframe && videoUrl) {
            eventIframe.src = videoUrl;
        }
    });
});

// Interactive Halftone Matrix Distortion for Live Performances
const eventsSection = document.getElementById("events");
if (eventsSection) {
    eventsSection.addEventListener("mousemove", (e) => {
        const rect = eventsSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate percentage for dynamic rotation & scale shift
        const moveX = (x / rect.width - 0.5) * 30;
        const moveY = (y / rect.height - 0.5) * 30;

        eventsSection.style.setProperty("--mouse-x", `${x}px`);
        eventsSection.style.setProperty("--mouse-y", `${y}px`);
        eventsSection.style.setProperty("--shift-x", `${moveX}px`);
        eventsSection.style.setProperty("--shift-y", `${moveY}px`);
    });
}
