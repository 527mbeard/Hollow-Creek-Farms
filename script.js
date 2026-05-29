// // ─── CUSTOM CURSOR (Claude AI) ───────────────────────────────────────────────────────────
// const cursor = document.getElementById('cursor');
// const ring = document.getElementById('cursorRing');
// let mx = 0, my = 0, rx = 0, ry = 0;

// document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

// function animateCursor() {
//   cursor.style.left = mx + 'px';
//   cursor.style.top = my + 'px';
//   rx += (mx - rx) * 0.12;
//   ry += (my - ry) * 0.12;
//   ring.style.left = rx + 'px';
//   ring.style.top = ry + 'px';
//   requestAnimationFrame(animateCursor);
// }
// animateCursor();

// document.querySelectorAll('a, button, .vendor-card, .product-card').forEach(el => {
//   el.addEventListener('mouseenter', () => {
//     cursor.style.width = '18px';
//     cursor.style.height = '18px';
//     cursor.style.background = 'var(--gold)';
//     ring.style.width = '54px';
//     ring.style.height = '54px';
//   });
//   el.addEventListener('mouseleave', () => {
//     cursor.style.width = '10px';
//     cursor.style.height = '10px';
//     cursor.style.background = 'var(--green-dark)';
//     ring.style.width = '36px';
//     ring.style.height = '36px';
//   });
// });

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

if (cursor && ring) {

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animateCursor() {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';

        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;

        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}