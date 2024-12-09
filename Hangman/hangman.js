const questions = [
  { question: "What is the capital of France?", answer: "paris" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "shakespeare" },
  { question: "What is the largest planet in our solar system?", answer: "jupiter" },
  { question: "Which animal is known as the King of the Jungle?", answer: "lion" },
  { question: "What is the tallest mountain on Earth?", answer: "everest" }
];

let word = "";
let chosenLetters = [];
let wrongAnswers = 0;
const maxLives = 5;
let gameOver = false;

function startGame() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  word = questions[randomIndex].answer;
  const question = questions[randomIndex].question;
  document.getElementById("question").textContent = question;
  updateAnswer();
  updateLives();
  chosenLetters = [];
  wrongAnswers = 0;
  gameOver = false;
  updateChosenLetters();
  updateHangmanImage();
}

function updateAnswer() {
  const displayWord = word
    .split("")
    .map(letter => (chosenLetters.includes(letter) ? letter : "_"))
    .join(" ");
  document.getElementById("Field").textContent = displayWord;
}

function updateChosenLetters() {
  document.getElementById("guessedLetters").textContent = chosenLetters.join(", ");
}

function updateHangmanImage() {
  const image = document.getElementById("hangmanImage");
  image.src = `../assets/Hangman-${wrongAnswers}.png`;
}

function updateLives() {
  document.getElementById("LivesLeft").textContent = maxLives - wrongAnswers;
}

function guessLetter() {
  if (gameOver) return;

  const input = document.getElementById("letterInput");
  const guessedLetter = input.value.toLowerCase();
  input.value = "";

  if (!guessedLetter.match(/^[a-z]$/) || chosenLetters.includes(guessedLetter)) {
    alert("Ашиглаагүй үсэг хэрэглэнэ үү");
    return;
  }

  chosenLetters.push(guessedLetter);

  if (word.includes(guessedLetter)) {
    updateAnswer();
  } else {
    wrongAnswers++;
    updateHangmanImage();
    updateLives();
  }

  updateChosenLetters();

  if (!document.getElementById("Field").textContent.includes("_")) {
    gameOver = true;
    alert("Баяр Хүргэе!!!");
    resetGame();
  } else if (wrongAnswers >= maxLives) {
    gameOver = true;
    alert(`Та ялагдлаа.Хариулт бол "${word}".`);
    resetGame();
  }
}

function resetGame() {
  startGame();
}

document.addEventListener("DOMContentLoaded", startGame);
