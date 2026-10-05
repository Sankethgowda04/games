const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');

const player = {
  x: 100,
  y: canvas.height / 2,
  width: 28,
  height: 28,
  speed: 5,
  dx: 0,
  dy: 0,
};

const enemy = {
  x: canvas.width - 80,
  y: canvas.height / 2,
  width: 30,
  height: 30,
  speed: 2,
};

let score = 0;
let lives = 3;
let gameOver = false;

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener('keydown', (event) => {
  if (event.key in keys) keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  if (event.key in keys) keys[event.key] = false;
});

function updatePlayer() {
  player.dx = 0;
  player.dy = 0;

  if (keys.ArrowUp) player.dy = -player.speed;
  if (keys.ArrowDown) player.dy = player.speed;
  if (keys.ArrowLeft) player.dx = -player.speed;
  if (keys.ArrowRight) player.dx = player.speed;

  player.x += player.dx;
  player.y += player.dy;

  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

function updateEnemy() {
  if (gameOver) return;

  enemy.x -= enemy.speed;

  if (enemy.x < 0) {
    enemy.x = canvas.width;
    enemy.y = Math.random() * (canvas.height - enemy.height);
    score += 10;
    scoreEl.textContent = score;
  }

  const hit =
    player.x < enemy.x + enemy.width &&
    player.x + player.width > enemy.x &&
    player.y < enemy.y + enemy.height &&
    player.y + player.height > enemy.y;

  if (hit) {
    lives -= 1;
    livesEl.textContent = lives;
    enemy.x = canvas.width;
    enemy.y = Math.random() * (canvas.height - enemy.height);

    if (lives <= 0) {
      gameOver = true;
      setTimeout(() => {
        alert('Game Over! Final Score: ' + score + '\n\nRefresh to play again.');
      }, 100);
    }
  }
}

function drawBackground() {
  ctx.fillStyle = '#0b1120';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = '#1e293b';
  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
}

function drawPlayer() {
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemy() {
  ctx.fillStyle = '#f87171';
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function loop() {
  drawBackground();
  updatePlayer();
  updateEnemy();
  drawPlayer();
  drawEnemy();
  requestAnimationFrame(loop);
}

loop();
