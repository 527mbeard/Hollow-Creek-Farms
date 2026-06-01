/* FILTER BUTTONS */

// const filterBtns = document.querySelectorAll('.filter-btn');
// const cards = document.querySelectorAll('.event-card');

// filterBtns.forEach(btn => {

//     btn.addEventListener('click', () => {

//         filterBtns.forEach(b => b.classList.remove('active'));
//         btn.classList.add('active');

//         const filter = btn.dataset.filter;

//         cards.forEach(card => {

//             if (filter === 'all' || card.dataset.season === filter) {
//                 card.style.display = 'block';
//             } else {
//                 card.style.display = 'none';
//             }

//         });

//     });

// });

/* SCROLL ANIMATION */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});


// ------CURSORRRR-----
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("*").forEach((el) => {
    el.addEventListener("mouseenter", () => {
        cursor.style.width = "18px";
        cursor.style.height = "18px";
        cursor.style.background = "#c4714a";

        ring.style.width = "54px";
        ring.style.height = "54px";
    });

    el.addEventListener("mouseleave", () => {
        cursor.style.width = "10px";
        cursor.style.height = "10px";
        cursor.style.background = "#5a6b3a";

        ring.style.width = "36px";
        ring.style.height = "36px";
    });
});

// SEASON IMAGE CHANGING

const seasonImage = document.getElementById("season-image");

const month = new Date().getMonth() + 1; // 1-12

if (month >= 3 && month <= 5) {
    seasonImage.src = "springfarm.png";
}
else if (month >= 6 && month <= 8) {
    seasonImage.src = "summerfarm.png";
}
else if (month >= 9 && month <= 11) {
    seasonImage.src = "fallfarm.png";
}
else {
    seasonImage.src = "winterfarm.png";
}

//SEASON TEXT CHANGING
// const seasonText = document.getElementById("season-text");

// const month = new Date().getMonth() + 1; // 1-12

// if (month >= 3 && month <= 5) {
//     seasonText.innerHTML = "Sunflower field opening mid-May through";
// }
// else if (month >= 6 && month <= 8) {
//     seasonText.innerHTML = "Summer events and activities";
// }
// else if (month >= 9 && month <= 11) {
//     seasonText.innerHTML = "Fall events and activities";
// }
// else {
//     seasonText.innerHTML = "Winter events and activities";
// }

