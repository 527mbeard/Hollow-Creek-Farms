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
    const calBody = document.getElementById('farmCalBody');
    if (!calBody) return; // not on the calendar page, skip
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
        product: "Apple Pie",
        category: "Spring",
        price: 8.99,
        description: "Fresh orchard apples baked in a flaky golden crust served warm with seasonal spices.",
        image: "images/apple-pie.jpg"
    },

    {
        product: "Strawberry Shortcake",
        category: "Spring",
        price: 7.99,
        description: "Sweet strawberries layered with cream and homemade biscuits.",
        image: "images/strawberry-shortcake.jpg"
    },

    {
        product: "Peach Cobbler",
        category: "Summer",
        price: 8.49,
        description: "Juicy peaches baked beneath a buttery cobbler topping.",
        image: "images/peach-cobbler.jpg"
    },

    {
        product: "Pumpkin Pie",
        category: "Autumn",
        price: 9.49,
        description: "Rich pumpkin filling made from farm-grown pumpkins.",
        image: "images/pumpkin-pie.jpg"
    }
];

console.log(collection[0]);

const productGrid = document.getElementById("productGrid");

function render(list) {

    productGrid.innerHTML = "";

    list.forEach((item) => {

        const card = document.createElement("div");

        card.innerHTML = `
            <article class="season-card" data-season="${item.category.toLowerCase()}">

                <div class="season-card-image">
                    <img src="${item.image}" alt="${item.product}">
                </div>

                <h3>${item.product}</h3>

                <h4>$${item.price.toFixed(2)}</h4>

                <p>
                    ${item.description}
                </p>

                <a href="#" class="learn-more">
                    Learn More <span>➜</span>
                </a>

            </article>
        `;

        productGrid.appendChild(card);

    });

}

function filterMovies(category) {
    if (category === "all") {
        render(collection);
    } else {
        const filtered = collection.filter(
            item => item.category.toLowerCase() === category
        );

        render(filtered);
    }
}

document.querySelectorAll(".season-btn").forEach((btn) => {

    btn.addEventListener("click", () => {

        document.querySelectorAll(".season-btn").forEach(b =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        filterMovies(btn.dataset.season);

    });

});

render(collection);