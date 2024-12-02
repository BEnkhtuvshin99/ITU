/*for (let i=97; i<=122; i++ ){
  console.log(String.fromCharCode(i));
}
  */
const hangmanImage = document.querySelector(".Boxforhangman img")
const wordDisplay = document.querySelector(".Scripts");
const Lives = document.querySelector(".Score b");
const keyboardDiv= document.querySelector(".Keyboard");
const GameOver = document.querySelector(".gameover");
const PlayAgain = document.querySelector(".playagain");

let Answer;
let wrong;
let correct;
const Chance=5;

const resetGame = () =>{
  correct=[];
  wrong = 0;
  hangmanImage.src=`../assets/Hangman-${wrong}.png`;
  Lives.innerText = `${wrong} / ${Chance}`;
  keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled=false);
  wordDisplay.innerHTML = Answer.split("").map(() => `<li class="Letter"></li>`).join("");
  GameOver.classList.remove("show");

}

const getRandomWord = () => {
  const {word, hint}=AnswerWithQuestion[Math.floor(Math.random()* AnswerWithQuestion.length)];
  Answer=word;
  console.log(word);
  document.querySelector(".Question b").innerText = hint;
  resetGame();

}

const gameOver = (isvictory) => {
  const modalText = isvictory ? `Та амжилттай таалаа: ` : `Хариулт бол:`;
  GameOver.querySelector("img").src = `../assets/${isvictory ? 'victory' : 'gameover'}.gif`;
  GameOver.querySelector("h4").innerText = `${isvictory ? 'Баяр Хүргэе' : 'Тоглоом Дууслаа'}`;
  GameOver.querySelector("p").innerHTML = `${modalText} <b>${Answer}</b>`;
  GameOver.classList.add("show");
};

const initGame=(button,clickedLetter) => {
 if(Answer.includes(clickedLetter)){
  [... Answer].forEach((letter,index)=>{
    if(letter === clickedLetter){
      correct.push(letter);
      wordDisplay.querySelectorAll("li")[index].innerText = letter;
      wordDisplay.querySelectorAll("li")[index].classList.add("correct")
    }
  })
 }
 else{
  wrong++;
  console.log(clickedLetter,"baihgui useg");
  hangmanImage.src=`../assets/Hangman-${wrong}.png`;
 }

 button.disabled=true;
 Lives.innerText = `${wrong} / ${Chance}`;
 if(wrong === Chance){
  return gameOver(false);
 }
 if(correct.length === Answer.length){
  return gameOver(true);
 }
}
for (let i=97; i<=122; i++ ){
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", e=> initGame(e.target,String.fromCharCode(i)));
}

getRandomWord();
PlayAgain.addEventListener("click",getRandomWord);