const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// /change the postion of no button
noBtn.addEventListener("mouseover", () => {
  const newX = Math.floor(Math.random() * questionContainer.offsetWidth);
  const newY = Math.floor(Math.random() * questionContainer.offsetWidth);

  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});

// yes button functionality

yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  const timeoutId = setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    gifResult.play();
  }, 3000);
});

// Floating hearts in background
const heartSymbols = ["❤️", "💖", "💕", "💗", "💓"];

function createBackgroundHeart() {
  const heart = document.createElement("span");
  heart.className = "bg-heart";
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${14 + Math.random() * 20}px`;
  const duration = 4 + Math.random() * 4;
  heart.style.animationDuration = `${duration}s`;
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

setInterval(createBackgroundHeart, 450);

// Cursor trailing hearts
let lastCursorTime = 0;
function spawnCursorHeart(x, y) {
  const now = Date.now();
  if (now - lastCursorTime < 45) return;
  lastCursorTime = now;

  const heart = document.createElement("span");
  heart.className = "cursor-heart";
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 700);
}

window.addEventListener("mousemove", (e) => {
  spawnCursorHeart(e.clientX, e.clientY);
});

window.addEventListener("touchmove", (e) => {
  if (e.touches && e.touches[0]) {
    spawnCursorHeart(e.touches[0].clientX, e.touches[0].clientY);
  }
});