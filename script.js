// MATRIX BACKGROUND
const matrixCanvas = document.getElementById('matrixCanvas');
const mCtx = matrixCanvas.getContext('2d');
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
});

const letters = 'アァイイウエカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const fontSize = 14;
const columns = matrixCanvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
  mCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  mCtx.fillStyle = '#008080';
  mCtx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(drawMatrix, 33);


// PARTICLE EFFECT
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const messages = [
  { text: "3", color:"#00bfff", font: "bold 20vw Times New Roman"  },
  { text: "2", color: "#00bfff", font: "bold 20vw Times New Roman" },
  { text: "1", color:"#00bfff", font: "bold 20vw Times New Roman"},
  { text: "Chúc mừng sinh nhật em nhé", color:"#00bfff", font: "bold 6vw Times New Roman" },
  { text: "Chúc em tuổi mới hạnh phúc", color: "#00bfff", font: "bold 7vw Times New Roman" },
  { text: "Luôn đạt nhiều mong ước trong cuộc sống", color: "#00bfff", font: "bold 6vw Times New Roman" }
];

let particles = [];
let state = "forming"; // forming -> waiting -> dispersing -> next
let timer = 0;
let waitStartTime = 0;
let messageIndex = 0;

function createParticlesForMessage(index) {
  particles = [];

  const offCanvas = document.createElement('canvas');
  offCanvas.width = canvas.width;
  offCanvas.height = canvas.height;
  const offCtx = offCanvas.getContext('2d');

  const msg = messages[index];
  const yPos = canvas.height / 2;

  offCtx.fillStyle = msg.color;
  offCtx.font = msg.font;
  offCtx.textAlign = "center";
  offCtx.fillText(msg.text, canvas.width / 2, yPos);

  const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let y = 0; y < canvas.height; y += 3) {
    for (let x = 0; x < canvas.width; x += 3) {
      const idx = (y * canvas.width + x) * 4;
      if (data[idx + 3] > 150) {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const color = `rgb(${r},${g},${b})`;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          destX: x,
          destY: y,
          vx: 0,
          vy: 0,
          color: color
        });
      }
    }
  }
}

createParticlesForMessage(messageIndex);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    if (state === "forming" || state === "waiting") {
      const dx = p.destX - p.x;
      const dy = p.destY - p.y;
      p.vx = dx * 0.05;
      p.vy = dy * 0.05;
    } else if (state === "dispersing") {
      p.vx = (Math.random() - 0.5) * 10;
      p.vy = (Math.random() - 0.5) * 10;
    }

    p.x += p.vx;
    p.y += p.vy;

    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 2, 2);
  }

  if (state === "forming") {
    timer++;
    if (timer > 180) {
      state = "waiting";
      waitStartTime = performance.now();
    }
  } else if (state === "waiting") {
    if (performance.now() - waitStartTime >= 3000) {
      state = "dispersing";
      timer = 0;
    }
  } else if (state === "dispersing") {
    timer++;
    if (timer > 100) {
      timer = 0;
      messageIndex++;
      if (messageIndex >= messages.length) {
         window.location.href = 'birthday-cake.html'; // Chuyển trang khi hết message
  return;
      }
      createParticlesForMessage(messageIndex);
      state = "forming";
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();
