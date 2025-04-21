const words = ["keyboard", "javascript", "banana", "mountain", "sunshine","alex","gena","coding","artur","gay","pososi"];
let currentWord = "";
let score = 0;
let wave = 1;
let timePerWave = 10*1000 // 10 sec for now
let wordTimer = null;
let timeLimit = 5000;

const wordElement = document.getElementById("word");
const input = document.getElementById("input");
const scoreElement = document.getElementById("score");
const waveElement = document.getElementById("wave");
const waveSound = new Audio('sounds/next-wave.mp3');
const timerBar = document.getElementById("timer-bar");

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function showNewWord() {
  currentWord = getRandomWord();
  wordElement.textContent = currentWord;
  input.value = "";

  // Сброс анимации таймера
  timerBar.style.transition = "none";
  timerBar.style.width = "100%";
  void timerBar.offsetWidth; // хак, чтобы сбросить анимацию
  timerBar.style.transition = `width ${timeLimit}ms linear`;
  timerBar.style.width = "0%";

  if(wordTimer) clearTimeout(wordTimer);
  wordTimer = setTimeout(() => {
    console.log("время прошло");
    score--;
    scoreElement.textContent = score;
    showNewWord();
  }, timeLimit);
}

input.addEventListener("input", () => {
  if (input.value === currentWord) {
    clearTimeout(wordTimer);
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
    if(wave%5==0){
      console.log("Уровень сложности повысился!")
      if(timeLimit > 3000){
        timeLimit-=500;
        console.log(`Лимит времени уменьшился, теперь он ${timeLimit}`)
      }
    }
  }, timePerWave);
}

showNewWord();
startWave();