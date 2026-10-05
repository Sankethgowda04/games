const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 15, y: 10 };
let score = 0;
let gameOver = false;

function setFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };

  for (const segment of snake) {
    if (segment.x === food.x && segment.y === food.y) {
      setFood();
      return;
    }
  }
}

function update() {
  if (gameOver) return;

  direction = nextDirection;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= tileCount ||
    head.y >= tileCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver = true;
    setTimeout(() => {
      alert('Game Over! Final Score: ' + score + '\nRefresh to play again.');
    }, 100);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreEl.textContent = score;
    setFood();
  } else {
    snake.pop();
  }
}

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < tileCount; x++) {
    for (let y = 0; y < tileCount; y++) {
      ctx.strokeStyle = '#1e293b';
      ctx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }

  for (const segment of snake) {
    drawCell(segment.x, segment.y, '#22c55e');
  }

  drawCell(food.x, food.y, '#f87171');
}

document.addEventListener('keydown', (event) => {
  const map = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };

  const chosen = map[event.key];
  if (!chosen) return;

  if (chosen.x === -direction.x && chosen.y === -direction.y) return;
  nextDirection = chosen;
});

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

setFood();
setInterval(() => {
  if (!gameOver) {
    update();
  }
}, 120);

gameLoop();
