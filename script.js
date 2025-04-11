const words = ["keyboard", "javascript", "banana", "mountain", "sunshine","alex","gena","coding","artur","gay","pososi"];
let currentWord = "";
let score = 0;
let wave = 1;
let timePerWave = 15*1000 // 15 sec for now

const wordElement = document.getElementById("word");
const input = document.getElementById("input");
const scoreElement = document.getElementById("score");
const waveElement = document.getElementById("wave");
const waveSound = new Audio('sounds/next-wave.mp3');

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

function animateWaveBanner() {
  const banner = document.getElementById("wave-banner");
  banner.textContent = `🌊 Wave ${wave}!`;
  banner.style.opacity = 1;
  banner.style.transform = "translate(-50%, -50%) scale(1.2)";

  setTimeout(() => {
    banner.style.opacity = 0;
    banner.style.transform = "translate(-50%, -50%) scale(1)";
  }, 2000);
}

function startWave() {
  waveElement.textContent = `Wave: ${wave}`;
  console.log(`Началась волна ${wave}`);
  waveSound.play();
  animateWaveBanner();
  setTimeout(() => {
    wave++;
    startWave();
    // Можно менять сложность: скорость, сложность слов и т.д.
  }, timePerWave);
}

showNewWord();
startWave();