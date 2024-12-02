const words = ["javascript", "hangman", "beginner", "programming"]; 
let selectedWord, correctGuesses, wrongGuesses, lives;
const wordDisplay = document.getElementById("wordDisplay");
const wrongLetters = document.getElementById("wrongLetters");
const livesDisplay = document.getElementById("lives");
const guessInput = document.getElementById("guessInput");
const restartButton = document.getElementById("restart");

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctGuesses = new Array(selectedWord.length).fill("_");
  wrongGuesses = [];
  lives = 6;

  updateDisplay();
}


function updateDisplay() {
  wordDisplay.innerHTML = correctGuesses
    .map(letter => `<span class="Letter">${letter}</span>`)
    .join("");
  wrongLetters.textContent = wrongGuesses.join(", ");
  livesDisplay.textContent = lives;
  if (!correctGuesses.includes("_")) {
    alert("Congratulations! You guessed the word!");
    restartGame();
  } else if (lives === 0) {
    alert(`Game Over! The word was "${selectedWord}".`);
    restartGame();
  }
}

function handleGuess(event) {
  const guess = event.target.value.toLowerCase();
  event.target.value = ""; 

  if (!guess || wrongGuesses.includes(guess) || correctGuesses.includes(guess)) {
    alert("You've already guessed that letter or entered nothing!");
    return;
  }

  if (selectedWord.includes(guess)) {
    [...selectedWord].forEach((letter, index) => {
      if (letter === guess) correctGuesses[index] = guess;
    });
  } else {
    wrongGuesses.push(guess);
    lives--;
  }

  updateDisplay();
}
function restartGame() {
  startGame();
}

guessInput.addEventListener("input", handleGuess);
restartButton.addEventListener("click", restartGame);
startGame();
