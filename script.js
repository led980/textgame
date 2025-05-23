const words = [
  "hi", "go", "up",           // длина 2
  "dog", "cat", "sun",        // длина 3
  "home", "ball", "code",     // длина 4
  "apple", "chair", "table",  // длина 5
  "banana", "monkey", "rocket", // длина 6
  "speaker", "glasses",         // длина 7
  "elephant", "mountain",       // длина 8
  "developer", "algorithm"      // длина 9
];
// Шаг 1: отсортировать по длине
words.sort((a, b) => a.length - b.length);

// Шаг 2: создать карту длин → индексы
const lengthIndexMap = new Map();

for (let i = 0; i < words.length; i++) {
  const len = words[i].length;
  if (!lengthIndexMap.has(len)) {
    lengthIndexMap.set(len, { start: i, end: i });
  } else {
    lengthIndexMap.get(len).end = i;
  }
}
let currentWord = "";
let score = 0;
let wave = 1;
let wordTimer = null;
let timeLimit = 5000;
let wordsThisWave = 0;
let wordsRequired = 5; // например, на первой волне нужно 5 слов

const wordElement = document.getElementById("word");
const input = document.getElementById("input");
const scoreElement = document.getElementById("score");
const waveElement = document.getElementById("wave");
const waveSound = new Audio('sounds/next-wave.mp3');
const timerBar = document.getElementById("timer-bar");
const progressBar = document.getElementById("progress-bar");

function getRandomWord() {
  const { minLen, maxLen } = getLengthRangeByWave(wave);

  // выбираем случайную длину
  const targetLengths = Array.from(lengthIndexMap.keys())
    .filter(len => len >= minLen && len <= maxLen);

  if (targetLengths.length === 0) return "default";

  const randomLen = targetLengths[Math.floor(Math.random() * targetLengths.length)];
  const { start, end } = lengthIndexMap.get(randomLen);
  const randomIndex = Math.floor(Math.random() * (end - start + 1)) + start;

  return words[randomIndex];
}
function getLengthRangeByWave(wave) {
  const minLen = Math.min(2+wave, 5); // от 2 до 5
  const maxLen = Math.min(5+wave, 14); // до 14 максимум
  return { minLen, maxLen };
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
    wordsThisWave++; // увеличиваем счётчик слов
    updateProgressBar();
    scoreElement.textContent = score;

    // Проверяем, достигли ли цели волны
    if (wordsThisWave >= wordsRequired) {
      nextWave();
    } else {
      showNewWord();
    }
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
function updateProgressBar() {
  const percent = (wordsThisWave / wordsRequired) * 100;
  progressBar.style.width = `${Math.min(percent, 100)}%`;
}

function nextWave() {
  wave++;
  wordsThisWave = 0;
  wordsRequired += 2; // каждую волну нужно на 2 слова больше
  wordsThisWave = 0;
  updateProgressBar(); // сбросить полосу

  waveElement.textContent = `Wave: ${wave}`;
  animateWaveBanner();
  waveSound.play();

  // Дополнительная сложность: уменьшаем лимит времени
  if (wave % 3 === 0 && timeLimit > 2000) {
    timeLimit -= 500;
  }
  showNewWord();
}

showNewWord();
