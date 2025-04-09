const words = ["keyboard", "javascript", "banana", "mountain", "sunshine","alex","gena","coding","artur","gay","pososi"];
let currentWord = "";
let score = 0;

const wordElement = document.getElementById("word");
const input = document.getElementById("input");
const scoreElement = document.getElementById("score");

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function showNewWord() {
  currentWord = getRandomWord();
  wordElement.textContent = currentWord;
  input.value = "";
}

input.addEventListener("input", () => {
  if (input.value === currentWord) {
    score++;
    scoreElement.textContent = score;
    showNewWord();
  }
});

showNewWord();