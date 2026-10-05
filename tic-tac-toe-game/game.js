const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const button = document.createElement('button');
    button.className = 'cell';
    button.textContent = cell;
    button.disabled = !!cell || gameOver;
    button.addEventListener('click', () => makeMove(index));
    boardElement.appendChild(button);
  });
}

function makeMove(index) {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  const winner = getWinner();

  if (winner) {
    statusElement.textContent = `Player ${winner} wins!`;
    gameOver = true;
    renderBoard();
    return;
  }

  if (board.every(cell => cell)) {
    statusElement.textContent = 'Draw!';
    gameOver = true;
    renderBoard();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

function getWinner() {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function restartGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  statusElement.textContent = "Player X's turn";
  renderBoard();
}

restartBtn.addEventListener('click', restartGame);
renderBoard();
