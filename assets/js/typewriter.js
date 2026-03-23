const phrases = [
    "Full-stack developer",
    "UI/UX enthusiast",
    "Professional bug hunter",
    "Open to work"
];

const el = document.getElementById('typewriter-text');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
        el.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(tick, 1800);
            return;
        }
    } else {
        el.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(tick, deleting ? 50 : 80);
}

tick();
