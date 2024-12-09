const questions = [
    { question: "What is the capital of France?", answer: "paris" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "shakespeare" },
    { question: "What is the largest planet in our solar system?", answer: "jupiter" },
    { question: "Which animal is known as the King of the Jungle?", answer: "lion" },
    { question: "What is the tallest mountain on Earth?", answer: "everest" }
  ];
  let word = ""; 
  let ChosenL = []; 
  let WrongAnswer = 0; 
  let maxLives = 5; 
  let gameOver = false; 
  function startGame() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    word = questions[randomIndex].answer; 
    const question = questions[randomIndex].question;
    document.getElementById("question").textContent = question;
    UpdateAnswer();
    UpdateLives(); 
    document.querySelector(".AskWord").style.display = "none"; 
    document.querySelector(".GameContent").style.display = "block"; 
  }
  function UpdateAnswer() {
    let displayWord = word.split("").map(letter => {
      return ChosenL.includes(letter) ? letter : "_";
    }).join(" ");
    document.getElementById("wordToGuess").textContent = displayWord;
  }
  function updateChosenL() {
    document.getElementById("ChosenL").textContent = ChosenL.join(", ");
  }
  function updateHangmanImage() {
    let image = document.getElementById("hangmanImage");
    image.src = `../assets/Hangman-${WrongAnswer}.png`;
  }
  function UpdateLives() {
    document.getElementById("remainingLives").textContent = maxLives - WrongAnswer;
  }
  function Answer() {
    if (gameOver) return; 
    let input = document.getElementById("letterInput");
    let guessedLetter = input.value.toLowerCase();
    input.value = ""; 
    if (!guessedLetter || ChosenL.includes(guessedLetter)) {
      return; 
    }
    ChosenL.push(guessedLetter);
    if (word.includes(guessedLetter)) {
      UpdateAnswer();
    } else {
      WrongAnswer++; 
      updateHangmanImage(); 
      UpdateLives(); 
    }
    updateChosenL(); 
    if (!document.getElementById("wordToGuess").textContent.includes("_")) {
      gameOver = true;
      alert("You win!");
    } else if (WrongAnswer >= maxLives) {
      gameOver = true;
      alert("You lose! The word was " + word);
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    startGame(); 
  });
  