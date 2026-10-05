const emojis = ['🍉', '🍋', '🍇', '🍎', '🍒', '🍊', '🍍', '🥝'];
const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let cards = [];
let flipped = [];
let matchedPairs = 0;
let lockBoard = false;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createBoard() {
  cards = shuffle([...emojis, ...emojis]).map((emoji, index) => ({
    id: index,
    emoji,
    matched: false,
    flipped: false,
  }));

  matchedPairs = 0;
  flipped = [];
  lockBoard = false;
  board.innerHTML = '';

  cards.forEach((card) => {
    const button = document.createElement('button');
    button.className = 'card';
    button.textContent = '❔';
    button.addEventListener('click', () => flipCard(button, card.id));
    board.appendChild(button);
  });

  status.textContent = 'Find all pairs';
}

function flipCard(button, id) {
  const card = cards[id];

  if (lockBoard || card.matched || card.flipped) return;

  card.flipped = true;
  button.textContent = card.emoji;
  flipped.push(card);

  if (flipped.length === 2) {
    lockBoard = true;

    if (flipped[0].emoji === flipped[1].emoji) {
      status.textContent = 'Match!';
      setTimeout(() => {
        cards.forEach((item) => {
          if (item.emoji === flipped[0].emoji) {
            item.matched = true;
          }
        });

        matchedPairs += 1;
        updateBoard();
        flipped = [];
        lockBoard = false;

        if (matchedPairs === emojis.length) {
          status.textContent = 'You won!';
        }
      }, 500);
    } else {
      status.textContent = 'Try again';
      setTimeout(() => {
        cards.forEach((item) => {
          if (item.id === flipped[0].id || item.id === flipped[1].id) {
            item.flipped = false;
          }
        });
        updateBoard();
        flipped = [];
        lockBoard = false;
      }, 800);
    }
  }
}

function updateBoard() {
  const buttons = [...board.children];

  cards.forEach((card, index) => {
    const button = buttons[index];
    button.textContent = card.matched || card.flipped ? card.emoji : '❔';
    button.classList.toggle('matched', card.matched);
  });
}

restartBtn.addEventListener('click', createBoard);
createBoard();
