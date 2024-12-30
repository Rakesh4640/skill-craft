const gameBoard = document.getElementById("gameBoard");
const gameInfo = document.getElementById("gameInfo");
const resetButton = document.getElementById("resetButton");
const playerVsPlayerButton = document.getElementById("playerVsPlayer");
const playerVsComputerButton = document.getElementById("playerVsComputer");

let board;
let currentPlayer;
let isGameOver;
let gameMode; // "PVP" or "PVC"

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initializeGame(mode) {
  gameMode = mode;
  board = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  gameInfo.textContent = `${currentPlayer}'s turn`;
  resetButton.classList.remove("hidden");

  gameBoard.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleCellClick(i));
    gameBoard.appendChild(cell);
  }
}

function handleCellClick(index) {
  if (isGameOver || board[index] !== null) return;

  board[index] = currentPlayer;
  const cells = document.querySelectorAll(".cell");
  cells[index].textContent = currentPlayer;
  cells[index].classList.add("taken");

  if (checkWinner(currentPlayer)) {
    gameInfo.textContent = `${currentPlayer} wins!`;
    isGameOver = true;
  } else if (board.every((cell) => cell !== null)) {
    gameInfo.textContent = "It's a tie!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.textContent = `${currentPlayer}'s turn`;

    if (gameMode === "PVC" && currentPlayer === "O") {
      setTimeout(makeComputerMove, 500);
    }
  }
}

function checkWinner(player) {
  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === player)
  );
}

function makeComputerMove() {
  const availableIndices = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null);
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  handleCellClick(randomIndex);
}

resetButton.addEventListener("click", () => {
  initializeGame(gameMode);
});

playerVsPlayerButton.addEventListener("click", () => {
  initializeGame("PVP");
});

playerVsComputerButton.addEventListener("click", () => {
  initializeGame("PVC");
});
