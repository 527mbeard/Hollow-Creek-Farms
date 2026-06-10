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

if (seasonImage) {
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
(() => {
    const CATS = {
        planting: { color: '#2d5a27' },
        harvest: { color: '#8b2020' },
        market: { color: '#D4720A' },
        other: { color: '#1a5a8a' }
    };

    const EVENTS = {
        '2026-06-14': [{ name: 'Summer farm tour', cat: 'other', note: 'Guided walk through the fields' }],
        '2026-06-15': [{ name: 'Summer farm tour', cat: 'other', note: 'Guided walk through the fields' }],
        '2026-06-21': [{ name: 'Saturday market', cat: 'market', note: 'Fresh produce and baked goods' }],
        '2026-07-04': [{ name: 'Berry picking', cat: 'harvest', note: 'U-pick berries from 9am to noon' }],
        '2026-07-18': [{ name: 'Planting day', cat: 'planting', note: 'Tomatoes and peppers' }]
    };

    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let events = {};
    let cur = new Date();
    cur.setDate(1);
    function dateKey(d) {
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    /* ── Render calendar ── */
    function render() {
        events = EVENTS;
        const year = cur.getFullYear();
        const month = cur.getMonth();
        document.getElementById('farmMonthLabel').textContent = MONTHS[month] + ' ' + year;

        const firstDay = new Date(year, month, 1);
        let dow = firstDay.getDay();
        dow = dow === 0 ? 6 : dow - 1; // Monday = 0

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        const today = new Date();
        const totalCells = Math.ceil((dow + daysInMonth) / 7) * 7;

        let html = '';
        let dayOfMonth = 1;
        let nextMonthDay = 1;

        for (let row = 0; row < totalCells / 7; row++) {
            html += '<tr>';
            for (let col = 0; col < 7; col++) {
                const i = row * 7 + col;
                let d, m, y, cls = '';

                if (i < dow) {
                    d = prevMonthDays - dow + i + 1;
                    m = month - 1; y = year;
                    if (m < 0) { m = 11; y--; }
                    cls = 'farm-cal__other-month';
                } else if (i >= dow + daysInMonth) {
                    d = nextMonthDay++; m = month + 1; y = year;
                    if (m > 11) { m = 0; y++; }
                    cls = 'farm-cal__other-month';
                } else {
                    d = dayOfMonth++; m = month; y = year;
                }

                const cellDate = new Date(y, m, d);
                if (cellDate.toDateString() === today.toDateString()) cls += ' farm-cal__today';

                const sk = dateKey(cellDate);
                const evs = events[sk] || [];
                const chips = evs.map((ev, idx) => {
                    const color = (CATS[ev.cat] || CATS.other).color;
                    return `<span class="farm-cal__event-chip" style="background:${color}"
                    title="${ev.note ? ev.note : ev.name}">${ev.name}</span>`;
                }).join('');

                html += `<td class="${cls.trim()}" data-date="${sk}" role="gridcell">
                   <span class="farm-cal__day-num">${d}</span>${chips}
                 </td>`;
            }
            html += '</tr>';
        }

        document.getElementById('farmCalBody').innerHTML = html;
    }

    /* ── Navigation ── */
    document.getElementById('farmPrevBtn').addEventListener('click', function () {
        cur.setMonth(cur.getMonth() - 1);
        render();
    });
    document.getElementById('farmNextBtn').addEventListener('click', function () {
        cur.setMonth(cur.getMonth() + 1);
        render();
    });

    /* ── Init ── */
    render();
})();

const collection = [
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true
    },
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true
    },
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true

    },
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true

    },
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true
    },
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true
    },
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true
    },
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true
    },
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true
    },
    {
        product: "The Gray Man",
        category: "Action",
        note: 5,
        description: 2022,
        image: "grayman.jpg",
        featured: true
    },
];

console.log(collection[0]);

const movieGrid = document.getElementById("movieGrid");

const modal = document.getElementById("movieModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalExtra = document.getElementById("modalExtra");
const closeModal = document.getElementById("closeModal");

let currentFilter = "All";

function render(list) {
    movieGrid.innerHTML = "";

    list.forEach((movie) => {
        let badgeColor = "";
        if (movie.rating >= 4.5) {
            badgeColor = "gold";
        } else {
            badgeColor = "white";
        }

        let featuredBadge = "";

        if (movie.featured === true) {
            featuredBadge = `
        <span class="featured-badge">
            ⭐ Favorite
        </span>
    `;
        }

        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-lg-3 d-flex justify-content-center";

        const card = document.createElement("div");
        // card.classList.add("movie-card");

        card.innerHTML = `
                    <div class="movie-card">
            <div class="poster-wrapper">
                <img src="${movie.image}" class="movie-poster">
            </div>

            <div class="movie-info">

                <div class="top-row">
                    <span class="genre-tag">${movie.genre}</span> 
                    <span class="rating" style="color:${badgeColor}">
                        ⭐ ${movie.rating}
                    </span>
                </div>

                <h2 class="movie-title">${movie.title}</h2>
               

                <p class="movie-description">${movie.description}</p>
                 ${featuredBadge}

                <div class="bottom-row">
                    <span class="movie-year">${movie.year}</span>
                    <button class="view-btn">View Details</button>
                </div>
                </div>

            </div>
        `;

        card.querySelector(".view-btn").addEventListener("click", () => {
            modalTitle.textContent = movie.title;
            modalDesc.textContent = movie.description;
            modalExtra.textContent = `Director: ${movie.director} | Runtime: ${movie.runtime}`;

            modal.classList.remove("hidden");
        });

        col.appendChild(card);
        movieGrid.appendChild(col);
    });
}

function filterMovies(category) {
    if (category === "All") {
        render(collection);
    } else {
        const filtered = collection.filter((movie) => movie.genre === category);
        render(filtered);
    }
}

document.querySelectorAll(".sort-option").forEach(option => {
    option.addEventListener("click", () => {

        const sortType = option.dataset.sort;

        let sortedMovies = [...collection];

        if (sortType === "rating") {
            sortedMovies.sort((a, b) => b.rating - a.rating);
        }

        else if (sortType === "alphabetical") {
            sortedMovies.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }

        else if (sortType === "random") {
            sortedMovies.sort(() => Math.random() - 0.5);
        }

        render(sortedMovies);
    });
});

document.querySelectorAll(".genre-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
        filterMovies(btn.dataset.filter);
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

render(collection);