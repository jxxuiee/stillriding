
const imageMode = document.getElementById("image-mode");
const textMode = document.getElementById("text-mode");
const aboutMode = document.getElementById("about-mode");

const imageBtn = document.getElementById("image-btn");
const textBtn = document.getElementById("text-btn");
const aboutBtn = document.getElementById("about-btn");

function showMode(mode, button) {
    imageMode.style.display = "none";
    textMode.style.display = "none";
    aboutMode.style.display = "none";

    mode.style.display = "block";

    imageBtn.classList.remove("active");
    textBtn.classList.remove("active");
    aboutBtn.classList.remove("active");

    button.classList.add("active");

    window.scrollTo(0, 0);
}

imageBtn.addEventListener("click", () => {
    showMode(imageMode, imageBtn);
});

textBtn.addEventListener("click", () => {
    showMode(textMode, textBtn);
});

aboutBtn.addEventListener("click", () => {
    showMode(aboutMode, aboutBtn);
});

/* ==================================
   STILL RIDING — AUTOMATIC SCROLL
================================== */

let autoScrollSpeed = 1;
let autoScrollDirection = 1;

let lastTime = null;
let autoScrollPosition = window.scrollY;

function autoScroll(time) {

    if (lastTime === null) {
        lastTime = time;
    }

    const deltaTime = Math.min(time - lastTime, 50);
    lastTime = time;

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    // Keep position synchronized with manual scrolling
    if (Math.abs(window.scrollY - autoScrollPosition) > 2) {
        autoScrollPosition = window.scrollY;
    }

    // Scroll downward or upward
    autoScrollPosition +=
        autoScrollSpeed * autoScrollDirection * deltaTime / 16.67;

    // Reverse direction at the bottom
    if (autoScrollPosition >= maxScroll) {
        autoScrollPosition = maxScroll;
        autoScrollDirection = -1;
    }

    // Start going down again at the top
    if (autoScrollPosition <= 0) {
        autoScrollPosition = 0;
        autoScrollDirection = 1;
    }

    window.scrollTo(0, autoScrollPosition);

    requestAnimationFrame(autoScroll);
}

// Start scrolling
requestAnimationFrame(autoScroll);


/* ==================================
   PRESS AND HOLD TO REVEAL TEXT
================================== */


/* PRESS AND HOLD TO REVEAL TEXT */

/* PRESS AND HOLD — FADE TO TEXT */


        
/* HOLD TO REVEAL TEXT WITH FADE */

let holding = false;
let fadeTimer;

document.addEventListener("pointerdown", (event) => {
    if (!imageBtn.classList.contains("active")) return;
    if (event.target.closest("nav, button, a")) return;

    clearTimeout(fadeTimer);
    holding = true;

    textMode.classList.add("hold-text-visible");

    imageMode.classList.add("hold-fade-out");
});

function releaseHold() {
    if (!holding) return;

    holding = false;

    imageMode.classList.remove("hold-fade-out");

    clearTimeout(fadeTimer);

    fadeTimer = setTimeout(() => {
        if (!holding) {
            textMode.classList.remove("hold-text-visible");
        }
    }, 700);
}

document.addEventListener("pointerup", releaseHold);
document.addEventListener("pointercancel", releaseHold);
window.addEventListener("blur", releaseHold);


