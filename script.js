function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(pageId);
  if (selectedPage) {
    selectedPage.classList.add("active");
  }
}


  const images = [
  "https://m5hnfzh57b-dot.github.io/kourosh-land/kourosh1.jpg",
  "https://m5hnfzh57b-dot.github.io/kourosh-land/kourosh2.jpg",
  "https://m5hnfzh57b-dot.github.io/kourosh-land/kourosh3.jpg",
  "https://m5hnfzh57b-dot.github.io/kourosh-land/kourosh4.jpg",
  "https://m5hnfzh57b-dot.github.io/kourosh-land/kourosh5.jpg",
  "https://m5hnfzh57b-dot.github.io/kourosh-land/kourosh6.jpg"
];


const funnyMessages = [
  "Match found: overthinking level increased 🧠",
  "Analysis complete: this version is definitely Kourosh 😂",
  "Certified chatty energy detected 💬",
  "Complication specialist unlocked 🧩",
  "Simple task successfully made difficult ⚠️",
  "New controversial opinion loading...",
  "Sarah's sleep has been disturbed again 😴",
  "Turkish lesson loading... still 3% 🇹🇷"
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

function shuffleCards(cards) {
  return cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
  if (!board) return;

  board.innerHTML = "";

  if (message) {
    message.textContent = "";
  }

  const cardImages = shuffleCards([...images, ...images]);

  cardImages.forEach(image => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.image = image;

    card.innerHTML = `
      <div class="front">?</div>
      <div class="back">
        <img 
          src="${image}" 
          alt="Kourosh photo"
          onerror="this.onerror=null; this.src='images/${image}';"
        >
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

  if (movesText) {
    movesText.textContent = moves;
  }

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.image === secondCard.dataset.image;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matches++;

    if (matchesText) {
      matchesText.textContent = matches;
    }

    if (message) {
      message.textContent =
        funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    }

    resetCards();

    if (matches === images.length) {
      setTimeout(() => {
        if (message) {
          message.innerHTML =
            "🎉 Mission complete! You found all versions of Kourosh.<br>Final result: 100% Overthinker, 99% Analyst, 100% Sarah Sleep Disruptor.";
        }
      }, 500);
    }
  } else {
    lockBoard = true;

    if (message) {
      message.textContent =
        "Wrong match. He is now overanalysing why this happened...";
    }

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

  if (movesText) {
    movesText.textContent = 0;
  }

  if (matchesText) {
    matchesText.textContent = 0;
  }

  if (message) {
    message.textContent = "";
  }

  resetCards();
  createBoard();
}

createBoard();