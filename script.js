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


// SEASON IMAGE CHANGING

const seasonImage = document.getElementById("season-image");

const month = new Date().getMonth() + 1; // 1-12

if (month >= 3 && month <= 5) {
    seasonImage.src = "images/springfarm.png";
}
else if (month >= 6 && month <= 8) {
    seasonImage.src = "images/summerfarm.png";
}
else if (month >= 9 && month <= 11) {
    seasonImage.src = "images/fallfarm.png";
}
else {
    seasonImage.src = "images/winterfarm.png";
}

//SEASON TEXT CHANGING
function getCurrentSeason() {
    const month = new Date().getMonth() + 1;

    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'fall';

    return 'winter';
}

const currentSeason = getCurrentSeason();

document.querySelectorAll('.menu-card').forEach(card => {
    if (card.classList.contains(currentSeason)) {
        card.style.display = 'block';
    }
});

/* FILTER BUTTONS */

const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.event-card');

filterBtns.forEach(btn => {

    btn.addEventListener('click', () => {

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {

            if (filter === 'all' || card.dataset.season === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }

        });

    });

});

//  CALENDAR

// const events = [
//     {
//         title: "Sunflower Festival",
//         start: "2026-08-12",
//         end: "2026-08-16",
//         color: "#1F4A2E"
//     },
//     {
//         title: "Pumpkin Patch",
//         start: "2026-10-01",
//         end: "2026-10-31",
//         color: "#D98B2B"
//     },
//     {
//         title: "Farmers Market",
//         start: "2026-07-08",
//         end: "2026-07-10",
//         color: "#8C2F27"
//     }
// ];

// const monthYear =
//     document.getElementById("monthYear");

// const calendarGrid =
//     document.getElementById("calendarGrid");

// let currentDate = new Date();

// const events = [
//     {
//         title: "Sunflower Festival",
//         start: "2026-08-12",
//         end: "2026-08-16",
//         color: "#1F4A2E"
//     },
//     {
//         title: "Pumpkin Patch",
//         start: "2026-08-20",
//         end: "2026-08-25",
//         color: "#D98B2B"
//     }
// ];

// function renderCalendar() {

//     calendarGrid.innerHTML = "";

//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     monthYear.textContent =
//         new Date(year, month)
//             .toLocaleDateString(
//                 "en-US",
//                 {
//                     month: "long",
//                     year: "numeric"
//                 }
//             );

//     const firstDay =
//         new Date(year, month, 1);

//     const lastDay =
//         new Date(year, month + 1, 0);

//     let startDay =
//         (firstDay.getDay() + 6) % 7;

//     for (let i = 0; i < startDay; i++) {

//         const empty =
//             document.createElement("div");

//         empty.classList.add("day");

//         calendarGrid.appendChild(empty);
//     }

//     for (
//         let d = 1;
//         d <= lastDay.getDate();
//         d++
//     ) {

//         const day =
//             document.createElement("div");

//         day.classList.add("day");

//         const dateString =
//             `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

//         day.innerHTML =
//             `<div class="day-number">${d}</div>`;

//         events.forEach(event => {

//             if (
//                 dateString >= event.start &&
//                 dateString <= event.end
//             ) {

//                 const eventDiv =
//                     document.createElement("div");

//                 eventDiv.classList.add("event");

//                 eventDiv.style.background =
//                     event.color;

//                 eventDiv.textContent =
//                     event.title;

//                 day.appendChild(eventDiv);
//             }
//         });

//         calendarGrid.appendChild(day);
//     }
// }

// renderCalendar();

// document
//     .getElementById("nextMonth")
//     .addEventListener("click", () => {

//         currentDate.setMonth(
//             currentDate.getMonth() + 1
//         );

//         renderCalendar();
//     });

// document
//     .getElementById("prevMonth")
//     .addEventListener("click", () => {

//         currentDate.setMonth(
//             currentDate.getMonth() - 1
//         );

//         renderCalendar();
//     });
