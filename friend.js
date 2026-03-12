// ============================================================
//   friend.js — Birthday Page Script
//   Soft & Dreamy Aesthetic 🌸
// ============================================================

// ===== MODAL STARS =====
const modalStars = document.getElementById('modal-stars');
const starEmojis = ['✨','🌸','💫','🌟','🌷','💖','🌺','⭐'];
for (let i = 0; i < 30; i++) {
    const s = document.createElement('span');
    s.className = 'mstar';
    s.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 3) + 's';
    s.style.animationDuration = (2 + Math.random() * 2) + 's';
    s.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
    modalStars.appendChild(s);
}

// ===== FAIRY LIGHTS =====
const lightsContainer = document.getElementById('fairy-lights');
const lightColors = ['#f7c5d0','#d9c8f0','#e8c97a','#f4b8cc','#c8addd','#ffd700'];
for (let i = 0; i < 28; i++) {
    const b = document.createElement('div');
    b.className = 'bulb';
    b.style.color = lightColors[i % lightColors.length];
    b.style.background = lightColors[i % lightColors.length];
    b.style.animationDelay = (Math.random() * 2) + 's';
    lightsContainer.appendChild(b);
}

// ===== UNLOCK =====
document.getElementById('open-btn').addEventListener('click', function() {
    document.body.classList.add('unlocked');
    document.getElementById('envelope-modal').classList.add('hidden');
    document.getElementById('navbar').style.top = '0';
    startParticles();
    initScratchCard();
    initReveal();
    initCake();
    displayStoredWishes();
    startCountdown();

    // Background music — add your mp3 file in the same folder
    try {
        const music = new Audio('happy-birthday-334876.mp3');
        music.loop = true; music.volume = 0.4;
        music.play().catch(() => {});
    } catch(e) {}
});

// ===== COUNTDOWN TO APRIL 9 =====
function startCountdown() {
    function update() {
        const now = new Date();
        // Always point to the next upcoming April 9
        const year = (now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() > 9))
            ? now.getFullYear() + 1 : now.getFullYear();
        const birthday = new Date(year, 3, 9, 0, 0, 0); // Month is 0-indexed: 3 = April
        const diff = birthday - now;

        if (diff <= 0) {
            document.getElementById('countdown').style.display = 'none';
            document.getElementById('birthday-msg').style.display = 'block';
            document.getElementById('countdown-label').style.display = 'none';
            return;
        }

        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const m = Math.floor((diff % (1000*60*60)) / (1000*60));
        const s = Math.floor((diff % (1000*60)) / 1000);

        document.getElementById('days').textContent    = String(d).padStart(2,'0');
        document.getElementById('hours').textContent   = String(h).padStart(2,'0');
        document.getElementById('minutes').textContent = String(m).padStart(2,'0');
        document.getElementById('seconds').textContent = String(s).padStart(2,'0');
    }
    update();
    setInterval(update, 1000);
}

// ===== BIRTHDAY CAKE =====
const candleColors = ['#f7c5d0','#d9c8f0','#e8c97a','#f4b8cc','#c8addd','#a8d8ea'];
let candlesBlown = 0;
const totalCandles = 6;

function initCake() {
    const row = document.getElementById('candles-row');
    row.innerHTML = '';
    candlesBlown = 0;
    document.getElementById('cake-wish').classList.remove('visible');

    for (let i = 0; i < totalCandles; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.innerHTML = `
            <div class="flame" id="flame-${i}"></div>
            <div class="candle-body" style="background:linear-gradient(${candleColors[i]},${candleColors[(i+2)%6]})"></div>
        `;
        candle.addEventListener('click', () => blowCandle(i));
        row.appendChild(candle);
    }
}

function blowCandle(i) {
    const flame = document.getElementById('flame-' + i);
    if (flame && !flame.classList.contains('blown')) {
        flame.classList.add('blown');
        spawnPetals(3);
        candlesBlown++;
        if (candlesBlown === totalCandles) {
            setTimeout(() => {
                document.getElementById('cake-wish').classList.add('visible');
                spawnPetals(20);
            }, 400);
        }
    }
}

document.getElementById('blow-all-btn').addEventListener('click', () => {
    for (let i = 0; i < totalCandles; i++) blowCandle(i);
});

function spawnPetals(count) {
    const emojis = ['🌸','✨','💖','🌷','💫','🌺'];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position: fixed;
            left: ${30 + Math.random() * 40}%;
            top: 50%;
            font-size: ${1 + Math.random()}rem;
            pointer-events: none;
            z-index: 999;
            animation: floatUp ${3 + Math.random() * 4}s linear forwards;
        `;
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 7000);
    }
}

// ===== SCRATCH CARD =====
function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';

    // Gold gradient cover
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#e8c97a');
    grad.addColorStop(0.5, '#d4af37');
    grad.addColorStop(1, '#c9a227');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 16px Dancing Script, cursive';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here! ✨', canvas.width / 2, canvas.height / 2 + 6);

    let drawing = false;
    const scratch = (e) => {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(cx - rect.left, cy - rect.top, 28, 0, Math.PI * 2);
        ctx.fill();
    };
    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('touchstart', e => { drawing = true; e.preventDefault(); }, { passive: false });
    window.addEventListener('mouseup', () => drawing = false);
    window.addEventListener('touchend', () => drawing = false);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchmove', e => { scratch(e); e.preventDefault(); }, { passive: false });
}

// ===== PARTICLES =====
function startParticles() {
    const container = document.getElementById('particles-container');
    const emojis = ['🌸','🌷','✨','💖','🌺','💫','🌼','⭐'];
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            font-size: ${0.8 + Math.random() * 1.2}rem;
            animation-duration: ${8 + Math.random() * 8}s;
            animation-delay: ${Math.random() * 8}s;
        `;
        container.appendChild(p);
    }
}

// ===== REVEAL ON SCROLL =====
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ╔══════════════════════════════════════════════════════════════╗
// ║              🌸 ADD YOUR WISHES HERE 🌸                     ║
// ║                                                              ║
// ║  For a TEXT wish:                                            ║
// ║  { name: "Rahul", text: "Happy Birthday! You're amazing!" } ║
// ║                                                              ║
// ║  For an AUDIO wish:                                          ║
// ║  { name: "Priya", audio: "priya_wish.mp3" }                 ║
// ║  (put the audio file in the same folder as friend.html)     ║
// ║                                                              ║
// ║  For BOTH text + audio:                                      ║
// ║  { name: "Adi", text: "Love you!", audio: "adi.mp3" }       ║
// ╚══════════════════════════════════════════════════════════════╝

const WISHES = [
    // ── EXAMPLE 1: Text wish ─────────────────────────────────────
    {
        name: "Adi",
        text: "Wishing you the most beautiful birthday ever! You deserve all the happiness in the world. 🌸"
    },

    // ── EXAMPLE 2: Audio wish ─────────────────────────────────────
    // {
    //     name: "Rahul",
    //     audio: "rahul_wish.mp3"   // ← put this file next to friend.html
    // },

    // ── EXAMPLE 3: Text + Audio ───────────────────────────────────
    // {
    //     name: "Priya",
    //     text: "You light up every room you enter! 💖",
    //     audio: "priya_wish.mp3"
    // },

    // ── ADD MORE BELOW (copy any block above and edit) ────────────
];

// ===== RENDER WISHES (no editing needed below) =====
function displayStoredWishes() {
    const container = document.getElementById('wishes-display-grid');
    container.innerHTML = '';

    if (WISHES.length === 0) {
        container.innerHTML = `<p style="color:#7a5a68;font-style:italic;text-align:center;width:100%;">Wishes coming soon... 🌸</p>`;
        return;
    }

    WISHES.forEach((w, i) => {
        const card = document.createElement('div');
        card.className = 'wish-note';
        card.style.animationDelay = (i * 0.15) + 's';
        card.innerHTML = `
            <div class="tape"></div>
            <h4>From: ${w.name || 'A Friend'} 🌸</h4>
            ${w.audio
                ? `<audio src="${w.audio}" controls style="width:100%;margin:8px 0;border-radius:8px;"></audio>`
                : ''}
            ${w.text
                ? `<p>"${w.text}"</p>`
                : ''}
        `;
        container.appendChild(card);
    });
}
