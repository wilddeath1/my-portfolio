// =============================
// NAVIGATION (Mobile Menu)
// =============================

const menuToggle =
document.querySelector(".menu-toggle");

const navLinks =
document.querySelector(".nav-links");


// Toggle mobile menu

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuToggle.classList.toggle("active");

});


// Close menu when clicking link

document
.querySelectorAll(".nav-links a")
.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

    });

});



// =============================
// SKILL CARD TOGGLE
// =============================

const skillCards =
document.querySelectorAll(".skill-card");


skillCards.forEach(card => {

    card.addEventListener("click", () => {

        // Close other cards

        skillCards.forEach(c => {

            if (c !== card) {

                c.classList.remove("active");

            }

        });

        // Toggle clicked card

        card.classList.toggle("active");

    });

});



// =============================
// TYPING TEXT EFFECT
// =============================

const roles = [

    "Web Developer",

    "Content Video Editor",

    "Visual Brand Designer",

    "Thumbnail Strategist"

];

let roleIndex = 0;

let charIndex = 0;

const textElement =
document.getElementById("typed-text");


const typingSpeed = 70;

const erasingSpeed = 40;

const delayBetweenRoles = 3000;



function typeText() {

    if (charIndex < roles[roleIndex].length) {

        textElement.textContent +=
        roles[roleIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeText, typingSpeed);

    }

    else {

        setTimeout(

            eraseText,

            delayBetweenRoles

        );

    }

}



function eraseText() {

    if (charIndex > 0) {

        textElement.textContent =

        roles[roleIndex].substring(

            0,

            charIndex - 1

        );

        charIndex--;

        setTimeout(

            eraseText,

            erasingSpeed

        );

    }

    else {

        roleIndex++;

        if (roleIndex >= roles.length) {

            roleIndex = 0;

        }

        setTimeout(typeText, typingSpeed);

    }

}


// Start typing after page load

document.addEventListener(

    "DOMContentLoaded",

    () => {

        setTimeout(typeText, 500);

    }

);



// =============================
// PROJECT CAROUSEL SYSTEM
// =============================

const projectSlider =
document.querySelector(".projects-slider");

let projectCards =
Array.from(

document.querySelectorAll(".project-card")

);


// Assign visual positions

function updateProjectPositions() {

    projectCards.forEach(

    (card, index) => {

        card.classList.remove(

            "pos-1",

            "pos-2",

            "pos-3",

            "pos-4",

            "pos-5",

            "active"

        );

        card.classList.add(

            `pos-${index + 1}`

        );

        // Center card

        if (index === 2) {

            card.classList.add("active");

        }

    });

}


// Initialize

updateProjectPositions();


// Rotate Right

function rotateRightProject() {

    let first =
    projectCards.shift();

    projectCards.push(first);

    updateProjectPositions();

}


// Rotate Left

function rotateLeftProject() {

    let last =
    projectCards.pop();

    projectCards.unshift(last);

    updateProjectPositions();

}


// Scroll Rotation Control

let isScrollingProject = false;


projectCards.forEach(card => {

    card.addEventListener(

        "wheel",

        (e) => {

            // Only vertical scroll

            if (

                Math.abs(e.deltaY) >

                Math.abs(e.deltaX)

            ) {

                e.preventDefault();

                if (isScrollingProject)
                return;

                isScrollingProject = true;

                if (e.deltaY > 0) {

                    rotateRightProject();

                }

                else {

                    rotateLeftProject();

                }

                setTimeout(() => {

                    isScrollingProject = false;

                }, 450);

            }

        },

        { passive: false }

    );

});

// =============================
// MOBILE SWIPE SUPPORT
// =============================

let touchStartX = 0;
let touchEndX = 0;

const slider =
document.querySelector(".projects-slider");

// When finger touches screen

slider.addEventListener(
"touchstart",
(e) => {

touchStartX =
e.changedTouches[0].screenX;

},
{ passive: true }
);


// When finger lifts

slider.addEventListener(
"touchend",
(e) => {

touchEndX =
e.changedTouches[0].screenX;

handleSwipe();

},
{ passive: true }
);


// Detect swipe direction

function handleSwipe() {

const swipeDistance =
touchEndX - touchStartX;

// Minimum swipe distance

const minSwipe = 50;

if (
Math.abs(swipeDistance)
< minSwipe
) return;


// Swipe LEFT → Next

if (swipeDistance < 0) {

rotateRightProject();

}


// Swipe RIGHT → Previous

if (swipeDistance > 0) {

rotateLeftProject();

}

}

// =============================
// MOBILE ARROW CONTROLS
// =============================

const leftArrow =
document.querySelector(".proj-arrow.left");

const rightArrow =
document.querySelector(".proj-arrow.right");


if (leftArrow && rightArrow) {

leftArrow.addEventListener(
"click",
rotateLeftProject
);

rightArrow.addEventListener(
"click",
rotateRightProject
);

}



// =============================
// SCROLL REVEAL SYSTEM
// =============================

const revealElements =
document.querySelectorAll(".reveal");


const revealOnScroll = () => {

    const triggerPoint =

    window.innerHeight * 0.85;


    revealElements.forEach(el => {

        const rect =

        el.getBoundingClientRect();

        if (

            rect.top < triggerPoint &&

            rect.bottom > 0

        ) {

            el.classList.add("show");

        }

        else {

            el.classList.remove("show");

        }

    });

};


// Listen to scroll

window.addEventListener(

    "scroll",

    revealOnScroll

);


// Run once on load

revealOnScroll();

// =============================
// LOADER SYSTEM
// =============================

window.addEventListener(
"load",
() => {

const loader =
document.getElementById("loader");

setTimeout(() => {

loader.classList.add("hide");

}, 1600); // duration matches progress bar

});