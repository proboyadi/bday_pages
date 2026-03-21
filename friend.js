// ============================================================
//   friend.js  v3.0 — Full Art Mode 🌸
//   Easter Eggs · Animations · Interactions
// ============================================================

// ============================================================
//  MODAL ENTRANCE — Floating petals
// ============================================================
(function spawnModalPetals() {
    const layer = document.getElementById('modal-petal-layer');
    if (!layer) return;
    const items = ['🌸','🌷','🌺','✨','💫','🎀','🌼','💕'];
    for (let i = 0; i < 28; i++) {
        const p = document.createElement('span');
        p.className = 'mpetal';
        p.textContent = items[Math.floor(Math.random() * items.length)];
        p.style.left              = Math.random() * 100 + '%';
        p.style.fontSize          = (0.8 + Math.random() * 1.6) + 'rem';
        p.style.animationDuration = (7 + Math.random() * 8) + 's';
        p.style.animationDelay    = (Math.random() * 8) + 's';
        layer.appendChild(p);
    }
})();

// ============================================================
//  STAR FIELD
// ============================================================
(function buildStars() {
    const field = document.getElementById('star-field');
    if (!field) return;
    for (let i = 0; i < 60; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = 1.5 + Math.random() * 2.5;
        s.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${size}px; height: ${size}px;
            animation-duration: ${2 + Math.random() * 3}s;
            animation-delay: ${Math.random() * 4}s;
        `;
        field.appendChild(s);
    }
})();

// ============================================================
//  FAIRY LIGHTS
// ============================================================
(function buildFairyLights() {
    const container = document.getElementById('fairy-lights');
    if (!container) return;
    const colors = ['#f7c5d0','#d9c8f0','#e8c97a','#f4b8cc','#c8addd','#ffd700','#b8e0d2','#f9a8d4'];
    for (let i = 0; i < 36; i++) {
        const b = document.createElement('div');
        b.className = 'bulb';
        b.style.color            = colors[i % colors.length];
        b.style.background       = colors[i % colors.length];
        b.style.animationDelay    = (Math.random() * 2.5) + 's';
        b.style.animationDuration = (1.2 + Math.random() * 1.8) + 's';
        container.appendChild(b);
    }
})();

// ============================================================
//  SCROLL PROGRESS BAR
// ============================================================
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (progressBar) progressBar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

// ============================================================
//  CLICK PETAL BURST
// ============================================================
document.addEventListener('click', function(e) {
    if (['BUTTON','A','CANVAS','INPUT','AUDIO'].includes(e.target.tagName)) return;
    const emojis = ['🌸','✨','💖','🌷','💫','🌺','🎀','⭐','🩷','🌼'];
    const count  = 5 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className   = 'click-burst';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        const angle = (i / count) * 360 + Math.random() * 30;
        const dist  = 40 + Math.random() * 60;
        el.style.left    = e.clientX + 'px';
        el.style.top     = e.clientY + 'px';
        el.style.fontSize = (0.9 + Math.random() * 0.8) + 'rem';
        el.style.setProperty('--dx', (Math.cos(angle * Math.PI / 180) * dist) + 'px');
        el.style.setProperty('--dy', (Math.sin(angle * Math.PI / 180) * dist) + 'px');
        el.style.animationDuration = (0.7 + Math.random() * 0.4) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
    }
});

// ============================================================
//  MUSIC TOGGLE
// ============================================================
let music = null, musicPlaying = false;
const musicBtn = document.getElementById('music-toggle');

function setupMusic() {
    try {
        music = new Audio('happy-birthday-334876.mp3');
        music.loop = true; music.volume = 0.4;
    } catch(e) {}
}
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (!music) return;
        if (musicPlaying) {
            music.pause();
            musicBtn.innerHTML = '🎵';
            musicPlaying = false;
        } else {
            music.play().catch(() => {});
            musicBtn.innerHTML = '🔇';
            musicPlaying = true;
        }
    });
}

// ============================================================
//  UNLOCK
// ============================================================
document.getElementById('open-btn').addEventListener('click', function() {
    document.body.classList.add('unlocked');
    document.getElementById('envelope-modal').classList.add('hidden');
    document.getElementById('navbar').style.top = '0';

    setupMusic();
    if (music) music.play().then(() => { musicPlaying = true; if (musicBtn) musicBtn.innerHTML = '🔇'; }).catch(() => {});

    buildParticles();
    initScratchCard();
    initReveal();
    initCake();
    initTypewriter();
    initLightbox();
    initFlipCards();
    initEasterEgg();
    displayStoredWishes();
    startCountdown();
});

// ============================================================
//  TYPEWRITER
// ============================================================
const LINES = [
    "Some people make the world more beautiful just by existing...",
    "You are undeniably one of them 🌷",
    "Happy Birthday, sweet soul ✨",
    "May every dream you carry bloom like a flower 🌸",
    "The world is simply better with you in it 💖",
];
function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;
    let li = 0, ci = 0, deleting = false;
    function tick() {
        const line = LINES[li];
        if (!deleting) {
            el.textContent = line.slice(0, ++ci);
            if (ci === line.length) { deleting = true; setTimeout(tick, 2800); return; }
        } else {
            el.textContent = line.slice(0, --ci);
            if (ci === 0) { deleting = false; li = (li + 1) % LINES.length; }
        }
        setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
}

// ============================================================
//  COUNTDOWN
// ============================================================
function startCountdown() {
    function update() {
        const now  = new Date();
        const year = (now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() > 9))
            ? now.getFullYear() + 1 : now.getFullYear();
        const bd   = new Date(year, 3, 9, 0, 0, 0); // April 9
        const diff = bd - now;

        if (diff <= 0) {
            document.getElementById('countdown').style.display = 'none';
            document.getElementById('birthday-msg').style.display = 'block';
            document.getElementById('countdown-label').style.display = 'none';
            launchConfetti(120);
            return;
        }
        const pad = n => String(Math.floor(n)).padStart(2, '0');
        document.getElementById('days').textContent    = pad(diff / 86400000);
        document.getElementById('hours').textContent   = pad((diff % 86400000) / 3600000);
        document.getElementById('minutes').textContent = pad((diff % 3600000) / 60000);
        document.getElementById('seconds').textContent = pad((diff % 60000) / 1000);
    }
    update(); setInterval(update, 1000);
}

// ============================================================
//  CONFETTI
// ============================================================
function launchConfetti(count = 80) {
    if (!document.getElementById('confetti-style')) {
        const s = document.createElement('style');
        s.id = 'confetti-style';
        s.textContent = `@keyframes confettiFall{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(105vh) rotate(900deg);opacity:0}}`;
        document.head.appendChild(s);
    }
    const colors = ['#f7c5d0','#d9c8f0','#e8c97a','#e8839a','#b89fd4','#ffd700','#b8e0d2','#f9a8d4'];
    const shapes = ['50%', '2px', '0'];
    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        const size = 5 + Math.random() * 10;
        c.style.cssText = `
            position:fixed; left:${Math.random()*100}vw; top:-15px;
            width:${size}px; height:${size}px;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            border-radius:${shapes[Math.floor(Math.random()*shapes.length)]};
            z-index:9990; pointer-events:none;
            animation:confettiFall ${1.8+Math.random()*3}s linear ${Math.random()*2}s forwards;
        `;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 6000);
    }
}

// ============================================================
//  BIRTHDAY CAKE
// ============================================================
const CANDLE_COLORS = ['#f7c5d0','#d9c8f0','#e8c97a','#f4b8cc','#c8addd','#a8d8ea','#ffd700','#ffb3c6'];
let candlesBlown = 0, totalCandles = 7;

function initCake() {
    const row = document.getElementById('candles-row');
    if (!row) return;
    row.innerHTML = ''; candlesBlown = 0;
    document.getElementById('cake-wish')?.classList.remove('visible');
    for (let i = 0; i < totalCandles; i++) {
        const c = document.createElement('div');
        c.className = 'candle';
        c.title = 'Click to blow! 💨';
        const col = CANDLE_COLORS[i % CANDLE_COLORS.length];
        const col2 = CANDLE_COLORS[(i + 3) % CANDLE_COLORS.length];
        c.innerHTML = `
            <div class="flame" id="flame-${i}"></div>
            <div class="candle-body" style="background:linear-gradient(180deg,${col},${col2})"></div>
        `;
        c.addEventListener('click', () => blowCandle(i));
        row.appendChild(c);
    }
}

function blowCandle(i) {
    const flame = document.getElementById('flame-' + i);
    if (!flame || flame.classList.contains('blown')) return;
    flame.classList.add('blown');
    spawnPetals(4);
    candlesBlown++;
    if (candlesBlown === totalCandles) {
        setTimeout(() => {
            document.getElementById('cake-wish')?.classList.add('visible');
            launchConfetti(100);
            spawnPetals(25);
        }, 500);
    }
}

document.getElementById('blow-all-btn')?.addEventListener('click', () => {
    for (let i = 0; i < totalCandles; i++) blowCandle(i);
});

function spawnPetals(count) {
    const emojis = ['🌸','✨','💖','🌷','💫','🌺','🎉','🎀','⭐','🌼'];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position:fixed;
            left:${8 + Math.random()*84}%;
            top:${15 + Math.random()*50}%;
            font-size:${0.9 + Math.random()*1.4}rem;
            pointer-events:none; z-index:999;
            animation:floatUp ${3+Math.random()*5}s linear forwards;
        `;
        p.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 8000);
    }
}

// ============================================================
//  SCRATCH CARD
// ============================================================
function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Gold shimmer gradient
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0,    '#f0d078');
    g.addColorStop(0.25, '#e8c97a');
    g.addColorStop(0.5,  '#d4af37');
    g.addColorStop(0.75, '#c9a227');
    g.addColorStop(1,    '#f0d078');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sparkle dots
    for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.05 + Math.random()*0.18})`;
        ctx.beginPath();
        ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, 2+Math.random()*5, 0, Math.PI*2);
        ctx.fill();
    }
    // Diamond grid pattern
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath(); ctx.moveTo(0,i); ctx.lineTo(canvas.width,i); ctx.stroke();
    }

    // Text
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = 'bold 17px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('✨  S C R A T C H  ✨', canvas.width/2, canvas.height/2 - 8);
    ctx.font = '13px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('a secret is hidden underneath...', canvas.width/2, canvas.height/2 + 14);

    let drawing = false, scratched = 0;
    const total = canvas.width * canvas.height;

    const scratch = (e) => {
        if (!drawing) return;
        const rect  = canvas.getBoundingClientRect();
        const scaleX = canvas.width  / rect.width;
        const scaleY = canvas.height / rect.height;
        const cx = ((e.touches ? e.touches[0].clientX : e.clientX) - rect.left) * scaleX;
        const cy = ((e.touches ? e.touches[0].clientY : e.clientY) - rect.top)  * scaleY;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(cx, cy, 32, 0, Math.PI*2); ctx.fill();
        scratched += Math.PI * 32 * 32;
        if (scratched > total * 0.5) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            spawnPetals(12); launchConfetti(50);
        }
    };
    canvas.addEventListener('mousedown',  () => drawing = true);
    canvas.addEventListener('touchstart', e => { drawing = true; e.preventDefault(); }, { passive: false });
    window.addEventListener('mouseup',    () => drawing = false);
    window.addEventListener('touchend',   () => drawing = false);
    canvas.addEventListener('mousemove',  scratch);
    canvas.addEventListener('touchmove',  e => { scratch(e); e.preventDefault(); }, { passive: false });
}

// ============================================================
//  PHOTO LIGHTBOX
// ============================================================
function initLightbox() {
    const lb     = document.getElementById('lightbox');
    const lbImg  = document.getElementById('lightbox-img');
    const lbCap  = document.getElementById('lightbox-caption');
    const lbX    = document.getElementById('lightbox-close');
    if (!lb) return;

    document.querySelectorAll('.photo-frame').forEach(frame => {
        frame.addEventListener('click', () => {
            const img = frame.querySelector('.notebook-img');
            const cap = frame.querySelector('.caption');
            if (!img) return;
            lbImg.src = img.src;
            lbCap.textContent = cap ? cap.textContent : '';
            lb.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    const close = () => { lb.classList.remove('active'); document.body.style.overflow = ''; };
    lbX?.addEventListener('click', close);
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// ============================================================
//  FLIP CARDS (Traits)
// ============================================================
function initFlipCards() {
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
}

// ============================================================
//  FLOATING PARTICLES
// ============================================================
function buildParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    const emojis = ['🌸','🌷','✨','💖','🌺','💫','🌼','⭐','🎀','🩷','🌻','💐'];
    for (let i = 0; i < 24; i++) {
        const p = document.createElement('div');
        p.className   = 'particle';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.cssText = `
            left:${Math.random()*100}%;
            font-size:${0.6+Math.random()*1.4}rem;
            animation-duration:${9+Math.random()*12}s;
            animation-delay:${Math.random()*10}s;
        `;
        container.appendChild(p);
    }
}

// ============================================================
//  SCROLL REVEAL (all types)
// ============================================================
function initReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.07 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => obs.observe(el));
}

// ============================================================
//  🥚 EASTER EGGS
// ============================================================
function initEasterEgg() {
    // Easter egg 1: Click the crown emoji 5 times
    const crown = document.getElementById('hero-crown');
    let crownClicks = 0;
    if (crown) {
        crown.addEventListener('click', (e) => {
            e.stopPropagation();
            crownClicks++;
            spawnPetals(3);
            if (crownClicks >= 5) {
                crownClicks = 0;
                showEasterEgg('👑 You found the royal secret! 👑', 
                    '"She who wears no crown still rules every room she enters. Happy Birthday, Queen! 🌸"');
            }
        });
    }

    // Easter egg 2: Konami code ↑↑↓↓←→←→BA
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let ki = 0;
    document.addEventListener('keydown', e => {
        if (e.key === konami[ki]) { ki++; } else { ki = 0; }
        if (ki === konami.length) {
            ki = 0;
            showEasterEgg('🌟 KONAMI CODE UNLOCKED! 🌟',
                '"You just proved you\'re as clever as you are beautiful. \nHappy Birthday, superstar! 🎮✨"');
            launchConfetti(200);
        }
    });

    // Easter egg 3: Hold down on footer heart for 3s
    const footerHeart = document.getElementById('footer-heart-secret');
    let holdTimer = null;
    if (footerHeart) {
        const startHold = () => { holdTimer = setTimeout(() => {
            showEasterEgg('💖 A Secret Message... 💖',
                '"Every time I see you laugh, the world gets a little warmer. \nThank you for existing. Happy Birthday! 🌸"');
        }, 2500); };
        const cancelHold = () => clearTimeout(holdTimer);
        footerHeart.addEventListener('mousedown', startHold);
        footerHeart.addEventListener('touchstart', startHold, { passive: true });
        footerHeart.addEventListener('mouseup',   cancelHold);
        footerHeart.addEventListener('touchend',  cancelHold);
        footerHeart.addEventListener('mouseleave', cancelHold);
    }

    // Easter egg 4: Click stars in sequence (top-left star area)
    const eggClose = document.getElementById('egg-close');
    eggClose?.addEventListener('click', () => {
        document.getElementById('easter-egg-overlay').classList.remove('show');
    });
    document.getElementById('easter-egg-overlay')?.addEventListener('click', e => {
        if (e.target === document.getElementById('easter-egg-overlay'))
            document.getElementById('easter-egg-overlay').classList.remove('show');
    });
}

function showEasterEgg(title, msg) {
    const overlay = document.getElementById('easter-egg-overlay');
    const eggTitle = document.getElementById('egg-title');
    const eggMsg   = document.getElementById('egg-msg');
    if (!overlay) return;
    if (eggTitle) eggTitle.textContent = title;
    if (eggMsg)   eggMsg.textContent   = msg;
    overlay.classList.add('show');
    launchConfetti(80);
    spawnPetals(20);
}

// ============================================================
//  🌸 WISHES — EDIT THIS ARRAY
// ============================================================
// ╔══════════════════════════════════════════════════════╗
// ║  HOW TO ADD WISHES:                                  ║
// ║                                                      ║
// ║  Text:  { name:"Rahul", text:"Your message here" }  ║
// ║  Audio: { name:"Priya", audio:"priya.mp3" }         ║
// ║  Both:  { name:"Adi",   text:"msg", audio:"a.mp3" } ║
// ║                                                      ║
// ║  Put audio files in the same folder as this file.   ║
// ╚══════════════════════════════════════════════════════╝

const WISHES = [
    {
        name: "Adi",
        text: "Wishing you the most magical birthday ever — you deserve every beautiful thing! 🌸"
    },
    // { name: "Rahul", audio: "rahul.mp3" },
    // { name: "Priya", text: "You're sunshine in human form! 💛", audio: "priya.mp3" },
];

function displayStoredWishes() {
    const container = document.getElementById('wishes-display-grid');
    if (!container) return;
    container.innerHTML = '';

    if (WISHES.length === 0) {
        container.innerHTML = `<p style="color:#7a5a68;font-style:italic;text-align:center;width:100%;font-family:'Dancing Script',cursive;font-size:1.2rem;">Wishes blooming soon... 🌸</p>`;
        return;
    }

    const rotations = [-2.5, 1.8, -1.2, 2.8, -0.8, 3, -2, 1.5];
    WISHES.forEach((w, i) => {
        const card = document.createElement('div');
        card.className  = 'wish-note';
        card.style.transform = `rotate(${rotations[i % rotations.length]}deg)`;
        card.innerHTML = `
            <div class="tape"></div>
            <h4>From: ${w.name || 'A Friend'} 🌸</h4>
            ${w.audio ? `<audio src="${w.audio}" controls style="width:100%;margin:8px 0;border-radius:8px;"></audio>` : ''}
            ${w.text  ? `<p>"${w.text}"</p>` : ''}
            <span class="wish-heart">🌸</span>
        `;
        container.appendChild(card);
    });
}
