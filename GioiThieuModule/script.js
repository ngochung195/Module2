// Particle system for celebration/confetti effect
const canvas = document.getElementById('canvas-particles');
const ctx = canvas.getContext('2d');

let particles = [];
let animationFrameId;

// Resize canvas to fill window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 4;
        this.speedX = Math.random() * 8 - 4;
        this.speedY = Math.random() * -10 - 5; // Launch upwards
        this.gravity = 0.25;
        this.color = this.getRandomColor();
        this.opacity = 1;
        this.fadeSpeed = Math.random() * 0.015 + 0.01;
    }

    getRandomColor() {
        const colors = [
            '#6366f1', // Indigo
            '#ec4899', // Pink
            '#3b82f6', // Blue
            '#10b981', // Green
            '#f59e0b', // Amber
            '#8b5cf6'  // Purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.speedY += this.gravity;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].opacity <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    
    if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
    } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function spawnCelebration() {
    // Spawn particles from around the button or screen center
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2 + 50;

    for (let i = 0; i < 60; i++) {
        particles.push(new Particle(x, y));
    }
    
    if (!animationFrameId) {
        animate();
    }
}

// Button interactivity
const ctaBtn = document.getElementById('cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        spawnCelebration();
        
        // Dynamic subtext change for fun
        const subtitle = document.querySelector('.subtitle');
        const phrases = [
            "Hành trình vạn dặm bắt đầu từ một bước chân đầu tiên! 🚀",
            "Mọi lập trình viên vĩ đại đều từng bắt đầu như bạn! 💻",
            "Chào mừng bạn đến với thế giới đầy sáng tạo của Code! 🌟",
            "Hãy cứ khát khao, hãy cứ dại khờ! 🔥"
        ];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        
        // Fade effect for text change
        subtitle.style.transition = "opacity 0.3s ease";
        subtitle.style.opacity = 0;
        
        setTimeout(() => {
            subtitle.textContent = randomPhrase;
            subtitle.style.opacity = 1;
        }, 300);
    });
}
