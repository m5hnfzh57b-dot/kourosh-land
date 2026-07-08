function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

const images = [
  "images/kourosh1.jpg",
  "images/kourosh1.jpg",
  "images/kourosh2.jpg",
  "images/kourosh2.jpg",
  "images/kourosh3.jpg",
  "images/kourosh3.jpg",
  "images/kourosh4.jpg",
  "images/kourosh4.jpg",
  "images/kourosh5.jpg",
  "images/kourosh5.jpg",
  "images/kourosh6.jpg",
  "images/kourosh6.jpg"
];

const funnyMessages = [
  "Match found: overthinking level increased 🧠",
  "Analysis complete: this version is definitely Kourosh 😂",
  "Certified chatty energy detected 💬",
  "Complication specialist unlocked 🧩",
  "Simple task successfully made difficult ⚠️",
  "New controversial opinion loading..."
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;

const board = document.getElementById("game-board");
const movesText = document.getElementById("moves");
const matchesText = document.getElementById("matches");
const message = document.getElementById("message");

function shuffleCards() {
  images.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = "";
  shuffleCards();

  images.forEach(image => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;

    card.innerHTML = `
      <div class="front">?</div>
      <div class="back">
        <img src="${image}" alt="Kourosh photo">
      </div>
    `;

    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains("matched")) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;
  movesText.textContent = moves;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matches++;
    matchesText.textContent = matches;

    message.textContent =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

    resetCards();

    if (matches === 6) {
      setTimeout(() => {
        message.innerHTML =
          "🎉 Mission complete! You found all versions of Kourosh.<br>Final result: 100% Overthinker, 99% Analyst, 95% Chatty.";
      }, 500);
    }
  } else {
    lockBoard = true;
    message.textContent =
      "Wrong match. He is now overanalysing why this happened...";

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restartGame() {
  moves = 0;
  matches = 0;
  movesText.textContent = 0;
  matchesText.textContent = 0;
  message.textContent = "";
  resetCards();
  createBoard();
}

createBoard();