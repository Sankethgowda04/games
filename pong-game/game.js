const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const leftScoreEl = document.getElementById('leftScore');
const rightScoreEl = document.getElementById('rightScore');

const paddleHeight = 120;
const paddleWidth = 18;
const paddleSpeed = 7;
const ballSize = 16;

const leftPaddle = {
  x: 30,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  speed: paddleSpeed,
  up: false,
  down: false,
};

const rightPaddle = {
  x: canvas.width - 30 - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  speed: paddleSpeed,
  up: false,
  down: false,
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: ballSize,
  dx: 5,
  dy: 4,
  speed: 5,
};

let leftScore = 0;
let rightScore = 0;
let started = false;

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  KeyW: false,
  KeyS: false,
  Space: false,
};

document.addEventListener('keydown', (event) => {
  if (event.code in keys) {
    keys[event.code] = true;
    if (event.code === 'Space') {
      started = true;
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code in keys) {
    keys[event.code] = false;
  }
});

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
  ball.dy = (Math.random() * 2 - 1) * 4;
}

function updatePaddles() {
  if (keys.KeyW) leftPaddle.y -= leftPaddle.speed;
  if (keys.KeyS) leftPaddle.y += leftPaddle.speed;
  if (keys.ArrowUp) rightPaddle.y -= rightPaddle.speed;
  if (keys.ArrowDown) rightPaddle.y += rightPaddle.speed;

  leftPaddle.y = Math.max(0, Math.min(canvas.height - leftPaddle.height, leftPaddle.y));
  rightPaddle.y = Math.max(0, Math.min(canvas.height - rightPaddle.height, rightPaddle.y));
}

function updateBall() {
  if (!started) return;

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
    ball.dy *= -1;
  }

  if (
    ball.x <= leftPaddle.x + leftPaddle.width &&
    ball.y + ball.size >= leftPaddle.y &&
    ball.y <= leftPaddle.y + leftPaddle.height &&
    ball.x >= leftPaddle.x
  ) {
    ball.dx = Math.abs(ball.dx) + 0.3;
    ball.x = leftPaddle.x + leftPaddle.width;
    ball.dx *= -1;
  }

  if (
    ball.x + ball.size >= rightPaddle.x &&
    ball.y + ball.size >= rightPaddle.y &&
    ball.y <= rightPaddle.y + rightPaddle.height &&
    ball.x <= rightPaddle.x + rightPaddle.width
  ) {
    ball.dx = -(Math.abs(ball.dx) + 0.3);
    ball.x = rightPaddle.x - ball.size;
    ball.dx *= -1;
  }

  if (ball.x + ball.size < 0) {
    rightScore += 1;
    rightScoreEl.textContent = rightScore;
    resetBall();
    started = false;
  }

  if (ball.x > canvas.width) {
    leftScore += 1;
    leftScoreEl.textContent = leftScore;
    resetBall();
    started = false;
  }
}

function drawCenterLine() {
  ctx.strokeStyle = '#94a3b8';
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPaddles() {
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

  ctx.fillStyle = '#60a5fa';
  ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
}

function drawBall() {
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
}

function drawBackground() {
  ctx.fillStyle = '#0b1120';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawCenterLine();
}

function loop() {
  drawBackground();
  updatePaddles();
  updateBall();
  drawPaddles();
  drawBall();
  requestAnimationFrame(loop);
}

resetBall();
loop();
