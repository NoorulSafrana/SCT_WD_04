const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameBoard[index]) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    statusText.textContent =` Player ${currentPlayer} Wins!`;
    endGame();
  } else if (gameBoard.every(cell => cell)) {
    statusText.textContent ="It's a Draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}
function checkWin() {
  return winningCombinations.some(combination => 
    combination.every(index => gameBoard[index] === currentPlayer)
  );
}
function endGame() {
  cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}
function restartGame() {
  gameBoard.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleCellClick);
  });
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
statusText.textContent = `Player ${currentPlayer}'s Turn`;
