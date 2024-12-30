let timerInterval;
let elapsedMilliseconds = 0;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");

const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

function formatTime(value) {
  return value.toString().padStart(2, "0");
}

function updateDisplay() {
  const minutes = Math.floor(elapsedMilliseconds / 60000);
  const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);
  const milliseconds = Math.floor((elapsedMilliseconds % 1000) / 10);

  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);
  millisecondsEl.textContent = formatTime(milliseconds);
}

function startTimer() {
  const startTime = Date.now() - elapsedMilliseconds;

  timerInterval = setInterval(() => {
    elapsedMilliseconds = Date.now() - startTime;
    updateDisplay();
  }, 10);

  startPauseBtn.textContent = "Pause";
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  startPauseBtn.textContent = "Start";
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedMilliseconds = 0;
  updateDisplay();

  startPauseBtn.textContent = "Start";
  resetBtn.disabled = true;
  lapBtn.disabled = true;

  lapsContainer.innerHTML = "";
}

function addLap() {
  const lapTime = `${minutesEl.textContent}:${secondsEl.textContent}:${millisecondsEl.textContent}`;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
  lapsContainer.appendChild(lapItem);
}

startPauseBtn.addEventListener("click", () => {
  if (timerInterval) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
