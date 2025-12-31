// Get elements
let startButton = document.getElementById("startButton");
let greeting = document.getElementById("greeting");

// Button click action
startButton.addEventListener("click", () => {
    // Hide the button
    startButton.style.display = "none";

    // Show greeting
    greeting.style.display = "block";

    // Show wish text
    document.getElementById("wish").innerText =
        "✨ Wishing you a year full of dreams come true! ✨";

    // Start fireworks
    startFireworks();
});

// Fireworks code (same as before)
let canvas = document.getElementById("fireworks");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];

function createParticle(x, y, color) {
    particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        alpha: 1,
        color: color,
        size: Math.random() * 3 + 2
    });
}

function startFireworks() {
    for (let i = 0; i < 100; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height / 2;
        let colors = ['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ffff','#ffffff'];
        createParticle(x, y, colors[Math.floor(Math.random()*colors.length)]);
    }
    animate();
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.01;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }

    if (particles.length > 0) {
        requestAnimationFrame(animate);
    }
}
