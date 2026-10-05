const choices = ['rock', 'paper', 'scissors'];
const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(player, computer) {
  if (player === computer) return 'Draw!';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'You win!';
  }
  return 'Computer wins!';
}

document.querySelectorAll('.choice').forEach((button) => {
  button.addEventListener('click', () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    const outcome = determineWinner(playerChoice, computerChoice);

    if (outcome === 'You win!') playerScore += 1;
    if (outcome === 'Computer wins!') computerScore += 1;

    resultEl.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${outcome}`;
    scoreEl.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
  });
});
